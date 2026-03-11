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

// [clone-of-last, ...real slides, clone-of-first]
const TRACK = [SLIDES[N - 1], ...SLIDES, SLIDES[0]];

export function HeroSlider() {
  const t = useTranslations('hero');
  // index into TRACK; 1 = first real slide
  const [index, setIndex] = useState(1);
  const [animated, setAnimated] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transitioning = useRef(false);
  const reducedMotion = useRef(false);

  // real dot index (0-based)
  const dotIndex = index === 0 ? N - 1 : index === N + 1 ? 0 : index - 1;

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (reducedMotion.current) return;
    timerRef.current = setInterval(() => {
      if (!transitioning.current) {
        setAnimated(true);
        setIndex((i) => i + 1);
      }
    }, 5000);
  }, []);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  // After sliding to a clone, jump to the real slide without animation
  function handleTransitionEnd() {
    transitioning.current = false;
    if (index === 0) {
      setAnimated(false);
      setIndex(N);
    } else if (index === N + 1) {
      setAnimated(false);
      setIndex(1);
    }
  }

  function navigate(newIndex: number | ((i: number) => number)) {
    if (transitioning.current) return;
    transitioning.current = true;
    setAnimated(true);
    setIndex(newIndex);
    resetTimer();
  }

  function prev() { navigate((i) => i - 1); }
  function next() { navigate((i) => i + 1); }
  function goTo(realIndex: number) { navigate(realIndex + 1); }

  return (
    <div
      className="relative h-screen overflow-hidden"
      role="region"
      aria-label="Hero image slideshow"
      aria-roledescription="carousel"
    >
      {/* Slides — images are decorative backgrounds, content is in the text overlay */}
      <div
        className={`flex h-full ${animated ? 'transition-transform duration-700 ease-in-out motion-reduce:transition-none' : ''}`}
        style={{ transform: `translateX(-${index * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {TRACK.map((slide, i) => (
          <div key={`${slide.id}-${i}`} className="relative min-w-full h-full flex-shrink-0 bg-gray-900">
            <Image
              src={slide.src}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              priority={i === 1}
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
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === dotIndex ? 'true' : undefined}
            className={`h-2 rounded-full transition-all duration-300 motion-reduce:transition-none ${
              i === dotIndex ? 'bg-white w-6' : 'bg-white/40 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
