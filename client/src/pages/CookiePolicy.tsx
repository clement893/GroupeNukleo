import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

export default function CookiePolicy() {
  return (
    <PageLayout>
      <SEO 
        title="Cookie Policy | How We Use Cookies"
        description="Learn about how Nukleo Digital uses cookies and similar technologies to improve your browsing experience and analyze site traffic."
        keywords="cookie policy, cookies, tracking, web analytics, browser storage"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-violet-950 via-fuchsia-950 to-rose-950">
        <div className="container mx-auto px-4 py-32 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Cookie Policy
          </h1>
          
          <p className="text-white/70 mb-12">
            Last updated: December 9, 2024
          </p>

          <div className="prose prose-invert prose-lg max-w-none space-y-8">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">What Are Cookies?</h2>
              <p className="text-white/70 leading-relaxed">
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Cookies</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                We use cookies for several purposes:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2">
                <li><strong className="text-white">Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong className="text-white">Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong className="text-white">Functional Cookies:</strong> Remember your preferences and settings</li>
                <li><strong className="text-white">Performance Cookies:</strong> Improve website speed and performance</li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Types of Cookies We Use</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Session Cookies</h3>
                  <p className="text-white/70">
                    Temporary cookies that expire when you close your browser. These are essential for maintaining your session while navigating our website.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Persistent Cookies</h3>
                  <p className="text-white/70">
                    Remain on your device for a set period or until you delete them. These help us remember your preferences for future visits.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Third-Party Cookies</h3>
                  <p className="text-white/70">
                    Set by third-party services we use, such as analytics providers. These help us understand how our website is being used and improve our services.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Managing Cookies</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                You can control and manage cookies in several ways:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2">
                <li>Most browsers allow you to refuse or accept cookies</li>
                <li>You can delete cookies that have already been set</li>
                <li>You can set your browser to notify you when cookies are being sent</li>
                <li>Some features of our website may not function properly if you disable cookies</li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Browser Settings</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                To manage cookies, you can adjust your browser settings:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2">
                <li><strong className="text-white">Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                <li><strong className="text-white">Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                <li><strong className="text-white">Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                <li><strong className="text-white">Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Updates to This Policy</h2>
              <p className="text-white/70 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please revisit this page periodically to stay informed about our use of cookies.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-white/70 leading-relaxed">
                If you have any questions about our use of cookies, please contact us at <a href="mailto:hello@nukleo.com" className="text-cyan-400 hover:underline">hello@nukleo.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
