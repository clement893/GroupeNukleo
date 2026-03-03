import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { trpc } from '@/lib/trpc';

export default function TestimonialsCarousel() {
  const { t, language } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { data: testimonials = [], isLoading } = trpc.testimonials.getAll.useQuery({ language });

  // Sélectionner 6 témoignages pour le carrousel
  const safeTestimonials = Array.isArray(testimonials) ? testimonials : [];
  const carouselTestimonials = safeTestimonials.slice(0, 6);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselTestimonials.length);
    }, 8000); // Change toutes les 8 secondes

    return () => clearInterval(interval);
  }, [isAutoPlaying, carouselTestimonials.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => 
      prev === 0 ? carouselTestimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % carouselTestimonials.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  // Reset index if testimonials change
  useEffect(() => {
    if (carouselTestimonials.length > 0 && currentIndex >= carouselTestimonials.length) {
      setCurrentIndex(0);
    }
  }, [carouselTestimonials.length, currentIndex]);

  if (isLoading || carouselTestimonials.length === 0) {
    return null; // Don't show carousel if loading or no testimonials
  }

  const currentTestimonial = carouselTestimonials[currentIndex];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-purple-800/20 to-blue-900/30" />
      
      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <span className="text-sm font-mono text-white/70">{t('testimonials.sectionLabel')}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            {t('testimonials.description')}
          </p>
        </div>

        {/* Carousel */}
        <div className="w-full">
          <div className="
            relative
            p-12 md:p-16
            rounded-3xl
            bg-white/5
            border border-white/10
            backdrop-blur-sm
            min-h-[400px]
            flex flex-col justify-between
          ">
            {/* Quote Icon */}
            <div className="absolute top-8 right-8 opacity-10">
              <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Testimonial Content */}
            <div className="relative z-10 mb-8">
              <p className="text-white/90 text-xl md:text-2xl leading-relaxed mb-8">
                "{currentTestimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">
                    {currentTestimonial.contact 
                      ? currentTestimonial.contact.split(' ').map(n => n[0]).join('').slice(0, 2)
                      : '??'}
                  </span>
                </div>
                <div>
                  <p className="text-white font-bold text-lg">
                    {currentTestimonial.contact}
                  </p>
                  <p className="text-white/60">
                    {currentTestimonial.title}
                  </p>
                  <p className="text-white/40 font-mono text-sm">
                    {currentTestimonial.company}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={goToPrevious}
                className="
                  w-12 h-12
                  rounded-full
                  bg-white/10
                  hover:bg-white/20
                  border border-white/20
                  flex items-center justify-center
                  transition-all duration-300
                  hover:scale-[1.045]
                "
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {carouselTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`
                      w-2 h-2 rounded-full transition-all duration-300
                      ${index === currentIndex 
                        ? 'bg-white w-8' 
                        : 'bg-white/30 hover:bg-white/50'
                      }
                    `}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="
                  w-12 h-12
                  rounded-full
                  bg-white/10
                  hover:bg-white/20
                  border border-white/20
                  flex items-center justify-center
                  transition-all duration-300
                  hover:scale-[1.045]
                "
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* CTA Link */}
          <div className="text-center mt-12">
            <Link href={getLocalizedPath('/testimonials')}>
              <a className="
                inline-flex items-center gap-2
                text-white/70 hover:text-white
                font-mono text-sm
                transition-all duration-300
                group
              ">
                {t('testimonials.seeAll')}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
