import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { GUEST_REVIEWS } from '../data/listingData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-[#0d0e12] border-t border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Trip.com Verified Guest Reviews</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-medium text-white tracking-tight">
            Guest Experiences &amp; Praise
          </h2>

          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-stone-300">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-semibold text-white">4.9 / 5.0 Average</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span className="text-stone-400">Based on 148 verified traveler stays</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GUEST_REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-semibold text-amber-400">
                    {review.rating}
                  </span>
                  <Quote className="w-4 h-4 text-stone-600" />
                </div>

                <p className="text-xs sm:text-sm text-stone-300 italic leading-relaxed">
                  “{review.quote}”
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800/80">
                <p className="text-xs font-semibold text-white">{review.author}</p>
                <p className="text-[11px] text-[#c5a880] mt-0.5">{review.origin}</p>
                <p className="text-[10px] text-stone-500 mt-1">{review.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
