import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

export default function PrivacyPolicyNukleoTime() {
  return (
    <PageLayout>
      <SEO 
        title="Privacy Policy | Nukleo.TIME"
        description="Learn how Nukleo.TIME collects, uses, and protects your information. Our commitment to data privacy and security for our time tracking mobile application."
        keywords="privacy policy, Nukleo.TIME, time tracking, data protection, mobile app privacy, GDPR"
      />
      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative min-h-[40vh] flex flex-col justify-center pt-32 pb-20 bg-black">
          <div className="container">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-mono uppercase tracking-wider mb-8">
              Legal
            </span>
            
            <h1 className="text-white mb-4 max-w-4xl">
              PRIVACY<br />
              POLICY
            </h1>
            
            <p className="text-white/60 text-sm mb-2">
              Nukleo.TIME - Track your time, sync with your ERP
            </p>
            
            <p className="text-white/60 text-sm">
              Last updated: January 25, 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-24 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h2>Introduction</h2>
              <p>
                Nukleo.TIME ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our mobile application.
              </p>

              <h2>Information We Collect</h2>
              
              <h3>Information You Provide</h3>
              <p><strong>Account Information:</strong> When you create an account, we collect your email address and authentication credentials. If you use QR code login, we receive encrypted credentials from your company's ERP system.</p>
              
              <p><strong>Work Data:</strong> We collect and store information about your work sessions, including start and end times, project names, task descriptions, and duration. This data is essential for the time tracking functionality of the application.</p>
              
              <p><strong>Pet Data:</strong> Your virtual pet choices, feeding history, and gamification progress are stored locally on your device and are not transmitted to our servers.</p>

              <h3>Automatically Collected Information</h3>
              <p><strong>Device Information:</strong> We collect basic device information such as device type, operating system version, and app version to ensure compatibility and optimize performance.</p>
              
              <p><strong>Usage Data:</strong> We collect anonymous usage statistics about which features you use and how often, helping us improve the application. This data is aggregated and cannot be used to identify you personally.</p>
              
              <p><strong>Sync Data:</strong> We log timestamps and status of data synchronization with your ERP system to troubleshoot sync issues and ensure data integrity.</p>

              <h2>How We Use Your Information</h2>
              <p>We use the collected information to:</p>
              <ul>
                <li><strong>Provide Core Functionality:</strong> Enable time tracking, Pomodoro timer, and work session management</li>
                <li><strong>ERP Integration:</strong> Sync your work hours with your company's ERP system as required by your employer</li>
                <li><strong>Gamification:</strong> Display your virtual pet progress and daily quest completion (stored locally)</li>
                <li><strong>Improve User Experience:</strong> Analyze usage patterns to enhance app features and fix bugs</li>
                <li><strong>Customer Support:</strong> Respond to your inquiries and provide technical assistance</li>
                <li><strong>Security:</strong> Detect and prevent fraudulent activity or unauthorized access</li>
              </ul>

              <h2>Data Storage and Security</h2>
              <p><strong>Local Storage:</strong> Most of your personal data, including pet progress and app preferences, is stored locally on your device using secure encrypted storage (SecureStore for sensitive data, AsyncStorage for preferences).</p>
              
              <p><strong>Cloud Sync:</strong> Time tracking entries are synchronized with your company's ERP system using encrypted HTTPS connections. We do not store copies of your time entries on our servers beyond what is necessary for synchronization.</p>
              
              <p><strong>Database Security:</strong> User account information is stored in a secure PostgreSQL database hosted on Railway with industry-standard encryption at rest and in transit. Access to the database is restricted and monitored.</p>
              
              <p><strong>Authentication:</strong> We use JWT (JSON Web Tokens) for secure authentication. Tokens are stored securely on your device and transmitted only over encrypted connections.</p>

              <h2>Data Sharing and Disclosure</h2>
              <p>We do NOT:</p>
              <ul>
                <li>Sell your personal information to third parties</li>
                <li>Share your data with advertisers or marketing companies</li>
                <li>Use your data for purposes other than those described in this policy</li>
                <li>Access your data without your explicit consent, except as required for service operation</li>
              </ul>
              
              <p>We MAY share your information only in the following circumstances:</p>
              <ul>
                <li><strong>With Your Employer:</strong> Time tracking data is shared with your company's ERP system as required for payroll and project management purposes. This is the core functionality of the application.</li>
                <li><strong>Legal Requirements:</strong> We may disclose your information if required by law, court order, or government regulation, or to protect our legal rights and prevent fraud.</li>
                <li><strong>Service Providers:</strong> We use third-party services (Railway for hosting, Expo for app distribution) that may have access to your data solely for the purpose of providing their services to us. These providers are bound by confidentiality agreements.</li>
              </ul>

              <h2>Data Retention</h2>
              <p><strong>Active Accounts:</strong> We retain your account information and time tracking data for as long as your account is active and as required by your employer's record-keeping policies.</p>
              
              <p><strong>Deleted Accounts:</strong> When you delete your account, we permanently delete your personal information within 30 days, except where we are required by law to retain certain records (e.g., for tax or audit purposes).</p>
              
              <p><strong>Local Data:</strong> Data stored locally on your device (pet progress, preferences) is deleted immediately when you uninstall the app.</p>

              <h2>Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li><strong>Access:</strong> Request a copy of all personal data we hold about you</li>
                <li><strong>Rectification:</strong> Correct inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and all associated data (subject to legal retention requirements)</li>
                <li><strong>Data Portability:</strong> Export your time tracking data in a machine-readable format (CSV or JSON)</li>
                <li><strong>Opt-Out:</strong> Disable automatic synchronization with your ERP system (note: this may affect your ability to use the app as intended by your employer)</li>
                <li><strong>Withdraw Consent:</strong> Revoke consent for data processing at any time</li>
              </ul>
              <p>
                To exercise these rights, please contact us at the email address provided below. We will respond to your request within 30 days.
              </p>

              <h2>Children's Privacy</h2>
              <p>
                Nukleo.TIME is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have inadvertently collected such information, we will take steps to delete it immediately.
              </p>

              <h2>International Data Transfers</h2>
              <p>
                If you are located outside the country where our servers are hosted (United States), your information may be transferred to, stored, and processed in the United States. By using Nukleo.TIME, you consent to this transfer. We ensure that appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
              </p>

              <h2>Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by:</p>
              <ul>
                <li>Posting the updated policy in the app with a new "Last updated" date</li>
                <li>Sending an in-app notification</li>
                <li>Requiring you to review and accept the updated policy before continuing to use the app</li>
              </ul>
              <p>
                Your continued use of Nukleo.TIME after changes are posted constitutes your acceptance of the updated Privacy Policy.
              </p>

              <h2>Third-Party Services</h2>
              <p>Nukleo.TIME integrates with the following third-party services:</p>
              <ul>
                <li><strong>Railway:</strong> Cloud hosting provider for our backend infrastructure. <a href="https://railway.app/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">Railway Privacy Policy</a></li>
                <li><strong>Expo:</strong> Mobile app development and distribution platform. <a href="https://expo.dev/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">Expo Privacy Policy</a></li>
                <li><strong>Google Sign-In:</strong> Optional authentication method. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">Google Privacy Policy</a></li>
              </ul>
              <p>
                These services have their own privacy policies, and we encourage you to review them.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <p>
                <strong>Email:</strong> <a href="mailto:hello@nukleo.com" className="text-purple-600 hover:text-purple-700">hello@nukleo.com</a><br />
                <strong>GitHub Issues:</strong> <a href="https://github.com/clement893/NUKLEO.TIME/issues" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">https://github.com/clement893/NUKLEO.TIME/issues</a>
              </p>
              <p>
                We will respond to all inquiries within 30 days.
              </p>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  © 2026 Nukleo.TIME. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
