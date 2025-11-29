import React, { useState, useEffect, useRef } from 'react';
import {  Phone } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faMicrophoneAltSlash, faVideo, faVideoSlash } from '@fortawesome/free-solid-svg-icons'
import logo from "../assets/logo.jpeg"
import ochestrator from "../assets/Orchestrator.png"
import  Ananya from "../assets/AnanyaGupta.png";
import  Priya from "../assets/PriyaMehta.png";
import  Rajeev from "../assets/RajeevKhanna.png";
import  Vikram from "../assets/VikramDesai.png";
import  vineet from "../assets/VineetSharma.png";
import { useLocation, useNavigate } from "react-router-dom";

const HOST = import.meta.env.VITE_BACKEND;


interface Judge {
  id: number | string;
  name: string;
  subtitle: string;
  avatarUrl?: string;
}

interface InnovatePitchProps {
  judges?: Judge[];
  cameraImageUrl?: string;
}

const InnovatePitch: React.FC<InnovatePitchProps> = ({
  judges = [
    { id: 1, name: 'RAJEEV KHANNA', subtitle: 'Visionary', avatarUrl: Rajeev },
    { id: 2, name: 'ANANYA GUPTA', subtitle: 'Analyst', avatarUrl: Ananya },
    { id: 5, name: 'VINEET SHARMA', subtitle: 'Strategist', avatarUrl: vineet },
    { id: 3, name: 'PRIYA MEHTA', subtitle: 'Empath', avatarUrl: Priya },
    { id: 4, name: 'VIKRAM DESAI', subtitle: 'Globalist', avatarUrl: Vikram },
  ]
}) => {
const navigate =useNavigate()
  const location = useLocation();
const pitchDeckUrl = location.state?.pitchDeckUrl || null;
const org_id = location.state?.org_id || null;
const fileType = pitchDeckUrl ? pitchDeckUrl.split(".").pop().toLowerCase() : null;
const isPDF = fileType === "pdf";
const isDOCX = fileType === "docx" || fileType === "doc";
const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
const recordedChunks = useRef<Blob[]>([]);
const [endingCall, setEndingCall] = useState(false);



  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const videoRef = React.useRef<HTMLVideoElement>(null);
const [stream, setStream] = useState<MediaStream | null>(null);
const [userImage, setUserImage] = useState<string | null>(null);
const [firstName, setFirstName] = useState<string>("");
const [permissionDenied, setPermissionDenied] = useState(false);


const [micStream, setMicStream] = useState<MediaStream | null>(null);
const [micPermissionDenied, setMicPermissionDenied] = useState(false);
const audioContextRef = useRef<AudioContext | null>(null);
const analyserRef = useRef<AnalyserNode | null>(null);
const volumeRef = useRef<number>(0);

// recording sceen
const startRecording = async () => {
  try {
    // 1. Capture screen with system/tab audio
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true
    });

    // 2. Capture microphone
    const micStream = await navigator.mediaDevices.getUserMedia({
      audio: true
    });

    // 3. Create AudioContext
    const audioCtx = new AudioContext();
    const destination = audioCtx.createMediaStreamDestination(); // final output track

    // SCREEN AUDIO
    if (screenStream.getAudioTracks().length > 0) {
      const screenSource = audioCtx.createMediaStreamSource(screenStream);
      screenSource.connect(destination);
    }

    // MIC AUDIO
    if (micStream.getAudioTracks().length > 0) {
      const micSource = audioCtx.createMediaStreamSource(micStream);
      micSource.connect(destination);
    }

    // 4. Combine:
    // - Screen video
    // - Mixed audio output (1 audio track)
    const finalStream = new MediaStream([
      ...screenStream.getVideoTracks(),
      ...destination.stream.getAudioTracks()
    ]);

    const rec = new MediaRecorder(finalStream, {
      mimeType: "video/webm"   // Let browser choose codec
    });

    recordedChunks.current = [];

    rec.ondataavailable = (e) => {
      if (e.data.size > 0) {
        recordedChunks.current.push(e.data);
      }
    };

    rec.start();
    setRecorder(rec);

  } catch (err) {
    console.error("Recording start error:", err);
  }
};





