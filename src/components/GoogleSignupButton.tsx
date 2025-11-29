import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const HOST = import.meta.env.VITE_BACKEND || "http://localhost:5000";

interface GoogleSignupButtonProps {
  onError?: (error: string) => void;
  text?: string;
  size?: "sm" | "md" | "lg";
}

export default function GoogleSignupButton({
  onError,
  text = "Continue with Google",
  size = "md",
}: GoogleSignupButtonProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const sizeClasses = {
    sm: "py-1.5 text-sm",
    md: "py-2.5 text-base",
    lg: "py-3 text-lg",
  };

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (response) => {
      
      setLoading(true);
      try {
        const res = await axios.post(`${HOST}/api/auth/google`, {
          code: response.code, 
        });
        localStorage.setItem("usr",res.data.user.user_id)
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("profile_url", res.data.picture);
        navigate("/dashboard");
      } catch (err: any) {
        const message =
          err.response?.data?.message ||
          err.message ||
          "Google login failed. Please try again.";
        onError?.(message);
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      onError?.("Google login failed or was cancelled.");
      setLoading(false);
    },
  });

  return (
    <button
      onClick={() => login()}
      disabled={loading}
      className={`w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition ${sizeClasses[size]} ${
        loading ? "bg-gray-100 cursor-not-allowed" : ""
      }`}
    >
      {loading ? (
        <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
      ) : (
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="h-5 w-5"
        />
      )}
      {text}
    </button>
  );
}