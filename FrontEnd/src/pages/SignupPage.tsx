// src/pages/Signup.tsx
import React, { useState, useEffect } from "react";
import { Mail, Lock, User, UserPlus, Check, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import GoogleSignupButton from "../components/GoogleSignupButton";
import LinkedinSignupButton from "../components/LinkedinSignupButton";
import image from "../assets/login2.jpg"
// import image from "../assets/7675936.jpeg"

const HOST = import.meta.env.VITE_BACKEND;

const Signup: React.FC = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [timer, setTimer] = useState(120);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const sendOtp = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!accepted) {
      setError("You must agree to the Terms & Conditions.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${HOST}/api/otp/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message || "OTP sent successfully!");
        setStep(2);
        setTimer(120);
        setIsTimerActive(true);
      } else {
        setError(data.error || "Failed to send OTP.");
      }
    } catch (err) {
      setError("Network error.");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError("Please enter all 6 digits of the OTP");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${HOST}/api/otp/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpCode }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message || "OTP verified!");
        setStep(3);
      } else {
        setError(data.error || "Invalid OTP.");
      }
    } catch (err) {
      setError("Network error.");
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${HOST}/api/otp/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message || "OTP resent!");
        setTimer(120);
        setIsTimerActive(true);
      } else {
        setError(data.error || "Failed to resend OTP.");
      }
    } catch (err) {
      setError("Network error.");
    } finally {
      setIsLoading(false);
    }
  };

  const completeRegistration = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError("First and last name required");
      return;
    }
    if (!phoneNumber) {
      setError("Phone number required");
      return;
    }
    if (!password) {
      setError("Password required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    // try {
    //   const response = await fetch(`${HOST}/api/auth/signup`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       email,
    //       first_name: firstName,
    //       last_name: lastName,
    //       password,
    //       phone_number: phoneNumber,
    //     }),
    //   });

    //   const data = await response.json();
    //   if (response.ok) {
    //     setSuccess(data.message || "Account created!");
    //     setTimeout(() => (window.location.href = '/login'), 2000);
    //   } else {
    //     setError(data.error || "Registration failed.");
    //   }
    // } catch (err) {
    //   setError("Network error.");
    // } finally {
    //   setIsLoading(false);
    // }
    localStorage.setItem("token","abcd")
    window.location.href = '/dashboard'
  };

  const renderMessages = () => {
    if (error) {
      return (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
          <X className="h-5 w-5 mr-2" />
          {error}
        </div>
      );
    }
    if (success) {
      return (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
          <Check className="h-5 w-5 mr-2" />
          {success}
        </div>
      );
    }
    return null;
  };

 const renderStep1 = () => (
  <div className="animate-fadeIn">
    
    <h1 className="text-4xl font-bold text-gray-900 mb-8">Sign Up</h1>

    
    <div className="space-y-3">
      <GoogleSignupButton
        onError={setError}
        text="Continue with Google"
      />

      <LinkedinSignupButton
        onError={setError}
        text="Continue with LinkedIn"
      />
    </div>

   
    <div className="flex items-center my-8">
      <div className="flex-1 h-px bg-gray-200"></div>
      <span className="mx-4 text-gray-500 text-sm font-medium">or</span>
      <div className="flex-1 h-px bg-gray-200"></div>
    </div>

   
    <form className="space-y-5">
      
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-xl border border-gray-300 bg-[#daecf9] px-4 py-3 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
          required
        />
      </div>

     
      <p className="text-center text-sm text-gray-500">
        A 6-digit verification code will be sent to your email.
      </p>
      <div className="flex items-center text-sm text-gray-600">
          <input
            type="checkbox"
            id="terms"
            className="mr-2 rounded border-gray-300 focus:ring-blue-500"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            required
          />
          <label htmlFor="terms">
            I agree to the{" "}
            <NavLink to="/terms" className="text-blue-600 hover:text-blue-800 font-medium">
              Terms & Conditions
            </NavLink>
          </label>
        </div>

      
      <div className="flex justify-end text-sm">
        <span className="text-gray-600">Already have an account?</span>
        <NavLink
          to="/login"
          className="ml-1 text-blue-600 hover:text-blue-800 font-semibold"
        >
          Sign In
        </NavLink>
      </div>

      
      <button
        type="button"
        onClick={()=>{
          localStorage.setItem("token","abcd")
    window.location.href = '/dashboard'
        }}
        disabled={isLoading}
        className="w-full bg-[#105472] hover:bg-[#106492] transition-all font-semibold text-white py-3 rounded-md shadow-md disabled:bg-gray-400"
      >
        {isLoading ? "Sending..." : "Verify Email"}
      </button>
    </form>

    {/* Terms */}
    <p className="mt-6 text-gray-600 text-sm leading-relaxed">
      By creating an account, you agree to our{" "}
      <NavLink
        to="/terms"
        className="text-blue-600 hover:text-blue-800 font-medium"
      >
        Terms of Service
      </NavLink>
      . You will receive account-related updates occasionally.
    </p>
  </div>
);


  const renderStep2 = () => (
    <>
      <div className="text-center mb-8">
        <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 mb-4">
          <Mail className="h-6 w-6 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Verify Your Email</h1>
        <p className="text-gray-500 text-sm mt-1">Enter the 6-digit code sent to your email</p>
      </div>

      <div className="text-center mb-6">
        <p className="text-gray-700">
          Code sent to <span className="text-blue-600 font-medium">{email}</span>
        </p>
      </div>

      <div className="flex justify-center space-x-2 mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            autoFocus={index === 0}
          />
        ))}
      </div>

      {isTimerActive && (
        <div className="text-center mb-4">
          <p className="text-gray-500 text-sm">
            Resend code in <span className="font-semibold text-blue-600">{formatTime(timer)}</span>
          </p>
        </div>
      )}

      {!isTimerActive && (
        <div className="text-center mb-6">
          <button
            type="button"
            onClick={resendOtp}
            disabled={isLoading}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            {isLoading ? 'Sending...' : 'Resend OTP'}
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={verifyOtp}
        disabled={isLoading}
        className={`w-full flex items-center justify-center gap-2 py-2.5 ${isLoading ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-600 to-blue-700'} text-white font-semibold rounded-lg`}
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        ) : (
          <>
            <Check size={18} />
            Verify Code
          </>
        )}
      </button>

      <div className="text-center mt-4">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="text-gray-600 hover:text-gray-800 text-sm font-medium"
        >
          ← Go Back
        </button>
      </div>
    </>
  );

  const renderStep3 = () => (
    <>
      <div className="text-center mb-8">
        <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 mb-4">
          <User className="h-6 w-6 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Complete Your Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Almost there! Just fill in a few more details</p>
      </div>

      <form className="space-y-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
            First Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
            Last Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="email"
              id="email"
              value={email}
              readOnly
              className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g. +1 234 567 8900"
              className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
            Create Password *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
            Confirm Password *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <button
          type="button"
          onClick={completeRegistration}
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-2 py-2.5 ${isLoading ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-600 to-blue-700'} text-white font-semibold rounded-lg`}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <UserPlus size={18} />
              Sign Up
            </>
          )}
        </button>
      </form>

      {/* ✅ Google Button — Step 3 */}
      <div className="flex items-center justify-center mt-8">
        <span className="h-px w-1/4 bg-gray-200"></span>
        <span className="text-gray-400 text-xs mx-3">or</span>
        <span className="h-px w-1/4 bg-gray-200"></span>
      </div>

      <div className="mt-6">
        {/* <GoogleSignupButton
          onError={setError}
          text="Skip and sign up with Google"
          size="sm"
        /> */}
        {/* <LinkedinSignupButton
  onError={setError}
          text="Continue with linkedIn"        
        /> */}
      </div>

      <p className="text-center text-sm text-gray-600 mt-8">
        Already have an account?{" "}
        <NavLink to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
          Log in
        </NavLink>
      </p>
    </>
  );

  return (
    <div className="min-h-screen flex bg-[#ebf3fe]">

    {/* LEFT SIDE */}
<div className="hidden lg:flex w-1/2 relative">
  <img 
    src={image}
    alt="Login Visual"
    className="w-full h-full object-cover"
  />

  <div className="absolute top-10 left-10">
    <img src="/logo.png" className="h-12" />
  </div>
</div>

    {/* RIGHT SIDE */}
    <div className="w-full lg:w-1/2 flex items-start justify-center px-10 pt-4 md:py-16 mt-[70px] overflow-y-auto">
      <div className="w-full max-w-xl">

        {renderMessages()}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

      </div>
    </div>

  </div>
  );
};

export default Signup;