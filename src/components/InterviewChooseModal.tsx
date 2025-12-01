// src/components/InterviewChooseModal.tsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface InterviewChooseModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
}

const InterviewChooseModal: React.FC<InterviewChooseModalProps> = ({
  isOpen,
  onClose,
  userId,
}) => {
  const [selected, setSelected] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const HOST = import.meta.env.VITE_BACKEND;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword", // .doc
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    ];

    if (allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      alert("Please upload a PDF, DOC, or DOCX file.");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!selected) {
      alert("Please select an interview type.");
      return;
    }
    if (!file) {
      alert("Please upload your resume (PDF).");
      return;
    }
    if (!userId) {
      alert("User not authenticated. Please log in.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("interviewType", selected);
    formData.append("resume", file);

    try {
      const res = await axios.post(`${HOST}/videointerview/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // const { startupId } = res.data;
      const { candidate } = res.data; 
const resumeUrl = candidate.resume_url;


      // ✅ Navigate based on selected type
      if (selected === "technical") {
  navigate(`/dashboard/videocall`, {
    state: { resumeUrl }
  });
} else if (selected === "behavioral") {
  navigate(`/dashboard/hrvideocall`, {
    state: { resumeUrl }
  });
}


      onClose(); // close modal after successful submission & nav
    } catch (error: any) {
      console.error("Submission error:", error);
      alert(
        error.response?.data?.message ||
          "Failed to start interview. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <header className="w-full bg-[#c9dceb] flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-gray-600 flex items-center justify-center text-gray-600 font-bold">
              H
            </div>
            <span className="text-[#1d7fc5] font-semibold text-lg">
              HireArena
            </span>
          </div>

          <h1 className="absolute left-1/2 -translate-x-1/2 text-gray-700 text-lg font-medium">
            Interview Session
          </h1>

          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900 text-sm flex items-center gap-1"
            disabled={isSubmitting}
          >
            ✕
          </button>
        </header>

        <div className="w-full min-h-[70vh] bg-[#f5f7f9] flex flex-col items-center p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Choose Interview Type and Upload Resume
          </h2>

          <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
            {/* Interview Type Card */}
            <div className="bg-white border-2 border-[#c3d5e8] rounded-xl p-6 w-full md:w-80 shadow-sm">
              <h3 className="text-gray-700 text-xl font-medium mb-4 text-center">
                Interview Type
              </h3>

              <div
                className={`w-full flex justify-between items-center px-5 py-4 rounded-lg cursor-pointer mb-3 transition ${
                  selected === "technical"
                    ? "bg-[#c9dceb]"
                    : "bg-[#d7e5f1] hover:bg-[#c9dceb]"
                }`}
                onClick={() => setSelected("technical")}
              >
                <span className="text-gray-800 font-semibold">
                  Technical <br /> Interview
                </span>
                <div
                  className={`w-7 h-7 rounded-full border-4 transition flex items-center justify-center ${
                    selected === "technical"
                      ? "border-[#6aa7d8]"
                      : "border-[#a7c3dc]"
                  }`}
                >
                  {selected === "technical" && (
                    <div className="w-3 h-3 bg-[#6aa7d8] rounded-full" />
                  )}
                </div>
              </div>

              <div
                className={`w-full flex justify-between items-center px-5 py-4 rounded-lg cursor-pointer mb-4 transition ${
                  selected === "behavioral"
                    ? "bg-[#c9dceb]"
                    : "bg-[#d7e5f1] hover:bg-[#c9dceb]"
                }`}
                onClick={() => setSelected("behavioral")}
              >
                <span className="text-gray-800 font-semibold">
                  TR/Behavioral <br /> Interview
                </span>
                <div
                  className={`w-7 h-7 rounded-full border-4 transition flex items-center justify-center ${
                    selected === "behavioral"
                      ? "border-[#6aa7d8]"
                      : "border-[#a7c3dc]"
                  }`}
                >
                  {selected === "behavioral" && (
                    <div className="w-3 h-3 bg-[#6aa7d8] rounded-full" />
                  )}
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full mt-3 py-2 rounded-md text-sm font-medium transition flex items-center justify-center ${
                  isSubmitting
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : selected
                    ? "bg-[#4a9ad4] text-white hover:bg-[#3c8ac2]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Starting...
                  </>
                ) : (
                  "Confirm & Start"
                )}
              </button>
            </div>

            {/* Upload Resume Card */}
            <div className="bg-white border-2 border-[#c3d5e8] rounded-xl p-6 w-full md:w-96 shadow-sm">
              <h3 className="text-gray-700 text-xl font-medium text-center mb-6">
                Upload Resume
              </h3>

              <label
                htmlFor="resumeUpload"
                className="border-2 border-dashed border-[#8fb4d1] rounded-xl w-full h-48 flex flex-col items-center justify-center cursor-pointer hover:border-[#6aa7d8] transition relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#6aa7d8"
                  viewBox="0 0 24 24"
                  className="w-16 h-16 mb-3"
                >
                  <path d="M19 18H6a4 4 0 010-8 5.5 5.5 0 0110.7-1.7A4.5 4.5 0 1119 18zm-7-9l-4 4h3v4h2v-4h3l-4-4z" />
                </svg>

                <p className="text-gray-600 text-sm text-center px-4">
                  {file
                    ? file.name
                    : "Drag & Drop PDF/Word here or Click to Upload"}
                </p>

                <input
                  ref={fileInputRef}
                  id="resumeUpload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              <div className="mt-2 text-xs text-gray-500 text-center">
                ✅ PDF, DOC, DOCX • Max 5MB
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewChooseModal;
