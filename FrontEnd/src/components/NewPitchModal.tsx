// // components/NewPitchModal.tsx
// import { useState, useEffect, useRef } from "react";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";
// const HOST = import.meta.env.VITE_BACKEND;

// interface NewPitchModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (data: any) => void; 
// }
  
// const NewPitchModal = ({ isOpen, onClose }: NewPitchModalProps) => {
//   const navigate = useNavigate();

//   // Form state
//   const [startupName, setStartupName] = useState("");
//   const [industry, setIndustry] = useState("");
//   const [website, setWebsite] = useState("");
//   const [coreProblem, setCoreProblem] = useState("");
//   const [productStage, setProductStage] = useState("");
//   const [tamSize, setTamSize] = useState("");
//   const [teamDescription, setTeamDescription] = useState("");
//   const [teamRating, setTeamRating] = useState<number | null>(null);
//   const [fundingRaised, setFundingRaised] = useState<string | null>(null);
//   const [nextFundingTimeline, setNextFundingTimeline] = useState("");
//   const [tractionMetrics, setTractionMetrics] = useState<{
//     acquisition: string;
//     mrr: string;
//     growth: string;
//     retention: string;
//     pfmFit: string;
//   }>({
//     acquisition: "",
//     mrr: "",
//     growth: "",
//     retention: "",
//     pfmFit: "",
//   });
//   const [competitors, setCompetitors] = useState("");
//   const [techDefensibility, setTechDefensibility] = useState<number | null>(null);
//   const [targetFundingRange, setTargetFundingRange] = useState("");
//   const [gtmStrategy, setGtmStrategy] = useState<string[]>([]);
//   const [gtmOther, setGtmOther] = useState("");
//   const [unfairAdvantage, setUnfairAdvantage] = useState("");
//   const [runwayMonths, setRunwayMonths] = useState<string | null>(null);
//   const [geoFocus, setGeoFocus] = useState("");
//   const [businessModelClarity, setBusinessModelClarity] = useState<number | null>(null);
//   const [pitchDeckFile, setPitchDeckFile] = useState<File | null>(null);

//   const [uploading, setUploading] = useState(false);
//   const modalRef = useRef<HTMLDivElement>(null);

//   // Reset form on open
//   useEffect(() => {
//     if (isOpen) {
//       setStartupName("");
//       setIndustry("");
//       setWebsite("");
//       setCoreProblem("");
//       setProductStage("");
//       setTamSize("");
//       setTeamDescription("");
//       setTeamRating(null);
//       setFundingRaised(null);
//       setNextFundingTimeline("");
//       setTractionMetrics({
//         acquisition: "",
//         mrr: "",
//         growth: "",
//         retention: "",
//         pfmFit: "",
//       });
//       setCompetitors("");
//       setTechDefensibility(null);
//       setTargetFundingRange("");
//       setGtmStrategy([]);
//       setGtmOther("");
//       setUnfairAdvantage("");
//       setRunwayMonths(null);
//       setGeoFocus("");
//       setBusinessModelClarity(null);
//       setPitchDeckFile(null);
//     }
//   }, [isOpen]);

//   // Close on Escape / click outside
//   useEffect(() => {
//     const handleEscape = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };
//     const handleClickOutside = (e: MouseEvent) => {
//       if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
//         onClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("keydown", handleEscape);
//       document.addEventListener("mousedown", handleClickOutside);
//       return () => {
//         document.removeEventListener("keydown", handleEscape);
//         document.removeEventListener("mousedown", handleClickOutside);
//       };
//     }
//   }, [isOpen, onClose]);

//   // Validation
//   const validate = () => {
//     const required = [
//       { name: "Startup Legal Name", value: startupName.trim() },
//       { name: "Industry", value: industry },
//       { name: "Website URL", value: website.trim() },
//       { name: "Core Problem", value: coreProblem.trim() },
//       { name: "Product Stage", value: productStage },
//       { name: "TAM", value: tamSize.trim() },
//       { name: "Team Description", value: teamDescription.trim() },
//       { name: "Team Rating", value: teamRating !== null },
//     ];

//     for (const { name, value } of required) {
//       if (!value) {
//         toast.error(`${name} is required`);
//         return false;
//       }
//     }

//     if (tamSize.trim() && isNaN(Number(tamSize))) {
//       toast.error("TAM must be a valid number (e.g., 1000000)");
//       return false;
//     }

//     return true;
//   };

//   // Helpers
//   const setTraction = (key: keyof typeof tractionMetrics, val: string) => {
//     setTractionMetrics((prev) => ({ ...prev, [key]: val }));
//   };

//   const toggleGtm = (val: string) => {
//     setGtmStrategy((prev) =>
//       prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
//     );
//   };

//   // Cumulative Star Rating Component (reusable inline)
//   const StarRating = ({
//     value,
//     onChange,
//     max = 5,
//   }: {
//     value: number | null;
//     onChange: (n: number) => void;
//     max?: number;
//   }) => {
//     const [hover, setHover] = useState<number | null>(null);
//     return (
//       <div className="flex space-x-1">
//         {[...Array(max)].map((_, i) => {
//           const rating = i + 1;
//           const showActive = (hover || value || 0) >= rating;
//           return (
//             <button
//               key={rating}
//               type="button"
//               onClick={() => onChange(rating)}
//               onMouseEnter={() => setHover(rating)}
//               onMouseLeave={() => setHover(null)}
//               className={`w-8 h-8 flex items-center justify-center rounded-full text-lg ${
//                 showActive
//                   ? "bg-emerald-600 text-white"
//                   : "bg-slate-700 text-slate-400 hover:bg-slate-600"
//               }`}
//               aria-label={`Rate ${rating} stars`}
//             >
//               ★
//             </button>
//           );
//         })}
//       </div>
//     );
//   };