const stopRecording = async (callback?: () => void) => {
  if (!recorder) return;

  recorder.onstop = async () => {
    try {
     
      if (!recordedChunks.current.length) {
        console.error(" No recorded chunks found");
        return;
      }

     
      const blob = new Blob(recordedChunks.current, {
        type: "video/webm"
      });

     
      const file = new File(
        [blob],
        `pitch_session_${Date.now()}.webm`,
        { type: "video/webm" }
      );

      
      const formData = new FormData();

      formData.append("video", file);

      const userId = localStorage.getItem("usr");
      if (userId) formData.append("user_id", userId);

      if (org_id) formData.append("org_id", org_id);
      console.log("Sending to backend:", {
  org_id,
  user_id: localStorage.getItem("usr"),
  videoSize: blob.size
});

      
      const res = await fetch(`${HOST}/session/create`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("UPLOAD SUCCESS:", data);

      
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
      if (micStream) {
        micStream.getTracks().forEach(t => t.stop());
      }

      
      if (callback) callback();

    } catch (error) {
      console.error("UPLOAD ERROR:", error);
    }
  };

  
  recorder.stop();
};





useEffect(() => {
  startRecording();
}, []);


// judge
const [activeJudge, setActiveJudge] = useState<number | null>(null);
const [isAIJudgeSpeaking, setIsAIJudgeSpeaking] = useState(false);
if(isAIJudgeSpeaking){}

const elevenLabsWidgetRef = useRef<HTMLElement | null>(null);
const elevenLabsScriptLoaded = useRef(false);


// script loader:
const loadElevenLabsScript = () => {
  const existingScript = document.querySelector('script[src*="elevenlabs"]');
  if (existingScript || elevenLabsScriptLoaded.current) {
    elevenLabsScriptLoaded.current = true;
    setTimeout(triggerElevenLabsConversation, 2000);
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
  script.async = true;
  script.type = 'text/javascript';

  script.onload = () => {
    elevenLabsScriptLoaded.current = true;
    setTimeout(triggerElevenLabsConversation, 2000);
  };

  document.body.appendChild(script);
};

const triggerElevenLabsConversation = () => {
  const widget = document.querySelector('elevenlabs-convai');
  if (!widget) {
    setTimeout(triggerElevenLabsConversation, 500);
    return;
  }

 
  setTimeout(() => {
    try {
      const root = widget.shadowRoot;
      if (!root) return;

      const buttons = root.querySelectorAll('button');
      if (buttons.length > 0) {
        (buttons[0] as HTMLElement).click();
        setActiveJudge(1);           
        setIsAIJudgeSpeaking(true);
        return;
      }
    } catch (e) {
      console.log("Shadow DOM access error", e);
    }

    
    widget.dispatchEvent(new Event('click', { bubbles: true }));
  }, 500);
};

useEffect(() => {
  loadElevenLabsScript();
}, []);

useEffect(() => {
  const interval = setInterval(() => {
    const widget = document.querySelector('elevenlabs-convai');
    if (!widget) return;

    const audios = widget.shadowRoot?.querySelectorAll('audio') || [];
    let isPlaying = false;

    audios.forEach((a: any) => {
      if (!a.paused && a.currentTime > 0) {
        isPlaying = true;
      }
    });

    if (isPlaying) {
      setActiveJudge(1);     
      setIsAIJudgeSpeaking(true);
    } else {
      setIsAIJudgeSpeaking(false);
      setActiveJudge(null);
    }
  }, 300);

  return () => clearInterval(interval);
}, []);




if(micPermissionDenied){

}

// camera

useEffect(() => {
  const userId = localStorage.getItem("usr");
  if (!userId) return;

  const fetchUser = async () => {
    try {
      const res = await fetch(`${HOST}/user/${userId}`);
      const data = await res.json();

      setUserImage(data.profile_image_url || null);
      setFirstName(data.first_name || "");
    } catch (err) {
      console.error("User fetch error:", err);
    }
  };

  fetchUser();
}, []);



const startCamera = async () => {
  try {
    setPermissionDenied(false);

    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false, 
    });

    setStream(mediaStream);

    if (videoRef.current) {
      videoRef.current.srcObject = mediaStream;
      await videoRef.current.play();
    }
  } catch (error) {
    console.error("Camera error:", error);
    setPermissionDenied(true); 
  }
};



const stopCamera = () => {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
  setStream(null);
};


const CameraPlaceholder = () => {
  return (
    <div
     id="video-call-root"
    className="flex items-center justify-center w-full h-full bg-slate-800/80">
      {/* Circle Wrapper */}
      <div className="w-28 h-28 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center border border-slate-600 shadow-xl">
        {userImage ? (
          <img
            src={userImage}
            alt="User"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-white text-4xl font-semibold">
            {firstName ? firstName.charAt(0).toUpperCase() : "U"}
          </span>
        )}
      </div>
    </div>
  );
};



