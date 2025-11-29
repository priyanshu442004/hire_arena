import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import NewPitchModal from "../../components/NewPitchModal";
import {
  Users,
  CheckCircle2,
  XCircle,
} from "lucide-react";


const HOST = import.meta.env.VITE_BACKEND;

interface PitchData {
  organizationName: string;
  industryType: string;
  websiteUrl: string;
}
const DashboardHome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  if(userData){}

  const userId = localStorage.getItem("usr");

  
    const handleNewPitchSubmit = ( data:PitchData) => {
    console.log("Submitting new pitch:", data);
  };

   useEffect(() => {
    if (!userId) {
      console.error("No user_id found in localStorage");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`${HOST}/user/${userId}`);
        const data = await res.json();

        setUserData(data);
        localStorage.setItem("username",data.first_name)
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

 if (loading) {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-4 border-cyan-500/40"></div>
        <div className="absolute inset-0 h-12 w-12 rounded-full border-t-4 border-cyan-400 animate-spin"></div>
      </div>
    </div>
  );
}
  return (
    <div>
      <main className="flex-1">
        {/* Overview Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            {/* Left side */} 
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 bg-cyan-500"></div>
              <h2 className="text-sm font-semibold uppercase text-[#3f4959]">
                Overview
              </h2>
            </div>

            {/* Right side button */}
            
            <button
              onClick={() => setIsModalOpen(true)} 
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
              </svg>
              <span>Start Interview</span>
            </button>
          </div>

          {/* Welcome Back Card */}
<div className="bg-[#fefefe] rounded-lg p-5 shadow-md mb-6">
  <h2 className="text-2xl font-semibold text-[#3f4959]">Welcome Back, User</h2>
  <p className="text-l text-[#565656] mt-1">
    Quick stats for your sessions using HireArena.
  </p>

  <div className="mt-4 grid grid-cols-3 gap-4">
    <div className="bg-[#f9f9f9] rounded-md p-3 text-center">
      <p className="text-2xl text-[#8d8d8d]">Interviews Completed</p>
      <p className="text-xl font-bold text-[#3f4959]">12</p>
    </div>

    <div className="bg-[#f9f9f9] rounded-md p-3 text-center">
      <p className="text-2xl text-[#8d8d8d]">Average Score</p>
      <p className="text-xl font-bold text-[#3f4959]">85%</p>
    </div>

    <div className="bg-[#f9f9f9] rounded-md p-3 text-center">
      <p className="text-2xl text-[#8d8d8d]">Best Score</p>
      <p className="text-xl font-bold text-[#3f4959]">98%</p>
    </div>
  </div>
</div>





          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* User Info Card */}
            {/* <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-4">
              <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center">
               <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center">
  <User2 className="w-6 h-6 text-white" />
</div>

              </div>
              <div>
                <h3 className="font-semibold">  {userData?.first_name} {userData?.last_name}</h3>
                <p className="text-xs text-slate-300">
                  Founder
                </p>
              </div>
              <div className="pl-[70px]">
                <div className="text-xs text-slate-300">TOTAL PITCHES</div>
                <div className="text-xl font-bold">0</div>
               <BarChart3 className="w-6 h-6 text-slate-300 mt-1" />

              </div>
            </div> */}

            {/* Best Score Card */}
            {/* <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
  <Award className="w-6 h-6 text-white" />
</div>

              </div>
              <div>
                <div className="text-xs text-slate-300">
                  BEST SCORE (LAST PITCH)
                </div>
                <div className="text-xl font-bold text-emerald-400">0/10</div>
              </div>
            </div> */}

            {/* Next Session Card */}
          </div>
        </div>

        {/* Main Dashboard Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Startup Profile Card */}
          <div className="bg-[#f9f9f9] backdrop-blur-sm rounded-lg p-6 text-[#3f4959]">
            <h3 className="text-2xl font-bold mb-4">
              Your Profile Performance Overview

            </h3>

            <div className="mb-4">
              <div className="text-sm text-[#565656] mb-2">Interview Readiness Level
</div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-emerald-500 h-2 rounded-full"
                  style={{ width: "50%" }}
                ></div>
              </div>
              <div className="text-center text-xl font-bold mt-2">60%</div>
            </div>

            <div className="flex justify-between text-l text-[#565656] mb-6">
              <span>Communication</span>
              <span>Knowledge</span>
              <span>Confidence</span>
              <span>Structure</span>
              <span>Delivery</span>
            </div>

            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
              UPDATE PROFILE DETAILS

            </button>
          </div>

          {/* Recent Feedback Card */}
          <div className="bg-[#f9f9f9] backdrop-blur-sm rounded-lg p-6 text-[#3f4959]">
            <h3 className="text-2xl font-bold mb-4">AI Interview Feedback
</h3>

            <div className="space-y-4">
              <div className="border-b border-slate-700 pb-3">
                <div className="flex items-start space-x-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-1" />

                  <div>
                    <div className="font-bold">ANANYA GUPTA (AI)</div>
                    <div className="text-sm text-red-400 italic ">
                      ""Your response structure needs improvement. <br />
                       Clarify your financial explanation with better data support."
"
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b border-slate-700 pb-3">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1" />

                  <div>
                    <div className="font-bold">RAJIV KHANNA (AI)</div>
                    <div className="text-sm text-emerald-400 italic">
                      ""Great clarity in explaining the problem statement.  <br />
                      Keep maintaining this confidence level."
."
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-4 rounded-md transition-colors w-full mt-4">
              VIEW ALL FEEDBACK
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 bg-[#f9f9f9]  shadow-md mb-6 rounded-xl p-6 text-center">
          <div>
            <NavLink
  to={"/dashboard/judges"}
  className="bg-[#e6f0fa] hover:bg-slate-700 hover:text-[#f9f9f9] text-[#090909] font-large py-2 px-6 rounded-md transition-colors flex items-center justify-center space-x-2"
>
  <Users className="w-5 h-5 text-[#3f4959] " />
  <span>BROWSE AI INTERVIEWERS</span>
</NavLink>

          </div>
        </div>
      </main>
      <NewPitchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewPitchSubmit}
      />
    </div>
  );
};

export default DashboardHome;