//   // Submit handler
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validate()) return;
//     navigate("/dashboard/videocall")

//     // try {
//     //   setUploading(true);

//       const user_id = localStorage.getItem("usr");
//       // if (!user_id) {
//       //   toast.error("User not logged in");
//       //   return;
//       // }

//       // Normalize URL
//       // const cleanUrl = website.trim();
//       // const fullUrl = cleanUrl.startsWith("http") ? cleanUrl : `https://${cleanUrl}`;

//       // Payload (match Google Form structure)
//       // const payload = {
//       //   user_id,
//       //   startup_legal_name: startupName.trim(),
//       //   industry_sector: industry,
//       //   website_url: fullUrl,
//       //   core_problem: coreProblem.trim(),
//       //   product_stage: productStage,
//       //   tam_usd: tamSize.trim() ? Number(tamSize) : 0,
//       //   team_description: teamDescription.trim(),
//       //   team_rating: teamRating,
//       //   funding_raised: fundingRaised,
//       //   next_funding_timeline: nextFundingTimeline || null,
//       //   traction: {
//       //     customer_acquisition: tractionMetrics.acquisition,
//       //     mrr: tractionMetrics.mrr,
//       //     growth: tractionMetrics.growth,
//       //     retention: tractionMetrics.retention,
//       //     product_market_fit: tractionMetrics.pfmFit,
//       //   },
//       //   competitors: competitors.trim() || null,
//       //   tech_defensibility: techDefensibility,
//       //   target_funding_range: targetFundingRange || null,
//       //   gtm_strategy: gtmStrategy.includes("other") && gtmOther
//       //     ? [...gtmStrategy.filter((v) => v !== "other"), gtmOther]
//       //     : gtmStrategy,
//       //   unfair_advantage: unfairAdvantage.trim() || null,
//       //   runway_months: runwayMonths,
//       //   geo_focus: geoFocus.trim() || null,
//       //   business_model_clarity: businessModelClarity,
//       // };

//       // Prepare request
//     //   let body: string | FormData;
//     //   let headers: HeadersInit = { "Content-Type": "application/json" };

//     //   if (pitchDeckFile) {
//     //     const fd = new FormData();
//     //     fd.append("data", JSON.stringify(payload));
//     //     fd.append("pitch_deck", pitchDeckFile);
//     //     body = fd;
//     //     headers = {}; // browser sets multipart
//     //   } else {
//     //     body = JSON.stringify(payload);
//     //   }

//     //   const res = await fetch(`${HOST}/startup/create`, {
//     //     method: "POST",
//     //     headers,
//     //     body,
//     //   });

//     //   const data = await res.json();

//     //   if (!res.ok) {
//     //     throw new Error(data.message || data.error || "Submission failed");
//     //   }

//     //   toast.success("✅ Pitch submitted successfully!");
//     //   onClose();
//     //   navigate("/dashboard/videocall");
//     // } catch (err: any) {
//     //   console.error("Submission failed:", err);
//     //   toast.error(err.message || "Something went wrong. Please try again.");
//     // } finally {
//     //   setUploading(false);
//     // }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-start justify-center p-2 md:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
//       <div
//         ref={modalRef}
//         className="w-full mt-[80px] max-w-3xl bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-2xl"
//       >
//         {/* Header */}
//         <div className="bg-slate-700 px-6 py-4 flex items-center justify-between">
//           <h2 className="text-lg font-bold text-white">Startup Initial Screening</h2>
//           <button
//             onClick={onClose}
//             className="text-slate-400 hover:text-white"
//             aria-label="Close"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         {/* Scrollable Form */}
//         <form onSubmit={handleSubmit} className="max-h-[85vh] overflow-y-auto p-6 space-y-6">
//           {/* 1. Startup Legal Name */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-1">
//               Startup Legal Name *
//             </label>
//             <input
//               type="text"
//               value={startupName}
//               onChange={(e) => setStartupName(e.target.value)}
//               className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//               placeholder="e.g., EcoBloom Sustainable Tech"
//               required
//             />
//           </div>

//           {/* 2. Industry */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-1">
//               Which industry/sector does your startup primarily operate in? *
//             </label>
//             <select
//               value={industry}
//               onChange={(e) => setIndustry(e.target.value)}
//               className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
//               required
//             >
//               <option value="">— Select —</option>
//               <option value="E-commerce/Retail">E-commerce/Retail</option>
//               <option value="HealthTech">HealthTech</option>
//               <option value="FinTech">FinTech</option>
//               <option value="EdTech">EdTech</option>
//               <option value="AI/ML">Artificial Intelligence</option>
//               <option value="CleanTech">CleanTech / Sustainability</option>
//               <option value="SaaS">SaaS</option>
//               <option value="Hardware">Hardware / IoT</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>

