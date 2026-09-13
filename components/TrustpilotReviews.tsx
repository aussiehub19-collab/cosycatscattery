'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { CheckCircle, ShieldCheck, ChevronLeft, ChevronRight, Pause, Play, Sparkles, MessageSquareHeart } from 'lucide-react';
import { REVIEWS } from '@/config/site';

// Trustpilot signature star box component (supports exact 4.2 partial score or integer ratings)
function TrustpilotStars({ rating = 4.2, size = 'md' }: { rating?: number; size?: 'sm' | 'md' | 'lg' }) {
  const boxSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };
  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map(index => {
        const fillPercentage = Math.max(0, Math.min(1, rating - index));
        return (
          <div
            key={index}
            className={`${boxSizes[size]} relative overflow-hidden rounded-[2px] bg-slate-800 flex items-center justify-center`}
          >
            {/* Background green fill based on fraction */}
            <div
              className="absolute inset-y-0 left-0 bg-[#00B67A]"
              style={{ width: `${fillPercentage * 100}%` }}
            />
            <svg className={`${iconSizes[size]} text-white fill-white relative z-10`} viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </div>
        );
      })}
    </div>
  );
}

export default function TrustpilotReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<'all' | 'five' | 'flight' | 'health'>('all');
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragDistance, setDragDistance] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const filteredReviews = REVIEWS.filter(rev => {
    if (filter === 'five') return rev.rating === 5;
    if (filter === 'flight') return rev.title.toLowerCase().includes('flight') || rev.comment.toLowerCase().includes('flight') || rev.comment.toLowerCase().includes('courier');
    if (filter === 'health') return rev.comment.toLowerCase().includes('dna') || rev.comment.toLowerCase().includes('health') || rev.comment.toLowerCase().includes('pedigree');
    return true;
  });

  const totalReviews = filteredReviews.length;

  const nextSlide = useCallback(() => {
    if (totalReviews === 0) return;
    setCurrentIndex(prev => (prev + 1) % totalReviews);
  }, [totalReviews]);

  const prevSlide = useCallback(() => {
    if (totalReviews === 0) return;
    setCurrentIndex(prev => (prev - 1 + totalReviews) % totalReviews);
  }, [totalReviews]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Autoplay timer
  useEffect(() => {
    if (!isAutoPlay || isDragging || totalReviews <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlay, isDragging, nextSlide, totalReviews]);

  // Reset index on filter change
  const handleFilterChange = (newFilter: 'all' | 'five' | 'flight' | 'health') => {
    setFilter(newFilter);
    setCurrentIndex(0);
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
    setIsDragging(true);
    setDragDistance(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartX === null) return;
    const currentX = e.touches[0].clientX;
    setDragDistance(currentX - dragStartX);
  };

  const handleTouchEnd = () => {
    if (dragStartX === null) return;
    if (dragDistance < -50) {
      nextSlide();
    } else if (dragDistance > 50) {
      prevSlide();
    }
    setDragStartX(null);
    setDragDistance(0);
    setIsDragging(false);
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStartX(e.clientX);
    setIsDragging(true);
    setDragDistance(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStartX === null || !isDragging) return;
    const currentX = e.clientX;
    setDragDistance(currentX - dragStartX);
  };

  const handleMouseUp = () => {
    if (dragStartX === null) return;
    if (dragDistance < -60) {
      nextSlide();
    } else if (dragDistance > 60) {
      prevSlide();
    }
    setDragStartX(null);
    setDragDistance(0);
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  const activeReview = filteredReviews[currentIndex] || REVIEWS[0];

  return (
    <section
      id="trustpilot-reviews-section"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Verified Customer Reviews Slider"
    >
      {/* Trustpilot Top Header & Overall Rating Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B67A]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10 text-center lg:text-left">
          {/* Rating Summary */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Great</span>
              <TrustpilotStars rating={4.2} size="lg" />
              <span className="px-2.5 py-0.5 rounded bg-[#00B67A]/20 text-[#00B67A] text-xs font-bold border border-[#00B67A]/30">
                4.2 / 5.0
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Rated <span className="font-bold text-white">4.2 out of 5</span> based on{' '}
              <span className="font-bold text-white">48+ verified family reviews</span> across Australia.
            </p>
          </div>

          {/* Trustpilot Badge with Live Controls */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-3 bg-slate-950/80 px-5 py-3 rounded-2xl border border-slate-800 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-[#00B67A] flex items-center justify-center shadow-lg shadow-[#00B67A]/20">
                <svg className="w-5 h-5 text-white fill-white" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-white text-sm tracking-tight">Trustpilot</span>
                  <span className="text-[10px] uppercase font-extrabold text-[#00B67A] bg-[#00B67A]/10 px-1.5 py-0.2 rounded">
                    Verified
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Authentic Adopter Experiences</p>
              </div>
            </div>

            {/* Autoplay Pause/Play Toggle */}
            <button
              type="button"
              onClick={() => setIsAutoPlay(prev => !prev)}
              aria-label={isAutoPlay ? 'Pause review slider' : 'Play review slider'}
              className="p-3 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-xl text-xs flex items-center gap-1.5 transition-colors"
              title={isAutoPlay ? 'Pause rotation' : 'Resume auto-rotation'}
            >
              {isAutoPlay ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
              <span className="hidden sm:inline text-[11px] font-medium">{isAutoPlay ? 'Auto-Swipe ON' : 'Paused'}</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-2">
          <span className="text-xs text-slate-400 font-medium mr-2">Filter stories:</span>
          <button
            type="button"
            onClick={() => handleFilterChange('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-[#00B67A] text-slate-950 shadow-md shadow-[#00B67A]/20'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            All Reviews ({REVIEWS.length})
          </button>
          <button
            type="button"
            onClick={() => handleFilterChange('five')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'five'
                ? 'bg-[#00B67A] text-slate-950 shadow-md shadow-[#00B67A]/20'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            5-Star Reviews
          </button>
          <button
            type="button"
            onClick={() => handleFilterChange('flight')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'flight'
                ? 'bg-[#00B67A] text-slate-950 shadow-md shadow-[#00B67A]/20'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            Interstate Flights
          </button>
          <button
            type="button"
            onClick={() => handleFilterChange('health')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'health'
                ? 'bg-[#00B67A] text-slate-950 shadow-md shadow-[#00B67A]/20'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            DNA & Health Reports
          </button>
        </div>
      </div>

      {/* REVOLUTIONARY SWIPEABLE 3D REVIEW SLIDER */}
      <div className="relative select-none" ref={sliderRef}>
        {/* Swipe Instruction Cue */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-4 px-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Swipe or drag card left/right to reveal next review</span>
          </div>
          <span className="font-mono font-bold text-amber-300">
            {currentIndex + 1} / {totalReviews}
          </span>
        </div>

        {/* The Swipe Stage */}
        <div
          className="relative min-h-[380px] sm:min-h-[340px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {/* Left Flanking Peek Card (Clickable to go Prev) */}
          {totalReviews > 1 && (
            <div
              onClick={prevSlide}
              className="hidden lg:block absolute left-0 w-[28%] h-[80%] bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 opacity-30 hover:opacity-60 scale-90 blur-[1px] hover:blur-none transition-all duration-500 cursor-pointer overflow-hidden pointer-events-auto"
            >
              <div className="space-y-3 pointer-events-none">
                <TrustpilotStars rating={filteredReviews[(currentIndex - 1 + totalReviews) % totalReviews]?.rating} size="sm" />
                <h4 className="font-serif text-sm font-bold text-slate-300 line-clamp-2">
                  &ldquo;{filteredReviews[(currentIndex - 1 + totalReviews) % totalReviews]?.title}&rdquo;
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {filteredReviews[(currentIndex - 1 + totalReviews) % totalReviews]?.comment}
                </p>
              </div>
            </div>
          )}

          {/* ACTIVE SPOTLIGHT CARD */}
          <div
            className="w-full lg:w-[74%] bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/80 relative z-20 transition-all duration-300 transform group"
            style={{
              transform: isDragging ? `translateX(${dragDistance}px) scale(0.98)` : 'translateX(0) scale(1)',
            }}
          >
            {/* Corner Decorative Amber Aura */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col justify-between h-full space-y-6 relative z-10">
              {/* Header inside card: Stars, Rating, and Verified Pill */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <TrustpilotStars rating={activeReview?.rating} size="md" />
                  <span className="text-xs font-bold text-[#00B67A] bg-[#00B67A]/10 px-2 py-0.5 rounded border border-[#00B67A]/20">
                    {activeReview?.rating}.0 Star Rating
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#00B67A] bg-[#00B67A]/10 px-3 py-1 rounded-full border border-[#00B67A]/30">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verified Adopter Experience</span>
                </div>
              </div>

              {/* Title & Comment with Quote Icon */}
              <div className="space-y-3">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug group-hover:text-amber-200 transition-colors">
                  &ldquo;{activeReview?.title}&rdquo;
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed italic">
                  {activeReview?.comment}
                </p>
              </div>

              {/* Author & Adoption Tag Footer */}
              <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 text-slate-950 font-extrabold text-sm flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
                    {activeReview?.author
                      .split(' ')
                      .filter(Boolean)
                      .slice(0, 2)
                      .map(n => n[0])
                      .join('')}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{activeReview?.author}</h4>
                    <p className="text-xs text-slate-400">{activeReview?.location} • <span className="text-slate-500">{activeReview?.date}</span></p>
                  </div>
                </div>

                {/* Specific Kitten Tag */}
                <div className="shrink-0">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-300 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
                    <MessageSquareHeart className="w-3.5 h-3.5 text-amber-400" />
                    <span>{activeReview?.kitten}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Flanking Peek Card (Clickable to go Next) */}
          {totalReviews > 1 && (
            <div
              onClick={nextSlide}
              className="hidden lg:block absolute right-0 w-[28%] h-[80%] bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 opacity-30 hover:opacity-60 scale-90 blur-[1px] hover:blur-none transition-all duration-500 cursor-pointer overflow-hidden pointer-events-auto"
            >
              <div className="space-y-3 pointer-events-none">
                <TrustpilotStars rating={filteredReviews[(currentIndex + 1) % totalReviews]?.rating} size="sm" />
                <h4 className="font-serif text-sm font-bold text-slate-300 line-clamp-2">
                  &ldquo;{filteredReviews[(currentIndex + 1) % totalReviews]?.title}&rdquo;
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {filteredReviews[(currentIndex + 1) % totalReviews]?.comment}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Slider Controls: Arrows and Dots */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-4">
          {/* Navigation Arrows */}
          <div className="flex items-center gap-3 order-2 sm:order-1">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous review"
              className="p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400/60 text-slate-300 hover:text-white transition-all shadow-lg active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next review"
              className="p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400/60 text-slate-300 hover:text-white transition-all shadow-lg active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Dot Indicators */}
          <div className="flex items-center gap-2 order-1 sm:order-2 flex-wrap justify-center">
            {filteredReviews.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Jump to review ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? 'w-8 bg-gradient-to-r from-amber-400 to-amber-500 shadow-sm shadow-amber-400/30'
                    : 'w-2.5 bg-slate-800 hover:bg-slate-700'
                }`}
              />
            ))}
          </div>

          {/* Direct CTA */}
          <div className="order-3">
            <Link
              href="/contact/"
              className="text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline transition-all flex items-center gap-1"
            >
              <span>Submit Your Own Review</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Trust Quote Bottom Banner */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-left">
          <ShieldCheck className="w-6 h-6 text-[#00B67A] shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-white">Transparent Australian Pedigree Feedback</h4>
            <p className="text-[11px] text-slate-400">
              Every review reflects verified ANCATS / TICA registration transfers and veterinary release notes.
            </p>
          </div>
        </div>
        <Link
          href="/shop/"
          className="px-5 py-2.5 bg-slate-900 border border-slate-700 hover:border-[#00B67A] text-slate-200 hover:text-white text-xs font-bold rounded-xl transition-all whitespace-nowrap"
        >
          View Available Litters
        </Link>
      </div>
    </section>
  );
}
