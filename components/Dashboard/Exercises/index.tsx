"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";

/* ─────────────────────────── types ─────────────────────────── */
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
  estimatePoses: (
    video: HTMLVideoElement,
    config?: { flipHorizontal: boolean },
  ) => Promise<Pose[]>;
  dispose: () => void;
}

type FormFeedback = "perfect" | "too-low" | "too-high" | "align-body" | null;

/* ─────────────── skeleton connections (MoveNet 17-kp) ───────── */
const SKELETON_CONNECTIONS: [number, number][] = [
  [5, 6],
  [5, 7],
  [7, 9],
  [6, 8],
  [8, 10],
  [5, 11],
  [6, 12],
  [11, 12],
  [11, 13],
  [13, 15],
  [12, 14],
  [14, 16],
];

/* ────────────────── angle helper ───────────── */
function jointAngle(a: Keypoint, b: Keypoint, c: Keypoint): number {
  const radians =
    Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let deg = Math.abs(radians * (180 / Math.PI));
  if (deg > 180) deg = 360 - deg;
  return deg;
}

function getKP(kps: Keypoint[], i: number): Keypoint | null {
  const k = kps[i];
  return k && (k.score ?? 0) > 0.25 ? k : null;
}

/* ─────────────── exercise-specific voice cues ──────────────── */
const EXERCISE_CUES: Record<string, string[]> = {
  "Push-Ups": [
    "Keep your body in a straight line",
    "Lower your chest to the ground",
    "Push back up to starting position",
    "Keep your core engaged",
  ],
  "Pull-Ups": [
    "Hang from the bar with arms fully extended",
    "Pull yourself up until your chin clears the bar",
    "Lower yourself with control",
    "Keep your core tight",
  ],
  Squats: [
    "Stand with feet shoulder-width apart",
    "Lower your hips back and down",
    "Keep your chest up",
    "Push through your heels to stand",
  ],
  Plank: [
    "Keep your body in a straight line",
    "Engage your core muscles",
    "Don't let your hips sag",
    "Breathe steadily",
  ],
  Lunges: [
    "Step forward with one leg",
    "Lower your hips until both knees are bent at 90 degrees",
    "Push back to starting position",
    "Alternate legs",
  ],
};

