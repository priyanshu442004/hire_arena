// src/pages/SolutionsPage.tsx
import {
  Rocket,
  Lightbulb,
  GraduationCap,
  Building,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Solution = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-indigo-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-6">
            <Rocket className="mr-2" size={16} />
            Built for impact
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Transforming Interview Preparation with <br /> <span className="text-[#105472]">AI intelligence</span> 
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            HireArena creates a smart, interactive interview environment where users practice with AI judges, receive instant feedback, and continuously improve communication, clarity, and confidence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/features"
              className="px-8 py-3 bg-[#105472] text-white font-semibold rounded-lg hover:bg-[#06b6d4] transition"
            >
              Explore Features
            </Link>
            <Link
              to="/demo"
              className="px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition"
            >
              Watch Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why do 90% of candidates fail real interviews?
              </h2>
              <div className="space-y-4">
                {[
                  'Poor communication & lack of confidence',
                  'No structured interview preparation',
                  'Inability to answer under pressure',
                  'Weak clarity of concepts & responses',
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-red-400 mr-3 mt-2"></div>
                    </div>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mr-4">
                  <Lightbulb className="text-green-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Our Solution</h3>
              </div>
              <p className="text-gray-700 mb-4">
                A smart, AI-powered interview preparation system that transforms nervous candidates into confident performers — through realistic interview simulations, instant feedback, and personalized coaching.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckIcon />
                  <span>AI-powered mock interviews with real scenarios (0–100)</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon />
                  <span>Real-time performance scoring & analysis</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon />
                  <span>Instant feedback on communication & confidence</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon />
                  <span>Progress tracking & skill readiness insights</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Audience-Specific Solutions */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tailored for every stakeholder
            </h2>
            <p className="text-lg text-gray-600">
              One platform. Multiple powerful solutions for modern hiring and skill development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Rocket className="text-indigo-500" size={32} />,
                title: 'For Job Seekers & Candidates',
                points: [
                  'Practice real-time AI-powered mock interviews',
                  'Improve weak areas with guided suggestions',
                  'Track progress with performance analytics',
                ],
                cta: 'Start Your Interview Prep ',
                link: '/founders',
              },
              {
                icon: <Building className="text-purple-500" size={32} />,
                title: 'For Institutes, Accelerators & HR Teams',
                points: [
                  'Automate candidate assessment & shortlisting',
                  'Track learner progress and skill gaps',
                  'Generate feedback-driven improvement plans',
                ],
                cta: 'Explore Organizational Tools',
                link: '/accelerators',
              },
              {
                icon: <GraduationCap className="text-amber-500" size={32} />,
                title: 'For Educators & Training Providers',
                points: [
                  'Assign structured interview practice modules',
                  'Use AI-based scoring & rubrics',
                  'Generate feedback-driven improvement plans',
                ],
                cta: 'For Training Programs',
                link: '/education',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <ul className="space-y-3 mb-8">
                  {item.points.map((point, i) => (
                    <li key={i} className="flex items-start text-gray-600">
                      <CheckCircleIcon className="text-green-500 mt-0.5 mr-2 flex-shrink-0" size={16} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={item.link}
                  className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800"
                >
                  {item.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Learners, Institutes & Hiring Teams
            </h2>
            <p className="text-lg text-gray-600">
              Real impact. Measurable growth. Smarter hiring outcomes.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '87%', label: 'Confidence boost ' },
              { value: '3.2x', label: 'Faster candidate readiness' },
              { value: '12K+', label: 'AI interviews conducted' },
              { value: '94%', label: 'User satisfaction score' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-bold text-[#105472] mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* <section className="py-16 md:py-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Transform how you pitch — starting today
          </h2>
          <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
            Whether you're a solo founder or running a startup program, our solution scales with your ambition.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/pricing"
              className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100 transition"
            >
              Get Started Free
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  );
};

// Helper Components
const CheckIcon = () => (
  <svg
    className="w-5 h-5 text-green-500 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
);

const CheckCircleIcon = ({ className, size }: { className?: string; size?: number }) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
  </svg>
);

export default Solution;