useEffect(() => {
  startCamera();
  return () => stopCamera();
}, []);

const handleCameraToggle = () => {
  if (isCameraOff) {
    startCamera();
  } else {
    stopCamera();
  }

  setIsCameraOff(!isCameraOff);
};


// microphone
const startMic = async () => {
  try {
    setMicPermissionDenied(false);

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    setMicStream(stream);

    /** Audio analysis for Google-Meet style mic animation */
    audioContextRef.current = new AudioContext();
    const source = audioContextRef.current.createMediaStreamSource(stream);
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 256;

    source.connect(analyserRef.current);

    // Start volume reading loop
    readVolume();
  } catch (err) {
    console.error("Mic error:", err);
    setMicPermissionDenied(true);
  }
};

const stopMic = () => {
  if (micStream) {
    micStream.getTracks().forEach((t) => t.stop());
  }
  setMicStream(null);

  if (audioContextRef.current) {
    audioContextRef.current.close();
  }
};


const readVolume = () => {
  if (!analyserRef.current) return;

  const data = new Uint8Array(analyserRef.current.frequencyBinCount);

  const loop = () => {
    analyserRef.current!.getByteFrequencyData(data);
    const avg = data.reduce((a, b) => a + b, 0) / data.length;
    volumeRef.current = avg;

    requestAnimationFrame(loop);
  };

  loop();
};


const handleMicToggle = () => {
  if (isMuted) {
    
    startMic();
    
  } else {
   
    stopMic();
    
  }

  setIsMuted(!isMuted);
};




// other
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };


  // full screen
  const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(true);

const enterFullscreen = () => {
  const elem = document.getElementById("video-call-root") || document.documentElement;

  if (elem.requestFullscreen) elem.requestFullscreen();
  else if ((elem as any).webkitRequestFullscreen) (elem as any).webkitRequestFullscreen();
  else if ((elem as any).mozRequestFullScreen) (elem as any).mozRequestFullScreen();
  else if ((elem as any).msRequestFullscreen) (elem as any).msRequestFullscreen();

  setShowFullscreenPrompt(false);
};


const declineFullscreen = () => {
  setShowFullscreenPrompt(false);
};

useEffect(() => {
  setShowFullscreenPrompt(true);
}, []);

const exitFullscreen = () => {
  const doc: any = document;

  if (doc.fullscreenElement) {
    if (doc.exitFullscreen) doc.exitFullscreen();
    else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
    else if (doc.mozCancelFullScreen) doc.mozCancelFullScreen();
    else if (doc.msExitFullscreen) doc.msExitFullscreen();
  }
};


