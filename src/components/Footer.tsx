import React from 'react';
import { Compass, ExternalLink, MapPin } from 'lucide-react';
import { LISTING_INFO } from '../data/listingData';

interface FooterProps {
  onOpenCinematicTour: () => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCinematicTour,
  onOpenBooking,
}) => {
  return (
    <footer className="bg-[#090a0c] border-t border-stone-800/80 text-stone-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800/80">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-xl font-display font-semibold text-white tracking-wider">
              Yamato Hostel
            </span>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed font-light">
              Great Harmony (大和) · A tranquil Japanese hospitality retreat in Pasay City, Metro Manila. Offering private deluxe rooms and minimalist pod-style dormitories.
            </p>
            <div className="flex items-start gap-2 text-xs text-stone-400 pt-2">
              <MapPin className="w-3.5 h-3.5 text-[#c5a880] shrink-0 mt-0.5" />
              <span>{LISTING_INFO.address}</span>
            </div>
          </div>

          {/* Nav Mirror */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-semibold text-stone-200 uppercase tracking-wider font-mono">
              Explore Spaces
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenCinematicTour}
                  className="hover:text-[#c5a880] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>360° Virtual Tour</span>
                </button>
              </li>
              <li>
                <a href="#rooms" className="hover:text-[#c5a880] transition-colors">
                  Deluxe Queen Suites
                </a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-[#c5a880] transition-colors">
                  Female &amp; Mixed Dorm Pods
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#c5a880] transition-colors">
                  High-Resolution Gallery
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#c5a880] transition-colors">
                  Pasay Transit &amp; Landmarks
                </a>
              </li>
            </ul>
          </div>

          {/* Booking & Third Party Links */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-semibold text-stone-200 uppercase tracking-wider font-mono">
              Reservations &amp; Listings
            </p>
            <p className="text-xs text-stone-400 leading-relaxed">
              Book directly through our instant inquiry concierge or inspect our verified guest reviews on Trip.com.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={onOpenBooking}
                className="px-4 py-2 text-xs font-medium bg-[#c5a880] text-stone-950 rounded-lg hover:bg-[#d8bc94] transition-colors cursor-pointer text-center"
              >
                Reserve Stay
              </button>
              <a
                href={LISTING_INFO.tripComUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-medium bg-stone-900 border border-stone-700 hover:border-stone-500 text-stone-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Trip.com Listing</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Yamato Hostel Pasay. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-stone-400">Virtual Tour Powered by VirtualTourEasy 360 Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
