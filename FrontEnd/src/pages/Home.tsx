// // import { MessageCircle, ArrowDown, ChevronDown, ChevronUp } from "lucide-react";
// // import logo from "../assets/logo2.png";
// // import video from "../assets/video.mp4";
// // import { NavLink } from "react-router-dom";
// // import { useState } from "react";
// // import Ananya from "../assets/AnanyaGupta.png";
// // import Priya from "../assets/PriyaMehta.png";
// // import Rajeev from "../assets/RajeevKhanna.png";
// // import Vikram from "../assets/VikramDesai.png";
// // import vineet from "../assets/VineetSharma.png";
// // import Faq  from "../assets/Faq.png";
// // import { CheckCircle, Star, StarHalf } from "lucide-react";

// // type FAQItem = {
// //   question: string;
// //   answer: string;
// // };

// // interface Plan {
// //   name: string;
// //   price: string;
// //   period: string;
// //   description: string;
// //   features: string[];
// //   cta: string;
// //   popular: boolean;
// // }

// // const plans: Plan[] = [
// //   {
// //     name: "Starter",
// //     price: "$29",
// //     period: "/month",
// //     description: "Perfect for solo founders testing the waters.",
// //     features: [
// //       "1 Pitch Deck Review",
// //       "Basic Storyboard",
// //       "Email Support",
// //       "Community Access",
// //     ],
// //     cta: "Get Started",
// //     popular: false,
// //   },
// //   {
// //     name: "Growth",
// //     price: "$99",
// //     period: "/month",
// //     description: "Ideal for early-stage startups preparing for funding.",
// //     features: [
// //       "3 Pitch Deck Reviews",
// //       "Advanced Storyboard + Script",
// //       "1:1 Strategy Call (30 min)",
// //       "Investor Q&A Prep",
// //       "Priority Support",
// //     ],
// //     cta: "Most Popular",
// //     popular: true,
// //   },
// //   {
// //     name: "Enterprise",
// //     price: "Custom",
// //     period: "",
// //     description: "Tailored for scaling teams and institutional use.",
// //     features: [
// //       "Unlimited Reviews",
// //       "Full Pitch Suite (Deck, Video, Script)",
// //       "Dedicated Account Manager",
// //       "Custom Workshops & Training",
// //       "SLA & API Access",
// //     ],
// //     cta: "Contact Sales",
// //     popular: false,
// //   },
// // ];

// // const faqData: FAQItem[] = [
// //   {
// //     question: "How accurate is the AI score?",
// //     answer:
// //       "Our scoring model is trained on 10,000+ pitch decks reviewed by top VCs and accelerators (YC, Techstars, etc.). It achieves 92% alignment with human expert ratings on structure, clarity, and investor-readiness.",
// //   },
// //   {
// //     question: "Can I use voice or video?",
// //     answer:
// //       "Currently, we support text-based pitches (written decks). Voice/video pitch analysis is in beta — sign up for early access on our roadmap page!",
// //   },
// //   {
// //     question: "Is my data private?",
// //     answer:
// //       "Yes. All your pitch content is end-to-end encrypted and never used to train public models. We comply with GDPR and SOC 2. You own your data — and can delete it anytime.",
// //   },
// //   {
// //     question: "Why is data privacy important?",
// //     answer:
// //       "Early-stage ideas are sensitive. We believe founders should share only what they choose — with whom they choose. Your pitch remains confidential unless you explicitly export or share it.",
// //   },
// //   {
// //     question: "Who is this for?",
// //     answer:
// //       "Founders (pre-seed to Series A), startup accelerators, university entrepreneurship programs, and pitch coaches who want objective, scalable feedback.",
// //   },
// // ];

// // const Home = () => {
// //   const [openIndex, setOpenIndex] = useState<number | null>(null);

// //   const toggleQuestion = (index: number) => {
// //     setOpenIndex(openIndex === index ? null : index);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Navigation */}

// //       <div className="flex flex-col">
// //         {/* Left Dark Section */}
// //         <div className="w-full min-h-screen bg-[#0b1020] px-0 py-12 mt-10 pb-0">
// //           {/* Hero Section */}
// //           <div className="w-full bg-[#0b1020] py-16 px-12">
// //             <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-16">
// //               {/* LEFT SECTION */}
// //               <div className="flex-1">
// //                 <div className="flex items-center gap-4 mb-8">
// //                   <img
// //                     src={logo}
// //                     alt="HireArena Brand"
// //                     className="h-24 md:h-28"
// //                   />
// //                   <div>
// //                     <h2 className="text-white text-4xl md:text-5xl font-semibold">
// //                       HireArena
// //                     </h2>
// //                     <p className="text-base md:text-lg text-gray-400">
// //                       Simulate. Score. Succeed.
// //                     </p>
// //                   </div>
// //                 </div>

// //                 <h1 className="text-white text-2xl md:text-3xl leading-tight mb-8">
// //                   Practice your investor pitch with AI <br />
// //                   avatars that think like VC
// //                 </h1>

// //                 <div className="flex gap-5 mt-8">
// //                   {/* Primary */}
// //                   <NavLink
// //                     to="/login"
// //                     className="
// //         px-8 py-4 rounded-xl text-white text-lg font-medium
// //         bg-gradient-to-r from-cyan-400 to-purple-500
// //         shadow-lg
// //         transition-all duration-500 ease-in-out
// //         hover:from-purple-500 hover:to-cyan-400
// //         hover:scale-[1.05]
// //         hover:shadow-purple-500/40
// //       "
// //                   >
// //                     Try HireArena
// //                   </NavLink>

// //                   {/* Secondary */}
// //                   <button
// //                     className="
// //         px-8 py-4 rounded-xl text-white text-lg font-medium
// //         bg-gradient-to-r from-purple-500 to-cyan-400
// //         shadow-lg
// //         transition-all duration-500 ease-in-out
// //         hover:from-cyan-400 hover:to-purple-500
// //         hover:scale-[1.05]
// //         hover:shadow-cyan-400/40
// //       "
// //                   >
// //                     Watch Demo
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* RIGHT SECTION - AI CHAT UI */}
// //               <div className="relative flex items-center justify-center w-[380px] h-[400px]">
// //                 {/* ✅ Background video behind hero */}
// //                 <video
// //                   src={video}
// //                   autoPlay
// //                   loop
// //                   muted
// //                   playsInline
// //                   className="
// //     absolute
// //     top-[169px] left-[105px]
// //     -translate-x-1/2 -translate-y-1/2
// //     w-[900px] h-auto
// //     scale-150
// //     object-contain
// //     opacity-80
// //     pointer-events-none
// //     z-0
// //   "
// //                 />
// //               </div>
// //             </div>
// //           </div>
// //           <div className="bg-[#2c303c] px-0 py-12">
// //             {/* Features Section */}
// //             <div className="mb-20 px-12">
// //               <h2 className="text-white text-3xl mb-8">Features</h2>
// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
// //                 {/* Card 1 */}
// //                 <div className="bg-[#0B1020] rounded-2xl p-8 border border-gray-800 max-w-sm hover:border-cyan-500/40 transition-all duration-300 mx-auto shadow-lg hover:shadow-cyan-500/20">
// //                   {/* Header: Icon + Title */}
// //                   <div className="flex items-center space-x-4 mb-4">
// //                     <div className="w-10 h-10 bg-blue-900/50 rounded-lg flex items-center justify-center">
// //                       <MessageCircle className="w-5 h-5 text-cyan-400" />
// //                     </div>
// //                     <h3 className="text-white text-xl font-semibold">
// //                       AI Avatar Simulation
// //                     </h3>
// //                   </div>

// //                   {/* Description */}
// //                   <p className="text-gray-400 text-base leading-relaxed mt-4">
// //                     Practice pitches with lifelike investor avatars  get real-time verbal & non-verbal feedback.
// //                   </p>
// //                 </div>

// //                 {/* Card 2 */}
// //                 <div className="bg-[#0B1020] rounded-2xl p-8 border border-gray-800 max-w-sm hover:border-cyan-500/40 transition-all duration-300 mx-auto shadow-lg hover:shadow-cyan-500/20">
// //                   {/* Header: Icon + Title */}
// //                   <div className="flex items-center space-x-4 mb-4">
// //                     <div className="w-10 h-10 bg-blue-900/50 rounded-lg flex items-center justify-center">
// //                       <div className="w-5 h-5 border-2 border-cyan-400 rounded"></div>
// //                     </div>
// //                     <h3 className="text-white text-xl font-semibold">
// //                       AI Investor Maraubot
// //                     </h3>
// //                   </div>

// //                   {/* Description */}
// //                   <p className="text-gray-400 text-base leading-relaxed mt-4">
// //                     Get instant & powerful data-modeled review of your recent
// //                     recorded interview.
// //                   </p>
// //                 </div>

