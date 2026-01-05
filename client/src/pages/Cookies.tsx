import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

export default function Cookies() {
  return (
    <PageLayout>
      <SEO 
        title="Cookie Policy | Nukleo Digital"
        description="Learn about how Nukleo Digital uses cookies and similar tracking technologies on our website."
        keywords="cookie policy, cookies, tracking, analytics"
      />
      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative min-h-[40vh] flex flex-col justify-center pt-32 pb-20">
          <div className="container">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-mono uppercase tracking-wider mb-8">
              Legal
            </span>
            
            <h1 className="text-white mb-4 max-w-4xl">
              COOKIE<br />
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
              <h2>1. What Are Cookies?</h2>
              <p>
                Cookies are small text files that are placed on your device when you visit a website. They help websites remember your preferences and improve your browsing experience.
              </p>

              <h2>2. How We Use Cookies</h2>
              <p>We use cookies for the following purposes:</p>
              <ul>
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Marketing Cookies:</strong> Track your activity to deliver relevant advertisements</li>
              </ul>

              <h2>3. Types of Cookies We Use</h2>
              
              <h3>Essential Cookies</h3>
              <p>
                These cookies are necessary for the website to function and cannot be switched off. They are usually set in response to actions you take, such as setting privacy preferences or filling in forms.
              </p>

              <h3>Analytics Cookies</h3>
              <p>
                We use analytics cookies to collect information about how visitors use our website. This helps us improve our website and services. We use tools like Google Analytics and Plausible Analytics.
              </p>

              <h3>Functional Cookies</h3>
              <p>
                These cookies enable enhanced functionality and personalization, such as remembering your language preference or login status.
              </p>

              <h3>Marketing Cookies</h3>
              <p>
                These cookies track your browsing activity to deliver advertisements that are relevant to you and your interests.
              </p>

              <h2>4. Third-Party Cookies</h2>
              <p>
                We may use third-party services that set cookies on your device. These include:
              </p>
              <ul>
                <li>Google Analytics (analytics)</li>
                <li>Plausible Analytics (privacy-focused analytics)</li>
                <li>Social media platforms (if you interact with social sharing buttons)</li>
              </ul>

              <h2>5. How to Control Cookies</h2>
              <p>
                You can control and manage cookies in several ways:
              </p>
              <ul>
                <li><strong>Browser Settings:</strong> Most browsers allow you to refuse or accept cookies through their settings</li>
                <li><strong>Cookie Preferences:</strong> You can manage your cookie preferences through our cookie consent banner</li>
                <li><strong>Opt-Out Tools:</strong> You can opt out of analytics tracking using browser extensions or opt-out links</li>
              </ul>

              <h2>6. Impact of Disabling Cookies</h2>
              <p>
                If you disable cookies, some features of our website may not function properly. Essential cookies cannot be disabled as they are necessary for the website to work.
              </p>

              <h2>7. Cookie Duration</h2>
              <p>
                Cookies may be session cookies (deleted when you close your browser) or persistent cookies (remain on your device for a set period or until you delete them).
              </p>

              <h2>8. Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date.
              </p>

              <h2>9. Contact Us</h2>
              <p>
                If you have questions about our use of cookies, please contact us at:
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
