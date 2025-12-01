import React, { useState } from "react";
import { Eye, EyeOff} from "lucide-react"; 
import image from "../assets/login2.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleSignupButton from "../components/GoogleSignupButton";

const HOST = import.meta.env.VITE_BACKEND;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true); 

    try {
      const response = await axios.post(`${HOST}/api/auth/login`, formData);
      localStorage.setItem("token", response.data.token);

      const user = response.data.user;
      if (user) {
        localStorage.setItem("usr", user.id || user.user_id);
      }

      navigate("/dashboard");
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "Login failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#ebf3fe]">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 relative">
        <img
          src={image}
          alt="Login Visual"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 justify-center px-8 pt-[90px] md:pt-[130px]">
        <div className="w-full max-w-xl">
          <h1 className="text-black font-bold text-4xl pb-[60px] text-center">
            Welcome back to HireArena
          </h1>

          <GoogleSignupButton
            onError={setErrorMessage}
            text="Sign in with Google"
          />

          <p className="text-gray-600 mb-6">
            Or sign in using your email address
          </p>

          {errorMessage && (
            <p className="text-red-600 text-center mb-4">{errorMessage}</p>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  <span className="text-red-600">*</span> Your email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading} 
                  className="w-full border bg-[#daecf9] rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  <span className="text-red-600">*</span> Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={loading} 
                    className="w-full border bg-[#daecf9] rounded-md px-3 py-2 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={loading} 
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm mt-2">
              <NavLink
                to="/forgot-password"
                className="text-blue-700 font-medium"
              >
                Forget Password?
              </NavLink>

              <div>
                <span className="text-gray-700">New User? </span>
                <NavLink to="/signup" className="text-blue-700 font-medium">
                  Create an account
                </NavLink>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading} 
              className={`w-full py-3 rounded-md font-medium text-lg flex items-center justify-center ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#105472] hover:bg-[#106492] text-white"
              }`}
            >
              {loading ? (
                <>
                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


export default Login;