// //                 {/* Card 3 */}
// //                 <div className="bg-[#0B1020] rounded-2xl p-8 border border-gray-800 max-w-sm hover:border-purple-400/40 transition-all duration-300 mx-auto shadow-lg hover:shadow-purple-400/20">
// //                   {/* Header: Icon + Title */}
// //                   <div className="flex items-center space-x-4 mb-4">
// //                     <div className="w-10 h-10 bg-purple-900/50 rounded-lg flex items-center justify-center">
// //                       <div className="w-5 h-5 border-2 border-purple-400 rounded"></div>
// //                     </div>
// //                     <h3 className="text-white text-xl font-semibold">
// //                       Pitch Deck Analyzer
// //                     </h3>
// //                   </div>

// //                   {/* Description */}
// //                   <p className="text-gray-400 text-base leading-relaxed mt-4">
// //                     Get detailed AI-powered analysis of improvement points
// //                     across each slide.
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* AI Investor Panel */}
// //             <div className="mb-20 px-12">
// //               <h2 className="text-white text-3xl mb-8">Meet your AI Judge</h2>
// //               <div className="flex gap-4 overflow-x-auto no-scrollbar">
// //                 {[
// //                   {
// //                     name: "ANANYA GUPTA",
// //                     subtitle: "Analyst",
// //                     desc: "Financial metrics",
// //                     number: "1",
// //                     color: "bg-gradient-to-b from-cyan-400 to-blue-500",

// //                     image: Ananya,
// //                   },
// //                   {
// //                     name: "RAJEEV KHANNA",
// //                     subtitle: "Visionary",
// //                     desc: "Tech & innovation",
// //                     number: "2",
// //                     color: "bg-gradient-to-b from-green-400 to-green-600",
// //                     image: Rajeev,
// //                   },
// //                   {
// //                     name: "PRIYA MEHTA",
// //                     subtitle: "Empath",
// //                     desc: "Founder clarity & storytelling",
// //                     number: "3",
// //                     color: "bg-gradient-to-b from-orange-400 to-orange-600",
// //                     image: Priya,
// //                   },
// //                   {
// //                     name: "VIKRAM DESAI",
// //                     subtitle: "Globalist",
// //                     desc: "scalability &  expansion",
// //                     number: "4",
// //                     color: "bg-gradient-to-b from-purple-400 to-purple-600",
// //                     image: Vikram,
// //                   },
// //                   {
// //                     name: "VINEET SHARMA",
// //                     subtitle: " Strategist",
// //                     desc: "Market & defensibility",
// //                     number: "5",
// //                     color: "bg-gradient-to-b from-blue-400 to-purple-600",
// //                     image: vineet,
// //                   },
// //                 ].map((investor, i) => (
// //                   <div
// //                     key={i}
// //                     className="bg-[#0B1020] rounded-xl p-6 text-center border border-gray-800 relative w-64 hover:border-purple-400/40 transition-all duration-300 mx-auto shadow-lg hover:shadow-purple-400/20"
// //                   >
// //                     <div className="mb-4">
// //                       <div
// //                         className={`w-20 h-20 mx-auto rounded-full ${investor.color} flex items-center justify-center`}
// //                       >
// //                         <img
// //                           src={investor.image}
// //                           alt={investor.name}
// //                           className="w-16 h-16 rounded-full object-cover"
// //                         />
// //                       </div>
// //                     </div>
// //                     <h3 className="text-white mb-1">{investor.name}</h3>
// //                     <p className="text-gray-400 text-sm mb-1">
// //                       {investor.subtitle}
// //                     </p>
// //                     <p className="text-gray-500 text-xs">{investor.desc}</p>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Scoring System */}
// //             <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-[#2c303c]">
// //               {/* Hero Section */}
// //               <div className="max-w-4xl mx-auto text-center mb-16">
// //                 <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
// //                   Simple, Transparent Pricing
// //                 </h1>
// //                 <p className="text-lg text-white max-w-2xl mx-auto">
// //                   Choose the plan that fits your startup journey. No hidden fees
// //                   — ever.
// //                 </p>
// //               </div>

// //               {/* Plans Grid */}
// //               <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
// //                 {plans.map((plan, index) => (
// //                   <div
// //                     key={index}
// //                     className={`relative bg-[#3a3f50] rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
// //                       plan.popular ? "ring-2 ring-blue-400 scale-[1.02]" : ""
// //                     }`}
// //                   >
// //                     {plan.popular && (
// //                       <div className="absolute pt-9 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
// //                         <span className="bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center">
// //                           <Star className="w-3 h-3 mr-1" />
// //                           MOST POPULAR
// //                         </span>
// //                       </div>
// //                     )}

// //                     <div className="p-8">
// //                       <h3 className="text-2xl font-bold text-white mb-2">
// //                         {plan.name}
// //                       </h3>
// //                       <p className="text-gray-300 mb-6">{plan.description}</p>

// //                       <div className="flex items-baseline mb-6">
// //                         <span className="text-4xl font-extrabold text-white">
// //                           {plan.price}
// //                         </span>
// //                         {plan.period && (
// //                           <span className="text-gray-400 ml-2">
// //                             {plan.period}
// //                           </span>
// //                         )}
// //                       </div>

// //                       <ul className="space-y-4 mb-8">
// //                         {plan.features.map((feature, i) => (
// //                           <li key={i} className="flex items-start">
// //                             <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0 mr-3" />
// //                             <span className="text-gray-200">{feature}</span>
// //                           </li>
// //                         ))}
// //                       </ul>

// //                       <button
// //                         className={`w-full py-3 px-4 rounded-xl font-semibold transition-colors ${
// //                           plan.popular
// //                             ? "bg-blue-600 hover:bg-blue-700 text-white"
// //                             : plan.name === "Enterprise"
// //                             ? "bg-blue-600 hover:bg-gray-900 text-white"
// //                             : "bg-blue-600 hover:bg-[#555b70] text-white"
// //                         }`}
// //                       >
// //                         {plan.cta}
// //                       </button>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>

// //               {/* CTA Banner */}
// //               {/* <div className="mt-20 max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center text-white">
// //                  <h3 className="text-2xl font-bold mb-4">Ready to impress investors?</h3>
// //                  <p className="opacity-90 mb-6 max-w-2xl mx-auto">
// //                    Join 2,500+ founders who’ve raised over $500M using our pitch tools.
// //                  </p>
// //                  <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors">
// //                    Start Free Trial
// //                  </button>
// //                </div> */}
// //             </div>

// //             {/* Footer */}
// //           </div>
// //         </div>
// //         {/* Right Light Section */}
// //         <div className="w-full bg-gray-50 px-8 pt-12 mt-2">
// //           {/* Trust Section */}
// //           <div className="mb-20 text-center">
// //             {/* Heading */}
// //             <p className="text-gray-900 mb-10 leading-snug font-bold text-3xl md:text-4xl">
// //               Trusted by accelerators, universities, and{" "}
// //               <br className="hidden md:block" />
// //               venture networks.
// //             </p>

// //             {/* Logo Row */}
// //             <div className="flex flex-wrap justify-center items-center gap-6 mb-10">
// //               {/* T-Hub */}
// //               <div className="flex items-center gap-3 px-6 py-3 border border-gray-300 rounded-xl text-base text-gray-800 bg-white shadow-sm hover:shadow-md hover:border-cyan-400 transition-all duration-300 hover:scale-[1.03]">
// //                 <span className="w-6 h-6 bg-orange-500 rounded-full inline-block"></span>
// //                 T-Hub
// //               </div>

// //               {/* NASSCOM */}
// //               <div className="flex items-center gap-3 px-6 py-3 border border-gray-300 rounded-xl text-base text-gray-800 bg-white shadow-sm hover:shadow-md hover:border-cyan-400 transition-all duration-300 hover:scale-[1.03]">
// //                 <span className="w-5 h-5 bg-blue-600 rounded-full inline-block"></span>
// //                 NASSCOM
// //               </div>

// //               {/* AngelNet */}
// //               <div className="flex items-center gap-3 px-6 py-3 border border-gray-300 rounded-xl text-base text-gray-800 bg-white shadow-sm hover:shadow-md hover:border-cyan-400 transition-all duration-300 hover:scale-[1.03]">
// //                 <span className="w-5 h-5 bg-red-500 rounded-full inline-block"></span>
// //                 AngelNet
// //               </div>

// //               {/* E-Cell */}
// //               <div className="flex items-center gap-3 px-6 py-3 border border-gray-300 rounded-xl text-base text-gray-800 bg-white shadow-sm hover:shadow-md hover:border-cyan-400 transition-all duration-300 hover:scale-[1.03]">
// //                 <span className="w-5 h-5 bg-gray-700 rounded-full inline-block"></span>
// //                 E-Cell
// //               </div>

