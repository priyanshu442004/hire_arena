import { useEffect, useState } from "react";
const HOST = import.meta.env.VITE_BACKEND;

const Score = () => {
  const [scores, setScores] = useState<any[]>([]);
  const [orgMap, setOrgMap] = useState<Record<string, string>>({});
  const [durationMap, setDurationMap] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("usr");

  // Trim feedback to 10–11 words
  const trimFeedback = (text: string) => {
    if (!text) return "No feedback available.";
    const words = text.split(" ");
    if (words.length <= 11) return text;
    return words.slice(0, 11).join(" ") + " ...";
  };

  const formatDate = (ts: string) =>
    new Date(ts).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const formatDuration = (seconds: number) => {
    if (!seconds) return "0m";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  // ---------------- FETCH SCORES ----------------
  useEffect(() => {
    const fetchScores = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${HOST}/score/scores?user_id=${userId}`);
        const data = await res.json();

        if (res.ok) {
          setScores(data.scores || []);
          fetchOrgNames(data.scores);
          fetchDurations(data.scores);
        } else {
          console.error("Error:", data.error);
        }
      } catch (err) {
        console.error("Score fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchScores();
  }, [userId]);

  // ---------------- FETCH ORG NAMES ----------------
  const fetchOrgNames = async (scoresData: any[]) => {
    const uniqueOrgIds = [...new Set(scoresData.map((s) => s.org_id))];
    const mapTemp: Record<string, string> = {};

    for (const oid of uniqueOrgIds) {
      const res = await fetch(`${HOST}/startup/startup/${oid}`);
      const data = await res.json();

      mapTemp[oid] =
        res.ok && data.startups?.length > 0
          ? data.startups[0].org_name
          : "Unknown Startup";
    }

    setOrgMap(mapTemp);
  };

  // ---------------- FETCH DURATIONS ----------------
  const fetchDurations = async (scoresData: any[]) => {
    const uniqueVideos = [...new Set(scoresData.map((s) => s.video_id))];
    const mapTemp: Record<string, number> = {};

    for (const vid of uniqueVideos) {
      const res = await fetch(`${HOST}/session/get-sessions?video_id=${vid}`);
      const data = await res.json();

      mapTemp[vid] =
        res.ok && data.sessions?.length > 0
          ? data.sessions[0].duration
          : 0;
    }

    setDurationMap(mapTemp);
  };

  // ---------------- LOADING UI ----------------
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="relative">
          <div className="h-14 w-14 rounded-full border-4 border-cyan-500/20"></div>
          <div className="absolute inset-0 h-14 w-14 rounded-full border-t-4 border-cyan-400 animate-spin"></div>
        </div>
      </div>
    );
  }

  // ---------------- EMPTY STATE ----------------
  if (scores.length === 0) {
    return (
      <div>
        {/* Page Heading */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-3 h-0.5 bg-cyan-500"></div>
          <h2 className="text-sm font-semibold uppercase text-slate-300">
            My Interviews
          </h2>
        </div>

        {/* Header Row */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Your Score</h1>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center border border-slate-700">
          <h2 className="text-xl font-semibold mb-2">No Interviews Yet</h2>
          <p className="text-slate-300 mb-4">
            Start practicing by having your first Interview.
          </p>

          <a
            href="/dashboard"
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            Start Your Interview
          </a>
        </div>
      </div>
    );
  }

  // ---------------- MAIN UI (Same Design as Provided) ----------------
  return (
    <div>
      {/* Page Heading */}
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-3 h-0.5 bg-cyan-500"></div>
        <h2 className="text-sm font-semibold uppercase text-slate-300">
          My Interviews
        </h2>
      </div>

      {/* Header Row */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Your Score</h1>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scores.map((s: any) => (
          <div
            key={s.score_id}
            className="bg-white/10 backdrop-blur-md border border-slate-700 p-5 rounded-xl 
                       hover:bg-white/20 transition-all duration-300 
                       hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10"
          >
            {/* Title = org_name */}
            <h3 className="font-semibold text-lg text-white mb-1 tracking-wide">
              {orgMap[s.org_id] || "Loading..."}
            </h3>

            {/* Description = trimmed feedback */}
            <p className="text-sm text-slate-300 mb-4 leading-relaxed italic">
              {trimFeedback(s.feedback)}
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              {/* Score */}
              <div className="flex items-center space-x-2 bg-slate-800/50 px-2 py-1 rounded-md">
                <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                </svg>
                <span className="text-emerald-300 font-medium">
                  {s.total_score}/100
                </span>
              </div>

              {/* Duration */}
              <div className="flex items-center space-x-2 bg-slate-800/50 px-2 py-1 rounded-md">
                <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 8H9V6a1 1 0 112 0v4z" />
                </svg>
                <span className="text-cyan-300">
                  {formatDuration(durationMap[s.video_id])}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-2">
              {/* Status */}
              <span className="text-xs px-3 py-1 rounded-full font-medium tracking-wide
                bg-emerald-900/40 text-emerald-300 border border-emerald-700/50">
                Completed
              </span>

              {/* View Button */}
              <button
                onClick={() => window.open("/dashboard/score", "_blank")}
                className="bg-slate-700 hover:bg-slate-600 text-white text-sm py-1.5 px-4 rounded-md 
                           transition-all font-medium shadow-sm hover:shadow-cyan-500/20"
              >
                View
              </button>
            </div>

            {/* Last Updated */}
            <div className="mt-3 text-[11px] text-slate-400 tracking-wide">
              Last updated: {formatDate(s.created_at)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Score;
