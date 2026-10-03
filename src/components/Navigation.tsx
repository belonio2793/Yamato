import React, { useState } from 'react';
import { Menu, X, Compass } from 'lucide-react';

interface NavigationProps {
  onOpenCinematicTour: () => void;
  onOpenBooking: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenCinematicTour,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0d0e12]/90 backdrop-blur-md border-b border-stone-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          className="text-xl sm:text-2xl font-display font-semibold tracking-wider text-white hover:text-[#c5a880] transition-colors"
        >
          Yamato Hostel
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-300">
          <a
            href="#virtual-tour"
            className="hover:text-[#c5a880] transition-colors flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>360° Virtual Tour</span>
          </a>
          <a href="#rooms" className="hover:text-[#c5a880] transition-colors">
            Suites & Dorms
          </a>
          <a href="#philosophy" className="hover:text-[#c5a880] transition-colors">
            Zen Philosophy
          </a>
          <a href="#gallery" className="hover:text-[#c5a880] transition-colors">
            Gallery
          </a>
          <a href="#location" className="hover:text-[#c5a880] transition-colors">
            Pasay Location
          </a>
          <a href="#reviews" className="hover:text-[#c5a880] transition-colors">
            Reviews
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCinematicTour}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide uppercase text-stone-200 bg-stone-900/90 border border-stone-700/80 rounded-lg hover:border-[#c5a880] hover:text-[#c5a880] transition-all whitespace-nowrap"
          >
            <Compass className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>Launch 360° Mode</span>
          </button>

          <button
            onClick={onOpenBooking}
            className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-wide uppercase text-stone-950 bg-[#c5a880] hover:bg-[#d8bc94] rounded-lg transition-all shadow-md whitespace-nowrap"
          >
            Book Stay
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-400 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-stone-800 bg-[#0d0e12] px-6 py-6 space-y-4 animate-in fade-in duration-150">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-stone-300">
            <a
              href="#virtual-tour"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#c5a880] transition-colors flex items-center gap-2 py-1"
            >
              <Compass className="w-4 h-4 text-[#c5a880]" />
              <span>360° Virtual Tour</span>
            </a>
            <a
              href="#rooms"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#c5a880] transition-colors py-1"
            >
              Suites & Dorms
            </a>
            <a
              href="#philosophy"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#c5a880] transition-colors py-1"
            >
              Zen Philosophy
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#c5a880] transition-colors py-1"
            >
              Gallery
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#c5a880] transition-colors py-1"
            >
              Pasay Location
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#c5a880] transition-colors py-1"
            >
              Reviews
            </a>
          </nav>

          <div className="pt-4 border-t border-stone-800/80 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCinematicTour();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wide uppercase text-stone-200 bg-stone-900 border border-stone-700 rounded-lg hover:border-[#c5a880]"
            >
              <Compass className="w-4 h-4 text-[#c5a880]" />
              <span>Launch 360° Tour</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center px-4 py-2.5 text-xs font-semibold tracking-wide uppercase text-stone-950 bg-[#c5a880] hover:bg-[#d8bc94] rounded-lg"
            >
              Book Stay
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
