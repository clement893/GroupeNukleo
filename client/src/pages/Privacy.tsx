import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

export default function Privacy() {
  return (
    <PageLayout>
      <SEO 
        title="Privacy Policy | Nukleo Digital"
        description="Learn how Nukleo Digital collects, uses, and protects your personal information. Our commitment to data privacy and security."
        keywords="privacy policy, data protection, GDPR, CCPA, data security"
      />
      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative min-h-[40vh] flex flex-col justify-center pt-32 pb-20">
          <div className="container">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-mono uppercase tracking-wider mb-8">
              Legal
            </span>
            
            <h1 className="text-white mb-4 max-w-4xl">
              PRIVACY<br />
              POLICY
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
              <h2>1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, including name, email address, company information, and any other information you choose to provide when you contact us or use our services.
              </p>

              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Respond to your inquiries and fulfill your requests</li>
                <li>Send you technical notices and support messages</li>
                <li>Communicate with you about products, services, and events</li>
                <li>Monitor and analyze trends and usage</li>
              </ul>

              <h2>3. Information Sharing</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who assist us in operating our business, subject to confidentiality obligations.
              </p>

              <h2>4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, access controls, and regular security assessments.
              </p>

              <h2>5. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law.
              </p>

              <h2>6. Your Rights (GDPR & CCPA Compliance)</h2>
              <p>
                In accordance with the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA), 
                you have the following rights regarding your personal information:
              </p>
              <ul>
                <li><strong>Right of Access:</strong> Access your personal information</li>
                <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
                <li><strong>Right to Object:</strong> Object to processing of your data</li>
                <li><strong>Right to Restrict Processing:</strong> Request restriction of processing</li>
                <li><strong>Right to Data Portability:</strong> Request data portability in a structured format</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
                <li><strong>Right to Lodge a Complaint:</strong> File a complaint with a supervisory authority</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us at <a href="mailto:hello@nukleo.com" className="text-purple-600 hover:text-purple-700">hello@nukleo.com</a>. 
                We will respond to your request within 30 days.
              </p>

              <h2>7. Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to collect information about your browsing activities. You can control cookies through your browser settings. See our Cookie Policy for more details.
              </p>

              <h2>8. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with this privacy policy.
              </p>

              <h2>9. Children's Privacy</h2>
              <p>
                Our services are not directed to individuals under 16. We do not knowingly collect personal information from children under 16.
              </p>

              <h2>10. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date.
              </p>

              <h2>11. Contact Us</h2>
              <p>
                If you have questions about this privacy policy or our data practices, please contact us at:
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