//           {/* 3. Website URL */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-1">
//               Website URL *
//             </label>
//             <input
//               type="url"
//               value={website}
//               onChange={(e) => setWebsite(e.target.value)}
//               className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//               placeholder="https://yourstartup.com"
//               required
//             />
//           </div>

//           {/* 4. Core Problem */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-1">
//               What is the core problem your startup is solving? *
//             </label>
//             <textarea
//               value={coreProblem}
//               onChange={(e) => setCoreProblem(e.target.value)}
//               rows={3}
//               className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//               placeholder="Describe the specific pain point or gap your startup addresses..."
//               required
//             />
//           </div>

//           {/* 5. Product Stage */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-2">
//               In which stage is your product currently? *
//             </label>
//             <div className="space-y-2">
//               {[
//                 { label: "Idea/Concept Only", value: "idea" },
//                 { label: "Prototype/MVP (Minimum Viable Product)", value: "mvp" },
//                 { label: "Early Traction/Pre-Revenue", value: "early" },
//                 { label: "Revenue Generating/Scaling", value: "revenue" },
//               ].map((opt) => (
//                 <label key={opt.value} className="flex items-center space-x-2">
//                   <input
//                     type="radio"
//                     name="productStage"
//                     value={opt.value}
//                     checked={productStage === opt.value}
//                     onChange={(e) => setProductStage(e.target.value)}
//                     className="text-emerald-600 focus:ring-emerald-500"
//                     required={opt.value === "idea"} // only required if first option selected
//                   />
//                   <span className="text-sm text-slate-200">{opt.label}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* 6. TAM */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-1">
//               What is the size of the Total Addressable Market (TAM) for your solution? (In USD) *
//             </label>
//             <input
//               type="text"
//               inputMode="numeric"
//               value={tamSize}
//               onChange={(e) => setTamSize(e.target.value.replace(/[^0-9.]/g, ""))}
//               className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//               placeholder="e.g., 5000000000 (for $5B)"
//               required
//             />
//             <p className="mt-1 text-xs text-slate-500">Enter numeric value. Use 0 if unknown.</p>
//           </div>

//           {/* 7. Team Description */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-1">
//               Please provide a brief description of your founding team's relevant experience and roles. *
//             </label>
//             <textarea
//               value={teamDescription}
//               onChange={(e) => setTeamDescription(e.target.value)}
//               rows={3}
//               className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//               placeholder="e.g., Founder A: ex-Google PM; Founder B: MD, clinical expert..."
//               required
//             />
//           </div>

//           {/* 8. Team Rating */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-1">
//               How would you rate the strength of your founding team? (1–5) *
//             </label>
//             <StarRating value={teamRating} onChange={setTeamRating} />
//             <p className="text-xs text-slate-400 mt-1">
//               ★ = Weak, ★★★★★ = Exceptional (e.g., serial founders, domain experts)
//             </p>
//           </div>

//           {/* 9. Funding Raised */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-2">
//               Have you raised any funding to date?
//             </label>
//             <div className="space-y-2">
//               {[
//                 { label: "No, self-funded only", value: "no" },
//                 { label: "Yes, Pre-Seed Round", value: "pre-seed" },
//                 { label: "Yes, Seed Round", value: "seed" },
//                 { label: "Yes, Series A or Later", value: "series-a+" },
//               ].map((opt) => (
//                 <label key={opt.value} className="flex items-center space-x-2">
//                   <input
//                     type="radio"
//                     name="fundingRaised"
//                     value={opt.value}
//                     checked={fundingRaised === opt.value}
//                     onChange={(e) => setFundingRaised(e.target.value)}
//                     className="text-emerald-600 focus:ring-emerald-500"
//                   />
//                   <span className="text-sm text-slate-200">{opt.label}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* 10. Next Funding Timeline */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-1">
//               What is the expected timeline for your next funding round?
//             </label>
//             <input
//               type="text"
//               value={nextFundingTimeline}
//               onChange={(e) => setNextFundingTimeline(e.target.value)}
//               placeholder="e.g., Q2 2026"
//               className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//             />
//           </div>

//           {/* 11. Traction Matrix */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-2">
//               How would you describe your current traction across the following metrics?
//             </label>
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead>
//                   <tr className="text-left text-slate-400 border-b border-slate-700">
//                     <th className="pb-2 pr-4">Metric</th>
//                     <th className="text-center pb-2 w-16">Poor</th>
//                     <th className="text-center pb-2 w-16">Fair</th>
//                     <th className="text-center pb-2 w-16">Good</th>
//                     <th className="text-center pb-2 w-20">Excellent</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {([
//                     { key: "acquisition", label: "Customer Acquisition Rate" },
//                     { key: "mrr", label: "Monthly Recurring Revenue (MRR)" },
//                     { key: "growth", label: "Growth" },
//                     { key: "retention", label: "Customer Retention / Churn Rate" },
//                     { key: "pfmFit", label: "Product/Market Fit Confidence" },
//                   ] as const).map(({ key, label }) => (
//                     <tr key={key} className="border-b border-slate-700">
//                       <td className="py-3 pr-4 text-slate-200 align-top">{label}</td>
//                       {(["poor", "fair", "good", "excellent"] as const).map((val) => (
//                         <td key={val} className="text-center py-3">
//                           <input
//                             type="radio"
//                             name={`traction-${key}`}
//                             checked={tractionMetrics[key] === val}
//                             onChange={() => setTraction(key, val)}
//                             className="w-4 h-4 text-emerald-600 bg-slate-700 border-slate-600 focus:ring-emerald-500"
//                           />
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* 12. Competitors */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-1">
//               Which three competitors currently pose the biggest threat to your business?
//             </label>
//             <textarea
//               value={competitors}
//               onChange={(e) => setCompetitors(e.target.value)}
//               rows={2}
//               className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//               placeholder="e.g., Competitor A, Competitor B, Competitor C"
//             />
//           </div>

