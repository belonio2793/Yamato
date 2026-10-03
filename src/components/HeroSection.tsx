import React from 'react';
import { Compass, Calendar, Star, Sparkles, Shield, Wifi, Wind, MapPin } from 'lucide-react';
import { LISTING_INFO } from '../data/listingData';

interface HeroSectionProps {
  onOpenCinematicTour: () => void;
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenCinematicTour,
  onOpenBooking,
}) => {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0c0d10]">
      {/* Background Image with Atmospheric Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://ak-d.tripcdn.com/images/1mc1x12000p7eisum818A_Z_1280_853_R50_Q90.png"
          alt="Yamato Hostel Pasay Welcome"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.45] contrast-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1013] via-[#0f1013]/60 to-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(15,16,19,0.85)_100%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Japanese Calligraphy Subtitle / Kicker */}
        <div className="flex items-center gap-2.5 text-xs text-[#c5a880] tracking-widest uppercase font-medium mb-4">
          <span className="w-6 h-[1px] bg-[#c5a880]/50" />
          <span>大和 · Great Harmony in Pasay City</span>
          <span className="w-6 h-[1px] bg-[#c5a880]/50" />
        </div>

        {/* Primary Headline */}
        <h1
          className="text-3xl sm:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight leading-tight max-w-4xl"
          style={{ textWrap: 'balance' }}
        >
          Architectural Serenity &amp; Boutique Hospitality in Metro Manila
        </h1>

        {/* Clean Unboxed Metadata with Typographic Separators */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs sm:text-sm text-stone-300 mt-5 font-normal">
          <span className="flex items-center gap-1.5 text-stone-200">
            <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
            Pasay City, Metro Manila
          </span>
          <span aria-hidden="true" className="text-stone-500">·</span>
          <span>10 Mins to SM Mall of Asia</span>
          <span aria-hidden="true" className="text-stone-500">·</span>
          <span>3.6 km to NAIA Airport</span>
          <span aria-hidden="true" className="text-stone-500">·</span>
          <span className="flex items-center gap-1 text-amber-300">
            <Star className="w-3.5 h-3.5 fill-current" />
            4.9 / 5.0 (Trip.com Verified)
          </span>
        </div>

        {/* Sub-prose */}
        <p className="text-sm sm:text-base text-stone-300/90 max-w-2xl mt-4 leading-relaxed font-light">
          Step into a tranquil Japanese retreat designed like an Architectural Digest feature.
          Enjoy quiet queen suites, blackout pod dorms, whisper-silent air conditioning, and ultra-fast fiber Wi-Fi.
        </p>

        {/* CTA Button Island */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto">
          <button
            onClick={onOpenCinematicTour}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b8986d] text-stone-950 font-medium text-sm hover:brightness-110 active:scale-98 transition-all shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Compass className="w-4 h-4 transition-transform group-hover:rotate-45" />
            <span className="tracking-wide">Launch 360° Virtual Tour</span>
          </button>

          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-100 border border-stone-700 font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#c5a880]" />
            <span>Check Availability &amp; Rates</span>
          </button>
        </div>

        {/* Proof of Distinction Bento Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 w-full max-w-4xl pt-8 border-t border-stone-800/80">
          <div className="text-left px-3 py-2">
            <p className="text-[11px] text-stone-400 font-mono tracking-wider uppercase">VIRTUAL TOUR</p>
            <p className="text-sm font-semibold text-white mt-0.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
              360° AI Spherical
            </p>
          </div>
          <div className="text-left px-3 py-2">
            <p className="text-[11px] text-stone-400 font-mono tracking-wider uppercase">CLIMATE &amp; REST</p>
            <p className="text-sm font-semibold text-white mt-0.5 flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5 text-[#c5a880]" />
              Whisper Quiet AC
            </p>
          </div>
          <div className="text-left px-3 py-2">
            <p className="text-[11px] text-stone-400 font-mono tracking-wider uppercase">SECURITY</p>
            <p className="text-sm font-semibold text-white mt-0.5 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#c5a880]" />
              Female &amp; Private Floors
            </p>
          </div>
          <div className="text-left px-3 py-2">
            <p className="text-[11px] text-stone-400 font-mono tracking-wider uppercase">CONNECTIVITY</p>
            <p className="text-sm font-semibold text-white mt-0.5 flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5 text-[#c5a880]" />
              Gigabit Fiber Wi-Fi
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
