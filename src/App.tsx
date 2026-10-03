import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { PanoramaViewer } from './components/PanoramaViewer';
import { PhilosophySection } from './components/PhilosophySection';
import { RoomCollection } from './components/RoomCollection';
import { PhotoGallery } from './components/PhotoGallery';
import { NeighborhoodGuide } from './components/NeighborhoodGuide';
import { ReviewsSection } from './components/ReviewsSection';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';
import { RoomItem, TOUR_SCENES } from './data/listingData';
import { Compass, Maximize2, Sparkles, Layers, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function App() {
  const [isCinematicOpen, setIsCinematicOpen] = useState<boolean>(false);
  const [activeTourSceneId, setActiveTourSceneId] = useState<string>('lounge');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<RoomItem | null>(null);

  const handleOpenCinematic = (sceneId?: string) => {
    if (sceneId) {
      setActiveTourSceneId(sceneId);
    }
    setIsCinematicOpen(true);
  };

  const handleCloseCinematic = () => {
    setIsCinematicOpen(false);
  };

  const handleBookRoom = (room: RoomItem) => {
    setSelectedRoomForBooking(room);
    setIsBookingOpen(true);
  };

  const handleSelectSceneFor360 = (sceneId: string) => {
    setActiveTourSceneId(sceneId);
    const tourSection = document.getElementById('virtual-tour');
    if (tourSection) {
      tourSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1013] text-stone-100 flex flex-col font-body">
      {/* Top Bar Navigation */}
      <Navigation
        onOpenCinematicTour={() => handleOpenCinematic()}
        onOpenBooking={() => {
          setSelectedRoomForBooking(null);
          setIsBookingOpen(true);
        }}
      />

      <main className="flex-1">
        {/* Cinematic Hero */}
        <HeroSection
          onOpenCinematicTour={() => handleOpenCinematic()}
          onOpenBooking={() => {
            setSelectedRoomForBooking(null);
            setIsBookingOpen(true);
          }}
        />

        {/* Embedded Interactive 360° Virtual Tour Showcase */}
        <section id="virtual-tour" className="py-20 bg-[#090a0d] border-t border-stone-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#c5a880] text-xs font-medium mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interactive 360° Spherical Experience</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-medium text-white tracking-tight">
                  Walk Through Yamato Hostel in Pasay
                </h2>
                <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-2xl">
                  Drag to rotate 360 degrees, pinch to zoom, and click glowing navigational portals to travel between the Zen lounge, Deluxe Queen Suite, and Pod Dormitory.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleOpenCinematic(activeTourSceneId)}
                  className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 hover:border-[#c5a880] text-stone-200 text-xs font-semibold tracking-wide uppercase transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4 text-[#c5a880]" />
                  <span>Cinematic Fullscreen Mode</span>
                </button>
              </div>
            </div>

            {/* Embedded 3D Panorama Viewer */}
            <div className="relative">
              <PanoramaViewer
                initialSceneId={activeTourSceneId}
                isCinematicFullScreen={false}
                onBookNow={() => setIsBookingOpen(true)}
              />
            </div>

            {/* Feature Callouts below the 360 viewer */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-stone-900/40 border border-stone-800/80 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-stone-800/80 text-[#c5a880]">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Full 360° Spherical Freedom</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">Smooth yaw &amp; pitch inertia with compass bearing HUD.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-stone-900/40 border border-stone-800/80 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-stone-800/80 text-[#c5a880]">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Interactive Portals &amp; 2D Minimap</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">Teleport seamlessly between suites with synchronized radar cone.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-stone-900/40 border border-stone-800/80 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-stone-800/80 text-[#c5a880]">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Zen Acoustic Ambiance</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">Synthesized meditation frequencies for a peaceful exploration.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy & Architectural Story */}
        <PhilosophySection />

        {/* Accommodation Portfolio */}
        <RoomCollection
          onSelectSceneFor360={handleSelectSceneFor360}
          onBookRoom={handleBookRoom}
        />

        {/* Architectural Photo Gallery */}
        <PhotoGallery />

        {/* Pasay City Neighborhood & Transit Guide */}
        <NeighborhoodGuide />

        {/* Trip.com Verified Reviews */}
        <ReviewsSection />
      </main>

      {/* Dedicated Fullscreen Cinematic Mode (VirtualTourEasy Experience) */}
      {isCinematicOpen && (
        <PanoramaViewer
          initialSceneId={activeTourSceneId}
          isCinematicFullScreen={true}
          onCloseCinematic={handleCloseCinematic}
          onBookNow={() => {
            setIsCinematicOpen(false);
            setIsBookingOpen(true);
          }}
        />
      )}

      {/* Booking / Inquiry Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preSelectedRoom={selectedRoomForBooking}
      />

      {/* Footer */}
      <Footer
        onOpenCinematicTour={() => handleOpenCinematic()}
        onOpenBooking={() => {
          setSelectedRoomForBooking(null);
          setIsBookingOpen(true);
        }}
      />
    </div>
  );
}