//           {/* 13. Tech Defensibility */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-1">
//               How would you rate the defensibility of your technology/solution? (e.g., patents, proprietary data, network effects)
//             </label>
//             <StarRating value={techDefensibility} onChange={setTechDefensibility} />
//             <div className="flex justify-between text-xs text-slate-500 mt-1">
//               <span>Low Defensibility</span>
//               <span>High Defensibility</span>
//             </div>
//           </div>

//           {/* 14. Target Funding Range */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-1">
//               Which funding amount range are you targeting for your next round?
//             </label>
//             <select
//               value={targetFundingRange}
//               onChange={(e) => setTargetFundingRange(e.target.value)}
//               className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
//             >
//               <option value="">— Select —</option>
//               <option value="$100K–$500K">$100K – $500K</option>
//               <option value="$500K–$1M">$500K – $1M</option>
//               <option value="$1M–$3M">$1M – $3M</option>
//               <option value="$3M–$5M">$3M – $5M</option>
//               <option value="$5M+">$5M+</option>
//             </select>
//           </div>

//           {/* 15. GTM Strategy */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-2">
//               What is your primary go-to-market (GTM) strategy? (Select all that apply)
//             </label>
//             <div className="space-y-2">
//               {[
//                 { label: "Direct Sales", value: "direct" },
//                 { label: "Channel/Partnerships", value: "partnerships" },
//                 { label: "Content Marketing (e.g., SEO, Blog)", value: "content" },
//                 { label: "Freemium/Product-Led Growth (PLG)", value: "plg" },
//                 { label: "Affiliate Marketing", value: "affiliate" },
//                 { label: "Other", value: "other" },
//               ].map((opt) => (
//                 <label key={opt.value} className="flex items-start space-x-2">
//                   <input
//                     type="checkbox"
//                     checked={gtmStrategy.includes(opt.value)}
//                     onChange={() => toggleGtm(opt.value)}
//                     className="mt-1 text-emerald-600 focus:ring-emerald-500"
//                   />
//                   <span className="text-sm text-slate-200">{opt.label}</span>
//                 </label>
//               ))}
//             </div>
//             {gtmStrategy.includes("other") && (
//               <input
//                 type="text"
//                 value={gtmOther}
//                 onChange={(e) => setGtmOther(e.target.value)}
//                 placeholder="Please specify"
//                 className="mt-2 w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//               />
//             )}
//           </div>

//           {/* 16. Unfair Advantage */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-1">
//               Briefly describe your unfair advantage over your competitors.
//             </label>
//             <textarea
//               value={unfairAdvantage}
//               onChange={(e) => setUnfairAdvantage(e.target.value)}
//               rows={2}
//               className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//             />
//           </div>

//           {/* 17. Runway */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-1">
//               Which of the following best describes your startup's current financial runway? (months until you run out of capital)
//             </label>
//             <select
//               value={runwayMonths || ""}
//               onChange={(e) => setRunwayMonths(e.target.value || null)}
//               className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
//             >
//               <option value="">— Select —</option>
//               <option value="0–3 months">0–3 months</option>
//               <option value="3–6 months">3–6 months</option>
//               <option value="6–12 months">6–12 months</option>
//               <option value="12–18 months">12–18 months</option>
//               <option value="18+ months">18+ months</option>
//             </select>
//           </div>

//           {/* 18. Geo Focus */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-1">
//               What is your startup's primary geographical focus for expansion in the next 12–18 months?
//             </label>
//             <input
//               type="text"
//               value={geoFocus}
//               onChange={(e) => setGeoFocus(e.target.value)}
//               placeholder="e.g., India, Southeast Asia, Global"
//               className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//             />
//           </div>

//           {/* 19. Business Model Clarity */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-1">
//               On a scale of 1–5, how clear and scalable is your business model?
//             </label>
//             <StarRating value={businessModelClarity} onChange={setBusinessModelClarity} />
//             <div className="flex justify-between text-xs text-slate-500 mt-1">
//               <span>Very Unclear / Not Scalable</span>
//               <span>Very Clear / Highly Scalable</span>
//             </div>
//           </div>

//           {/* 20. Pitch Deck Upload */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-1">
//               Upload your Investor Pitch Deck (PDF preferred)
//             </label>
//             <div className="flex flex-col sm:flex-row sm:items-center gap-2">
//               <label className="flex items-center justify-center px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-md text-sm font-medium text-white cursor-pointer w-full sm:w-auto">
//                 <span>{pitchDeckFile ? "✓ File Selected" :  " Choose File"}</span>
//                 <input
//                   type="file"
//                   accept=".pdf"
//                   onChange={(e) => setPitchDeckFile(e.target.files?.[0] || null)}
//                   className="hidden"
//                 />
//               </label>
//               {pitchDeckFile && (
//                 <span className="text-xs text-slate-400 truncate max-w-xs">
//                   {pitchDeckFile.name}
//                 </span>
//               )}
//             </div>
//             <p className="mt-1 text-xs text-slate-500">Max 100 MB, PDF only</p>
//           </div>

