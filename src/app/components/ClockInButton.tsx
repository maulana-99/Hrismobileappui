import { useState, useEffect, useRef } from "react";
import {
  Clock,
  MapPin,
  Check,
  LogIn,
  LogOut,
  Camera,
  X,
  RotateCcw,
} from "lucide-react";

type AttendanceStatus =
  | "not-clocked-in"
  | "clocked-in"
  | "clocked-out";

interface AttendanceData {
  clockInTime?: string;
  clockOutTime?: string;
  clockInPhoto?: string;
  clockOutPhoto?: string;
  location: string;
}

export function ClockInButton() {
  const [currentTime, setCurrentTime] = useState("");
  const [status, setStatus] =
    useState<AttendanceStatus>("not-clocked-in");
  const [attendanceData, setAttendanceData] =
    useState<AttendanceData>({
      location: "Jakarta Office",
    });
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<
    string | null
  >(null);
  const [cameraError, setCameraError] = useState(false);
  const [isSimulation, setIsSimulation] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Update current time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 1280, height: 720 },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      setCameraError(false);
      setIsSimulation(false);
    } catch (error) {
      // Handle camera permission errors gracefully
      setCameraError(true);
      setIsSimulation(true);
      // Generate simulation photo immediately
      generateSimulationPhoto();
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  // Generate simulation photo (fallback when camera not available)
  const generateSimulationPhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 640, 480);
      gradient.addColorStop(0, "#a3e635"); // lime-400
      gradient.addColorStop(1, "#34d399"); // emerald-400
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 640, 480);

      // Add text
      ctx.fillStyle = "#18181b";
      ctx.font = 'bold 32px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = "center";
      ctx.fillText("📸 Simulasi Foto", 320, 200);

      ctx.font = '20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText("Camera tidak tersedia", 320, 250);
      ctx.fillText(
        new Date().toLocaleString("id-ID"),
        320,
        290,
      );
    }

    setPhotoPreview(canvas.toDataURL("image/jpeg", 0.9));
  };

  // Take photo
  const takePhoto = () => {
    if (isSimulation) {
      // Already have simulation photo
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const photoData = canvas.toDataURL("image/jpeg", 0.9);
        setPhotoPreview(photoData);
        stopCamera();
      }
    }
  };

  // Retake photo
  const retakePhoto = () => {
    setPhotoPreview(null);
    if (!isSimulation) {
      startCamera();
    } else {
      generateSimulationPhoto();
    }
  };

  // Confirm photo and proceed with clock action
  const confirmPhoto = () => {
    if (!photoPreview) return;

    const now = new Date();
    const timeString = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setIsAnimating(true);

    // Simulate API call
    setTimeout(() => {
      if (status === "not-clocked-in") {
        setStatus("clocked-in");
        setAttendanceData((prev) => ({
          ...prev,
          clockInTime: timeString,
          clockInPhoto: photoPreview,
        }));
      } else if (status === "clocked-in") {
        setStatus("clocked-out");
        setAttendanceData((prev) => ({
          ...prev,
          clockOutTime: timeString,
          clockOutPhoto: photoPreview,
        }));
      }

      setShowSuccess(true);
      setShowCamera(false);
      setPhotoPreview(null);

      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);

      setIsAnimating(false);
    }, 1500);
  };

  // Close camera modal
  const closeCamera = () => {
    stopCamera();
    setShowCamera(false);
    setPhotoPreview(null);
    setCameraError(false);
    setIsSimulation(false);
  };

  // Open camera when button clicked
  const handleClockAction = () => {
    if (isAnimating || isDisabled) return;
    setShowCamera(true);
    startCamera();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const getStatusConfig = () => {
    switch (status) {
      case "not-clocked-in":
        return {
          text: "Belum Absen",
          action: "Tap untuk Clock In",
          gradient: "from-lime-400 to-emerald-400",
          icon: LogIn,
          iconBg: "bg-zinc-900/10",
          iconColor: "text-zinc-900",
        };
      case "clocked-in":
        return {
          text: "Sedang Bekerja",
          action: "Tap untuk Clock Out",
          gradient: "from-blue-400 to-cyan-400",
          icon: Clock,
          iconBg: "bg-zinc-900/10",
          iconColor: "text-zinc-900",
        };
      case "clocked-out":
        return {
          text: "Sudah Clock Out",
          action: "Selesai untuk hari ini",
          gradient: "from-zinc-400 to-zinc-500",
          icon: LogOut,
          iconBg: "bg-zinc-900/10",
          iconColor: "text-zinc-900",
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;
  const isDisabled = status === "clocked-out";

  return (
    <div className="relative">
      {/* Success Animation Overlay */}
      {showSuccess && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          {/* Multiple Ripple Rings */}
          <div className="animate-ping absolute w-32 h-32 rounded-full bg-lime-400 opacity-50"></div>
          <div className="animate-ping absolute w-24 h-24 rounded-full bg-lime-400 opacity-75 animation-delay-150"></div>
          <div className="animate-ping absolute w-16 h-16 rounded-full bg-lime-400 opacity-100 animation-delay-300"></div>

          {/* Success Check Icon */}
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-lime-400 to-emerald-400 flex items-center justify-center animate-success-pop shadow-2xl">
            <Check
              className="w-10 h-10 text-zinc-900"
              strokeWidth={3}
            />
          </div>
        </div>
      )}

      <button
        onClick={handleClockAction}
        disabled={isDisabled || isAnimating}
        className={`w-full bg-gradient-to-br ${config.gradient} rounded-3xl p-6 transition-all duration-300 group relative overflow-hidden ${isDisabled
          ? "opacity-75 cursor-not-allowed"
          : "hover:brightness-105 active:scale-[0.98] hover:shadow-2xl hover:shadow-lime-400/20"
          } ${isAnimating ? "animate-pulse-ring" : ""}`}
      >
        {/* Animated Background Pattern */}
        <div
          className="absolute inset-0 opacity-50 transition-transform duration-700 group-hover:scale-110 bg-repeat mix-blend-overlay"
          style={{
            backgroundImage: 'url(/master%202.png)',
            backgroundSize: '240px 240px',
          }}
        />

        {/* Ripple Effect on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 group-hover:w-96 group-hover:h-96 bg-zinc-50 rounded-full transition-all duration-700 ease-out"></div>
        </div>

        <div className="relative z-10">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-6">
            <div className="animate-slide-up">
              <div className="text-zinc-900/60 text-sm mb-1">
                Status Hari Ini
              </div>
              <div className="text-zinc-900 text-xl font-medium flex items-center gap-2">
                {config.text}
                {isAnimating && (
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-zinc-900 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-zinc-900 rounded-full animate-bounce animation-delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-zinc-900 rounded-full animate-bounce animation-delay-200"></div>
                  </div>
                )}
              </div>
            </div>
            <div
              className={`w-12 h-12 rounded-2xl ${config.iconBg} flex items-center justify-center transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 ${status === "clocked-in"
                ? "animate-pulse-ring"
                : ""
                }`}
            >
              <Icon
                className={`w-6 h-6 ${config.iconColor} ${isAnimating ? "animate-spin" : ""} transition-transform`}
              />
            </div>
          </div>

          {/* Time Display - Large */}
          <div className="mb-6">
            <div className="text-zinc-900 text-5xl font-bold tabular-nums tracking-tight transition-all duration-300 group-hover:scale-105">
              {currentTime}
            </div>
          </div>

          {/* Clock In/Out Times */}
          {(attendanceData.clockInTime ||
            attendanceData.clockOutTime) && (
              <div className="grid grid-cols-2 gap-3 mb-4 animate-slide-up">
                {attendanceData.clockInTime && (
                  <div className="bg-zinc-900/10 rounded-2xl p-3 backdrop-blur-sm transform transition-all hover:scale-105">
                    <div className="text-zinc-900/60 text-xs mb-1">
                      Clock In
                    </div>
                    <div className="text-zinc-900 font-medium tabular-nums">
                      {attendanceData.clockInTime}
                    </div>
                  </div>
                )}
                {attendanceData.clockOutTime && (
                  <div className="bg-zinc-900/10 rounded-2xl p-3 backdrop-blur-sm transform transition-all hover:scale-105">
                    <div className="text-zinc-900/60 text-xs mb-1">
                      Clock Out
                    </div>
                    <div className="text-zinc-900 font-medium tabular-nums">
                      {attendanceData.clockOutTime}
                    </div>
                  </div>
                )}
              </div>
            )}

          {/* Footer Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-zinc-900/60 text-sm group-hover:text-zinc-900 transition-colors">
              <MapPin className="w-4 h-4" />
              <span>{attendanceData.location}</span>
            </div>
            <div className="text-zinc-900/80 text-sm font-medium">
              {isAnimating ? (
                <span className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-zinc-900 rounded-full animate-ping"></div>
                  Memproses...
                </span>
              ) : (
                config.action
              )}
            </div>
          </div>
        </div>

        {/* Pulse Ring Animation when Clocked In */}
        {status === "clocked-in" && !isAnimating && (
          <div className="absolute top-4 right-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-900 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-zinc-900"></span>
            </span>
          </div>
        )}

        {/* Shimmer on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute -inset-full top-0 block h-full w-1/2 transform -skew-x-12 bg-lime-400 opacity-30  pointer-events-none" />
        </div>

        {/* Waving Effect when Loading */}
        {isAnimating && (
          <div className="absolute inset-0 opacity-100 transition-opacity duration-500">
            <div className="absolute -inset-full top-0 block h-full w-1/2 transform -skew-x-12 bg-lime-400 opacity-30 animate-[shimmer_1.5s_infinite] pointer-events-none" />
          </div>
        )}
      </button>

      {/* Working Duration (when clocked in) */}
      {status === "clocked-in" &&
        attendanceData.clockInTime && (
          <div className="mt-3 text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-50 dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                Anda sedang bekerja sejak{" "}
                {attendanceData.clockInTime}
              </span>
            </div>
          </div>
        )}

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-zinc-900/90 backdrop-blur-sm animate-fade-in p-4">
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-3xl overflow-hidden w-full max-w-lg shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-scale-up">
            {/* Header */}
            <div className="bg-gradient-to-r from-lime-400 to-emerald-400 p-5 flex items-center justify-between">
              <div>
                <h3 className="text-zinc-900 font-bold text-lg">
                  {status === "not-clocked-in"
                    ? "Foto Clock In"
                    : "Foto Clock Out"}
                </h3>
                <p className="text-zinc-900/60 text-sm mt-0.5">
                  {isSimulation
                    ? "Mode Simulasi (Camera tidak tersedia)"
                    : "Ambil foto untuk absensi"}
                </p>
              </div>
              <button
                onClick={closeCamera}
                className="w-10 h-10 rounded-xl bg-zinc-900/10 hover:bg-zinc-900/20 flex items-center justify-center transition-all active:scale-95"
              >
                <X className="w-5 h-5 text-zinc-900" />
              </button>
            </div>

            {/* Camera/Preview Area */}
            <div className="p-5">
              <div className="relative aspect-[4/3] bg-zinc-900 rounded-2xl overflow-hidden">
                {!photoPreview ? (
                  <>
                    {/* Camera Stream */}
                    {!isSimulation ? (
                      <>
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="w-full h-full object-cover"
                        />

                        {/* Camera Overlay */}
                        <div className="absolute inset-0 pointer-events-none">
                          {/* Face Guide */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-56 border-2 border-lime-400 rounded-full opacity-50"></div>

                          {/* Info */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-zinc-900/80 backdrop-blur px-4 py-2 rounded-full">
                            <p className="text-zinc-50 text-sm">
                              Posisikan wajah di dalam frame
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Simulation Preview */
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center p-8">
                          <Camera className="w-16 h-16 text-zinc-500 mx-auto mb-4 opacity-50" />
                          <p className="text-zinc-400 text-sm mb-2">
                            Camera tidak tersedia
                          </p>
                          <p className="text-zinc-500 text-xs">
                            Menggunakan mode simulasi
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  /* Photo Preview */
                  <>
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />

                    {/* Success Overlay */}
                    <div className="absolute top-4 left-4 bg-lime-400 px-3 py-1.5 rounded-full flex items-center gap-2">
                      <Check className="w-4 h-4 text-zinc-900" />
                      <span className="text-zinc-900 text-sm font-medium">
                        Foto berhasil
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Actions */}
              <div className="mt-5 flex gap-3">
                {!photoPreview ? (
                  <button
                    onClick={takePhoto}
                    disabled={isSimulation}
                    className={`flex-1 py-4 rounded-2xl font-medium transition-all flex items-center justify-center gap-2 ${isSimulation
                      ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                      : "bg-gradient-to-br from-lime-400 to-emerald-400 text-zinc-900 hover:brightness-110 active:scale-[0.98] shadow-lg hover:shadow-xl"
                      }`}
                  >
                    <Camera className="w-5 h-5" />
                    {isSimulation
                      ? "Mode Simulasi Aktif"
                      : "Ambil Foto"}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={retakePhoto}
                      className="flex-1 py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 rounded-2xl font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-5 h-5" />
                      Ulangi
                    </button>
                    <button
                      onClick={confirmPhoto}
                      disabled={isAnimating}
                      className="flex-1 py-4 bg-gradient-to-br from-lime-400 to-emerald-400 text-zinc-900 rounded-2xl font-medium hover:brightness-110 transition-all active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Check className="w-5 h-5" />
                      {isAnimating
                        ? "Memproses..."
                        : "Konfirmasi"}
                    </button>
                  </>
                )}
              </div>

              {/* Simulation Info */}
              {isSimulation && (
                <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-2xl">
                  <p className="text-amber-800 dark:text-amber-400 text-sm">
                    <span className="font-medium">
                      ℹ️ Mode Simulasi:
                    </span>{" "}
                    Camera tidak dapat diakses. Klik tombol
                    konfirmasi untuk melanjutkan dengan foto
                    simulasi.
                  </p>
                </div>
              )}

              {/* Auto-confirm for simulation */}
              {isSimulation && photoPreview && (
                <div className="mt-3 text-center">
                  <button
                    onClick={confirmPhoto}
                    disabled={isAnimating}
                    className="w-full py-4 bg-gradient-to-br from-lime-400 to-emerald-400 text-zinc-900 rounded-2xl font-medium hover:brightness-110 transition-all active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    {isAnimating
                      ? "Memproses..."
                      : "Lanjutkan dengan Foto Simulasi"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Hidden canvas for photo capture */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
    </div>
  );
}