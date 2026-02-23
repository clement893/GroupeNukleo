import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

/**
 * Homepage demo page. Fix: border-[#0A0A0A]/8 caused "Unexpected *" in esbuild
 * because / in arbitrary values is parsed as division. Use rgba() instead.
 */
export default function HomepageDemo() {
  return (
    <div className="relative">
      <SEO title="Homepage Demo" description="Homepage demo" />
      <Header />
      <main>
        {/* ─── STATS ────────────────────────────────────────────────────── */}
        <section className="py-20 border-t border-b border-[rgba(10,10,10,0.08)] px-8 lg:px-16">
          <div className="max-w-screen-xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {[
              { value: '15+', label: 'Years of combined expertise' },
              { value: '50+', label: 'Projects delivered' },
              { value: '98%', label: 'Client satisfaction' },
              { value: '24/7', label: 'Support available' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