//           {/* Submit Actions */}
//           <div className="pt-4 flex flex-col sm:flex-row sm:justify-end gap-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={uploading}
//               className={`px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-md flex items-center justify-center space-x-2 min-w-[120px] ${
//                 uploading ? "opacity-75 cursor-not-allowed" : ""
//               }`}
//             >
//               {uploading ? (
//                 <>
//                   <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
//                   <span>Submitting...</span>
//                 </>
//               ) : (
//                 <span>Submit Pitch</span>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default NewPitchModal;

// components/NewPitchModal.tsx
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const HOST = import.meta.env.VITE_BACKEND;

interface NewPitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const NewPitchModal = ({ isOpen, onClose }: NewPitchModalProps) => {
  const navigate = useNavigate();

  // Form state
  const [startupName, setStartupName] = useState("");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  const [coreProblem, setCoreProblem] = useState("");
  const [productStage, setProductStage] = useState("");
  const [tamSize, setTamSize] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [teamRating, setTeamRating] = useState<number | null>(null);
  const [fundingRaised, setFundingRaised] = useState<string | null>(null);
  const [nextFundingTimeline, setNextFundingTimeline] = useState("");
  const [tractionMetrics, setTractionMetrics] = useState<{
    acquisition: string;
    mrr: string;
    growth: string;
    retention: string;
    pfmFit: string;
  }>({
    acquisition: "",
    mrr: "",
    growth: "",
    retention: "",
    pfmFit: "",
  });
  const [competitors, setCompetitors] = useState("");
  const [techDefensibility, setTechDefensibility] = useState<number | null>(
    null
  );
  const [targetFundingRange, setTargetFundingRange] = useState("");
  const [gtmStrategy, setGtmStrategy] = useState<string[]>([]);
  const [gtmOther, setGtmOther] = useState("");
  const [unfairAdvantage, setUnfairAdvantage] = useState("");
  const [runwayMonths, setRunwayMonths] = useState<string | null>(null);
  const [geoFocus, setGeoFocus] = useState("");
  const [businessModelClarity, setBusinessModelClarity] = useState<
    number | null
  >(null);
  const [pitchDeckFile, setPitchDeckFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const saveDraftTimeout = useRef<number | null>(null);
  const localStorageKey = "pitch_form_draft";

  // ─── Helpers: Draft Persistence ─────────────────────────────────────────────
  const saveDraft = () => {
    const draft = {
      startupName,
      industry,
      website,
      coreProblem,
      productStage,
      tamSize,
      teamDescription,
      teamRating,
      fundingRaised,
      nextFundingTimeline,
      tractionMetrics,
      competitors,
      techDefensibility,
      targetFundingRange,
      gtmStrategy,
      gtmOther,
      unfairAdvantage,
      runwayMonths,
      geoFocus,
      businessModelClarity,
      // Note: pitchDeckFile is NOT saved — files can't be stored in localStorage
    };
    try {
      localStorage.setItem(localStorageKey, JSON.stringify(draft));
    } catch (e) {
      console.warn("Failed to save draft to localStorage", e);
    }
  };

  const loadDraft = () => {
    try {
      const saved = localStorage.getItem(localStorageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Only restore if form appears empty (likely fresh open after reload)
        if (!startupName && !industry && !website) {
          setStartupName(parsed.startupName || "");
          setIndustry(parsed.industry || "");
          setWebsite(parsed.website || "");
          setCoreProblem(parsed.coreProblem || "");
          setProductStage(parsed.productStage || "");
          setTamSize(parsed.tamSize || "");
          setTeamDescription(parsed.teamDescription || "");
          setTeamRating(parsed.teamRating ?? null);
          setFundingRaised(parsed.fundingRaised ?? null);
          setNextFundingTimeline(parsed.nextFundingTimeline || "");
          setTractionMetrics(
            parsed.tractionMetrics || {
              acquisition: "",
              mrr: "",
              growth: "",
              retention: "",
              pfmFit: "",
            }
          );
          setCompetitors(parsed.competitors || "");
          setTechDefensibility(parsed.techDefensibility ?? null);
          setTargetFundingRange(parsed.targetFundingRange || "");
          setGtmStrategy(parsed.gtmStrategy || []);
          setGtmOther(parsed.gtmOther || "");
          setUnfairAdvantage(parsed.unfairAdvantage || "");
          setRunwayMonths(parsed.runwayMonths ?? null);
          setGeoFocus(parsed.geoFocus || "");
          setBusinessModelClarity(parsed.businessModelClarity ?? null);
          // pitchDeckFile remains null — user must re-upload
        }
      }
    } catch (e) {
      console.warn("Failed to load draft", e);
    }
  };

  // Auto-save draft (debounced)
  useEffect(() => {
    if (saveDraftTimeout.current) {
      clearTimeout(saveDraftTimeout.current);
    }
    saveDraftTimeout.current = setTimeout(saveDraft, 1000);
    return () => {
      if (saveDraftTimeout.current) {
        clearTimeout(saveDraftTimeout.current);
      }
    };
  }, [
    startupName,
    industry,
    website,
    coreProblem,
    productStage,
    tamSize,
    teamDescription,
    teamRating,
    fundingRaised,
    nextFundingTimeline,
    tractionMetrics,
    competitors,
    techDefensibility,
    targetFundingRange,
    gtmStrategy,
    gtmOther,
    unfairAdvantage,
    runwayMonths,
    geoFocus,
    businessModelClarity,
  ]);

  // ─── Reset or Restore on Modal Open ────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      // Attempt to restore draft only if form is empty
      if (!startupName && !industry && !website) {
        loadDraft();
      }
    }
  }, [isOpen]);

  // ─── Close on Escape / Click Outside ───────────────────────────────────────
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  // ─── Validation ─────────────────────────────────────────────────────────────
  const validate = () => {
    const required = [
      { name: "Startup Legal Name", value: startupName.trim() },
      { name: "Industry", value: industry },
      { name: "Website URL", value: website.trim() },
      { name: "Core Problem", value: coreProblem.trim() },
      { name: "Product Stage", value: productStage },
      { name: "TAM", value: tamSize },
      { name: "Team Description", value: teamDescription.trim() },
      { name: "Team Rating", value: teamRating !== null },
    ];

    for (const { name, value } of required) {
      if (!value) {
        toast.error(`${name} is required`);
        return false;
      }
    }

    return true;
  };

  // ─── Helpers ────────────────────────────────────────────────────────────────
  const setTraction = (key: keyof typeof tractionMetrics, val: string) => {
    setTractionMetrics((prev) => ({ ...prev, [key]: val }));
  };

  const toggleGtm = (val: string) => {
    setGtmStrategy((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  // ─── Star Rating Component ──────────────────────────────────────────────────
  const StarRating = ({
    value,
    onChange,
    max = 5,
  }: {
    value: number | null;
    onChange: (n: number) => void;
    max?: number;
  }) => {
    const [hover, setHover] = useState<number | null>(null);
    return (
      <div className="flex space-x-1">
        {[...Array(max)].map((_, i) => {
          const rating = i + 1;
          const showActive = (hover || value || 0) >= rating;
          return (
            <button
              key={rating}
              type="button"
              onClick={() => onChange(rating)}
              onMouseEnter={() => setHover(rating)}
              onMouseLeave={() => setHover(null)}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-lg ${
                showActive
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-700 text-slate-400 hover:bg-slate-600"
              }`}
              aria-label={`Rate ${rating} stars`}
            >
              ★
            </button>
          );
        })}
      </div>
    );
  };

  // ─── Submit Handler ────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setUploading(true);

      const user_id = localStorage.getItem("usr");
      if (!user_id) {
        toast.error("User not logged in");
        return;
      }

      const cleanUrl = website.trim();
      const fullUrl = cleanUrl.startsWith("http")
        ? cleanUrl
        : `https://${cleanUrl}`;

      const payload = {
        user_id,
        startup_legal_name: startupName.trim(),
        industry_sector: industry,
        website_url: fullUrl,
        core_problem: coreProblem.trim(),
        product_stage: productStage,
        tam_usd: tamSize,
        team_description: teamDescription.trim(),
        team_rating: teamRating,
        funding_raised: fundingRaised,
        next_funding_timeline: nextFundingTimeline || null,
        traction: {
          customer_acquisition: tractionMetrics.acquisition,
          mrr: tractionMetrics.mrr,
          growth: tractionMetrics.growth,
          retention: tractionMetrics.retention,
          product_market_fit: tractionMetrics.pfmFit,
        },
        competitors: competitors.trim() || null,
        tech_defensibility: techDefensibility,
        target_funding_range: targetFundingRange || null,
        gtm_strategy:
          gtmStrategy.includes("other") && gtmOther
            ? [...gtmStrategy.filter((v) => v !== "other"), gtmOther]
            : gtmStrategy,
        unfair_advantage: unfairAdvantage.trim() || null,
        runway_months: runwayMonths,
        geo_focus: geoFocus.trim() || null,
        business_model_clarity: businessModelClarity,
      };

      let body: string | FormData;
      let headers: HeadersInit = {};

      if (pitchDeckFile) {
        const fd = new FormData();
        fd.append("data", JSON.stringify(payload));
        fd.append("pitch_deck", pitchDeckFile);
        body = fd;
      } else {
        body = JSON.stringify(payload);
        headers = {
          "Content-Type": "application/json",
        };
      }

      const res = await fetch(`${HOST}/startup/create`, {
        method: "POST",
        headers,
        body,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Submission failed");
      }

      // ✅ Clear draft on successful submission
      localStorage.removeItem(localStorageKey);

      toast.success("✅ Pitch submitted successfully!");
      onClose();
      navigate("/dashboard/videocall", {
  state: {
    pitchDeckUrl: data.startup.pitch_deck_url,
    org_id: data.startup.org_id
  }
});

    } catch (err: any) {
      console.error("Submission failed:", err);
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-2 md:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div
        ref={modalRef}
        className="w-full mt-[80px] max-w-3xl bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="bg-slate-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            Startup Initial Screening
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
            aria-label="Close"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable Form */}
        <form
          onSubmit={handleSubmit}
          className="max-h-[75vh] overflow-y-auto p-6 space-y-6"
        >
          {/* 1. Startup Legal Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Startup Legal Name *
            </label>
            <input
              type="text"
              value={startupName}
              onChange={(e) => setStartupName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g., EcoBloom Sustainable Tech"
              required
            />
          </div>

          {/* 2. Industry */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Which industry/sector does your startup primarily operate in? *
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            >
              <option value="">— Select —</option>
              <option value="E-commerce/Retail">E-commerce/Retail</option>
              <option value="HealthTech">HealthTech</option>
              <option value="FinTech">FinTech</option>
              <option value="EdTech">EdTech</option>
              <option value="AI/ML">Artificial Intelligence</option>
              <option value="CleanTech">CleanTech / Sustainability</option>
              <option value="SaaS">SaaS</option>
              <option value="Hardware">Hardware / IoT</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* 3. Website URL */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Website URL *
            </label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="https://yourstartup.com"
              required
            />
          </div>

          {/* 4. Core Problem */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              What is the core problem your startup is solving? *
            </label>
            <textarea
              value={coreProblem}
              onChange={(e) => setCoreProblem(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Describe the specific pain point or gap your startup addresses..."
              required
            />
          </div>

          {/* 5. Product Stage */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              In which stage is your product currently? *
            </label>
            <div className="space-y-2">
              {[
                { label: "Idea/Concept Only", value: "Idea/Concept Only" },
                {
                  label: "Prototype/MVP (Minimum Viable Product)",
                  value: "Prototype/MVP (Minimum Viable Product)",
                },
                {
                  label: "Early Traction/Pre-Revenue",
                  value: "Early Traction/Pre-Revenue",
                },
                {
                  label: "Revenue Generating/Scaling",
                  value: "Revenue Generating/Scaling",
                },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="productStage"
                    value={opt.value}
                    checked={productStage === opt.value}
                    onChange={(e) => setProductStage(e.target.value)}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-slate-200">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 6. TAM */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              What is the size of the Total Addressable Market (TAM) for your
              solution? *
            </label>
            <input
              type="text"
              inputMode="text"
              value={tamSize}
              onChange={(e) => setTamSize(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g., 5000000000 (for $5B)"
              required
            />
            <p className="mt-1 text-xs text-slate-500">
              Enter numeric value. Use 0 if unknown.
            </p>
          </div>

          {/* 7. Team Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Please provide a brief description of your founding team's
              relevant experience and roles. *
            </label>
            <textarea
              value={teamDescription}
              onChange={(e) => setTeamDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g., Founder A: ex-Google PM; Founder B: MD, clinical expert..."
              required
            />
          </div>

          {/* 8. Team Rating */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              How would you rate the strength of your founding team? (1–5) *
            </label>
            <StarRating value={teamRating} onChange={setTeamRating} />
            <p className="text-xs text-slate-400 mt-1">
              ★ = Weak, ★★★★★ = Exceptional (e.g., serial founders, domain
              experts)
            </p>
          </div>

          {/* 9. Funding Raised */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Have you raised any funding to date?
            </label>
            <div className="space-y-2">
              {[
                { label: "No, self-funded only", value: "self-funded only" },
                { label: "Yes, Pre-Seed Round", value: "Pre-Seed Round" },
                { label: "Yes, Seed Round", value: "Seed Round" },
                { label: "Yes, Series A or Later", value: "Series A or Later" },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="fundingRaised"
                    value={opt.value}
                    checked={fundingRaised === opt.value}
                    onChange={(e) => setFundingRaised(e.target.value)}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-slate-200">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 10. Next Funding Timeline */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              What is the expected timeline for your next funding round?
            </label>
            <input
              type="text"
              value={nextFundingTimeline}
              onChange={(e) => setNextFundingTimeline(e.target.value)}
              placeholder="e.g., Q2 2026"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* 11. Traction Matrix */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              How would you describe your current traction across the following
              metrics?
            </label>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-400 border-b border-slate-700">
                    <th className="pb-2 pr-4">Metric</th>
                    <th className="text-center pb-2 w-14">Excellent</th>
                    <th className="text-center pb-2 w-14">Good</th>
                    <th className="text-center pb-2 w-14">Fair</th>
                    <th className="text-center pb-2 w-14">Poor</th>
                    <th className="text-center pb-2 w-24">Not Applicable</th>
                  </tr>
                </thead>
                <tbody>
                  {(
                    [
                      {
                        key: "acquisition",
                        label: "Customer Acquisition Rate",
                      },
                      { key: "mrr", label: "Monthly Recurring Revenue (MRR)" },
                      { key: "growth", label: "Growth" },
                      {
                        key: "retention",
                        label: "Customer Retention / Churn Rate",
                      },
                      { key: "pfmFit", label: "Product/Market Fit Confidence" },
                    ] as const
                  ).map(({ key, label }) => (
                    <tr key={key} className="border-b border-slate-700">
                      <td className="py-3 pr-4 text-slate-200 align-top">
                        {label}
                      </td>
                      {(
                        [
                          "excellent",
                          "good",
                          "fair",
                          "poor",
                          "not_applicable",
                        ] as const
                      ).map((val) => (
                        <td key={val} className="text-center py-3">
                          <input
                            type="radio"
                            name={`traction-${key}`}
                            value={val}
                            checked={tractionMetrics[key] === val}
                            onChange={() => setTraction(key, val)}
                            className="w-4 h-4 text-emerald-600 bg-slate-700 border-slate-600 focus:ring-emerald-500"
                            aria-label={`${val} for ${label}`}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 12. Competitors */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Which three competitors currently pose the biggest threat to your
              business?
            </label>
            <textarea
              value={competitors}
              onChange={(e) => setCompetitors(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g., Competitor A, Competitor B, Competitor C"
            />
          </div>

          {/* 13. Tech Defensibility */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              How would you rate the defensibility of your technology/solution?
              (e.g., patents, proprietary data, network effects)
            </label>
            <StarRating
              value={techDefensibility}
              onChange={setTechDefensibility}
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>Low Defensibility</span>
              <span>High Defensibility</span>
            </div>
          </div>

          {/* 14. Target Funding Range */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Which funding amount range are you targeting for your next round?
            </label>
            <select
              value={targetFundingRange}
              onChange={(e) => setTargetFundingRange(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">— Select —</option>
              <option value="$100K–$500K">$100K – $500K</option>
              <option value="$500K–$1M">$500K – $1M</option>
              <option value="$1M–$3M">$1M – $3M</option>
              <option value="$3M–$5M">$3M – $5M</option>
              <option value="$5M+">$5M+</option>
            </select>
          </div>

          {/* 15. GTM Strategy */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              What is your primary go-to-market (GTM) strategy? (Select all that
              apply)
            </label>
            <div className="space-y-2">
              {[
                { label: "Direct Sales", value: "Direct Sales" },
                {
                  label: "Channel/Partnerships",
                  value: "Channel/Partnerships",
                },
                {
                  label: "Content Marketing (e.g., SEO, Blog)",
                  value: "Content Marketing",
                },
                {
                  label: "Freemium/Product-Led Growth (PLG)",
                  value: "Freemium/Product-Led Growth",
                },
                { label: "Affiliate Marketing", value: "Affiliate Marketing" },
                { label: "Other", value: "other" },
              ].map((opt) => (
                <label key={opt.value} className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    checked={gtmStrategy.includes(opt.value)}
                    onChange={() => toggleGtm(opt.value)}
                    className="mt-1 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-slate-200">{opt.label}</span>
                </label>
              ))}
            </div>
            {gtmStrategy.includes("other") && (
              <input
                type="text"
                value={gtmOther}
                onChange={(e) => setGtmOther(e.target.value)}
                placeholder="Please specify"
                className="mt-2 w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            )}
          </div>

          {/* 16. Unfair Advantage */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Briefly describe your unfair advantage over your competitors.
            </label>
            <textarea
              value={unfairAdvantage}
              onChange={(e) => setUnfairAdvantage(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* 17. Runway */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Which of the following best describes your startup's current
              financial runway? (months until you run out of capital)
            </label>
            <select
              value={runwayMonths || ""}
              onChange={(e) => setRunwayMonths(e.target.value || null)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">— Select —</option>
              <option value="0–3 months">0–3 months</option>
              <option value="3–6 months">3–6 months</option>
              <option value="6–12 months">6–12 months</option>
              <option value="12–18 months">12–18 months</option>
              <option value="18+ months">18+ months</option>
            </select>
          </div>

          {/* 18. Geo Focus */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              What is your startup's primary geographical focus for expansion in
              the next 12–18 months?
            </label>
            <input
              type="text"
              value={geoFocus}
              onChange={(e) => setGeoFocus(e.target.value)}
              placeholder="e.g., India, Southeast Asia, Global"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* 19. Business Model Clarity */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              On a scale of 1–5, how clear and scalable is your business model?
            </label>
            <StarRating
              value={businessModelClarity}
              onChange={setBusinessModelClarity}
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>Very Unclear / Not Scalable</span>
              <span>Very Clear / Highly Scalable</span>
            </div>
          </div>

          {/* 20. Pitch Deck Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Upload your Investor Pitch Deck
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="flex items-center justify-center px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-md text-sm font-medium text-white cursor-pointer w-full sm:w-auto">
                <span>
                  {pitchDeckFile ? "✓ File Selected" : " Choose File"}
                </span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,image/jpeg,image/png,image/webp"
                  onChange={(e) =>
                    setPitchDeckFile(e.target.files?.[0] || null)
                  }
                  className="hidden"
                  required
                />
              </label>
              {pitchDeckFile && (
                <span className="text-xs text-slate-400 truncate max-w-xs">
                  {pitchDeckFile.name}
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-slate-500">Max 100 MB</p>
          </div>

          {/* Submit Actions */}
          <div className="pt-4 flex flex-col sm:flex-row sm:justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem(localStorageKey);

                setStartupName("");
                setIndustry("");
                setWebsite("");
                setCoreProblem("");
                setProductStage("");
                setTamSize("");
                setTeamDescription("");
                setTeamRating(null);
                setFundingRaised(null);
                setNextFundingTimeline("");
                setTractionMetrics({
                  acquisition: "",
                  mrr: "",
                  growth: "",
                  retention: "",
                  pfmFit: "",
                });
                setCompetitors("");
                setTechDefensibility(null);
                setTargetFundingRange("");
                setGtmStrategy([]);
                setGtmOther("");
                setUnfairAdvantage("");
                setRunwayMonths(null);
                setGeoFocus("");
                setBusinessModelClarity(null);
                setPitchDeckFile(null);

                onClose();
              }}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className={`px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-md flex items-center justify-center space-x-2 min-w-[120px] ${
                uploading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {uploading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Submit Pitch</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPitchModal;
