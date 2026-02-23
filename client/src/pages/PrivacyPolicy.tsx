import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

export default function PrivacyPolicy() {
  return (
    <PageLayout>
      <SEO 
        title="Privacy Policy | Your Data Protection"
        description="Learn how Nukleo Digital collects, uses, and protects your personal information. Our commitment to data privacy and security."
        keywords="privacy policy, data protection, GDPR, personal information, data security"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-violet-950 via-fuchsia-950 to-rose-950">
        <div className="container mx-auto px-4 py-32 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Privacy Policy
          </h1>
          
          <p className="text-white/70 mb-12">
            Last updated: December 9, 2024
          </p>

          <div className="prose prose-invert prose-lg max-w-none space-y-8">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
              <p className="text-white/70 leading-relaxed">
                We collect information that you provide directly to us, including when you create an account, use our services, communicate with us, or participate in surveys. This may include your name, email address, company information, and any other information you choose to provide.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Analyze usage patterns and trends</li>
                <li>Protect against fraudulent or illegal activity</li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">3. Information Sharing</h2>
              <p className="text-white/70 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, as long as they agree to keep this information confidential.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
              <p className="text-white/70 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Request restriction of processing</li>
                <li>Data portability</li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">6. Cookies</h2>
              <p className="text-white/70 leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. See our <a href="/cookie-policy" className="text-cyan-400 hover:underline">Cookie Policy</a> for more information.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">7. Changes to This Policy</h2>
              <p className="text-white/70 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">8. Contact Us</h2>
              <p className="text-white/70 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at <a href="mailto:hello@nukleo.com" className="text-cyan-400 hover:underline">hello@nukleo.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