/* ══════════════════════════ COMPONENT ══════════════════════════ */
const Exercises = () => {
  /* ── refs ── */
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const detectorRef = useRef<PoseDetector | null>(null);
  const rafRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cueIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cueIndexRef = useRef(0);
  const repStateRef = useRef<"up" | "down">("up");
  const lastSpokenFeedbackRef = useRef<string>("");
  const voiceEnabledRef = useRef(true);
  const timeRemainingRef = useRef(0);
  const exerciseIndexRef = useRef(0);
  const handleNextExerciseRef = useRef<() => void>(() => {});
  const analyzeFormRef = useRef<(pose: Pose) => void>(() => {});

  /* ── state ── */
  const [cameraActive, setCameraActive] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [poseDetected, setPoseDetected] = useState(false);
  const [repCount, setRepCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading AI Model...");
  const [formFeedback, setFormFeedback] = useState<FormFeedback>(null);

  const exercises: Exercise[] = [
    { id: 1, name: "Push-Ups", duration: 120, completed: false },
    { id: 2, name: "Pull-Ups", duration: 150, completed: false },
    { id: 3, name: "Squats", duration: 180, completed: false },
    { id: 4, name: "Plank", duration: 90, completed: false },
    { id: 5, name: "Lunges", duration: 120, completed: false },
  ];

  const currentExercise = exercises[currentExerciseIndex];

  /* keep live refs in sync */
  useEffect(() => {
    voiceEnabledRef.current = voiceEnabled;
  }, [voiceEnabled]);
  useEffect(() => {
    timeRemainingRef.current = timeRemaining;
  }, [timeRemaining]);
  useEffect(() => {
    exerciseIndexRef.current = currentExerciseIndex;
  }, [currentExerciseIndex]);

  /* ════════════════════════ VOICE ════════════════════════════ */
  const speak = useCallback((text: string, interrupt = false) => {
    if (
      !voiceEnabledRef.current ||
      typeof window === "undefined" ||
      !window.speechSynthesis
    )
      return;
    if (interrupt) window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    utterance.lang = "en-US";
    const applyVoiceAndSpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find((v) =>
        /samantha|karen|moira|daniel|google us english|google uk english/i.test(
          v.name,
        ),
      );
      if (preferred) utterance.voice = preferred;
      window.speechSynthesis.speak(utterance);
    };
    if (window.speechSynthesis.getVoices().length > 0) {
      applyVoiceAndSpeak();
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        applyVoiceAndSpeak();
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);

  /* ════════════════════════ TIMER ════════════════════════════ */
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(
    (duration: number) => {
      stopTimer();
      setTimeRemaining(duration);
      timeRemainingRef.current = duration;
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          const next = prev - 1;
          timeRemainingRef.current = next;
          if (next <= 0) {
            stopTimer();
            handleNextExerciseRef.current();
            return 0;
          }
          return next;
        });
      }, 1000);
    },
    [stopTimer],
  );

  /* ════════════════════════ CUES ════════════════════════════ */
  const stopCues = useCallback(() => {
    if (cueIntervalRef.current) {
      clearInterval(cueIntervalRef.current);
      cueIntervalRef.current = null;
    }
  }, []);

  const startCues = useCallback(
    (exerciseName: string) => {
      stopCues();
      const cues = EXERCISE_CUES[exerciseName] ?? ["Follow the exercise form"];
      cueIndexRef.current = 0;
      speak(cues[0], true);
      cueIntervalRef.current = setInterval(() => {
        cueIndexRef.current = (cueIndexRef.current + 1) % cues.length;
        speak(cues[cueIndexRef.current]);
      }, 18000);
    },
    [speak, stopCues],
  );

  /* ═══════════════════════ CAMERA ════════════════════════════ */
  const stopCamera = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    stopTimer();
    stopCues();
    if (typeof window !== "undefined" && window.speechSynthesis)
      window.speechSynthesis.cancel();
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) {
      videoRef.current.srcObject = null;
      videoRef.current.load();
    }
    setCameraActive(false);
    setPoseDetected(false);
    setFormFeedback(null);
  }, [stopTimer, stopCues]);

  useEffect(() => {
    return () => {
      stopCamera();
      detectorRef.current?.dispose();
    };
  }, [stopCamera]);

  const startCamera = async () => {
    try {
      setIsLoading(true);
      setLoadingMessage("Requesting camera access…");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      streamRef.current = stream;

      // videoRef is always mounted — no need to wait for a re-render
      const video = videoRef.current;
      if (!video) throw new Error("videoRef not mounted");

      setCameraActive(true);
      setPermissionDenied(false);

      video.srcObject = stream;

      await new Promise<void>((resolve, reject) => {
        video.onloadeddata = () => resolve();
        video.onerror = () => reject(new Error("Video load error"));
        if (video.readyState >= 2) resolve();
      });

      await video.play();

      await initPoseDetection(currentExercise.name, currentExercise.duration);
    } catch (err) {
      console.error("Camera error:", err);
      // Only treat it as a permission denial if it's actually a NotAllowed error
      if (
        err instanceof DOMException &&
        (err.name === "NotAllowedError" || err.name === "PermissionDeniedError")
      ) {
        setPermissionDenied(true);
        setCameraActive(false);
      }
      setIsLoading(false);
    }
  };

  /* ════════════════════ POSE DETECTION ══════════════════════ */
  const loadScript = (src: string): Promise<void> =>
    new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const s = document.createElement("script");
      s.src = src;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(s);
    });

  const initPoseDetection = async (exerciseName: string, duration: number) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;

      if (!w.tf) {
        setLoadingMessage("Loading TensorFlow.js…");
        await loadScript(
          "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.11.0/dist/tf.min.js",
        );
      }
      if (!w.poseDetection) {
        setLoadingMessage("Loading pose-detection library…");
        await loadScript(
          "https://cdn.jsdelivr.net/npm/@tensorflow-models/pose-detection@2.1.3/dist/pose-detection.min.js",
        );
      }

      setLoadingMessage("Warming up MoveNet model…");
      await w.tf.ready();

      const detector: PoseDetector = await w.poseDetection.createDetector(
        w.poseDetection.SupportedModels.MoveNet,
        {
          modelType: w.poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
          enableSmoothing: true,
          minPoseScore: 0.2,
        },
      );
      detectorRef.current = detector;
      setIsLoading(false);

      speak(`Starting ${exerciseName}. Get ready!`, true);
      setTimeout(() => startCues(exerciseName), 1500);
      startTimer(duration);
      runDetectionLoop();
    } catch (err) {
      console.error("Pose detection init error:", err);
      setLoadingMessage("Error loading model. Please refresh.");
      setIsLoading(false);
    }
  };

  /* ──────── RAF detection loop ──────── */
  const runDetectionLoop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);

    const loop = async () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const detector = detectorRef.current;

      if (
        video &&
        canvas &&
        detector &&
        !video.paused &&
        video.readyState >= 2
      ) {
        try {
          const poses = await detector.estimatePoses(video, {
            flipHorizontal: false,
          });
          if (poses.length > 0) {
            setPoseDetected(true);
            drawPose(poses[0]);
            analyzeFormRef.current(poses[0]);
          } else {
            setPoseDetected(false);
            setFormFeedback(null);
            const ctx = canvas.getContext("2d");
            if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
        } catch {
          /* swallow per-frame errors */
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
  }, []); // eslint-disable-line

  /* ──────── draw skeleton ──────── */
  const drawPose = (pose: Pose) => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Match canvas pixel dimensions to the live video stream
    const vw = video.videoWidth;
    const vh = video.videoHeight;
    if (!vw || !vh) return;

    if (canvas.width !== vw || canvas.height !== vh) {
      canvas.width = vw;
      canvas.height = vh;
    }

    ctx.clearRect(0, 0, vw, vh);

    // bones
    ctx.strokeStyle = "#AD85D1";
    ctx.lineWidth = 3;
    ctx.shadowColor = "#AD85D1";
    ctx.shadowBlur = 6;
    SKELETON_CONNECTIONS.forEach(([i, j]) => {
      const a = getKP(pose.keypoints, i);
      const b = getKP(pose.keypoints, j);
      if (!a || !b) return;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    });

    // joints
    ctx.shadowBlur = 10;
    pose.keypoints.forEach((kp) => {
      if ((kp.score ?? 0) < 0.25) return;
      ctx.beginPath();
      ctx.arc(kp.x, kp.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#AD85D1";
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();
    });
    ctx.shadowBlur = 0;
  };

  /* ──────── form analysis (angle-based per exercise) ──────── */
  useEffect(() => {
    analyzeFormRef.current = (pose: Pose) => {
      const kps = pose.keypoints;
      const exName = exercises[exerciseIndexRef.current].name;
      let newFeedback: FormFeedback = null;

      if (exName === "Squats") {
        const lh = getKP(kps, 11),
          lk = getKP(kps, 13),
          la = getKP(kps, 15);
        const rh = getKP(kps, 12),
          rk = getKP(kps, 14),
          ra = getKP(kps, 16);
        if (lh && lk && la && rh && rk && ra) {
          const avg = (jointAngle(lh, lk, la) + jointAngle(rh, rk, ra)) / 2;
          if (avg < 80) newFeedback = "too-low";
          else if (avg > 160) newFeedback = "too-high";
          else newFeedback = "perfect";
          if (avg < 110 && repStateRef.current === "up")
            repStateRef.current = "down";
          else if (avg > 150 && repStateRef.current === "down") {
            repStateRef.current = "up";
            setRepCount((p) => {
              speak(String(p + 1));
              return p + 1;
            });
          }
        }
      } else if (exName === "Push-Ups") {
        const ls = getKP(kps, 5),
          le = getKP(kps, 7),
          lw = getKP(kps, 9);
        const rs = getKP(kps, 6),
          re = getKP(kps, 8),
          rw = getKP(kps, 10);
        const lh = getKP(kps, 11),
          rh = getKP(kps, 12);
        if (ls && le && lw && rs && re && rw && lh && rh) {
          const avgElbow =
            (jointAngle(ls, le, lw) + jointAngle(rs, re, rw)) / 2;
          const hipY = (lh.y + rh.y) / 2;
          const shoulderY = (ls.y + rs.y) / 2;
          if (Math.abs(hipY - shoulderY) > 80) newFeedback = "align-body";
          else if (avgElbow < 75) newFeedback = "too-low";
          else newFeedback = "perfect";
          if (avgElbow < 90 && repStateRef.current === "up")
            repStateRef.current = "down";
          else if (avgElbow > 150 && repStateRef.current === "down") {
            repStateRef.current = "up";
            setRepCount((p) => {
              speak(String(p + 1));
              return p + 1;
            });
          }
        }
      } else if (exName === "Lunges") {
        const lh = getKP(kps, 11),
          lk = getKP(kps, 13),
          la = getKP(kps, 15);
        if (lh && lk && la) {
          const ang = jointAngle(lh, lk, la);
          if (ang < 75) newFeedback = "too-low";
          else if (ang > 160) newFeedback = "too-high";
          else newFeedback = "perfect";
          if (ang < 100 && repStateRef.current === "up")
            repStateRef.current = "down";
          else if (ang > 150 && repStateRef.current === "down") {
            repStateRef.current = "up";
            setRepCount((p) => {
              speak(String(p + 1));
              return p + 1;
            });
          }
        }
      } else if (exName === "Pull-Ups") {
        const ls = getKP(kps, 5),
          le = getKP(kps, 7),
          lw = getKP(kps, 9);
        const rs = getKP(kps, 6),
          re = getKP(kps, 8),
          rw = getKP(kps, 10);
        if (ls && le && lw && rs && re && rw) {
          const avg = (jointAngle(ls, le, lw) + jointAngle(rs, re, rw)) / 2;
          newFeedback = avg < 60 ? "too-low" : "perfect";
          if (avg < 70 && repStateRef.current === "up")
            repStateRef.current = "down";
          else if (avg > 150 && repStateRef.current === "down") {
            repStateRef.current = "up";
            setRepCount((p) => {
              speak(String(p + 1));
              return p + 1;
            });
          }
        }
      } else {
        // Plank
        const ls = getKP(kps, 5),
          rs = getKP(kps, 6);
        const lh = getKP(kps, 11),
          rh = getKP(kps, 12);
        const la = getKP(kps, 15),
          ra = getKP(kps, 16);
        if (ls && rs && lh && rh && la && ra) {
          const sy = (ls.y + rs.y) / 2;
          const hy = (lh.y + rh.y) / 2;
          const ay = (la.y + ra.y) / 2;
          newFeedback =
            Math.abs(hy - (sy + ay) / 2) > 60 ? "align-body" : "perfect";
        }
      }

      setFormFeedback((prev) => {
        if (newFeedback && newFeedback !== "perfect" && newFeedback !== prev) {
          const cue = getFeedbackVoiceCue(newFeedback);
          if (cue && cue !== lastSpokenFeedbackRef.current) {
            speak(cue, true);
            lastSpokenFeedbackRef.current = cue;
          }
        }
        return newFeedback;
      });
    };
  }); // intentionally runs every render

  const getFeedbackVoiceCue = (fb: FormFeedback): string =>
    (
      ({
        "too-low": "Come up a little",
        "too-high": "Go deeper",
        "align-body": "Keep your body straight",
        perfect: "",
      }) as Record<string, string>
    )[fb ?? ""] ?? "";

  /* ════════════════════ EXERCISE FLOW ════════════════════════ */
  const handleNextExercise = useCallback(() => {
    stopCues();
    const idx = exerciseIndexRef.current;
    const next = idx + 1;
    if (next < exercises.length) {
      speak(`Exercise complete! Moving to ${exercises[next].name}`, true);
      setCurrentExerciseIndex(next);
      setRepCount(0);
      repStateRef.current = "up";
      setFormFeedback(null);
      lastSpokenFeedbackRef.current = "";
      startTimer(exercises[next].duration);
      setTimeout(() => startCues(exercises[next].name), 1500);
    } else {
      speak("Workout session complete! Great job!", true);
      stopCamera();
      setCurrentExerciseIndex(0);
      setRepCount(0);
      repStateRef.current = "up";
      setFormFeedback(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speak, stopCues, startCues, startTimer, stopCamera]);

  useEffect(() => {
    handleNextExerciseRef.current = handleNextExercise;
  }, [handleNextExercise]);

  const handleStartSession = () => {
    if (!cameraActive) startCamera();
  };

  const handlePauseResume = () => {
    if (!isPaused) {
      setIsPaused(true);
      stopTimer();
      stopCues();
      cancelAnimationFrame(rafRef.current);
      window.speechSynthesis?.cancel();
      speak("Paused", true);
    } else {
      setIsPaused(false);
      speak("Resuming", true);
      setTimeout(() => {
        startTimer(timeRemainingRef.current);
        startCues(exercises[exerciseIndexRef.current].name);
        runDetectionLoop();
      }, 600);
    }
  };

  const handleRestart = () => {
    setRepCount(0);
    repStateRef.current = "up";
    setFormFeedback(null);
    lastSpokenFeedbackRef.current = "";
    setIsPaused(false);
    startTimer(currentExercise.duration);
  };

  const handleSkip = () => handleNextExercise();

  const handleExerciseSelect = (index: number) => {
    stopCues();
    cancelAnimationFrame(rafRef.current);
    stopTimer();
    setCurrentExerciseIndex(index);
    exerciseIndexRef.current = index;
    setRepCount(0);
    repStateRef.current = "up";
    setFormFeedback(null);
    lastSpokenFeedbackRef.current = "";
    setIsPaused(false);
    if (cameraActive) {
      speak(`Switching to ${exercises[index].name}`, true);
      startTimer(exercises[index].duration);
      setTimeout(() => startCues(exercises[index].name), 1000);
      runDetectionLoop();
    }
  };

  /* ════════════════════ UI HELPERS ═══════════════════════════ */
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
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

  /* ══════════════════════════ JSX ════════════════════════════ */
  return (
    <div className="flex gap-4 w-full h-screen p-4 mt-5 bg-[#ebe7dd] rounded-3xl">
      {/* Main Exercise Area - Left Side */}
      <div className="flex-1 h-full bg-gradient-to-br from-[#ebe7dd] to-[#f5f1e8] rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
        {/*
          Video + canvas are ALWAYS in the DOM so videoRef/canvasRef are valid
          the instant getUserMedia resolves, before any setState re-render.
          Visibility controlled via CSS — hidden until cameraActive is true.
        */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover rounded-3xl"
          style={{
            transform: "scaleX(-1)",
            zIndex: 0,
            display: cameraActive ? "block" : "none",
          }}
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl"
          style={{
            transform: "scaleX(-1)",
            zIndex: 1,
            display: cameraActive ? "block" : "none",
          }}
        />

        {/* ── Initial State overlay — shown when camera is not yet active ── */}
        {!cameraActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-40 bg-gradient-to-br from-[#ebe7dd] to-[#f5f1e8] rounded-3xl">
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
        )}

        {/* ── Camera Active State — always rendered so refs exist ── */}
        {cameraActive && (
          /* ── Camera Active State ── */
          <div className="relative w-full h-full flex flex-col">
            <h2 className="text-3xl font-bold text-black mb-4 text-center">
              {currentExercise.name}
            </h2>

            {/* Video + Pose overlay */}
            <div className="flex-1 relative rounded-3xl overflow-hidden mb-6 shadow-2xl">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/70">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#AD85D1] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-white text-lg font-medium">
                      {loadingMessage}
                    </p>
                  </div>
                </div>
              )}

              {/* video + canvas are hoisted outside this block — refs always exist */}

              {/* Rep Counter */}
              <div
                className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-xl"
                style={{ zIndex: 20 }}
              >
                <p className="text-sm text-gray-600 mb-1 font-medium">Reps</p>
                <p className="text-3xl font-bold text-[#AD85D1]">{repCount}</p>
              </div>

              {/* Form Feedback */}
              <div
                className={`absolute top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${getFeedbackColor()} text-white rounded-2xl px-8 py-4 shadow-xl transition-all duration-300`}
                style={{ zIndex: 20 }}
              >
                <p className="text-2xl font-bold">{getFeedbackText()}</p>
              </div>

              {/* Top-right: tracking status + voice toggle */}
              <div
                className="absolute top-6 right-6 flex flex-col items-end gap-2"
                style={{ zIndex: 20 }}
              >
                <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-xl">
                  <div
                    className={`w-3 h-3 rounded-full ${poseDetected ? "bg-green-500" : "bg-red-500"} animate-pulse`}
                  />
                  <p className="text-sm font-medium text-gray-700">
                    {poseDetected ? "Tracking" : "Not Detected"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    const next = !voiceEnabled;
                    setVoiceEnabled(next);
                    voiceEnabledRef.current = next;
                    if (next) {
                      speak("Voice guidance enabled", true);
                    } else {
                      window.speechSynthesis?.cancel();
                    }
                  }}
                  className={`flex items-center gap-2 backdrop-blur-sm rounded-full px-4 py-2 shadow-xl transition-all ${
                    voiceEnabled
                      ? "bg-[#AD85D1] text-white"
                      : "bg-white/95 text-gray-700"
                  }`}
                >
                  <span className="text-lg">{voiceEnabled ? "🔊" : "🔇"}</span>
                  <p className="text-sm font-medium">
                    {voiceEnabled ? "Voice On" : "Voice Off"}
                  </p>
                </button>
              </div>

              {/* Timer */}
              <div
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-xl"
                style={{ zIndex: 20 }}
              >
                <p className="text-3xl font-bold text-[#AD85D1]">
                  {formatTime(timeRemaining)}
                </p>
              </div>

              {/* Pause overlay */}
              {isPaused && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/50"
                  style={{ zIndex: 30 }}
                >
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
                ? "ring-4 ring-[#949392] transform scale-105 shadow-2xl"
                : "hover:shadow-xl hover:transform hover:scale-102"
            }`}
          >
            <div className="flex items-center gap-4">
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