useEffect(() => {
  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      exitFullscreen();
    }
  };

  window.addEventListener("keydown", handleKey);

  return () => window.removeEventListener("keydown", handleKey);
}, []);




  return (
    <div
     id="video-call-root"
    className="flex flex-col h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-1 bg-slate-800/80 backdrop-blur-sm border-b border-slate-700/50">
  {/* Left Header Content */}
  <div className="flex items-center gap-3">
    <img src={logo} alt="" className='w-9'/>
    <h1 className="text-xl font-bold tracking-wide text-gray-100">INNOVATE PITCH</h1>
  </div>

  {/* Center Text: IP Session */}
  <div className="flex-1 text-center text-xl font-semibold text-slate-300">
    IP Session
  </div>

  {/* Right Header Content: Time and Timestamp */}
  <div className="flex items-center gap-3">
    <div className="text-sm text-slate-400">
      Time Stamp
    </div>
    <div className="text-2xl font-mono font-semibold text-gray-100">
      {formatTime(elapsedTime)}
    </div>
  </div>
</header>


      {/* Main Content Area */}
      <div className="flex-1 flex gap-4 p-4 overflow-hidden">
        {/* Left & Center Column */}
        <div className="flex-1 flex flex-col gap-4  ">
  {/* Top Row: Camera & Orchestrator */}
  <div className="flex gap-4 flex-grow-0">
    {/* Camera View */}
    <div className="flex-1 bg-slate-800/60 rounded-lg border border-slate-700/50 overflow-hidden relative group h-48">

  {/* If camera is ON + permission granted → show live video */}
  {(!isCameraOff && !permissionDenied) ? (
    <video
      ref={videoRef}
      className="w-full h-full object-cover transform scale-x-[-1]"
      autoPlay
      playsInline
      muted
    />
  ) : (
    <CameraPlaceholder />
  )}

  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
  {/* Camera Status Indicator */}
<div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1 bg-black/40 rounded-full backdrop-blur-sm border border-white/10">
  
  {/* Status Dot */}
  {!isCameraOff && !permissionDenied ? (
    // GREEN DOT when camera ON
    <div className="w-3 h-3 rounded-full bg-green-400"></div>
  ) : (
    // RED PULSE when camera OFF
    <div className="relative">
      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
    </div>
  )}

  {/* Text Status */}
  <span className="text-sm font-medium text-white">
    {!isCameraOff && !permissionDenied ? "Active" : "Turn on Camera"}
  </span>
</div>


  
</div>


    {/* Orchestrator */}
    <div className="flex-1 bg-slate-800/40 rounded-lg border border-slate-700/50 flex items-center justify-center h-48">
  <div className="relative text-center">
    

    {/* Avatar with Pulse Effect */}
    <div className="relative inline-block w-24 h-24 mx-auto">
      <img 
        src={ochestrator} 
        alt="Orchestrator"
        className="w-full h-full rounded-full object-cover"
      />
      
      {/* Pulse effect around the avatar */}
      <div className="absolute inset-0 rounded-full border-2 border-indigo-500 animate-ping opacity-50"></div>
    </div>
    <h3 className="text-xl font-semibold text-slate-300 mb-2">AI Amit Orchestrator</h3>
  </div>
</div>


  </div>

  {/* Document Representation */}
  <div className="flex-1 bg-slate-800/40 rounded-lg border border-slate-700/50 p-1 overflow-hidden">

  {/* DOC/PDF Viewer */}
  {pitchDeckUrl ? (
      isPDF ? (
        <iframe
          src={pitchDeckUrl}
          className="w-full h-full rounded-lg"
          style={{ border: "none" }}
        ></iframe>
      ) : isDOCX ? (
        <iframe
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
            pitchDeckUrl
          )}`}
          className="w-full h-full rounded-lg"
          style={{ border: "none" }}
        ></iframe>
      ) : (
        <div className="flex items-center justify-center h-full text-slate-300">
          Unsupported file type
        </div>
      )
  ) : (
    <div className="flex items-center justify-center h-full border-2 border-dashed border-slate-600/50 rounded-lg">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-slate-400 mb-2">
          Document Representation
        </h3>
        <p className="text-sm text-slate-500">Waiting for document…</p>
      </div>
    </div>
  )}
</div>

</div>



        {/* Right Column: AI Judges */}
        <div className="w-[400px] bg-slate-800/60 rounded-lg border border-slate-700/50 flex flex-col">
  <div className="p-4 border-b border-slate-700/50">
    <h3 className="text-md font-semibold text-gray-100 text-center">AI Judges</h3> {/* Smaller text size */}
  </div>
  <div className="flex-1 overflow-y-auto px-3 space-y-2">
    {judges.map((judge) => (
      <div 
        key={judge.id} 
        className={`bg-slate-700/30 rounded-[25px] px-3 py-2 mt-2 flex items-center gap-4 hover:bg-slate-700/50 transition-colors  ${activeJudge === judge.id ? "border-2 border-indigo-400 bg-slate-700/60" : ""}`}
      >
        <div className="relative">
          <div 
            className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center overflow-hidden"
          >
            
            {judge.avatarUrl ? (
              <img src={judge.avatarUrl} alt={judge.name} className="w-full h-full object-cover" />
              
            ) : (
              <span className="text-lg font-semibold text-white">
                {judge.name.charAt(0)}
              </span>
            )}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-lg text-white truncate">{judge.name}</div>
          <div className="text-xs text-slate-400 truncate">{judge.subtitle}</div>
        </div>
      </div>
    ))}
  </div>
</div>

      </div>

      {/* Footer Controls */}
      
<footer className="flex items-center justify-between px-6 py-2 bg-slate-800/80 backdrop-blur-sm border-t border-slate-700/50">
  {/* Left Section: Recording Indicator */}
  <div className="flex items-center gap-2">
  <div className="flex items-center gap-2 px-4 py-1 bg-red-500/20 rounded-full border border-red-500/30">
    <div className="w-5 h-5 bg-red-500 rounded-full animate-pulse"></div> {/* Increased size of pulse */}
    <span className="text-lg font-semibold text-red-400 opacity-1 px-2 group-hover:opacity-100 transition-opacity">
      REC
    </span> {/* Increased text size */}
  </div>
  <span className="text-sm text-slate-500 ml-2">Recording in progress</span> {/* Adjusted text size */}
</div>



  {/* Middle Section: Control Buttons */}
  <div className="flex items-center gap-3">
  
    {/* Mic Button */}
    <div className="relative group">
  
  

  {/* Your existing MIC button */}
  <button
    onClick={handleMicToggle}
    className={`p-2 rounded-full transition-all duration-300 transform ${
      isMuted
        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:scale-103'
        : 'bg-slate-700 text-white hover:bg-slate-600 hover:scale-103'
    }`}
    aria-label={isMuted ? 'Unmute' : 'Mute'}
  >
    <FontAwesomeIcon
      icon={isMuted ? faMicrophoneAltSlash : faMicrophone}
      className="w-6 h-6"
    />
  </button>
  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 text-sm text-white bg-black rounded-lg px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {isMuted ? 'Turn on mic' : 'Turn off mic'}
      </span>

</div>


    {/* Camera Button */}
    <div className="relative group">
      <button
        onClick={handleCameraToggle}

        className={`p-2 rounded-full transition-all duration-300 transform ${
          isCameraOff
            ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:scale-103'
            : 'bg-slate-700 text-white hover:bg-slate-600 hover:scale-103'
        }`}
        aria-label={isCameraOff ? 'Turn on camera' : 'Turn off camera'}
      >
        <FontAwesomeIcon icon={isCameraOff ? faVideoSlash : faVideo} className="w-6 h-6" />
      </button>
      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 text-sm text-white bg-black rounded-lg px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {isCameraOff ? 'Turn on camera' : 'Turn off camera'}
      </span>
    </div>
  </div>

  {/* Right Section: End Call Button */}
  <div
  onClick={() => {
    setEndingCall(true);
  stopRecording(() => {
    setEndingCall(false); 
    navigate("../dashboard");
  });
}}

  className="relative group hover:cursor-pointer">
    <button
  disabled={endingCall}
  className={`px-3 py-1 rounded-full font-semibold transition-all duration-300 transform flex items-center gap-2
    ${endingCall ? "bg-red-400 cursor-not-allowed opacity-70" : "bg-red-600 hover:bg-red-700"}
  `}
  aria-label="End call"
>
  {endingCall ? (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  ) : (
    <Phone className="w-6 h-6" />
  )}

  <span className="opacity-1 group-hover:opacity-100 transition-opacity">
    {endingCall ? "Ending..." : "END CALL"}
  </span>
</button>

    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 text-sm text-white bg-black rounded-lg px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      End Call
    </span>
  </div>
</footer>
<div
  ref={(el) => { elevenLabsWidgetRef.current = el; }}
  style={{
    position: 'fixed',
    bottom: '-100px',
    right: '10px',
    width: '80px',
    height: '80px',
    opacity: 0,
    pointerEvents: 'auto',
    zIndex: 9999
  }}
>
  {React.createElement('elevenlabs-convai', {
    'agent-id': import.meta.env.VITE_ELEVENLABS_AGENT_ID || 'agent_8801kagtss1aefgb7k53679zjrwb'
  })}
</div>
{showFullscreenPrompt && (
  <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-xl animate-fadeIn">
    <div className="
      relative w-[90%] max-w-md p-8 rounded-3xl
      bg-gradient-to-b from-slate-900/90 to-slate-800/90
      shadow-[0_0_40px_-10px_rgba(0,0,0,0.6)]
      border border-white/10
      backdrop-blur-xl
      animate-scaleIn
    ">

      {/* Soft glowing ring behind card */}
      <div className="absolute inset-0 -z-10 rounded-3xl 
                      bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-purple-500/20 
                      blur-2xl opacity-70"></div>

      <h2 className="text-2xl font-semibold text-white text-center mb-4 tracking-wide">
        Enter Fullscreen Mode
      </h2>

      <p className="text-slate-300 text-center text-sm mb-8 leading-relaxed">
        For the best pitch experience, we recommend using fullscreen mode to avoid distractions.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={enterFullscreen}
          className="
            px-5 py-2.5 rounded-[50px] font-medium text-white 
            bg-gradient-to-r from-blue-600 to-indigo-600
            shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50
            hover:brightness-110 active:scale-95
            transition-all duration-200
          "
        >
          Yes, Enter Fullscreen
        </button>

        <button
          onClick={declineFullscreen}
          className="
            px-5 py-2.5 rounded-[50px] font-medium 
            bg-white/10 text-slate-200 border border-white/20
            hover:bg-white/20 hover:text-white 
            active:scale-95 transition-all duration-200
          "
        >
          No, Continue
        </button>
      </div>

    </div>
  </div>
)}



    </div>
  );
};

export default InnovatePitch;