// //               {/* Empty box */}
// //               <div className="w-12 h-12 border-2 border-gray-300 rounded-xl shadow-sm hover:border-cyan-400 transition-all duration-300 hover:scale-[1.03]"></div>
// //             </div>

// //             {/* Bottom text */}
// //             <div className="flex flex-wrap justify-center gap-12 text-base md:text-lg">
// //               <div className="text-center">
// //                 <div className="text-gray-700 font-semibold">
// //                   White-label available
// //                 </div>
// //                 <div className="text-gray-500 text-sm">for institutions</div>
// //               </div>

// //               <div className="text-center">
// //                 <div className="text-gray-800 font-semibold">
// //                   92% founder satisfaction
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="mb-20 max-w-2xl mx-auto text-center">
// //             {/* Heading */}
// //             <h2 className="text-gray-900 text-4xl md:text-5xl font-bold mb-4">
// //               Why HireArena
// //             </h2>

// //             {/* Accent line */}
// //             <div className="w-16 h-1.5 bg-gradient-to-r from-cyan-500 to-purple-500 mb-6 rounded-full mx-auto"></div>

// //             {/* Description */}
// //             <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-normal">
// //               At{" "}
// //               <span className="font-semibold text-gray-900">HireArena</span>
// //               , we believe every great startup deserves an intelligent investor
// //               — one that listens, learns, and guides before capital even
// //               arrives.
// //               <br />
// //               <br />
// //               We’re not replacing investors; we’re upgrading how innovation is
// //               discovered, structured, and scaled.
// //             </p>
// //           </div>

// //           {/* How it Works */}
// //           <div className="mb-16">
// //             <h2 className="text-gray-900 text-4xl md:text-5xl font-semibold mb-4">
// //               How it Works
// //             </h2>
// //             <div className="w-10 h-1 bg-gray-900 mb-4 rounded"></div>

// //             <div className="flex justify-center mb-6">
// //               <ArrowDown className="w-6 h-6 text-gray-400" />
// //             </div>

// //             <div className="flex flex-col md:flex-row gap-6 mb-16">
// //               {/* Left Card */}
// //               <div className="bg-white border border-gray-200 rounded-2xl p-6 text-sm md:text-base w-full md:w-1/2 shadow-sm hover:shadow-lg transition-all duration-300">
// //                 <div className="text-gray-900 font-semibold mb-4 text-lg">
// //                   1. Tell us AI-based report
// //                 </div>

// //                 <div className="space-y-3 text-gray-600 font-medium">
// //                   <div className="flex justify-between">
// //                     <span>Subject</span>
// //                     <span>Explanation</span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span>Presentation</span>
// //                     <span>Section</span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span>Introduction</span>
// //                     <span>1 Time</span>
// //                   </div>
// //                   <div className="text-gray-500">Discussion point</div>
// //                 </div>
// //               </div>

// //               {/* Right Card */}
// //               <div className="bg-[#0B1020] rounded-2xl p-6 text-white w-full md:w-1/2 shadow-md hover:shadow-cyan-500/20 transition-all duration-300">
// //                 {/* Score Label */}
// //                 <div className="text-sm font-medium text-gray-400 mb-2">
// //                   Sample Score
// //                 </div>

// //                 {/* Score */}
// //                 <div className="text-5xl font-bold mb-1 text-cyan-400">92%</div>

// //                 {/* Feedback */}
// //                 <p className="text-lg font-semibold text-gray-200 mb-3">
// //                   Excellent – Very Strong Business
// //                 </p>

// //                 {/* Stars */}
// //                 <div className="flex items-center gap-1 mb-3">
// //                   <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
// //                   <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
// //                   <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
// //                   <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
// //                   <StarHalf className="w-6 h-6 text-yellow-400 fill-yellow-400" />
// //                 </div>

// //                 {/* Description */}
// //                 <p className="text-sm text-gray-400 leading-relaxed">
// //                   Your pitch demonstrates strong clarity, confidence, and
// //                   potential. Investors are highly likely to stay engaged
// //                   throughout.
// //                 </p>
// //               </div>
// //             </div>

// //             <div className="flex justify-center mb-6">
// //               <ArrowDown className="w-6 h-6 text-gray-400" />
// //             </div>

// //             <p className="text-gray-800 mb-6 text-lg text-center font-semibold">
// //               A clear standardized way to judge readiness
// //             </p>

// //             <div className="flex justify-center gap-4 mb-8">
// //               {[
// //                 {
// //                   ring: "border-cyan-400",
// //                   icon: (
// //                     <svg
// //                       xmlns="http://www.w3.org/2000/svg"
// //                       className="w-5 h-5"
// //                       fill="currentColor"
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <rect x="3" y="8" width="18" height="8" rx="2" />
// //                       <circle cx="8" cy="12" r="1.5" fill="#fff" />
// //                       <circle cx="16" cy="12" r="1.5" fill="#fff" />
// //                     </svg>
// //                   ),
// //                   color: "text-cyan-400",
// //                 },
// //                 {
// //                   ring: "border-green-400",
// //                   icon: (
// //                     <svg
// //                       xmlns="http://www.w3.org/2000/svg"
// //                       className="w-5 h-5"
// //                       fill="currentColor"
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <path d="M3 7h13l3 4v6H3V7zm13.5 0V4h2.5v3h-2.5z" />
// //                     </svg>
// //                   ),
// //                   color: "text-green-400",
// //                 },
// //                 {
// //                   ring: "border-orange-400",
// //                   icon: (
// //                     <svg
// //                       xmlns="http://www.w3.org/2000/svg"
// //                       className="w-5 h-5"
// //                       fill="currentColor"
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <rect x="3" y="5" width="18" height="14" rx="2" />
// //                       <circle cx="12" cy="12" r="3" fill="#fff" />
// //                     </svg>
// //                   ),
// //                   color: "text-orange-400",
// //                 },
// //                 {
// //                   ring: "border-purple-400",
// //                   icon: (
// //                     <svg
// //                       xmlns="http://www.w3.org/2000/svg"
// //                       className="w-5 h-5"
// //                       fill="currentColor"
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <path d="M10 2h4v4h4v4h-4v4h-4v-4H6V6h4V2z" />
// //                     </svg>
// //                   ),
// //                   color: "text-purple-400",
// //                 },
// //                 {
// //                   ring: "border-cyan-300",
// //                   icon: (
// //                     <svg
// //                       xmlns="http://www.w3.org/2000/svg"
// //                       className="w-5 h-5"
// //                       fill="currentColor"
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <path d="M11 2h2v20h-2V2zm-9 9h20v2H2v-2z" />
// //                     </svg>
// //                   ),
// //                   color: "text-cyan-300",
// //                 },
// //               ].map((item, i) => (
// //                 <div
// //                   key={i}
// //                   className={`w-14 h-14 rounded-full border-4 flex items-center justify-center ${item.ring}`}
// //                 >
// //                   <div
// //                     className={`flex items-center justify-center ${item.color}`}
// //                   >
// //                     {item.icon}
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* FAQ */}
// //           {/* <div className="mb-24 max-w-2xl">
          
// //             <h2 className="text-gray-900 text-4xl md:text-5xl font-bold mb-4">
// //               FAQ
// //             </h2>
// //             <div className="w-16 h-1.5 bg-gradient-to-r from-cyan-500 to-purple-500 mb-8 rounded-full"></div>


// //             <div className="space-y-4">
// //               {[
// //                 "How accurate is the AI score?",
// //                 "Can I use voice or video?",
// //                 "Is my data private?",
// //                 "Why is data privacy important?",
// //                 "Who is this for?",
// //               ].map((q, i) => (
// //                 <div
// //                   key={i}
// //                   className={`
// //           rounded-xl p-5 text-gray-800 text-base md:text-lg font-medium
// //           bg-gray-100 border border-gray-200 shadow-sm hover:shadow-md
// //           transition-all duration-300 hover:border-cyan-400 hover:scale-[1.02]
// //           ${i % 2 === 1 ? "md:ml-6" : ""}
// //         `}
// //                 >
// //                   {q}
// //                 </div>
// //               ))}
// //             </div>
// //           </div> */}
// //        <div className="mb-24">







  
// // </div>


// //         </div>

// // <div className="relative w-full min-h-screen mb-0">

// //   {/* FULL WIDTH BACKGROUND IMAGE */}
// //   <img
// //     src={Faq}
// //     alt="FAQ Illustration"
// //     className="absolute inset-0 w-full h-full object-cover"
// //   />

// //   {/* Optional overlay */}
// //   <div className="absolute inset-0 bg-black/20"></div>

// //   {/* CONTENT — EXPANDS NATURALLY, NO SCROLLBAR */}
// //   <div className="relative z-10 grid grid-cols-1 md:grid-cols-[450px_1fr] gap-12 items-start pt-6">

// //     {/* LEFT EMPTY SPACE */}
// //     <div></div>

