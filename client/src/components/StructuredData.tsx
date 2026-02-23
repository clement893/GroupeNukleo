import { useEffect } from 'react';

// Type definitions for Schema.org structured data
export interface SchemaOrgData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

interface StructuredDataProps {
  data: SchemaOrgData | Record<string, any>;
}

export default function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    script.id = `structured-data-${Date.now()}`;
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(script.id);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [data]);

  return null;
}

// Predefined schemas
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Nukleo Digital',
  alternateName: 'Nukleo',
  url: 'https://nukleo.digital',
  logo: {
    '@type': 'ImageObject',
    url: 'https://nukleo.digital/Nukleo_blanc_RVB.svg',
    width: 120,
    height: 32,
  },
  image: 'https://nukleo.digital/Nukleo_blanc_RVB.svg',
  description: 'AI Transformation Agency helping organizations unlock the power of artificial intelligence through agentic AI systems, AI-native platforms, and intelligent operations.',
  foundingDate: '2020',
  foundingLocation: {
    '@type': 'Place',
    addressLocality: 'Montréal',
    addressRegion: 'QC',
    addressCountry: 'CA',
  },
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    value: '15+',
  },
  sameAs: [
    'https://www.linkedin.com/company/nukleo-group',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'hello@nukleo.com',
      availableLanguage: ['English', 'French'],
      areaServed: 'Worldwide',
    },
    {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      email: 'hello@nukleo.com',
      availableLanguage: ['English', 'French'],
    },
  ],
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: '7236 Rue Waverly',
      addressLocality: 'Montréal',
      addressRegion: 'QC',
      postalCode: 'H2R 0C2',
      addressCountry: 'CA',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: '1800 Argyle St Unit 801',
      addressLocality: 'Halifax',
      addressRegion: 'NS',
      postalCode: 'B3J 3N8',
      addressCountry: 'CA',
    },
  ],
  areaServed: {
    '@type': 'Place',
    name: 'Worldwide',
  },
  knowsAbout: [
    'Artificial Intelligence',
    'Agentic AI',
    'AI Strategy',
    'Digital Transformation',
    'Machine Learning',
    'AI Automation',
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Nukleo Digital',
  url: 'https://nukleo.digital',
  description: 'AI transformation agency helping organizations unlock the power of artificial intelligence',
  publisher: {
    '@type': 'Organization',
    name: 'Nukleo Digital',
    logo: {
      '@type': 'ImageObject',
      url: 'https://nukleo.digital/Nukleo_blanc_RVB.svg',
    },
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://nukleo.digital/glossary?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export function createArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  image?: string;
  keywords?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished || new Date().toISOString(),
    dateModified: article.dateModified || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: article.author || 'Nukleo Digital',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Nukleo Digital',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nukleo.digital/Nukleo_blanc_RVB.svg',
      },
    },
    image: article.image || 'https://nukleo.digital/og-image.jpg',
    keywords: article.keywords?.join(', '),
  };
}

export function createFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function createBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'AI Transformation Services',
  provider: {
    '@type': 'Organization',
    name: 'Nukleo Digital',
  },
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI Strategy & Marketing',
          description: 'Strategic AI consulting, market research, positioning, and go-to-market planning for AI products and services.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Digital Platforms',
          description: 'Custom web and mobile applications, API development, cloud infrastructure, and scalable digital solutions.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Intelligent Operations',
          description: 'Process automation, workflow optimization, AI-powered analytics, and operational intelligence.',
        },
      },
    ],
  },
};

export function createServiceSchema(service: {
  name: string;
  description: string;
  url?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'Nukleo Digital',
    },
    url: service.url || 'https://nukleo.digital',
  };
}

export function createReviewSchema(params: {
  itemReviewed: {
    name: string;
    type: string;
    url?: string;
  };
  reviews: Array<{ author: string; rating: number; text: string; date?: string }>;
}) {
  const { itemReviewed, reviews } = params;
  
  return {
    '@context': 'https://schema.org',
    '@type': itemReviewed.type === 'Organization' ? 'Organization' : 'Product',
    name: itemReviewed.name,
    url: itemReviewed.url || 'https://nukleo.digital',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
      bestRating: '5',
      worstRating: '1',
      ratingCount: reviews.length.toString(),
    },
    review: reviews.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating.toString(),
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: review.text,
      datePublished: review.date || new Date().toISOString(),
    })),
  };
}

// LocalBusiness schema for office locations
export function createLocalBusinessSchema(location: {
  name: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
  telephone?: string;
  email?: string;
  url?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://nukleo.digital#${location.addressLocality.toLowerCase()}`,
    name: location.name,
    image: 'https://nukleo.digital/Nukleo_blanc_RVB.svg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.streetAddress,
      addressLocality: location.addressLocality,
      addressRegion: location.addressRegion,
      postalCode: location.postalCode,
      addressCountry: location.addressCountry,
    },
    telephone: location.telephone,
    email: location.email || 'hello@nukleo.com',
    url: location.url || 'https://nukleo.digital',
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
  };
}

// Person schema for team members
export function createPersonSchema(person: {
  name: string;
  jobTitle: string;
  image?: string;
  url?: string;
  email?: string;
  sameAs?: string[];
  worksFor?: {
    name: string;
    url: string;
  };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.jobTitle,
    image: person.image,
    url: person.url,
    email: person.email,
    sameAs: person.sameAs || [],
    worksFor: person.worksFor || {
      '@type': 'Organization',
      name: 'Nukleo Digital',
      url: 'https://nukleo.digital',
    },
  };
}

// Predefined LocalBusiness schemas for offices
export const montrealOfficeSchema = createLocalBusinessSchema({
  name: 'Nukleo Digital - Montréal',
  streetAddress: '7236 Rue Waverly',
  addressLocality: 'Montréal',
  addressRegion: 'QC',
  postalCode: 'H2R 0C2',
  addressCountry: 'CA',
  email: 'hello@nukleo.com',
  url: 'https://nukleo.digital',
});

export const halifaxOfficeSchema = createLocalBusinessSchema({
  name: 'Nukleo Digital - Halifax',
  streetAddress: '1800 Argyle St Unit 801',
  addressLocality: 'Halifax',
  addressRegion: 'NS',
  postalCode: 'B3J 3N8',
  addressCountry: 'CA',
  email: 'hello@nukleo.com',
  url: 'https://nukleo.digital',
});

// VideoObject schema for video content
export function createVideoObjectSchema(video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl?: string;
  embedUrl?: string;
  duration?: string; // ISO 8601 duration (e.g., "PT1H30M")
  publisher?: {
    name: string;
    logo?: string;
  };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    contentUrl: video.contentUrl,
    embedUrl: video.embedUrl,
    duration: video.duration,
    publisher: video.publisher ? {
      '@type': 'Organization',
      name: video.publisher.name,
      logo: video.publisher.logo ? {
        '@type': 'ImageObject',
        url: video.publisher.logo,
      } : undefined,
    } : {
      '@type': 'Organization',
      name: 'Nukleo Digital',
      logo: 'https://nukleo.digital/Nukleo_blanc_RVB.svg',
    },
  };
}
