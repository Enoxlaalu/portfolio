'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';

const SLIDES = [
  { id: 1, src: '/images/slider/slide-1.jpg' },
  { id: 2, src: '/images/slider/slide-2.jpg' },
  { id: 3, src: '/images/slider/slide-3.jpg' },
  { id: 4, src: '/images/slider/slide-4.jpg' },
  { id: 5, src: '/images/slider/slide-5.jpg' },
  { id: 6, src: '/images/slider/slide-6.jpg' },
  { id: 7, src: '/images/slider/slide-7.jpg' },
  { id: 8, src: '/images/slider/slide-8.jpg' },
  { id: 9, src: '/images/slider/slide-9.jpg' },
];

const N = SLIDES.length;

export function HeroSlider() {
  const t = useTranslations('hero');
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    timerRef.current = setInterval(() => {
      setCurrent((i) => (i + 1) % N);
    }, 5000);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  function prev() {
    setCurrent((i) => (i - 1 + N) % N);
    resetTimer();
  }

  function next() {
    setCurrent((i) => (i + 1) % N);
    resetTimer();
  }

  return (
    <div
      className="relative h-screen overflow-hidden"
      role="region"
      aria-label="Hero image slideshow"
      aria-roledescription="carousel"
    >
      {/* Slides — images are decorative backgrounds, content is in the text overlay */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {SLIDES.map((slide, i) => (
          <div key={slide.id} className="relative min-w-full h-full flex-shrink-0 bg-gray-900">
            <Image
              src={slide.src}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              priority={i === 0}
              quality={80}
            />
          </div>
        ))}
      </div>

      {/* Dark overlay + content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 bg-black/30">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
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
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => { setCurrent(i); resetTimer(); }}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === current ? 'true' : undefined}
            className={`h-2 rounded-full transition-all duration-300 motion-reduce:transition-none ${
              i === current ? 'bg-white w-6' : 'bg-white/40 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
