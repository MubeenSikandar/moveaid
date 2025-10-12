"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AddBasicDetails from "@/assets/AddBasicDetails.svg";
import GoalsAndPreferencesActive from "@/assets/GoalsAndPreferencesActive.svg";
import MovementAssessmentActive from "@/assets/MovementAssessmentActive.svg";
import AccessibilityAndComfort from "@/assets/AccessibilityAndComfort.svg";
import Logo from "@/assets/MoveAid.svg";

const Step3 = () => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [currentInstruction, setCurrentInstruction] = useState(
    "We'll guide you through a few simple moves"
  );
  const [assessmentStep, setAssessmentStep] = useState(0);
  const [showPostureGuide, setShowPostureGuide] = useState(true);

  const assessmentInstructions = [
    "We'll guide you through a few simple moves",
    "Stand tall and relaxed. Face forward, arms by your side. Hold still as we check your posture.",
    "Turn your head to the left slowly",
    "Turn your head to the right slowly",
    "Raise your right arm above your head",
    "Raise your left arm above your head",
    "Bend forward slowly at the waist",
    "Assessment complete! Great job!",
  ];

  useEffect(() => {
    if (cameraStarted && assessmentStep < assessmentInstructions.length) {
      setCurrentInstruction(assessmentInstructions[assessmentStep]);
    }
  }, [assessmentStep, cameraStarted]);

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      setMediaStream(null);
    };
  }, []);

  // Assign stream to video element once it's rendered
  useEffect(() => {
    if (mediaStream && videoRef.current) {
      videoRef.current.srcObject = mediaStream;

      const handleLoadedMetadata = () => {
        videoRef.current?.play().catch((err) => {
          console.error("Error playing video:", err);
        });
      };

      videoRef.current.onloadedmetadata = handleLoadedMetadata;

      // Cleanup
      return () => {
        if (videoRef.current) {
          videoRef.current.onloadedmetadata = null;
        }
      };
    }
  }, [mediaStream]);

  const stopCamera = () => {
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
  };

  const openModal = () => {
    setShowModal(true);
    // Start camera after modal opens
    setTimeout(() => {
      startCamera();
    }, 300);
  };

  const closeModal = () => {
    stopCamera();
    setShowModal(false);
    setCameraStarted(false);
    setAssessmentStep(0);
    setPermissionDenied(false);
    setMediaStream(null);
  };

  const startCamera = async () => {
    setIsLoading(true);
    setPermissionDenied(false);

    try {
      // Request camera access with constraints
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
      setMediaStream(stream); // Store stream in state
      setCameraStarted(true); // Flip this early to render the <video>
      setAssessmentStep(1);
      setPermissionDenied(false);
    } catch (error) {
      console.error("Error accessing camera:", error);
      setPermissionDenied(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (assessmentStep < assessmentInstructions.length - 1) {
      setAssessmentStep(assessmentStep + 1);
    } else {
      // Assessment complete
      stopCamera();
      setShowModal(false);
      router.push("/assessment/step4");
    }
  };

  const handleSkip = () => {
    closeModal();
    router.push("/assessment/step4");
  };

  const steps = [
    {
      icon: AddBasicDetails,
      title: "Add Basic Details",
      description:
        "Provide your basic information to get started with your personalized fitness journey.",
      active: false,
    },
    {
      icon: GoalsAndPreferencesActive,
      title: "Goals and Preferences",
      description:
        "Set your fitness objectives and preferences for a tailored workout experience.",
      active: false,
    },
    {
      icon: MovementAssessmentActive,
      title: "Movement Assessment",
      description:
        "To guide you safely, we'll begin with a quick movement check. This helps us adapt exercises to your comfort and abilities.",
      active: true,
    },
    {
      icon: AccessibilityAndComfort,
      title: "Accessibility and Comfort",
      description:
        "Your body, your pace. Adjust settings so sessions feel comfortable, motivating, and supportive.",
      active: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f3f0ee] flex">
      {/* Left Sidebar */}
      <div className="w-full lg:w-2/5 bg-gradient-to-b from-[#efe6d9] to-[#e8dfd1] p-8 lg:p-12">
        <div className="max-w-md">
          {/* Logo */}
          <div className="mb-12">
            <Image src={Logo} alt="MoveAid" width={150} height={40} />
          </div>

          {/* Header */}
          <p className="text-gray-600 text-sm mb-8">
            Get started by setting up your Move Aid profile
          </p>

          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => {
              // Find if there's any active step at or after the next step
              const shouldBeActive = steps
                .slice(index + 1)
                .some((s) => s.active);

              return (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <Image
                      src={step.icon}
                      alt={step.title}
                      width={36}
                      height={36}
                    />

                    {index < steps.length - 1 && (
                      <div
                        className={`w-0.5 h-16 my-2 ${
                          shouldBeActive ? "bg-[#AD85D1]" : "bg-gray-300"
                        }`}
                      ></div>
                    )}
                  </div>

                  <div className="flex-1 pb-8">
                    <h3
                      className={`font-semibold mb-1 ${
                        step.active ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dimension Indicator */}
          {cameraStarted && assessmentStep > 0 && (
            <div className="mt-12 p-6 bg-white rounded-xl shadow-md">
              <div className="flex items-center justify-center gap-3">
                <div className="text-[#AD85D1] font-bold text-3xl">48 × 48</div>
              </div>
              <p className="text-center text-sm text-gray-600 mt-2">
                Optimal viewing area
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Initial State - Permission Request */}
        <div className="h-full flex items-center justify-center p-8">
          <div className="max-w-2xl w-full text-center">
            <div className="bg-white rounded-3xl p-12 shadow-xl">
              <div className="mb-8">
                <div className="w-20 h-20 bg-[#AD85D1] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Movement Assessment
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  We&apos;ll guide you through a few simple movements to
                  understand your mobility and create a personalized workout
                  plan.
                </p>
              </div>

              {permissionDenied && (
                <div className="mb-6 p-5 bg-red-50 border-2 border-red-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <div>
                      <p className="text-red-700 font-semibold mb-1">
                        Camera Access Denied
                      </p>
                      <p className="text-red-600 text-sm">
                        Please enable camera permissions in your browser
                        settings to continue with the assessment, or skip this
                        step.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4 mb-8 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#AD85D1] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    Find a well-lit area with enough space to move freely
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#AD85D1] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    Position yourself so your full body is visible in the camera
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#AD85D1] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    Follow the on-screen instructions for each movement
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#AD85D1] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    You&apos;ll be asked to grant camera permission
                  </p>
                </div>
              </div>

              <button
                onClick={openModal}
                className="w-full bg-[#AD85D1] text-white py-4 px-8 rounded-xl font-semibold hover:bg-[#9c72c0] transition-all shadow-lg hover:shadow-xl mb-4"
              >
                Start Assessment
              </button>

              <button
                onClick={handleSkip}
                className="w-full text-gray-600 py-3 hover:text-gray-800 transition-all"
              >
                Skip for now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Assessment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="relative w-full max-w-7xl h-[90vh] bg-black rounded-3xl overflow-hidden shadow-2xl">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-lg group"
              >
                <svg
                  className="w-6 h-6 text-gray-800 group-hover:text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {!cameraStarted ? (
                // Loading State
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <div className="text-center">
                    <div className="w-20 h-20 border-4 border-[#AD85D1] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                    <p className="text-white text-xl font-medium">
                      {isLoading
                        ? "Initializing camera..."
                        : "Preparing assessment..."}
                    </p>
                    {permissionDenied && (
                      <div className="mt-6 p-4 bg-red-500/20 border-2 border-red-500 rounded-xl max-w-md mx-auto">
                        <p className="text-red-200 text-sm">
                          Camera access denied. Please enable permissions and
                          try again.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Camera Active State
                <div className="relative w-full h-full">
                  {/* Video Feed - Full Screen */}
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ transform: "scaleX(-1)" }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />

                  {/* Top Instructions */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-3xl px-4">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-8 py-5 shadow-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-4 h-4 bg-[#AD85D1] rounded-full animate-pulse flex-shrink-0" />
                        <p className="text-gray-800 font-semibold text-xl">
                          {currentInstruction}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Posture Guide Illustration */}
                  {showPostureGuide && assessmentStep === 1 && (
                    <div className="absolute top-32 right-8 z-20">
                      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl max-w-xs">
                        <div className="w-24 h-36 flex items-center justify-center mx-auto mb-3">
                          <svg
                            className="w-full h-full"
                            viewBox="0 0 100 150"
                            fill="none"
                            stroke="#AD85D1"
                            strokeWidth="3"
                            strokeLinecap="round"
                          >
                            <circle cx="50" cy="20" r="12" />
                            <line x1="50" y1="32" x2="50" y2="80" />
                            <line x1="50" y1="45" x2="30" y2="65" />
                            <line x1="50" y1="45" x2="70" y2="65" />
                            <line x1="50" y1="80" x2="35" y2="120" />
                            <line x1="50" y1="80" x2="65" y2="120" />
                            <line x1="35" y1="120" x2="30" y2="125" />
                            <line x1="65" y1="120" x2="70" y2="125" />
                          </svg>
                        </div>
                        <p className="text-center text-sm text-gray-700 font-medium">
                          Stand tall and relaxed
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Progress Indicator */}
                  <div className="absolute top-8 left-8 z-20">
                    <div className="bg-white/95 backdrop-blur-sm rounded-full px-6 py-3 shadow-xl">
                      <p className="text-sm font-bold text-gray-800">
                        Movement {assessmentStep} /{" "}
                        {assessmentInstructions.length - 2}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Controls */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-4">
                    <button
                      onClick={handleSkip}
                      className="bg-white/95 backdrop-blur-sm text-gray-800 py-4 px-10 rounded-xl font-semibold hover:bg-white transition-all shadow-xl hover:shadow-2xl border-2 border-white/50"
                    >
                      Skip Assessment
                    </button>

                    {assessmentStep > 0 &&
                      assessmentStep < assessmentInstructions.length - 1 && (
                        <button
                          onClick={handleNext}
                          className="bg-[#AD85D1] text-white py-4 px-10 rounded-xl font-semibold hover:bg-[#9c72c0] transition-all shadow-xl hover:shadow-2xl"
                        >
                          Next Movement →
                        </button>
                      )}

                    {assessmentStep === assessmentInstructions.length - 1 && (
                      <button
                        onClick={handleNext}
                        className="bg-[#AD85D1] text-white py-4 px-10 rounded-xl font-semibold hover:bg-[#9c72c0] transition-all shadow-xl hover:shadow-2xl"
                      >
                        ✓ Complete Assessment
                      </button>
                    )}
                  </div>

                  {/* Center Guide Circle */}
                  {assessmentStep > 0 &&
                    assessmentStep < assessmentInstructions.length - 1 && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-96 h-[28rem] rounded-full border-4 border-[#AD85D1] border-dashed opacity-40 animate-pulse" />
                      </div>
                    )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step3;
