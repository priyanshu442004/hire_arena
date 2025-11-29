import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
// import image from "../assets/7675936.jpeg"
import image from "../assets/login2.jpg"
import { NavLink, useNavigate } from "react-router-dom";

import GoogleSignupButton from "../components/GoogleSignupButton";
import LinkedinSignupButton from "../components/LinkedinSignupButton";




const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setErrorMessage("");

  //   try {
  //     const response = await axios.post(`${HOST}/api/auth/login`, formData);
  //     localStorage.setItem("token", response.data.token);

  //      const user = response.data.user;
  // if (user) {
  //   localStorage.setItem("usr", user.id || user.user_id);
  // }
      
  //     navigate("/dashboard");
  //   } catch (error: any) {
  //     setErrorMessage(error.response?.data?.message || "Login failed. Try again.");
  //   }
  // };

  const handleSubmit=()=>{
    localStorage.setItem("token","abcd")
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen flex bg-[#ebf3fe]">
    

      
      {/* LEFT SIDE */}
 <div className="hidden lg:flex w-1/2 relative">
  <img 
    src={image}
    alt="Login Visual"
    className="w-full h-full object-cover"
  />

  {/* <div className="absolute top-[80px] left-4 z-[999]">
    <h3 className="text-white text-4xl font-semibold">
      Welcome back to HireArena
    </h3>
  </div> */}
</div> 


{/* <div className="HIDDEN lg:block w-1/2 relative">
    <img src="{image}" alt="Login Visual"
    className="absolute inset-0 w-full h-full object-cover" />
    </div> */}


      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2  justify-center px-8  pt-[90px] md:pt-[130px]">
        <div className="w-full max-w-xl">
          <h1 className="text-black font-bold text-4xl pb-[60px] text-center">
            Welcome back to HireArena
          </h1>
          
          {/* <h1 className="text-3xl font-bold mb-8 text-gray-900">Sign In</h1> */}

          
          <GoogleSignupButton
            onError={setErrorMessage}
            text="Sign in with Google"
          />

          
          <div className="mt-4 mb-6">
            <LinkedinSignupButton
              onError={setErrorMessage}
              text="Continue with LinkedIn"
            />
          </div>

         
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
                  placeholder=""
                  required
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
      className="w-full border bg-[#daecf9] rounded-md px-3 py-2 pr-12"
    />


    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
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
                <NavLink
                  to="/signup"
                  className="text-blue-700 font-medium"
                >
                  Create an account
                </NavLink>
              </div>
            </div>

            
            <button
              type="submit"
              className="w-full bg-[#105472] hover:bg-[#106492] text-white py-3 rounded-md font-medium text-lg"
            >
              Sign In
            </button>

          </form>

        </div>
      </div>
    </div>
  );



// return (
//   <div className="min-h-screen flex items-center justify-center">

//     {/* FULL BACKGROUND IMAGE */}
//     <img
//       src={image}
//       alt="Login Background"
//       className="absolute inset-0 w-max h-max object-cover" />



//     {/* DARK OVERLAY (optional for readability) */}
//     <div className="absolute inset-0 bg-"></div>

//     {/* LOGIN CONTAINER ON IMAGE */}
//     <div className="relative z-10 min-h-screen flex items-center justify-center px-2 md:px-16">
//       <div className="w-full max-w-md bg-gray-50 backdrop-blur-lg rounded-xl p-8 shadow-2xl">

//         <h1 className="text-black font-bold text-3xl mb-8 text-center">
//           Welcome back to HireArena
//         </h1>

//         <GoogleSignupButton
//           onError={setErrorMessage}
//           text="Sign in with Google"
//         />

//         <div className="mt-4 mb-6">
//           <LinkedinSignupButton
//             onError={setErrorMessage}
//             text="Continue with LinkedIn"
//           />
//         </div>

//         <p className="text-gray-600 mb-6 text-center">
//           Or sign in using your email address
//         </p>

//         {errorMessage && (
//           <p className="text-red-600 text-center mb-4">{errorMessage}</p>
//         )}

//         <form className="space-y-6" onSubmit={handleSubmit}>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-800 mb-1">
//               Your email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full border bg-gray-100 rounded-md px-3 py-2"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-800 mb-1">
//               Password
//             </label>

//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 className="w-full border bg-gray-100 rounded-md px-3 py-2 pr-12"
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="absolute right-3 top-2.5 text-gray-500"
//               >
//                 {showPassword ? <EyeOff /> : <Eye />}
//               </button>
//             </div>
//           </div>

//           <div className="flex justify-between text-sm">
//             <NavLink to="/forgot-password" className="text-blue-700">
//               Forget Password?
//             </NavLink>
//             <NavLink to="/signup" className="text-blue-700">
//               Create an account
//             </NavLink>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#105472] hover:bg-[#106492] text-white py-3 rounded-md font-medium"
//           >
//             Sign In
//           </button>
//         </form>

//       </div>
//     </div>

//   </div>
// );


// return (
//   <div className="min-h-screen flex items-center justify-center bg-gray-100">
//     {/* Main Login Card - The white box in the image */}
//     <div 
//       className="flex w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden" 
//       style={{ minHeight: '500px' }} // Set a minimum height for the card
//     >
      
//       {/* LEFT HALF: Image Content (HIREARENA AI and Characters) */}
//       <div 
      
//         className="w-1/2 flex items-center justify-center relative p-8"
//         style={{
//           // Use this light color to mimic the background pattern of the reference image
//           backgroundColor: '#F7F9FC', 
//         }}
        
//       >
//         {/* HIREARENA AI Text and Characters Content goes here */}
//         <div className="text-center">
//             <h1 className="text-4xl font-bold text-[#105472] mb-2">HIREARENA AI</h1>
//             <p className="text-gray-600 text-sm">Empowering Education with Artificial Intelligence</p>
//             {/* Yahan aapko characters ki image dalni hogi */}
//         </div>
//       </div>

//       {/* RIGHT HALF: Login Form */}
//       <div className="w-1/2 p-12 flex flex-col justify-center items-center">
        
//         {/* Welcome Back Header */}
//         <div className="text-center mb-8">
//             {/* Icon (People group) component here */}
//             <h2 className="text-2xl font-bold text-gray-800 mt-4">WELCOME BACK</h2>
//         </div>

//         {/* Form area starts here */}
//         <form className="space-y-6 w-full max-w-xs" onSubmit={handleSubmit}>
            
//             {/* USERNAME FIELD */}
//             <div className="relative">
//                 <input
//                     type="text"
//                     placeholder="USERNAME"
//                     required
//                     className="w-full border-b border-gray-300 p-2 pl-10 focus:outline-none focus:border-blue-500"
//                 />
//             </div>

//             {/* PASSWORD FIELD */}
//             <div className="relative">
//                 <input
//                     type="password"
//                     placeholder="PASSWORD"
//                     required
//                     className="w-full border-b border-gray-300 p-2 pl-10 focus:outline-none focus:border-blue-500"
//                 />
//             </div>
            
//             {/* LOGIN BUTTON */}
//             <button
//                 type="submit"
//                 className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg mt-4"
//             >
//                 LOGIN
//             </button>

//             {/* Forget/Create Links */}
//             <div className="flex justify-between text-xs mt-4">
//                 <NavLink to="/forgot-password" className="text-blue-500 hover:underline">
//                     Forgot Password?
//                 </NavLink>
//                 <NavLink to="/signup" className="text-blue-500 hover:underline">
//                     Create an Account
//                 </NavLink>
//             </div>
//         </form>

//       </div> 
      
//     </div>
//   </div>
// );
};

export default Login;

