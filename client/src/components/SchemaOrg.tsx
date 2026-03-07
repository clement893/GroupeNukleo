import { Helmet } from "react-helmet-async";

interface SchemaOrgProps {
  type: "Organization" | "Service" | "Review" | "FAQPage";
  data?: any;
}

export default function SchemaOrg({ type, data }: SchemaOrgProps) {
  const getSchema = () => {
    switch (type) {
      case "Organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Nukleo Digital",
          "alternateName": "Nukleo",
          "url": "https://nukleodigital-production.up.railway.app",
          "logo": "https://nukleodigital-production.up.railway.app/Nukleo_blanc_RVB.svg",
          "description": "Transform your business with agentic AI. Expert consulting, custom development & intelligent automation for startups, SMBs & enterprises.",
          "foundingDate": "2020",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "CA"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Business Inquiries",
            "url": "https://nukleodigital-production.up.railway.app/contact"
          },
          "sameAs": [
            "https://github.com/clement893/nukleo.digital"
          ],
          "areaServed": "Worldwide",
          "serviceType": ["AI Consulting", "Digital Transformation", "Custom Software Development", "Intelligent Automation"]
        };

      case "Service":
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": data?.serviceType || "AI Transformation Services",
          "provider": {
            "@type": "Organization",
            "name": "Nukleo Digital"
          },
          "areaServed": "Worldwide",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "AI Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "AI Strategy & Marketing",
                  "description": "Strategic AI consulting, market research, and go-to-market planning"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Digital Platforms",
                  "description": "Custom web and mobile applications, API development, cloud infrastructure"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Intelligent Operations",
                  "description": "Process automation, workflow optimization, AI-powered analytics"
                }
              }
            ]
          }
        };

      case "Review":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Nukleo Digital",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": "12"
          },
          "review": data?.reviews || []
        };

      case "FAQPage":
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data?.faqs || []
        };

      default:
        return null;
    }
  };

  const schema = getSchema();

  if (!schema) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
