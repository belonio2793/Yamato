import React from 'react';
import { Sparkles, Quote, CheckCircle2 } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  return (
    <section id="philosophy" className="py-24 bg-[#0d0e12] border-t border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#c5a880] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Japanese Design Principle</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-medium text-white tracking-tight leading-tight">
              大和 · Great Harmony: A Quiet Counterweight to the City
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
              In Japanese tradition, <span className="text-[#c5a880] font-medium">Yamato (大和)</span> embodies the spirit of great harmony, quiet balance, and mindful living. In the energetic pulse of Pasay City, we created a sanctuary where travelers can decompress immediately upon crossing the threshold.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0 mt-1" />
                <p className="text-xs sm:text-sm text-stone-300">
                  <strong className="text-white">Acoustic Serenity:</strong> Insulated room partition walls and sound-dampening timber keep city decibels outside.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0 mt-1" />
                <p className="text-xs sm:text-sm text-stone-300">
                  <strong className="text-white">Warm Organic Joinery:</strong> Natural blond oak textures, concealed warm LED illumination, and tatami-inspired accents.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0 mt-1" />
                <p className="text-xs sm:text-sm text-stone-300">
                  <strong className="text-white">Mindful Pod Architecture:</strong> Dormitory beds engineered with privacy curtains and individual reading lamps that create a private room experience.
                </p>
              </div>
            </div>

            {/* Claim-to-Proof Adjacency: Verified Architectural Digest Review Quote */}
            <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 shadow-xl mt-6">
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <Quote className="w-4 h-4" />
                <span className="text-xs font-semibold tracking-wider uppercase text-amber-300">
                  10 / 10 Verified Trip.com Guest Review
                </span>
              </div>
              <blockquote className="text-xs sm:text-sm italic text-stone-200 leading-relaxed">
                “I stayed in a private room, so it didn’t feel like a hostel to me—the interior design is straight out of Architectural Digest, and the aesthetics pleased and calmed me. USB charging ports on the wall and Netflix TV made the evening wonderfully relaxing.”
              </blockquote>
              <div className="mt-3 flex items-center justify-between text-[11px] text-stone-400 border-t border-stone-800/80 pt-2.5">
                <span>Solo Traveler · Architectural Enthusiast</span>
                <span className="text-[#c5a880]">Yamato Pasay Stay</span>
              </div>
            </div>
          </div>

          {/* Right Visual Bento Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-stone-900 border border-stone-800 shadow-2xl">
                <img
                  src="https://ak-d.tripcdn.com/images/1mc7112000kenir1oD34B_Z_1280_853_R50_Q90.jpg"
                  alt="Minimalist Wood Joinery"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 text-left">
                <p className="text-xs font-semibold text-white">Quiet Zones</p>
                <p className="text-[11px] text-stone-400 mt-1">Consciously engineered acoustic thresholds throughout residential wings.</p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 text-left">
                <p className="text-xs font-semibold text-white">Japanese Pods</p>
                <p className="text-[11px] text-stone-400 mt-1">Thick blackout privacy drapes and personal bedside power consoles.</p>
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-stone-900 border border-stone-800 shadow-2xl">
                <img
                  src="https://ak-d.tripcdn.com/images/0581012000jpls70d41BF_Z_1280_853_R50_Q90.jpg"
                  alt="Zen Lounge Seating"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
