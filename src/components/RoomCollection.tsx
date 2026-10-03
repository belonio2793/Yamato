import React, { useState } from 'react';
import { Compass, Users, Bed, Bath, ArrowUpRight, Check } from 'lucide-react';
import { ROOMS, RoomItem } from '../data/listingData';

interface RoomCollectionProps {
  onSelectSceneFor360: (sceneId: string) => void;
  onBookRoom: (room: RoomItem) => void;
}

export const RoomCollection: React.FC<RoomCollectionProps> = ({
  onSelectSceneFor360,
  onBookRoom,
}) => {
  const [filter, setFilter] = useState<'all' | 'suite' | 'dormitory'>('all');

  const filteredRooms = ROOMS.filter((room) => {
    if (filter === 'all') return true;
    return room.category === filter;
  });

  return (
    <section id="rooms" className="py-24 bg-[#0a0a0d] border-t border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#c5a880] uppercase">
              Accommodation Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-white tracking-tight mt-1">
              Private Suites &amp; Zen Pod Dormitories
            </h2>
            <p className="text-stone-400 text-sm mt-2 max-w-xl">
              Equipped with silent climate air conditioning, orthopedic bedding, fiber Wi-Fi, and spotless hygienic upkeep.
            </p>
          </div>

          {/* Interactive Filter Control (Functional segmented button bar per constitution) */}
          <div className="flex items-center gap-1 p-1 bg-stone-900 border border-stone-800 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#c5a880] text-stone-950 shadow-sm font-semibold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              All Accommodations
            </button>
            <button
              onClick={() => setFilter('suite')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filter === 'suite'
                  ? 'bg-[#c5a880] text-stone-950 shadow-sm font-semibold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Private Suites
            </button>
            <button
              onClick={() => setFilter('dormitory')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filter === 'dormitory'
                  ? 'bg-[#c5a880] text-stone-950 shadow-sm font-semibold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Pod Dormitories
            </button>
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="group rounded-2xl bg-stone-900/60 border border-stone-800/90 overflow-hidden hover:border-stone-700 transition-all duration-300 flex flex-col shadow-xl"
            >
              {/* Image Container with Badges */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-950">
                <img
                  src={room.imageUrl}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

                {/* 360 Tour Quick Jump Trigger Button */}
                {room.sceneId && (
                  <button
                    onClick={() => onSelectSceneFor360(room.sceneId!)}
                    className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-stone-950/85 hover:bg-[#c5a880] hover:text-stone-950 backdrop-blur-md border border-stone-700 text-stone-200 text-xs font-medium flex items-center gap-1.5 transition-all shadow-lg cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>View in 360°</span>
                  </button>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Clean Unboxed Metadata with Typographic Separators */}
                  <div className="flex items-center gap-2 text-xs text-stone-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-stone-500" />
                      {room.capacity}
                    </span>
                    <span aria-hidden="true" className="text-stone-600">·</span>
                    <span className="flex items-center gap-1">
                      <Bed className="w-3 h-3 text-stone-500" />
                      {room.bedType}
                    </span>
                    <span aria-hidden="true" className="text-stone-600">·</span>
                    <span className="flex items-center gap-1">
                      <Bath className="w-3 h-3 text-stone-500" />
                      {room.bathroom}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-display font-semibold text-white group-hover:text-[#c5a880] transition-colors">
                    {room.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                    {room.description}
                  </p>

                  {/* Key Features Bullet List */}
                  <ul className="mt-4 space-y-1.5 border-t border-stone-800/80 pt-3">
                    {room.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-stone-300">
                        <Check className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing & CTA Footer */}
                <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase tracking-wider block">FROM</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-semibold font-mono tabular-nums text-white">
                        ₱{room.pricePHP.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-stone-400">/ night</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onBookRoom(room)}
                    className="px-4 py-2 rounded-xl bg-[#c5a880] hover:bg-[#d8bc94] text-stone-950 font-medium text-xs shadow-md transition-all flex items-center gap-1 cursor-pointer active:scale-95"
                  >
                    <span>Reserve</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
