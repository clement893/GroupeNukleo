import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

export default function TermsOfService() {
  return (
    <PageLayout>
      <SEO 
        title="Terms of Service | Legal Agreement"
        description="Read Nukleo Digital's Terms of Service. Legal terms and conditions governing the use of our AI services and platform."
        keywords="terms of service, terms and conditions, legal agreement, user agreement"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-violet-950 via-fuchsia-950 to-rose-950">
        <div className="container mx-auto px-4 py-32 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Terms of Service
          </h1>
          
          <p className="text-white/70 mb-12">
            Last updated: December 9, 2024
          </p>

          <div className="prose prose-invert prose-lg max-w-none space-y-8">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-white/70 leading-relaxed">
                By accessing and using Nukleo Digital's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use our services.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">2. Use of Services</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2">
                <li>Use the services in any way that violates applicable laws or regulations</li>
                <li>Engage in any conduct that restricts or inhibits anyone's use of the services</li>
                <li>Attempt to gain unauthorized access to any portion of the services</li>
                <li>Use the services to transmit any harmful or malicious code</li>
                <li>Interfere with or disrupt the services or servers</li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property</h2>
              <p className="text-white/70 leading-relaxed">
                The services and their original content, features, and functionality are owned by Nukleo Digital and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our services without our prior written permission.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">4. User Accounts</h2>
              <p className="text-white/70 leading-relaxed">
                When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding your account credentials and for any activities or actions under your account. You must notify us immediately of any unauthorized use of your account.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">5. Service Modifications</h2>
              <p className="text-white/70 leading-relaxed">
                We reserve the right to modify or discontinue, temporarily or permanently, the services (or any part thereof) with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the services.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
              <p className="text-white/70 leading-relaxed">
                In no event shall Nukleo Digital, its directors, employees, partners, or suppliers be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, the services.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">7. Governing Law</h2>
              <p className="text-white/70 leading-relaxed">
                These Terms shall be governed and construed in accordance with the laws of Canada, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">8. Changes to Terms</h2>
              <p className="text-white/70 leading-relaxed">
                We reserve the right to update or change our Terms of Service at any time. We will notify you of any changes by posting the new Terms of Service on this page and updating the "Last updated" date. Your continued use of the services after any such changes constitutes your acceptance of the new Terms.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">9. Contact Us</h2>
              <p className="text-white/70 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at <a href="mailto:hello@nukleo.com" className="text-cyan-400 hover:underline">hello@nukleo.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
