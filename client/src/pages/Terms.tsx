import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

export default function Terms() {
  return (
    <PageLayout>
      <SEO 
        title="Terms of Service | Nukleo Digital"
        description="Read our terms of service governing the use of Nukleo Digital's website and services."
        keywords="terms of service, terms and conditions, legal agreement"
      />
      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative min-h-[40vh] flex flex-col justify-center pt-32 pb-20">
          <div className="container">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-mono uppercase tracking-wider mb-8">
              Legal
            </span>
            
            <h1 className="text-white mb-4 max-w-4xl">
              TERMS OF<br />
              SERVICE
            </h1>
            
            <p className="text-white/60 text-sm">
              Last updated: December 8, 2025
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-24 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using Nukleo Digital's website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>

              <h2>2. Services</h2>
              <p>
                Nukleo Digital provides AI transformation consulting, digital platform development, and intelligent operations services. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.
              </p>

              <h2>3. User Responsibilities</h2>
              <p>You agree to:</p>
              <ul>
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use our services in compliance with applicable laws</li>
                <li>Not engage in any activity that interferes with or disrupts our services</li>
                <li>Not attempt to gain unauthorized access to our systems</li>
              </ul>

              <h2>4. Intellectual Property</h2>
              <p>
                All content, features, and functionality of our website and services are owned by Nukleo Digital and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
              </p>

              <h2>5. Client Projects</h2>
              <p>
                For client projects, specific terms will be outlined in separate service agreements. These Terms of Service govern general use of our website and publicly available resources.
              </p>

              <h2>6. Payment Terms</h2>
              <p>
                Payment terms for services will be specified in individual service agreements. Generally, payments are due according to agreed-upon milestones or schedules. Late payments may incur interest charges.
              </p>

              <h2>7. Confidentiality</h2>
              <p>
                We respect the confidentiality of client information and maintain strict confidentiality obligations as outlined in our service agreements and privacy policy.
              </p>

              <h2>8. Warranties and Disclaimers</h2>
              <p>
                Our services are provided "as is" without warranties of any kind, either express or implied. We do not guarantee that our services will be uninterrupted, error-free, or meet your specific requirements.
              </p>

              <h2>9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Nukleo Digital shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.
              </p>

              <h2>10. Indemnification</h2>
              <p>
                You agree to indemnify and hold Nukleo Digital harmless from any claims, damages, or expenses arising from your use of our services or violation of these terms.
              </p>

              <h2>11. Termination</h2>
              <p>
                We reserve the right to terminate or suspend access to our services immediately, without prior notice, for any reason, including breach of these Terms of Service.
              </p>

              <h2>12. Governing Law</h2>
              <p>
                These Terms of Service are governed by the laws of the Province of Quebec, Canada, without regard to its conflict of law provisions.
              </p>

              <h2>13. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the updated terms on this page.
              </p>

              <h2>14. Contact Information</h2>
              <p>
                For questions about these Terms of Service, please contact us at:
              </p>
              <p>
                <strong>Nukleo Digital</strong><br />
                Email: <a href="mailto:hello@nukleo.com" className="text-purple-600 hover:text-purple-700">hello@nukleo.com</a><br />
                Address: 7236 Rue Waverly, Montréal, QC H2R 0C2, Canada
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