// //     {/* RIGHT FAQ */}
// //     <div className="pr-12  md:ml-[400px]">

// //       <h2 className="text-white text-5xl font-bold mb-4">FAQ</h2>

// //       <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-500 to-purple-500 mb-10 rounded-full"></div>

// //       <div className="space-y-6">
// //         {faqData.map((item, i) => (
// //           <div
// //             key={i}
// //             className="w-[400px] rounded-[50px] overflow-hidden border border-gray-200 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/90"
// //           >
// //             <button
// //               className="w-full flex items-center justify-between px-6 py-4 text-left text-gray-800 text-lg font-medium"
// //               onClick={() => toggleQuestion(i)}
// //             >
// //               <span>{item.question}</span>
// //               {openIndex === i ? (
// //                 <ChevronUp className="text-cyan-600" size={26} />
// //               ) : (
// //                 <ChevronDown className="text-gray-500" size={26} />
// //               )}
// //             </button>

// //             <div
// //               className={`transition-all duration-300 ease-in-out ${
// //                 openIndex === i
// //                   ? "opacity-100 max-h-96 px-6 pb-6"
// //                   : "opacity-0 max-h-0 overflow-hidden"
// //               }`}
// //             >
// //               <p className="text-gray-700 leading-relaxed">
// //                 {item.answer}
// //               </p>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //     </div>
// //   </div>
// // </div>

// //       </div>
// //     </div>
// //   );
// // };

// // export default Home;


// import { MessageCircle, ArrowDown, ChevronDown, ChevronUp } from "lucide-react";
// import logo from "../assets/logo2.png";
// import { NavLink } from "react-router-dom";
// import { useState } from "react";
// import Priya from "../assets/PriyaMehta.png";
// import Rajeev from "../assets/RajeevKhanna.png";
// import Vikram from "../assets/VikramDesai.png";
// import Faq from "../assets/AiFAQ.png";
// import { CheckCircle, Star, StarHalf } from "lucide-react";
// import LogoSlider from "../components/LogoSlider";

// type FAQItem = {
//   question: string;
//   answer: string;
// };

// interface Plan {
//   name: string;
//   price: string;
//   period: string;
//   description: string;
//   features: string[];
//   cta: string;
//   popular: boolean;
// }

// const plans: Plan[] = [
//   {
//     name: "Starter",
//     price: "₹2,591",
//     period: "/month",
//     description: "Perfect for individual job seekers and students starting their journey.",
//     features: [
//       "5 AI Interview Sessions",
//       "Basic Performance Analytics",
//       "Email Support",
//       "Community Access",
//       "Standard AI Avatars"],
//     cta: "Get Started",
//     popular: false,
//   },
//   {
//     name: "Growth",
//     price: "₹8,849",
//     period: "/month",
//     description: "Ideal for training institutes, coaching centers, and professional schools.",
//     features: [
//       "50 AI Interview Sessions",
//       "Advanced Analytics Dashboard",
//       "Custom AI Avatar Selection",
//       "Progress Tracking & Insights",
//       "Priority Support",
//     ],
//     cta: "Most Popular",
//     popular: true,
//   },
//   {
//     name: "Enterprise",
//     price: "Custom",
//     period: "",
//     description: "Tailored for large organizations, startups, and institutional training programs.",
//     features: [
//       "Unlimited AI Interview Sessions",
//       "Conversational Voice Agents",
//       "Progress Tracking Dashboard",
//       "Real-Time Scoring & Analytics",
//       "24/7 Premium Support",
//     ],
//     cta: "Contact Sales",
//     popular: false,
//   },
// ];

// const faqData: FAQItem[] = [
//   {
//     question: "How accurate is the AI score?",
//     answer:
//       "HireArena’s AI scoring is trained on thousands of real interviews and evaluator rubrics, achieving over 90% alignment with human HR reviewers. This ensures consistent, unbiased, and highly accurate feedback.",
//   },
//   {
//     question: "Can I use voice or video?",
//     answer:
//       "Yes. HireArena supports voice-based and avatar-led interviews. Video interview analysis is also available, offering a fully realistic, conversational practice experience.",
//   },
//   {
//     question: "Is my data private?",
//     answer:
//       "Absolutely. All interview data is encrypted and securely stored. Your recordings and responses are never used to train public models, and you can delete your data anytime.",
//   },
//   {
//     question: "Why is data privacy important?",
//     answer:
//       "Interview responses often include personal information and career details. HireArena ensures this remains fully confidential and accessible only to you or your organization.",
//   },
//   {
//     question: "Who is this for?",
//     answer:
//       "HireArena is built for training institutes, job seekers, colleges, coaching centers, HR teams, startups, and trainers who want scalable, AI-powered interview practice and evaluation.",
//   },
// ];

// // ***How it work****
// const cards = [
//   {
//     title: "Step Inside (Login)",
//     desc: "Enter your personal interview arena — your journey begins with a simple login.",
//   },
//   {
//     title: "Upload Your Resume",
//     desc: "Upload your resume so our AI can understand your background before the session begins.",
//   },
//   {
//     title: "Start Your Interview",
//     desc: "Click “Start New Interview” and watch your virtual interview environment activate.",
//   },
//   {
//     title: "Meet Your AI Interviewer",
//     desc: "Engage with a smart, role-specific AI interviewer trained for real scenarios.",
//   },
//   {
//     title: "Take the Hot Seat",
//     desc: "Answer questions and experience a natural real-time conversation.",
//   },
//   {
//     title: "Get Your Evaluation",
//     desc: "Receive instant strengths, weaknesses, and scores with detailed feedback.",
//   },
//   {
//     title: "Walk Out Job-Ready",
//     desc: "Leave confident and prepared with clear guidance for real interviews.",
//   },
// ];


// const Home = () => {
//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   const toggleQuestion = (index: number) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navigation */}

//       <div className="flex flex-col">
//         {/* Left Dark Section */}
//         <div className="w-full min-h-screen bg-[#E6F0FA] px-0 py-0 pb-0">
//           {/* Hero Section */}
//           <div className="hero1">
//             <div className="w-full py-16 px-12">
//               <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-16">
//                 {/* LEFT SECTION */}
//                 <div className="flex-1 pt-[40px]">
//                   <div className="flex items-center gap-4 mb-8">
//                     <img
//                       src={logo}
//                       alt="HireArena Brand"
//                       className="h-16 md:h-20"
//                     />
//                     <div>
//                       <h2 className="text-black text-4xl md:text-5xl font-semibold">
//                         HireArena
//                       </h2>
//                       <p className="text-base md:text-lg text-gray-730">
//                         Simulate. Score. Succeed.
//                       </p>
//                     </div>
//                   </div>

//                   <h1 className="text-[#3f3fb8] text-2xl md:text-3xl leading-tight mb-12">
//                     Smart AI-powered arena to <br />
//                     practice, perfect, and ace <br />
//                     real-world interviews
//                   </h1>

//                   <div className="flex flex-col items-start gap-10 mt-8">
//                     {/* Primary */}
//                     <NavLink
//                       to="/login"
//                       className="
//                     w-fit
//         px-8 py-4 rounded-xl text-white text-lg font-medium
//         bg-gradient-to-r from-cyan-400 to-purple-500
//         shadow-lg
//         transition-all duration-500 ease-in-out
//         hover:from-purple-500 hover:to-cyan-400
//         hover:scale-[1.05]
//         hover:shadow-purple-500/40 w-[178px]
//       "
//                     >
//                       Try HireArena
//                     </NavLink>

//                     {/* Secondary */}
//                     <button
//                       className="
//                     w-fit
//         px-8 py-4 rounded-xl text-white text-lg font-medium
//         bg-gradient-to-r from-purple-500 to-cyan-400
//         shadow-lg
//         transition-all duration-500 ease-in-out
//         hover:from-cyan-400 hover:to-purple-500
//         hover:scale-[1.05]
//         hover:shadow-cyan-400/40 w-[178px]
//       "
//                     >
//                       Watch Demo
//                     </button>
//                   </div>
//                 </div>

