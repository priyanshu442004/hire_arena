import  { useState, useEffect, useRef } from "react";
import { Phone } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faMicrophoneAltSlash,
  faVideo,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";
import hrAvatar from "../assets/AnanyaGupta.png";
import { useNavigate, useLocation } from "react-router-dom";

const HOST = import.meta.env.VITE_BACKEND;

const InnovatePitch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pitchDeckUrl = location.state?.pitchDeckUrl || null;
  const org_id = location.state?.org_id || null;

  // State
  const [isCameraOff, setIsCameraOff] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [endingCall, setEndingCall] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [permissionDenied, setPermissionDenied] = useState(false);
  if(elapsedTime){}

  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const recordedChunks = useRef<Blob[]>([]);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

  // AI Judges
 
  const elevenLabsScriptLoaded = useRef(false);

  // const judges = [
  //   { id: 1, name: "RAJEEV KHANNA", subtitle: "Visionary" },
  //   { id: 2, name: "ANANYA GUPTA", subtitle: "Analyst" },
  //   { id: 3, name: "PRIYA MEHTA", subtitle: "Empath" },
  //   { id: 4, name: "VIKRAM DESAI", subtitle: "Globalist" },
  //   { id: 5, name: "VINEET SHARMA", subtitle: "Strategist" },
  // ];

  // Timer
  useEffect(() => {
    const timer = setInterval(() => setElapsedTime(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // const formatTime = (seconds: number) => {
  //   const mins = Math.floor(seconds / 60);
  //   const secs = seconds % 60;
  //   return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  // };

  // Camera
  const startCamera = async () => {
    try {
      setPermissionDenied(false);
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }
    } catch (err) {
      setPermissionDenied(true);
    }
  };

  const stopCamera = () => {
    if (stream) stream.getTracks().forEach(t => t.stop());
    setStream(null);
  };

  const handleCameraToggle = () => {
    if (isCameraOff) startCamera();
    else stopCamera();
    setIsCameraOff(!isCameraOff);
  };

  // Mic
  const [micStream, setMicStream] = useState<MediaStream | null>(null);
  const handleMicToggle = async () => {
    if (isMuted) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicStream(stream);
      } catch (err) {
        console.error("Mic access denied", err);
      }
    } else {
      if (micStream) micStream.getTracks().forEach(t => t.stop());
      setMicStream(null);
    }
    setIsMuted(!isMuted);
  };

  // ElevenLabs AI widget
  const loadElevenLabsScript = () => {
    if (elevenLabsScriptLoaded.current) return;
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    script.async = true;
    script.onload = () => {
      elevenLabsScriptLoaded.current = true;
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    loadElevenLabsScript();
  }, []);

  // Recording
  const startRecording = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      const mic = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioCtx = new AudioContext();
      const dest = audioCtx.createMediaStreamDestination();
      if (screenStream.getAudioTracks().length) audioCtx.createMediaStreamSource(screenStream).connect(dest);
      if (mic.getAudioTracks().length) audioCtx.createMediaStreamSource(mic).connect(dest);

      const finalStream = new MediaStream([...screenStream.getVideoTracks(), ...dest.stream.getAudioTracks()]);
      const rec = new MediaRecorder(finalStream, { mimeType: "video/webm" });
      recordedChunks.current = [];
      rec.ondataavailable = e => e.data.size > 0 && recordedChunks.current.push(e.data);
      rec.start();
      setRecorder(rec);
    } catch (err) {
      console.error(err);
    }
  };

  const stopRecording = async (callback?: () => void) => {
    if (!recorder) return;
    recorder.onstop = async () => {
      const blob = new Blob(recordedChunks.current, { type: "video/webm" });
      const file = new File([blob], `pitch_session_${Date.now()}.webm`, { type: "video/webm" });
      const formData = new FormData();
      formData.append("video", file);
      const userId = localStorage.getItem("usr");
      if (userId) formData.append("user_id", userId);
      if (org_id) formData.append("org_id", org_id);
      try {
        await fetch(`${HOST}/session/create`, { method: "POST", body: formData });
        if (stream) stream.getTracks().forEach(t => t.stop());
        if (micStream) micStream.getTracks().forEach(t => t.stop());
        if (callback) callback();
      } catch (err) {
        console.error(err);
      }
    };
    recorder.stop();
  };

  useEffect(() => {
    startCamera();
    startRecording();
    return () => stopCamera();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-slate-100 text-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-slate-200 border-b border-slate-300">
        <h1 className="text-xl font-bold">HireArena - Interview Session</h1>
        <button className="text-sm text-gray-600 hover:underline" onClick={() => {}}>
          Exit Fullscreen
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 gap-4 p-6 overflow-hidden">
        {/* Resume Viewer */}
        <div className="flex-1 bg-white rounded-lg border border-slate-300 p-4 flex flex-col">
          <h2 className="text-2xl font-bold mb-4 text-center">Resume Viewer</h2>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-400 rounded-lg">
            {pitchDeckUrl ? (
              <iframe src={pitchDeckUrl} className="w-full h-full" style={{ border: "none" }} />
            ) : (
              <div className="text-center">
                <img src="/pdf-icon.png" alt="PDF" className="mx-auto mb-2 w-12 h-12" />
                <p className="font-medium">Candidate_Resume.pdf</p>
                <p className="text-sm text-gray-500 mt-1">Uploaded Document View</p>
              </div>
            )}
          </div>
        </div>

        {/* HR Panel */}
        <div className="w-[300px] bg-white rounded-lg border border-slate-300 flex flex-col p-4 gap-4">
          <div className="flex flex-col items-center">
            <img src={hrAvatar} alt="HR" className="w-20 h-20 rounded-full object-cover mb-2" />
            <h3 className="font-semibold text-lg">Sarah Jenkins</h3>
            <p className="text-sm text-gray-500">HR/Behavioural Interviewer</p>
          </div>

          {/* Camera */}
          <div className="flex-1 flex items-center justify-center bg-slate-100 rounded-lg border border-slate-300">
            {!isCameraOff && !permissionDenied ? (
              <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
            ) : (
              <div className="text-gray-400 font-medium">Camera Off</div>
            )}
          </div>
        </div>

        {/* AI Judges */}
        {/* <div className="w-[300px] bg-white rounded-lg border border-slate-300 flex flex-col p-2">
          <h3 className="text-center font-semibold mb-2">AI Judges</h3>
          <div className="flex-1 overflow-y-auto space-y-2">
            {judges.map(j => (
              <div key={j.id} className={`p-2 rounded-lg border ${activeJudge === j.id ? "border-blue-400 bg-blue-50" : "border-gray-200"}`}>
                <div className="font-semibold">{j.name}</div>
                <div className="text-sm text-gray-500">{j.subtitle}</div>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-between p-4 bg-slate-200 border-t border-slate-300">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1 bg-red-100 rounded-full border border-red-300">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-500 font-semibold">REC</span>
          </div>
          <span className="text-sm text-gray-600">Recording in progress</span>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={handleMicToggle} className={`p-2 rounded-full ${isMuted ? "bg-red-100 text-red-500" : "bg-slate-300"}`}>
            <FontAwesomeIcon icon={isMuted ? faMicrophoneAltSlash : faMicrophone} />
          </button>

          <button onClick={handleCameraToggle} className={`p-2 rounded-full ${isCameraOff ? "bg-red-100 text-red-500" : "bg-slate-300"}`}>
            <FontAwesomeIcon icon={isCameraOff ? faVideoSlash : faVideo} />
          </button>
        </div>

        <button
          onClick={() => {
            setEndingCall(true);
            stopRecording(() => {
              setEndingCall(false);
              navigate("/dashboard");
            });
          }}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
        >
          <Phone />
          {endingCall ? "Ending..." : "END CALL"}
        </button>
      </footer>
    </div>
  );
};

export default InnovatePitch;

