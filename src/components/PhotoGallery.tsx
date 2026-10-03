import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { GALLERY_PHOTOS, ListingPhoto } from '../data/listingData';

export const PhotoGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'rooms' | 'lounge' | 'details' | 'atmosphere'>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const filteredPhotos = GALLERY_PHOTOS.filter((photo) => {
    if (activeTab === 'all') return true;
    return photo.category === activeTab;
  });

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-[#0d0e12] border-t border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#c5a880] uppercase">
              Visual Narrative
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-white tracking-tight mt-1">
              Architectural &amp; Interior Gallery
            </h2>
            <p className="text-stone-400 text-sm mt-2">
              Authentic high-resolution photography from our Pasay property listing.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-stone-900 border border-stone-800 rounded-xl">
            {(
              [
                { id: 'all', label: 'All Photos' },
                { id: 'rooms', label: 'Suites & Bunks' },
                { id: 'lounge', label: 'Zen Lounge' },
                { id: 'details', label: 'Joinery & Details' },
                { id: 'atmosphere', label: 'Atmosphere' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#c5a880] text-stone-950 font-semibold shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Bento / Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.url + idx}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-950 border border-stone-800 cursor-pointer shadow-lg hover:border-stone-600 transition-all"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#c5a880]">
                  Yamato Pasay
                </span>
                <p className="text-sm font-medium text-white mt-0.5">{photo.title}</p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-stone-300">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Click to view full screen</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedPhotoIndex !== null && filteredPhotos[selectedPhotoIndex] && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 rounded-xl bg-stone-900/80 border border-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Prev */}
          <button
            onClick={prevPhoto}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 border border-stone-700 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation Next */}
          <button
            onClick={nextPhoto}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 border border-stone-700 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Active Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl max-h-[85vh] flex flex-col items-center"
          >
            <img
              src={filteredPhotos[selectedPhotoIndex].url}
              alt={filteredPhotos[selectedPhotoIndex].title}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-stone-800"
              referrerPolicy="no-referrer"
            />
            <div className="mt-4 text-center">
              <p className="text-stone-200 text-sm font-medium">
                {filteredPhotos[selectedPhotoIndex].title}
              </p>
              <p className="text-xs text-stone-400 mt-1">
                {selectedPhotoIndex + 1} of {filteredPhotos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