//                 {/* RIGHT SECTION - AI CHAT UI */}
//                 <div className="relative flex items-center justify-center w-[380px] h-[400px]">
//                   {/* ✅ Background video behind hero */}
//                   {/* <video
//                   src={video}
//                   autoPlay
//                   loop
//                   muted
//                   playsInline
//                   className="
//     absolute
//     top-[169px] left-[105px]
//     -translate-x-1/2 -translate-y-1/2
//     w-[900px] h-auto
//     scale-150
//     object-contain
//     opacity-80
//     pointer-events-none
//     z-0
//   "
//                 /> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="bg-[#E6F0FA] px-0 py-12">
//             {/* Features Section */}
//             <div className="mb-20 px-12">
//               <h2 className="text-black font-bold text-3xl mb-8">Features</h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
//                 {/* Card 1 */}
//                 <div
//                   className="bg-[#daecf9]
//                     rounded-2xl
//                     p-8
//                     border border-gray-800
//                     max-w-sm
//                     mx-auto
//                     shadow-[0_15px_30px_rgba(0,0,0,0.5)]
//                     transition-all duration-500
//                     hover:-translate-y-2
//                     hover:scale-[1.00]
//                     hover:shadow-[0_25px_50px_rgba(0,255,255,0.4)]
//                     hover:rotate-[0deg]
//                     hover:border-cyan-400"
//                 >
//                   {/* Header: Icon + Title */}
//                   <div className="flex items-center space-x-4 mb-4">
//                     <div className="w-10 h-10 bg-blue-900/50 rounded-lg flex items-center justify-center">
//                       <MessageCircle className="w-5 h-5 text-cyan-400" />
//                     </div>
//                     <h3 className="text-black text-xl font-semibold">
//                       AI Avatar Simulation
//                     </h3>
//                   </div>

//                   {/* Description */}
//                   <p className="text-black text-base leading-relaxed mt-4">
//                      Experience realistic interview simulations with AI judges available 24/7 for practice sessions.
//                   </p>
//                 </div>

//                 {/* Card 2 */}
//                 <div className="rounded-2xl
//                     p-8
//                     border border-gray-800
//                     max-w-sm
//                     mx-auto
//                     shadow-[0_15px_30px_rgba(0,0,0,0.5)]
//                     transition-all duration-500
//                     hover:-translate-y-2
//                     hover:scale-[1.00]
//                     hover:shadow-[0_25px_50px_rgba(0,255,255,0.4)]
//                     hover:rotate-[0deg]
//                     hover:border-cyan-400">
//                   {/* Header: Icon + Title */}
//                   <div className="flex items-center space-x-4 mb-4">
//                     <div className="w-10 h-10 bg-blue-900/50 rounded-lg flex items-center justify-center">
//                       <div className="w-5 h-5 border-2 border-cyan-400 rounded"></div>
//                     </div>
//                     <h3 className="text-black text-xl font-semibold">
//                        Smart Interview Evaluation
//                     </h3>
//                   </div>

//                   {/* Description */}
//                   <p className="text-black text-base leading-relaxed mt-4">
//                     Get instant AI-powered scoring and detailed feedback on communication, content quality, and technical accuracy.
//                   </p>
//                 </div>

//                 {/* Card 3 */}
//                 <div className="
//                   rounded-2xl
//                   p-8
//                   border border-gray-800
//                   max-w-sm
//                   mx-auto
//                   shadow-[0_15px_30px_rgba(0,0,0,0.5)]
//                   transition-all duration-500
//                   hover:-translate-y-2
//                   hover:scale-[1.00]
//                   hover:shadow-[0_25px_50px_rgba(0,255,255,0.4)]
//                   hover:rotate-[0deg]
//                   hover:border-cyan-400">
//                   {/* Header: Icon + Title */}
//                   <div className="flex items-center space-x-4 mb-4">
//                     <div className="w-10 h-10 bg-purple-900/50 rounded-lg flex items-center justify-center">
//                       <div className="w-5 h-5 border-2 border-purple-400 rounded"></div>
//                     </div>
//                     <h3 className="text-black text-xl font-semibold">
//                       Performance Tracking 
//                     </h3>
//                   </div>

//                   {/* Description */}
//                   <p className="text-black text-base leading-relaxed mt-4">
//                    Monitor your improvement with comprehensive analytics, personalized insights, and data-driven recommendations for continuous growth.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* AI Investor Panel */}
//             <div className="mb-20 px-12">
//               <h2 className="text-black font-bold text-3xl mb-8">
//                 Meet your AI interviwers
//               </h2>
//               <div className="flex gap-4 overflow-x-auto no-scrollbar">
//                 {[
//                   // {
//                   //   name: "ANANYA GUPTA",
//                   //   subtitle: "Analyst",
//                   //   desc: "Financial metrics",
//                   //   number: "1",
//                   //   color: "bg-gradient-to-b from-cyan-400 to-blue-500",

//                   //   image: Ananya,
//                   // },
//                   {
//                     name: "RAJEEV KHANNA",
//                     subtitle: "Technical Head",
//                     desc: "System architecture & engineering",
//                     number: "2",
//                     color: "bg-gradient-to-b from-green-400 to-green-600",
//                     image: Rajeev,
//                   },
//                    {
//                     name: "VIKRAM DESAI",
//                     subtitle: "Product Manager",
//                     desc: "Strategy & product vision",
//                     number: "4",
//                     color: "bg-gradient-to-b from-purple-400 to-purple-600",
//                     image: Vikram,
//                   },
//                    {
//                     name: "PRIYA MEHTA",
//                     subtitle: "HR Director",
//                     desc: "Culture fit & leadership",
//                     number: "3",
//                     color: "bg-gradient-to-b from-orange-400 to-orange-600",
//                     image: Priya,
//                   },
//                   // {
//                   //   name: "VINEET SHARMA",
//                   //   subtitle: " Strategist",
//                   //   desc: "Market & defensibility",
//                   //   number: "5",
//                   //   color: "bg-gradient-to-b from-blue-400 to-purple-600",
//                   //   image: vineet,
//                   // },
//                 ].map((investor, i) => (
//                   <div
//                     key={i}
//                     className="bg-[#daecf9]  rounded-xl p-6 text-center border border-gray-800 relative w-64 hover:border-purple-400/40 transition-all duration-300 mx-auto shadow-lg hover:shadow-purple-400/20"
//                   >
//                     <div className="mb-4">
//                       <div
//                         className={w-20 h-20 mx-auto rounded-full ${investor.color} flex items-center justify-center}
//                       >
//                         <img
//                           src={investor.image}
//                           alt={investor.name}
//                           className="w-16 h-16 rounded-full object-cover"
//                         />
//                       </div>
//                     </div>
//                     <h3 className="text-black mb-1">{investor.name}</h3>
//                     <p className="text-black text-sm mb-1">
//                       {investor.subtitle}
//                     </p>
//                     <p className="text-black text-xs">{investor.desc}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Scoring System */}
//             <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-[#E6F0FA]">
//               {/* Hero Section */}
//               <div className="max-w-4xl mx-auto text-center mb-16">
//                 <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
//                   Simple, Transparent Pricing
//                 </h1>
//                 <p className="text-lg text-gray max-w-2xl mx-auto">
//                   Choose the plan that fits your learning journey. No hidden fees
//                   — ever.
//                  </p>
//               </div>

//               {/* Plans Grid */}
//               <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
//   {plans.map((plan, index) => (
//     <div
//       key={index}
//       className={`relative flex flex-col h-full bg-[#EBEAEF] rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
//         plan.popular ? "ring-2 ring-blue-400 scale-[1.02]" : ""
//       }`}
//     >
//       {plan.popular && (
//         <div className="absolute pt-9 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
//           <span className="bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center">
//             <Star className="w-3 h-3 mr-1" />
//             MOST POPULAR
//           </span>
//         </div>
//       )}

//       {/* Make the inner section grow so the button stays at bottom */}
//       <div className="flex-1 p-8 flex flex-col">
//         <h3 className="text-2xl font-bold text-black mb-2">{plan.name}</h3>
//         <p className="text-gray-1000 mb-6">{plan.description}</p>

//         <div className="flex items-baseline mb-6">
//           <span className="text-4xl font-extrabold text-black">{plan.price}</span>
//           {plan.period && <span className="text-gray-1000 ml-2">{plan.period}</span>}
//         </div>

//         <ul className="space-y-4 mb-8">
//           {plan.features.map((feature, i) => (
//             <li key={i} className="flex items-start">
//               <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0 mr-3" />
//               <span className="text-gray-1500">{feature}</span>
//             </li>
//           ))}
//         </ul>

//         {/* push button to bottom */}
//         <button
//           className={`mt-auto w-full py-3 px-4 rounded-xl font-semibold transition-colors ${
//             plan.popular
//               ? "bg-blue-600 hover:bg-blue-700 text-white"
//               : plan.name === "Enterprise"
//               ? "bg-blue-600 hover:bg-gray-900 text-white"
//               : "bg-blue-600 hover:bg-[#555b70] text-white"
//           }`}
//         >
//           {plan.cta}
//         </button>
//       </div>
//     </div>
//   ))}
// </div>

//               {/* CTA Banner */}
//               {/* <div className="mt-20 max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center text-white">
//                  <h3 className="text-2xl font-bold mb-4">Ready to impress investors?</h3>
//                  <p className="opacity-90 mb-6 max-w-2xl mx-auto">
//                    Join 2,500+ founders who’ve raised over $500M using our pitch tools.
//                  </p>
//                  <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors">
//                    Start Free Trial
//                  </button>
//                </div> */}
//             </div>

