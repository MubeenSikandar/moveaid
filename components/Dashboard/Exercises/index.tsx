"use client";
import React, { useState, useRef, useEffect } from "react";

interface Exercise {
  id: number;
  name: string;
  duration: number;
  completed: boolean;
}

interface Pose {
  keypoints: Keypoint[];
  score?: number;
}

interface Keypoint {
  x: number;
  y: number;
  score?: number;
  name?: string;
}

interface PoseDetector {
  estimatePoses: (video: HTMLVideoElement) => Promise<Pose[]>;
  dispose: () => void;
}

type FormFeedback = "perfect" | "too-low" | "too-high" | "align-body" | null;

const Exercises = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const detectorRef = useRef<PoseDetector | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastRepStateRef = useRef<"up" | "down">("up");

  const [cameraActive, setCameraActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [poseDetected, setPoseDetected] = useState(false);
  const [repCount, setRepCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formFeedback, setFormFeedback] = useState<FormFeedback>(null);

  const exercises: Exercise[] = [
    { id: 1, name: "Push-Ups", duration: 120, completed: false },
    { id: 2, name: "Pull-Ups", duration: 150, completed: false },
    { id: 3, name: "Squats", duration: 180, completed: false },
    { id: 4, name: "Plank", duration: 90, completed: false },
    { id: 5, name: "Lunges", duration: 120, completed: false },
  ];

  const currentExercise = exercises[currentExerciseIndex];

  useEffect(() => {
    if (currentExercise) {
      setTimeRemaining(currentExercise.duration);
    }
  }, [currentExerciseIndex, currentExercise]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (cameraActive && !isPaused && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleNextExercise();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cameraActive, isPaused, timeRemaining]);

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (detectorRef.current) {
        detectorRef.current.dispose();
      }
    };
  }, []);

  // Assign stream to video element once it's rendered
  useEffect(() => {
    if (mediaStream && videoRef.current) {
      videoRef.current.srcObject = mediaStream;

      const handleLoadedMetadata = () => {
        videoRef.current
          ?.play()
          .then(() => {
            console.log("Video playing successfully");
            initPoseDetection();
          })
          .catch((err) => {
            console.error("Error playing video:", err);
          });
      };

      videoRef.current.onloadedmetadata = handleLoadedMetadata;

      if (videoRef.current.readyState >= 2) {
        handleLoadedMetadata();
      }

      return () => {
        if (videoRef.current) {
          videoRef.current.onloadedmetadata = null;
        }
      };
    }
  }, [mediaStream]);

  const initPoseDetection = async () => {
    try {
      setIsLoading(true);

      // Load TensorFlow.js and MoveNet from CDN
      const script1 = document.createElement("script");
      script1.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.11.0";
      document.head.appendChild(script1);

      await new Promise((resolve) => {
        script1.onload = resolve;
      });

      const script2 = document.createElement("script");
      script2.src =
        "https://cdn.jsdelivr.net/npm/@tensorflow-models/pose-detection@2.1.0";
      document.head.appendChild(script2);

      await new Promise((resolve) => {
        script2.onload = resolve;
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (window as any).tf.ready();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const detector = await (window as any).poseDetection.createDetector(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).poseDetection.SupportedModels.MoveNet,
        {
          modelType:
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).poseDetection.movenet.modelType
              .SINGLEPOSE_LIGHTNING,
        }
      );

      detectorRef.current = detector;
      setIsLoading(false);
      detectPose();
    } catch (error) {
      console.error("Error initializing pose detection:", error);
      setIsLoading(false);
    }
  };

  const analyzeForm = (pose: Pose) => {
    const keypoints = pose.keypoints;

    // Get key body points
    const leftShoulder = keypoints[5];
    const rightShoulder = keypoints[6];
    const leftHip = keypoints[11];
    const rightHip = keypoints[12];
    const leftKnee = keypoints[13];
    const rightKnee = keypoints[14];

    if (!leftShoulder?.score || !rightShoulder?.score) return;

    // Calculate average shoulder and hip positions
    const avgShoulderY = (leftShoulder.y + rightShoulder.y) / 2;
    const avgHipY = (leftHip?.y || 0 + rightHip?.y || 0) / 2;

    // Exercise-specific form checking
    if (currentExercise.name === "Squats") {
      if (leftKnee?.score && rightKnee?.score && leftHip?.score) {
        const avgKneeY = (leftKnee.y + rightKnee.y) / 2;

        // Check squat depth
        if (avgKneeY < avgHipY - 50) {
          setFormFeedback("too-low");
        } else if (avgKneeY > avgHipY + 100) {
          setFormFeedback("too-high");
        } else {
          setFormFeedback("perfect");
        }

        // Rep counting for squats
        if (avgKneeY < avgHipY && lastRepStateRef.current === "up") {
          lastRepStateRef.current = "down";
        } else if (
          avgKneeY > avgHipY + 50 &&
          lastRepStateRef.current === "down"
        ) {
          setRepCount((prev) => prev + 1);
          lastRepStateRef.current = "up";
        }
      }
    } else if (currentExercise.name === "Push-Ups") {
      // Check push-up form
      if (leftShoulder?.score && rightShoulder?.score && leftHip?.score) {
        const bodyAlignment = Math.abs(avgShoulderY - avgHipY);

        if (bodyAlignment > 100) {
          setFormFeedback("align-body");
        } else if (avgShoulderY > avgHipY + 30) {
          setFormFeedback("too-low");
        } else {
          setFormFeedback("perfect");
        }

        // Rep counting for push-ups
        if (avgShoulderY > avgHipY && lastRepStateRef.current === "up") {
          lastRepStateRef.current = "down";
        } else if (
          avgShoulderY < avgHipY - 20 &&
          lastRepStateRef.current === "down"
        ) {
          setRepCount((prev) => prev + 1);
          lastRepStateRef.current = "up";
        }
      }
    } else {
      // Default feedback
      setFormFeedback("perfect");
    }
  };

  const detectPose = async () => {
    if (
      !videoRef.current ||
      !canvasRef.current ||
      !detectorRef.current ||
      isPaused
    ) {
      animationFrameRef.current = requestAnimationFrame(detectPose);
      return;
    }

    try {
      const poses = await detectorRef.current.estimatePoses(videoRef.current);

      if (poses.length > 0) {
        setPoseDetected(true);
        drawPose(poses[0]);
        analyzeForm(poses[0]);
      } else {
        setPoseDetected(false);
        setFormFeedback(null);
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (ctx && canvas) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    } catch (error) {
      console.error("Error detecting pose:", error);
    }

    animationFrameRef.current = requestAnimationFrame(detectPose);
  };

  const drawPose = (pose: Pose) => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw keypoints
    pose.keypoints.forEach((keypoint: Keypoint) => {
      if (keypoint.score && keypoint.score > 0.3) {
        ctx.beginPath();
        ctx.arc(keypoint.x, keypoint.y, 6, 0, 2 * Math.PI);
        ctx.fillStyle = "#AD85D1";
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });

    // Draw skeleton connections
    const connections = [
      [5, 6],
      [5, 7],
      [7, 9],
      [6, 8],
      [8, 10], // Arms
      [5, 11],
      [6, 12],
      [11, 12], // Torso
      [11, 13],
      [13, 15],
      [12, 14],
      [14, 16], // Legs
    ];

    ctx.strokeStyle = "#AD85D1";
    ctx.lineWidth = 3;

    connections.forEach(([i, j]) => {
      const kp1 = pose.keypoints[i];
      const kp2 = pose.keypoints[j];

      if (kp1?.score && kp2?.score && kp1.score > 0.3 && kp2.score > 0.3) {
        ctx.beginPath();
        ctx.moveTo(kp1.x, kp1.y);
        ctx.lineTo(kp2.x, kp2.y);
        ctx.stroke();
      }
    });
  };

  const startCamera = async () => {
    try {
      setIsLoading(true);
      const constraints = {
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      streamRef.current = stream;
      setMediaStream(stream);
      setCameraActive(true);
      setPermissionDenied(false);
    } catch (error) {
      console.error("Error accessing camera:", error);
      setPermissionDenied(true);
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
    }

    setMediaStream(null);

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraActive(false);
    setPoseDetected(false);
    setFormFeedback(null);
  };

  const handleStartSession = () => {
    if (!cameraActive) {
      startCamera();
    }
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleRestart = () => {
    setTimeRemaining(currentExercise.duration);
    setIsPaused(false);
    setRepCount(0);
    lastRepStateRef.current = "up";
    setFormFeedback(null);
  };

  const handleSkip = () => {
    handleNextExercise();
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setIsPaused(false);
      setRepCount(0);
      lastRepStateRef.current = "up";
      setFormFeedback(null);
    } else {
      // Session complete
      stopCamera();
      setCurrentExerciseIndex(0);
      setRepCount(0);
      lastRepStateRef.current = "up";
      setFormFeedback(null);
    }
  };

  const handleExerciseSelect = (index: number) => {
    setCurrentExerciseIndex(index);
    setIsPaused(false);
    setRepCount(0);
    lastRepStateRef.current = "up";
    setFormFeedback(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getFeedbackColor = () => {
    switch (formFeedback) {
      case "perfect":
        return "from-green-500 to-green-600";
      case "too-low":
      case "too-high":
      case "align-body":
        return "from-yellow-500 to-orange-500";
      default:
        return "from-gray-400 to-gray-500";
    }
  };

  const getFeedbackText = () => {
    switch (formFeedback) {
      case "perfect":
        return "Perfect Form! ✓";
      case "too-low":
        return "Go Higher ↑";
      case "too-high":
        return "Go Lower ↓";
      case "align-body":
        return "Keep Body Straight";
      default:
        return "Get in Position";
    }
  };

  return (
    <div className="flex gap-4 w-full h-screen p-4 bg-gray-50">
      {/* Main Exercise Area - Left Side */}
      <div className="flex-1 h-full bg-gradient-to-br from-[#ebe7dd] to-[#f5f1e8] rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
        {!cameraActive ? (
          // Initial State - Start Session
          <div className="text-center">
            <h2 className="text-4xl font-bold text-black mb-6">
              {currentExercise.name}
            </h2>

            <div className="w-64 h-64 bg-white rounded-full flex items-center justify-center mb-8 shadow-xl">
              <div className="text-center">
                <div className="text-7xl mb-2">🏋️</div>
                <p className="text-sm text-gray-600 font-medium">
                  Ready to start?
                </p>
              </div>
            </div>

            <button
              onClick={handleStartSession}
              className="bg-gradient-to-r from-[#AD85D1] to-[#9c72c0] text-white py-4 px-12 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all shadow-lg text-lg"
            >
              Start Session
            </button>

            {permissionDenied && (
              <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl max-w-md mx-auto">
                <p className="text-red-700 text-sm font-medium">
                  ⚠️ Camera access denied. Please enable camera permissions to
                  continue.
                </p>
              </div>
            )}
          </div>
        ) : (
          // Camera Active State
          <div className="relative w-full h-full flex flex-col">
            {/* Exercise Title */}
            <h2 className="text-3xl font-bold text-black mb-4 text-center">
              {currentExercise.name}
            </h2>

            {/* Video Feed with Pose Estimation */}
            <div className="flex-1 relative bg-black rounded-3xl overflow-hidden mb-6 shadow-2xl">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/70">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#AD85D1] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-lg font-medium">
                      Loading AI Model...
                    </p>
                  </div>
                </div>
              )}

              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover"
                style={{ transform: "scaleX(-1)" }}
              />

              {/* Canvas for pose overlay */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{ transform: "scaleX(-1)" }}
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

              {/* Rep Counter */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-xl z-20">
                <p className="text-sm text-gray-600 mb-1 font-medium">Reps</p>
                <p className="text-3xl font-bold text-[#AD85D1]">{repCount}</p>
              </div>

              {/* Form Feedback - Center Top */}
              <div
                className={`absolute top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${getFeedbackColor()} text-white rounded-2xl px-8 py-4 shadow-xl z-20 transition-all duration-300`}
              >
                <p className="text-2xl font-bold">{getFeedbackText()}</p>
              </div>

              {/* Pose Detection Status - Top Right */}
              <div className="absolute top-6 right-6 flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-xl z-20">
                <div
                  className={`w-3 h-3 rounded-full ${
                    poseDetected ? "bg-green-500" : "bg-red-500"
                  } animate-pulse`}
                />
                <p className="text-sm font-medium text-gray-700">
                  {poseDetected ? "Tracking" : "Not Detected"}
                </p>
              </div>

              {/* Timer - Bottom Center */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-xl z-20">
                <p className="text-3xl font-bold text-[#AD85D1]">
                  {formatTime(timeRemaining)}
                </p>
              </div>

              {/* Paused Indicator */}
              {isPaused && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-30">
                  <div className="bg-white rounded-full p-8 shadow-2xl">
                    <svg
                      className="w-16 h-16 text-[#AD85D1]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handleRestart}
                className="bg-white text-gray-700 py-3 px-8 rounded-full font-medium hover:bg-gray-50 hover:scale-105 transition-all shadow-md border-2 border-gray-200"
              >
                ↻ Restart
              </button>

              <button
                onClick={handlePauseResume}
                className="bg-gradient-to-r from-[#AD85D1] to-[#9c72c0] text-white py-3 px-12 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all shadow-lg"
              >
                {isPaused ? "▶ Resume" : "⏸ Pause"}
              </button>

              <button
                onClick={handleSkip}
                className="text-gray-600 py-3 px-6 hover:text-gray-800 hover:scale-105 transition-all font-medium"
              >
                Skip →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Exercise List - Right Side */}
      <div className="w-80 h-full flex flex-col gap-4 overflow-y-auto pr-2">
        {exercises.map((exercise, index) => (
          <div
            key={exercise.id}
            onClick={() => handleExerciseSelect(index)}
            className={`bg-gradient-to-br from-[#ebe7dd] to-[#f5f1e8] rounded-3xl p-6 shadow-lg cursor-pointer transition-all duration-200 ${
              currentExerciseIndex === index
                ? "ring-4 ring-[#AD85D1] transform scale-105 shadow-2xl"
                : "hover:shadow-xl hover:transform hover:scale-102"
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Exercise Icon/Image Placeholder */}
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="text-3xl">
                  {index === 0
                    ? "💪"
                    : index === 1
                    ? "🤸"
                    : index === 2
                    ? "🦵"
                    : index === 3
                    ? "🧘"
                    : "🏃"}
                </span>
              </div>

              {/* Exercise Info */}
              <div className="flex-1">
                <h3 className="font-bold text-lg text-black mb-1">
                  {exercise.name}
                </h3>
                <p className="text-sm text-gray-600 font-medium">
                  {formatTime(exercise.duration)}
                </p>
                {exercise.completed && (
                  <div className="flex items-center gap-1 mt-2">
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs text-green-600 font-medium">
                      Completed
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exercises;
