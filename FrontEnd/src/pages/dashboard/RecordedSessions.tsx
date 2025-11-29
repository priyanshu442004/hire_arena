// import { useEffect, useState } from "react";


// const HOST = import.meta.env.VITE_BACKEND;



const RecordedSessions = () => {
  // const [sessions, setSessions] = useState<any[]>([]);
  // const [loading, setLoading] = useState(true);

  // const userId = localStorage.getItem("usr");
  // const [orgMap, setOrgMap] = useState<Record<string, string>>({});


// useEffect(() => {
//   const fetchSessions = async () => {
//     try {
//       setLoading(true);

//       const res = await fetch(
//         `${HOST}/session/get-sessions?user_id=${userId}`
//       );
//       const data = await res.json();

//       if (res.ok) {
//         const sessionsData = data.sessions || [];
//         setSessions(sessionsData);

//         // Fetch org info for each session
//         fetchOrgNames(sessionsData);

//       } else {
//         console.error("Fetch error:", data.error);
//       }

//     } catch (err) {
//       console.error("Error fetching sessions:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (userId) fetchSessions();
// }, [userId]);


// const fetchOrgNames = async (sessionsData: any[]) => {
//   try {
//     const uniqueOrgIds = [
//       ...new Set(sessionsData.map(s => s.org_id))
//     ];

//     const orgMapTemp: Record<string, string> = {};

//     for (const oid of uniqueOrgIds) {
//       const res = await fetch(`${HOST}/startup/startup/${oid}`);
//       const data = await res.json();

//       if (res.ok && data.startups?.length > 0) {
//         orgMapTemp[oid] = data.startups[0].org_name;
//       } else {
//         orgMapTemp[oid] = "Unknown Startup";
//       }
//     }

//     setOrgMap(orgMapTemp);

//   } catch (err) {
//     console.error("Org fetch error:", err);
//   }
// };



// const formatDuration = (seconds: number) => {
//   if (!seconds) return "0:00";
//   const minutes = Math.floor(seconds / 60);
//   const sec = seconds % 60;
//   return `${minutes}m ${sec}s`;
// };


// const formatDate = (ts: string) => {
//   return new Date(ts).toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });
// };

// if (loading) {
//   return (
//     <div className="flex justify-center items-center h-40">
//       <div className="relative">
//         <div className="h-12 w-12 rounded-full border-4 border-cyan-500/40"></div>
//         <div className="absolute inset-0 h-12 w-12 rounded-full border-t-4 border-cyan-400 animate-s n"></div>
//       </div>
//     </div>
//   );
// }



  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-3 h-0.5 bg-cyan-600"></div>
        <h2 className="text-sm font-semibold uppercase text-black">
          Recorded Sessions
        </h2>
      </div>

      <h1 className="text-black text-2xl font-bold mb-6">Your Video Practice Sessions</h1>

  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="bg-[#DAECF9] border border-slate-700 p-6 rounded-2xl shadow-lg backdrop-blur-md">
      <div className="flex justify-center mb-4">
        <svg
          className="w-12 h-12 text-slate-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m-3 0h13.5m-13.5 0A2.25 2.25 0 003 11.25v7.5A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75v-7.5A2.25 2.25 0 0018.75 9m-13.5 0h13.5"
          />
        </svg>
      </div>

      <h3 className="text-xl font-semibold text-black mb-2">
       No Interviews Recorded Yet
      </h3>

      <p className="text-black text-sm max-w-sm mx-auto mb-5">
        You haven’t completed any mock interviews yet. Start your first AI-powered interview from your dashboard to begin improving your skills.
      </p>

      <a
        href="/dashboard"
        className="inline-block bg-cyan-800 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg 
                   transition-all shadow-md hover:shadow-cyan-500/30 text-sm font-medium"
      >
        Go to Dashboard
      </a>
    </div>
  </div>


      {/* Grid */}
      
    </div>
  );
};

export default RecordedSessions;
