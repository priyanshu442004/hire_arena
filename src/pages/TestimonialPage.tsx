// src/components/TestimonialsPage.tsx
import { Quote, Star, Building2, Linkedin } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "B.Tech Graduate, Software Developer Aspirant",
    company: "LedgerFlow",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    content:
      "HireArena’s AI interviewer helped me overcome nervousness and structure my answers properly.I finally understood where I was going wrong in HR and technical rounds.Cracked my first job at a product-based company within 3 weeks!",
    rating: 5,
    source: "linkedin",
  },
  {
    id: 2,
    name: "Raj Patel",
    role: "Backend Developer, 1.5 Years Experience",
    company: "NeuroSync AI",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    content:
      "As someone transitioning to a better role, HireArena was a game-changer.The platform simulated technical interviews so well that I felt like I was talking to a real interviewer.Improved my system design and DSA responses — landed a 12 LPA offer.",
    rating: 5,
    source: "linkedin",
  },
  {
    id: 3,
    name: "Sophie Chen",
    role: "MBA Student, Operations & HR",
    company: "Verve Health",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    content:
      "I used HireArena to prepare for campus placements, and the automated feedback showed me exactly how to improve.The AI mock HR interviewer taught me structured storytelling and confidence.Converted all 3 of my HR interviews successfully.",
    rating: 5,
    source: "linkedin",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Mechanical Engineer Switching to IT",
    company: "EcoPack",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    content:
      "As a non-CS student, I was struggling with technical interviews.HireArena’s personalized interview flow and beginner-friendly guidance helped me explain projects clearly and confidently.Got my first IT support role in just two attempts!",
    rating: 5,
    source: "linkedin",
  },
  {
    id: 5,
    name: "Maya Johnson",
    role: "Customer Support Executive, 2 Years Experience",
    company: "Stellar EdTech",
    avatar: "https://randomuser.me/api/portraits/women/15.jpg",
    content:
      "The behavioural AI interviewer pointed out blind spots in my communication and tone.I learned how to answer tough situational questions without rambling.Ended up getting selected for a senior support position with a 35% hike.",
    rating: 5,
    source: "linkedin",
  },
  {
    id: 6,
    name: "Carlos Rivera",
    role: "Data Analyst Trainee",
    company: "AgriNova",
    avatar: "https://randomuser.me/api/portraits/men/86.jpg",
    content:
      "HireaArena’s interview video analysis helped me refine my communication and remove filler words.The feedback was precise, practical, and easy to apply.I secured a data analyst internship within a month.",
    rating: 5,
    source: "linkedin",
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl mt-8 md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-[#105472]">Trusted</span> by Learners, Institutes & Hiring Teams
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Real experiences from candidates, trainers, institutes, and organizations who improved performance, reduced hiring effort, and built confident professionals using HireArena’s AI-powered interview ecosystem.
        </p>
      </div>

      {/* Stats Banner */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-6 mb-16 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: "2,500+", label: "Users trained" },
          { value: "120+", label: "Organizations Onboarded" },
          { value: "94%", label: "Confidence Improvement Rate" },
          { value: "4.9/5", label: "Average User Satisfaction" },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-[#105472]">{stat.value}</p>
            <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
          </div>
        ))}
        <p className="col-span-full text-xs text-gray-500 text-center mt-2">
          Based on users who completed structured AI interview practice workflows
        </p>
      </div>

      {/* Carousel (Mobile) */}
      <div className="md:hidden max-w-lg mx-auto mb-12 relative">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-start mb-4">
            <img
              src={testimonials[currentIndex].avatar}
              alt={testimonials[currentIndex].name}
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div>
              <h3 className="font-bold text-gray-900">{testimonials[currentIndex].name}</h3>
              <p className="text-sm text-gray-600">{testimonials[currentIndex].role}, {testimonials[currentIndex].company}</p>
            </div>
            <Quote className="w-6 h-6 text-gray-300 ml-auto mt-1" />
          </div>
          <p className="text-gray-700 italic mb-4">"{testimonials[currentIndex].content}"</p>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-0.5" />
            ))}
            <Linkedin className="w-4 h-4 text-blue-600 ml-2" />
          </div>
        </div>
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 bg-white rounded-full shadow-md p-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 bg-white rounded-full shadow-md p-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div className="flex justify-center mt-4 space-x-1">
          {testimonials.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${i === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>

      {/* Grid (Desktop) */}
      <div className="hidden md:grid max-w-6xl mx-auto grid-cols-1 lg:grid-cols-2 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start mb-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                <p className="text-sm text-gray-600 flex items-center">
                  <Building2 className="w-3 h-3 mr-1" />
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
              <Quote className="w-6 h-6 text-gray-300 ml-auto mt-1" />
            </div>
            <p className="text-gray-700 italic mb-4">"{testimonial.content}"</p>
            <div className="flex items-center">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-0.5" />
              ))}
              <Linkedin className="w-4 h-4 text-blue-600 ml-2" />
              <span className="text-xs text-gray-500 ml-1">Verified on LinkedIn</span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      {/* <div className="mt-20 max-w-3xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center text-white">
        <User className="w-12 h-12 mx-auto text-blue-200 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Your Success Story Starts Here</h2>
        <p className="opacity-90 mb-6">
          Join founders who turned their vision into funded reality — with clarity, confidence, and a killer pitch.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors">
            Start Free Trial
          </button>
          <button className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-xl hover:bg-blue-700 transition-colors">
            View Case Studies
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Testimonial;