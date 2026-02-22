'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';

const SLIDES = [
  { id: 1, gradient: 'from-violet-600 via-purple-600 to-indigo-700' },
  { id: 2, gradient: 'from-rose-500 via-red-600 to-pink-700' },
  { id: 3, gradient: 'from-emerald-500 via-teal-600 to-cyan-700' },
  { id: 4, gradient: 'from-amber-500 via-orange-600 to-yellow-700' },
];

export function HeroSlider() {
  const t = useTranslations('hero');
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setCurrent((i) => (i + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  function prev() {
    setCurrent((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  }

  function next() {
    setCurrent((i) => (i + 1) % SLIDES.length);
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {SLIDES.map((slide) => (
          <div
            key={slide.id}
            className={`min-w-full h-full bg-gradient-to-br ${slide.gradient} flex-shrink-0`}
          />
        ))}
      </div>

      {/* Dark overlay + content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 bg-black/30">
        <h1 suppressHydrationWarning className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          {t('welcome')}
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-10 drop-shadow">
          {t('subtitle')}
        </p>
        <div className="flex gap-4">
          <Link
            href="/projects"
            className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-white/90 transition-colors"
          >
            {t('ctaProjects')}
          </Link>
          <Link
            href="/contacts"
            className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
          >
            {t('ctaContact')}
          </Link>
        </div>
      </div>

      {/* Prev/Next arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <Icon name="arrow-left" className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors backdrop-blur-sm"
        aria-label="Next slide"
      >
        <Icon name="arrow-right" className="w-5 h-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 motion-reduce:transition-none ${
              i === current ? 'bg-white w-6' : 'bg-white/40 w-2'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