//             {/* Footer */}
//           </div>
//         </div>
//         {/* Right Light Section */}
//         <div className="w-full bg-gray-50 px-8 pt-12 mt-2">
//           {/* Trust Section */}
//           <div className="mb-20 text-center">
//             {/* Heading */}
//             <p className="text-gray-900 mb-10 leading-snug font-bold text-3xl md:text-4xl">
//               Trusted by 1000+ training institutes, universities, and{" "}
//               <br className="hidden md:block" />
//               coaching centers.
//             </p>


//             {/* Logo Row */}
//             <LogoSlider />









//             {/* Bottom text */}
//             <div className="flex flex-wrap justify-center gap-12 text-base md:text-lg">
//               <div className="text-center">
//                 <div className="text-gray-700 font-semibold">
//                   1000+ Training Partners
//                 </div>
//                 <div className="text-gray-500 text-sm">across India</div>
//               </div>

//               <div className="text-center">
//                 <div className="text-gray-800 font-semibold">
//                   95% Success Rate
//                 </div>
//                 <div className="text-gray-500 text-sm">learner satisfaction</div>
//               </div>
//             </div>
//           </div>

//           <div className="mb-20 max-w-2xl mx-auto text-center">
//             {/* Heading */}
//             <h2 className="text-gray-900 text-4xl md:text-5xl font-bold mb-4">
//               Why HireArena
//             </h2>

//             {/* Accent line */}
//             <div className="w-16 h-1.5 bg-gradient-to-r from-cyan-500 to-purple-500 mb-6 rounded-full mx-auto"></div>

//             {/* Description */}
//             <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-normal">
//               At <span className="font-semibold text-gray-900">HireArena</span>
//               ,  we believe every job seeker and learner deserves access to intelligent, personalized interview preparation—one that provides real-time feedback, adapts to individual needs, and builds confidence before the real opportunity arrives.
//               <br />
//               <br />
//               We're not replacing human trainers; we're empowering them with AI-driven tools that make interview coaching scalable, data-driven, and accessible to everyone.
//             </p>
//           </div>

                        
//           {/* How it Works */}
//           <div className="mb-16">
//   <h2 className="text-gray-900 text-4xl md:text-5xl font-semibold mb-4">
//     How it Works
//   </h2>
//   <div className="w-10 h-1 bg-gray-900 mb-4 rounded"></div>

//   {/* GRID LAYOUT */}
//   <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
//     {/* --- FIRST 4 CARDS (Row 1) --- */}
//     {cards.slice(0, 4).map((card, index) => (
//       <div
//         key={index}
//         className="bg-[#daecf9] rounded-2xl p-8 border border-gray-800 shadow-[0_15px_30px_rgba(0,0,0,0.5)]
//         transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,255,255,0.4)] hover:border-cyan-400"
//       >
//         <div className="flex items-center space-x-4 mb-4">
//           <div className="w-10 h-10 bg-blue-900/50 rounded-lg flex items-center justify-center">
//             <MessageCircle className="w-5 h-5 text-cyan-400" />
//           </div>
//           <h3 className="text-black text-xl font-semibold">{card.title}</h3>
//         </div>
//         <p className="text-black text-base leading-relaxed mt-4">{card.desc}</p>
//       </div>
//     ))}
//   </div>

//   {/* SECOND ROW (3 CARDS ONLY) */}
//   <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
//     {cards.slice(4, 7).map((card, index) => (
//       <div
//         key={index}
//         className="bg-[#daecf9] rounded-2xl p-8 border border-gray-800 shadow-[0_15px_30px_rgba(0,0,0,0.5)]
//         transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,255,255,0.4)] hover:border-cyan-400"
//       >
//         <div className="flex items-center space-x-4 mb-4">
//           <div className="w-10 h-10 bg-blue-900/50 rounded-lg flex items-center justify-center">
//             <MessageCircle className="w-5 h-5 text-cyan-400" />
//           </div>
//           <h3 className="text-black text-xl font-semibold">{card.title}</h3>
//         </div>
//         <p className="text-black text-base leading-relaxed mt-4">{card.desc}</p>
//       </div>
//     ))}
//   </div>
// </div>

//           {/* FAQ */}
//           {/* <div className="mb-24 max-w-2xl">
          
//             <h2 className="text-gray-900 text-4xl md:text-5xl font-bold mb-4">
//               FAQ
//             </h2>
//             <div className="w-16 h-1.5 bg-gradient-to-r from-cyan-500 to-purple-500 mb-8 rounded-full"></div>


//             <div className="space-y-4">
//               {[
//                 "How accurate is the AI score?",
//                 "Can I use voice or video?",
//                 "Is my data private?",
//                 "Why is data privacy important?",
//                 "Who is this for?",
//               ].map((q, i) => (
//                 <div
//                   key={i}
//                   className={`
//           rounded-xl p-5 text-gray-800 text-base md:text-lg font-medium
//           bg-gray-100 border border-gray-200 shadow-sm hover:shadow-md
//           transition-all duration-300 hover:border-cyan-400 hover:scale-[1.02]
//           ${i % 2 === 1 ? "md:ml-6" : ""}
//         `}
//                 >
//                   {q}
//                 </div>
//               ))}
//             </div>
//           </div> */}
//           <div className="mb-24"></div>
//         </div>

//         <div className="relative w-full min-h-screen mb-0">
//           {/* FULL WIDTH BACKGROUND IMAGE */}
//           <img
//             src={Faq}
//             alt="FAQ Illustration"
//             className="absolute inset-0 w-full h-full object-cover"
//           />

//           {/* Optional overlay */}
//           <div className="absolute inset-0 bg-black/20"></div>

//           {/* CONTENT — EXPANDS NATURALLY, NO SCROLLBAR */}
//           <div className="relative z-10 grid grid-cols-1 md:grid-cols-[450px_1fr] gap-12 items-start pt-6">
//             {/* LEFT EMPTY SPACE */}
//             <div></div>

//             {/* RIGHT FAQ */}
//             <div className="pr-12  md:ml-[400px]">
//               <h2 className="text-white text-5xl font-bold mb-4">FAQ</h2>

//               <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-500 to-purple-500 mb-10 rounded-full"></div>

//               <div className="space-y-6">
//                 {faqData.map((item, i) => (
//                   <div
//                     key={i}
//                     className="w-[400px] rounded-[50px] overflow-hidden border border-gray-200 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/90"
//                   >
//                     <button
//                       className="w-full flex items-center justify-between px-6 py-4 text-left text-gray-800 text-lg font-medium"
//                       onClick={() => toggleQuestion(i)}
//                     >
//                       <span>{item.question}</span>
//                       {openIndex === i ? (
//                         <ChevronUp className="text-cyan-600" size={26} />
//                       ) : (
//                         <ChevronDown className="text-gray-500" size={26} />
//                       )}
//                     </button>

//                     <div
//                       className={`transition-all duration-300 ease-in-out ${
//                         openIndex === i
//                           ? "opacity-100 max-h-96 px-6 pb-6"
//                           : "opacity-0 max-h-0 overflow-hidden"
//                       }`}
//                     >
//                       <p className="text-gray-700 leading-relaxed">
//                         {item.answer}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import { MessageCircle, ArrowDown, ChevronDown, ChevronUp } from "lucide-react";
import logo from "../assets/logo2.png";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Priya from "../assets/PriyaMehta.png";
import Rajeev from "../assets/RajeevKhanna.png";
import Vikram from "../assets/VikramDesai.png";
import Faq from "../assets/AiFAQ.png";
import { CheckCircle, Star, StarHalf } from "lucide-react";
import LogoSlider from "../components/LogoSlider";

type FAQItem = {
  question: string;
  answer: string;
};

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}

