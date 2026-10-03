import React from 'react';
import { MapPin, Navigation as NavIcon, Clock, Plane, ShoppingBag, Waves, Train, HeartPulse } from 'lucide-react';
import { NEIGHBORHOOD_DESTINATIONS, LISTING_INFO } from '../data/listingData';

export const NeighborhoodGuide: React.FC = () => {
  const getDestinationIcon = (category: string) => {
    switch (category) {
      case 'Shopping & Dining':
        return <ShoppingBag className="w-5 h-5 text-[#c5a880]" />;
      case 'Sightseeing':
        return <Waves className="w-5 h-5 text-[#c5a880]" />;
      case 'Transit':
        return <Plane className="w-5 h-5 text-[#c5a880]" />;
      case 'Public Metro':
        return <Train className="w-5 h-5 text-[#c5a880]" />;
      case 'Healthcare':
        return <HeartPulse className="w-5 h-5 text-[#c5a880]" />;
      default:
        return <NavIcon className="w-5 h-5 text-[#c5a880]" />;
    }
  };

  return (
    <section id="location" className="py-24 bg-[#0a0a0d] border-t border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Location Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono tracking-widest text-[#c5a880] uppercase">
              Prime Strategic Base
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-white tracking-tight leading-tight">
              In the Heart of Pasay, Minutes to Every Landmark
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed font-light">
              Situated in Pasay, Metro Manila, Yamato Hostel offers effortless transit connectivity.
              Whether arriving late on an international flight at NAIA, visiting the SM Mall of Asia complex, or watching the legendary sunset at Manila Bay, your journey is quick and hassle-free.
            </p>

            <div className="p-5 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#c5a880] shrink-0 mt-1" />
                <div>
                  <p className="text-xs font-semibold text-white">Exact Address</p>
                  <p className="text-xs text-stone-400 mt-0.5">{LISTING_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-stone-800">
                <Clock className="w-4 h-4 text-[#c5a880] shrink-0 mt-1" />
                <div>
                  <p className="text-xs font-semibold text-white">Check-in / Check-out</p>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Check-in starts 14:00 · Check-out until 12:00
                  </p>
                </div>
              </div>
            </div>

            <a
              href={LISTING_INFO.tripComUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium text-[#c5a880] hover:underline"
            >
              <span>View Verified Listing on Trip.com Philippines</span>
              <NavIcon className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Right Column: Key Destinations Bento Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {NEIGHBORHOOD_DESTINATIONS.map((dest, i) => (
              <div
                key={dest.name}
                className={`p-6 rounded-2xl bg-stone-900/50 border border-stone-800 hover:border-stone-700 transition-all ${
                  i === 0 ? 'sm:col-span-2 bg-gradient-to-br from-stone-900/80 to-stone-950/90' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                    {getDestinationIcon(dest.category)}
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-white font-mono tabular-nums block">
                      {dest.time}
                    </span>
                    <span className="text-[10px] text-stone-500 font-mono">
                      {dest.distance}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] font-mono text-[#c5a880] uppercase tracking-wider">
                  {dest.category}
                </p>
                <h3 className="text-base font-display font-semibold text-white mt-0.5">
                  {dest.name}
                </h3>
                <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                  {dest.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
