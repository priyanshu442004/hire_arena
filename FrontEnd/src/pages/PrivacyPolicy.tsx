// src/pages/PrivacyPolicyPage.tsx
import { Shield, FileText, Users, Lock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-indigo-50 to-cyan-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-6">
            <Shield className="mr-2" size={16} />
            Privacy First
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray prose-lg">
          <div className="space-y-12">
            {/* Intro */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="mr-3 text-indigo-500" size={24} />
                Introduction
              </h2>
              <p>
                At <strong>HireArena</strong>, we respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, store, and safeguard information when you use our platform — especially features like <strong>AI Avatar Simulation</strong>, <strong>Pitch Analysis</strong>, and the <strong>Analytics Dashboard</strong>.
              </p>
              <p>
                By using our services, you consent to the practices described below.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Users className="mr-3 text-cyan-500" size={24} />
                Information We Collect
              </h2>
              <h3 className="text-xl font-semibold mt-6 mb-3">Account & Profile Data</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Name, email, role (e.g., founder, educator)</li>
                <li>Company/startup name (optional)</li>
                <li>Profile picture (if uploaded)</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Pitch Content & Activity</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Text-based pitch decks, slides, summaries</li>
                <li>Recorded video/audio pitches (if uploaded for AI Avatar or Analysis)</li>
                <li>Interaction  timestamps, feature usage, scores, feedback</li>
                <li>Dashboard metrics (e.g., pitch versions, improvement trends)</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Technical Data</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Device type, browser, IP address (for security & analytics)</li>
                <li>Cookies & local storage (for session management)</li>
              </ul>
            </section>

            {/* How We Use Data */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Zap className="mr-3 text-purple-500" size={24} />
                How We Use Your Data
              </h2>
              <p className="mb-4">
                We use your information only to operate, improve, and secure our service:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>AI Training & Improvement</strong>: Video/audio/text may be used to improve our models — <em>but only if you opt in</em>. By default, your data is <strong>not used for public model training</strong>.
                </li>
                <li>
                  <strong>Pitch Analysis & Feedback</strong>: Your content is processed in real-time to generate scores, suggestions, and insights.
                </li>
                <li>
                  <strong>Personalization</strong>: Tailor AI avatars, benchmarks, and dashboard views to your startup stage and goals.
                </li>
                <li>
                  <strong>Security & Compliance</strong>: Detect fraud, prevent abuse, and meet legal obligations (e.g., data deletion requests).
                </li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Lock className="mr-3 text-green-500" size={24} />
                How We Protect Your Data
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>All data encrypted in transit (TLS 1.3+) and at rest (AES-256)</li>
                <li>Video/audio stored temporarily (≤ 30 days) unless you choose to save</li>
                <li>Strict access controls — only authorized engineers can access systems (never your pitch content)</li>
                <li>Regular third-party security audits</li>
                <li>GDPR & CCPA compliant — you can request export, correction, or deletion anytime</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Your Privacy Rights
              </h2>
              <p className="mb-4">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Access, correct, or delete your personal data</li>
                <li>Export your data (in JSON or PDF format)</li>
                <li>Opt out of AI training (via <strong>Settings → Privacy</strong>)</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, email us at{' '}
                <a href="mailto:privacy@yourplatform.com" className="text-indigo-600 hover:underline">
                  privacy@yourplatform.com
                </a>.
              </p>
            </section>

            {/* Third Parties */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Third-Party Services
              </h2>
              <p className="mb-4">
                We use trusted partners — but **never sell your data**:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>
                  <strong>Cloud Infrastructure</strong>: AWS (data hosted in US/EU regions only)
                </li>
                <li>
                  <strong>Analytics</strong>: Plausible (privacy-friendly, anonymized)
                </li>
                <li>
                  <strong>Email</strong>: Resend (transactional only — no marketing without consent)
                </li>
                <li>
                  <strong>Authentication</strong>: Google OAuth (we only receive your name/email)
                </li>
              </ul>
            </section>

            {/* Changes & Contact */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Updates & Contact
              </h2>
              <p className="mb-4">
                We may update this policy periodically. Significant changes will be notified via email or in-app alert.
              </p>
              <p>
                Questions? Contact our Data Protection Officer:  
                📧 <a href="mailto:dpo@yourplatform.com" className="text-indigo-600 hover:underline">dpo@yourplatform.com</a>  
                🏢 [Your Company Name], [Address]
              </p>
            </section>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Your trust is our foundation.
          </h3>
          <p className="text-gray-600 mb-6">
            We built this platform to empower founders — not exploit their ideas.
          </p>
          <Link
            to="/settings/privacy"
            className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800"
          >
            Manage Your Privacy Settings →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;