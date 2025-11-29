import React from "react";
import { Linkedin } from "lucide-react";

interface LinkedinSignupButtonProps {
  onError?: (error: string) => void;
  text?: string;
  size?: "sm" | "md";
}

const LinkedinSignupButton: React.FC<LinkedinSignupButtonProps> = ({
  
  text = "Continue with LinkedIn",
  size = "md",
}) => {
  const handleClick = () => {
    // Redirect to backend LinkedIn auth route
    const HOST = import.meta.env.VITE_BACKEND;
    window.location.href = `${HOST}/api/auth/linkedin`;
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex items-center justify-center gap-2 w-full rounded-lg border ${
        size === "sm" ? "py-2 text-sm" : "py-2.5"
      } font-medium transition-colors ${
        // LinkedIn brand color: #0A66C2
        "border-[#0A66C2] bg-[#0A66C2] text-white hover:bg-[#0857a7]"
      }`}
    >
      <Linkedin size={size === "sm" ? 16 : 18} />
      {text}
    </button>
  );
};

export default LinkedinSignupButton;