const plans: Plan[] = [
  {
    name: "Starter",
    price: "₹2,591",
    period: "/month",
    description: "Perfect for individual job seekers and students starting their journey.",
    features: [
      "5 AI Interview Sessions",
      "Basic Performance Analytics",
      "Email Support",
      "Community Access",
      "Standard AI Avatars"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Growth",
    price: "₹8,849",
    period: "/month",
    description: "Ideal for training institutes, coaching centers, and professional schools.",
    features: [
      "50 AI Interview Sessions",
      "Advanced Analytics Dashboard",
      "Custom AI Avatar Selection",
      "Progress Tracking & Insights",
      "Priority Support",
    ],
    cta: "Most Popular",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Tailored for large organizations, startups, and institutional training programs.",
    features: [
      "Unlimited AI Interview Sessions",
      "Conversational Voice Agents",
      "Progress Tracking Dashboard",
      "Real-Time Scoring & Analytics",
      "24/7 Premium Support",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const faqData: FAQItem[] = [
  {
    question: "How accurate is the AI score?",
    answer:
      "HireArena’s AI scoring is trained on thousands of real interviews and evaluator rubrics, achieving over 90% alignment with human HR reviewers. This ensures consistent, unbiased, and highly accurate feedback.",
  },
  {
    question: "Can I use voice or video?",
    answer:
      "Yes. HireArena supports voice-based and avatar-led interviews. Video interview analysis is also available, offering a fully realistic, conversational practice experience.",
  },
  {
    question: "Is my data private?",
    answer:
      "Absolutely. All interview data is encrypted and securely stored. Your recordings and responses are never used to train public models, and you can delete your data anytime.",
  },
  {
    question: "Why is data privacy important?",
    answer:
      "Interview responses often include personal information and career details. HireArena ensures this remains fully confidential and accessible only to you or your organization.",
  },
  {
    question: "Who is this for?",
    answer:
      "HireArena is built for training institutes, job seekers, colleges, coaching centers, HR teams, startups, and trainers who want scalable, AI-powered interview practice and evaluation.",
  },
];

// ****How it work*****
const cards = [
  {
    title: "Step Inside (Login)",
    desc: "Enter your personal interview arena — your journey begins with a simple login.",
  },
  {
    title: "Upload Your Resume",
    desc: "Upload your resume so our AI can understand your background before the session begins.",
  },
  {
    title: "Start Your Interview",
    desc: "Click “Start New Interview” and watch your virtual interview environment activate.",
  },
  {
    title: "Meet Your AI Interviewer",
    desc: "Engage with a smart, role-specific AI interviewer trained for real scenarios.",
  },
  {
    title: "Take the Hot Seat",
    desc: "Answer questions and experience a natural real-time conversation.",
  },
  {
    title: "Get Your Evaluation",
    desc: "Receive instant strengths, weaknesses, and scores with detailed feedback.",
  },
  {
    title: "Walk Out Job-Ready",
    desc: "Leave confident and prepared with clear guidance for real interviews.",
  },
];


const Home = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}

      <div className="flex flex-col">
        {/* Left Dark Section */}
        <div className="w-full min-h-screen bg-[#E6F0FA] px-0 py-0 pb-0">
          {/* Hero Section */}
          <div className="hero1">
            <div className="w-full py-16 px-12">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-16">
                {/* LEFT SECTION */}
                <div className="flex-1 pt-[40px]">
                  <div className="flex items-center gap-4 mb-8">
                    <img
                      src={logo}
                      alt="HireArena Brand"
                      className="h-16 md:h-20"
                    />
                    <div>
                      <h2 className="text-black text-4xl md:text-5xl font-semibold">
                        HireArena
                      </h2>
                      <p className="text-base md:text-lg text-gray-730">
                        Simulate. Score. Succeed.
                      </p>
                    </div>
                  </div>

                  <h1 className="text-[#3f3fb8] text-2xl md:text-3xl leading-tight mb-12">
                    Smart AI-powered arena to <br />
                    practice, perfect, and ace <br />
                    real-world interviews
                  </h1>

                  <div className="flex flex-col items-start gap-10 mt-8">
                    {/* Primary */}
                    <NavLink
                      to="/login"
                      className="
                    w-fit
        px-8 py-4 rounded-xl text-white text-lg font-medium
        bg-gradient-to-r from-cyan-400 to-purple-500
        shadow-lg
        transition-all duration-500 ease-in-out
        hover:from-purple-500 hover:to-cyan-400
        hover:scale-[1.05]
        hover:shadow-purple-500/40 w-[178px]
      "
                    >
                      Try HireArena
                    </NavLink>

                    {/* Secondary */}
                    <button
                      className="
                    w-fit
        px-8 py-4 rounded-xl text-white text-lg font-medium
        bg-gradient-to-r from-purple-500 to-cyan-400
        shadow-lg
        transition-all duration-500 ease-in-out
        hover:from-cyan-400 hover:to-purple-500
        hover:scale-[1.05]
        hover:shadow-cyan-400/40 w-[178px]
      "
                    >
                      Watch Demo
                    </button>
                  </div>
                </div>

                {/* RIGHT SECTION - AI CHAT UI */}
                <div className="relative flex items-center justify-center w-[380px] h-[400px]">
                  {/* ✅ Background video behind hero */}
                  {/* <video
                  src={video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="
    absolute
    top-[169px] left-[105px]
    -translate-x-1/2 -translate-y-1/2
    w-[900px] h-auto
    scale-150
    object-contain
    opacity-80
    pointer-events-none
    z-0
  "
                /> */}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#E6F0FA] px-0 py-12">
            {/* Features Section */}
            <div className="mb-20 px-12">
              <h2 className="text-black font-bold text-3xl mb-8">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {/* Card 1 */}
                <div
                  className="bg-[#daecf9]
                    rounded-2xl
                    p-8
                    border border-gray-800
                    max-w-sm
                    mx-auto
                    shadow-[0_15px_30px_rgba(0,0,0,0.5)]
                    transition-all duration-500
                    hover:-translate-y-2
                    hover:scale-[1.00]
                    hover:shadow-[0_25px_50px_rgba(0,255,255,0.4)]
                    hover:rotate-[0deg]
                    hover:border-cyan-400"
                >
                  {/* Header: Icon + Title */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 bg-blue-900/50 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h3 className="text-black text-xl font-semibold">
                      AI Avatar Simulation
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-black text-base leading-relaxed mt-4">
                     Experience realistic interview simulations with AI judges available 24/7 for practice sessions.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="rounded-2xl
                    p-8
                    border border-gray-800
                    max-w-sm
                    mx-auto
                    shadow-[0_15px_30px_rgba(0,0,0,0.5)]
                    transition-all duration-500
                    hover:-translate-y-2
                    hover:scale-[1.00]
                    hover:shadow-[0_25px_50px_rgba(0,255,255,0.4)]
                    hover:rotate-[0deg]
                    hover:border-cyan-400">
                  {/* Header: Icon + Title */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 bg-blue-900/50 rounded-lg flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-cyan-400 rounded"></div>
                    </div>
                    <h3 className="text-black text-xl font-semibold">
                       Smart Interview Evaluation
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-black text-base leading-relaxed mt-4">
                    Get instant AI-powered scoring and detailed feedback on communication, content quality, and technical accuracy.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="
                  rounded-2xl
                  p-8
                  border border-gray-800
                  max-w-sm
                  mx-auto
                  shadow-[0_15px_30px_rgba(0,0,0,0.5)]
                  transition-all duration-500
                  hover:-translate-y-2
                  hover:scale-[1.00]
                  hover:shadow-[0_25px_50px_rgba(0,255,255,0.4)]
                  hover:rotate-[0deg]
                  hover:border-cyan-400">
                  {/* Header: Icon + Title */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 bg-purple-900/50 rounded-lg flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-purple-400 rounded"></div>
                    </div>
                    <h3 className="text-black text-xl font-semibold">
                      Performance Tracking 
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-black text-base leading-relaxed mt-4">
                   Monitor your improvement with comprehensive analytics, personalized insights, and data-driven recommendations for continuous growth.
                  </p>
                </div>
              </div>
            </div>

            {/* AI Investor Panel */}
            <div className="mb-20 px-12">
              <h2 className="text-black font-bold text-3xl mb-8">
                Meet your AI interviwers
              </h2>
              <div className="flex gap-4 overflow-x-auto no-scrollbar">
                {[
                  // {
                  //   name: "ANANYA GUPTA",
                  //   subtitle: "Analyst",
                  //   desc: "Financial metrics",
                  //   number: "1",
                  //   color: "bg-gradient-to-b from-cyan-400 to-blue-500",

                  //   image: Ananya,
                  // },
                  {
                    name: "RAJEEV KHANNA",
                    subtitle: "Technical Head",
                    desc: "System architecture & engineering",
                    number: "2",
                    color: "bg-gradient-to-b from-green-400 to-green-600",
                    image: Rajeev,
                  },
                   {
                    name: "VIKRAM DESAI",
                    subtitle: "Product Manager",
                    desc: "Strategy & product vision",
                    number: "4",
                    color: "bg-gradient-to-b from-purple-400 to-purple-600",
                    image: Vikram,
                  },
                   {
                    name: "PRIYA MEHTA",
                    subtitle: "HR Director",
                    desc: "Culture fit & leadership",
                    number: "3",
                    color: "bg-gradient-to-b from-orange-400 to-orange-600",
                    image: Priya,
                  },
                  // {
                  //   name: "VINEET SHARMA",
                  //   subtitle: " Strategist",
                  //   desc: "Market & defensibility",
                  //   number: "5",
                  //   color: "bg-gradient-to-b from-blue-400 to-purple-600",
                  //   image: vineet,
                  // },
                ].map((investor, i) => (
                  <div
                    key={i}
                    className="bg-[#daecf9]  rounded-xl p-6 text-center border border-gray-800 relative w-64 hover:border-purple-400/40 transition-all duration-300 mx-auto shadow-lg hover:shadow-purple-400/20"
                  >
                    <div className="mb-4">
                      <div
                        className={`w-20 h-20 mx-auto rounded-full ${investor.color} flex items-center justify-center`}
                      >
                        <img
                          src={investor.image}
                          alt={investor.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="text-black mb-1">{investor.name}</h3>
                    <p className="text-black text-sm mb-1">
                      {investor.subtitle}
                    </p>
                    <p className="text-black text-xs">{investor.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Scoring System */}
            <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-[#E6F0FA]">
              {/* Hero Section */}
              <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                  Simple, Transparent Pricing
                </h1>
                <p className="text-lg text-gray max-w-2xl mx-auto">
                  Choose the plan that fits your learning journey. No hidden fees
                  — ever.
                 </p>
              </div>

              {/* Plans Grid */}
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
  {plans.map((plan, index) => (
    <div
      key={index}
      className={`relative flex flex-col h-full bg-[#EBEAEF] rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
        plan.popular ? "ring-2 ring-blue-400 scale-[1.02]" : ""
      }`}
    >
      {plan.popular && (
        <div className="absolute pt-9 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <span className="bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center">
            <Star className="w-3 h-3 mr-1" />
            MOST POPULAR
          </span>
        </div>
      )}

      {/* Make the inner section grow so the button stays at bottom */}
      <div className="flex-1 p-8 flex flex-col">
        <h3 className="text-2xl font-bold text-black mb-2">{plan.name}</h3>
        <p className="text-gray-1000 mb-6">{plan.description}</p>

        <div className="flex items-baseline mb-6">
          <span className="text-4xl font-extrabold text-black">{plan.price}</span>
          {plan.period && <span className="text-gray-1000 ml-2">{plan.period}</span>}
        </div>

        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0 mr-3" />
              <span className="text-gray-1500">{feature}</span>
            </li>
          ))}
        </ul>

        {/* push button to bottom */}
        <button
          className={`mt-auto w-full py-3 px-4 rounded-xl font-semibold transition-colors ${
            plan.popular
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : plan.name === "Enterprise"
              ? "bg-blue-600 hover:bg-gray-900 text-white"
              : "bg-blue-600 hover:bg-[#555b70] text-white"
          }`}
        >
          {plan.cta}
        </button>
      </div>
    </div>
  ))}
</div>

              {/* CTA Banner */}
              {/* <div className="mt-20 max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center text-white">
                 <h3 className="text-2xl font-bold mb-4">Ready to impress investors?</h3>
                 <p className="opacity-90 mb-6 max-w-2xl mx-auto">
                   Join 2,500+ founders who’ve raised over $500M using our pitch tools.
                 </p>
                 <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors">
                   Start Free Trial
                 </button>
               </div> */}
            </div>

            {/* Footer */}
          </div>
        </div>
        {/* Right Light Section */}
        <div className="w-full bg-gray-50 px-8 pt-12 mt-2">
          {/* Trust Section */}
          <div className="mb-20 text-center">
            {/* Heading */}
            <p className="text-gray-900 mb-10 leading-snug font-bold text-3xl md:text-4xl">
              Trusted by 1000+ training institutes, universities, and{" "}
              <br className="hidden md:block" />
              coaching centers.
            </p>


            {/* Logo Row */}
            <LogoSlider />









            {/* Bottom text */}
            <div className="flex flex-wrap justify-center gap-12 text-base md:text-lg">
              <div className="text-center">
                <div className="text-gray-700 font-semibold">
                  1000+ Training Partners
                </div>
                <div className="text-gray-500 text-sm">across India</div>
              </div>

              <div className="text-center">
                <div className="text-gray-800 font-semibold">
                  95% Success Rate
                </div>
                <div className="text-gray-500 text-sm">learner satisfaction</div>
              </div>
            </div>
          </div>

          <div className="mb-20 max-w-2xl mx-auto text-center">
            {/* Heading */}
            <h2 className="text-gray-900 text-4xl md:text-5xl font-bold mb-4">
              Why HireArena
            </h2>

            {/* Accent line */}
            <div className="w-16 h-1.5 bg-gradient-to-r from-cyan-500 to-purple-500 mb-6 rounded-full mx-auto"></div>

            {/* Description */}
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-normal">
              At <span className="font-semibold text-gray-900">HireArena</span>
              ,  we believe every job seeker and learner deserves access to intelligent, personalized interview preparation—one that provides real-time feedback, adapts to individual needs, and builds confidence before the real opportunity arrives.
              <br />
              <br />
              We're not replacing human trainers; we're empowering them with AI-driven tools that make interview coaching scalable, data-driven, and accessible to everyone.
            </p>
          </div>

                        
          {/* How it Works */}
          <div className="mb-16">
  <h2 className="text-gray-900 text-4xl md:text-5xl font-semibold mb-4">
    How it Works
  </h2>
  <div className="w-10 h-1 bg-gray-900 mb-4 rounded"></div>

  {/* GRID LAYOUT */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
    {/* --- FIRST 4 CARDS (Row 1) --- */}
    {cards.slice(0, 4).map((card, index) => (
      <div
        key={index}
        className="bg-[#daecf9] rounded-2xl p-8 border border-gray-800 shadow-[0_15px_30px_rgba(0,0,0,0.5)]
        transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,255,255,0.4)] hover:border-cyan-400"
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-10 h-10 bg-blue-900/50 rounded-lg flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="text-black text-xl font-semibold">{card.title}</h3>
        </div>
        <p className="text-black text-base leading-relaxed mt-4">{card.desc}</p>
      </div>
    ))}
  </div>

  {/* SECOND ROW (3 CARDS ONLY) */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
    {cards.slice(4, 7).map((card, index) => (
      <div
        key={index}
        className="bg-[#daecf9] rounded-2xl p-8 border border-gray-800 shadow-[0_15px_30px_rgba(0,0,0,0.5)]
        transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,255,255,0.4)] hover:border-cyan-400"
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-10 h-10 bg-blue-900/50 rounded-lg flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="text-black text-xl font-semibold">{card.title}</h3>
        </div>
        <p className="text-black text-base leading-relaxed mt-4">{card.desc}</p>
      </div>
    ))}
  </div>
</div>

          {/* FAQ */}
          {/* <div className="mb-24 max-w-2xl">
          
            <h2 className="text-gray-900 text-4xl md:text-5xl font-bold mb-4">
              FAQ
            </h2>
            <div className="w-16 h-1.5 bg-gradient-to-r from-cyan-500 to-purple-500 mb-8 rounded-full"></div>


            <div className="space-y-4">
              {[
                "How accurate is the AI score?",
                "Can I use voice or video?",
                "Is my data private?",
                "Why is data privacy important?",
                "Who is this for?",
              ].map((q, i) => (
                <div
                  key={i}
                  className={`
          rounded-xl p-5 text-gray-800 text-base md:text-lg font-medium
          bg-gray-100 border border-gray-200 shadow-sm hover:shadow-md
          transition-all duration-300 hover:border-cyan-400 hover:scale-[1.02]
          ${i % 2 === 1 ? "md:ml-6" : ""}
        `}
                >
                  {q}
                </div>
              ))}
            </div>
          </div> */}
          <div className="mb-24"></div>
        </div>

        <div className="relative w-full min-h-screen mb-0">
          {/* FULL WIDTH BACKGROUND IMAGE */}
          <img
            src={Faq}
            alt="FAQ Illustration"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Optional overlay */}
          <div className="absolute inset-0 bg-black/20"></div>

          {/* CONTENT — EXPANDS NATURALLY, NO SCROLLBAR */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[450px_1fr] gap-12 items-start pt-6">
            {/* LEFT EMPTY SPACE */}
            <div></div>

            {/* RIGHT FAQ */}
            <div className="pr-12  md:ml-[400px]">
              <h2 className="text-white text-5xl font-bold mb-4">FAQ</h2>

              <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-500 to-purple-500 mb-10 rounded-full"></div>

              <div className="space-y-6">
                {faqData.map((item, i) => (
                  <div
                    key={i}
                    className="w-[400px] rounded-[50px] overflow-hidden border border-gray-200 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/90"
                  >
                    <button
                      className="w-full flex items-center justify-between px-6 py-4 text-left text-gray-800 text-lg font-medium"
                      onClick={() => toggleQuestion(i)}
                    >
                      <span>{item.question}</span>
                      {openIndex === i ? (
                        <ChevronUp className="text-cyan-600" size={26} />
                      ) : (
                        <ChevronDown className="text-gray-500" size={26} />
                      )}
                    </button>

                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        openIndex === i
                          ? "opacity-100 max-h-96 px-6 pb-6"
                          : "opacity-0 max-h-0 overflow-hidden"
                      }`}
                    >
                      <p className="text-gray-700 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
