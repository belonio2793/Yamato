import React, { useState } from 'react';
import { X, Calendar, Check, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { ROOMS, RoomItem, LISTING_INFO } from '../data/listingData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedRoom?: RoomItem | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedRoom,
}) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    preSelectedRoom?.id || ROOMS[0].id
  );
  const [checkInDate, setCheckInDate] = useState<string>('2026-10-10');
  const [checkOutDate, setCheckOutDate] = useState<string>('2026-10-12');
  const [guestsCount, setGuestsCount] = useState<number>(1);
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [specialRequest, setSpecialRequest] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [confirmationCode, setConfirmationCode] = useState<string>('');

  if (!isOpen) return null;

  const currentRoom = ROOMS.find((r) => r.id === selectedRoomId) || ROOMS[0];

  // Calculate nights
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const diffTime = Math.max(1, checkOut.getTime() - checkIn.getTime());
  const nights = Math.max(1, Math.round(diffTime / (1000 * 3600 * 24)));

  const subtotal = currentRoom.pricePHP * nights;
  const serviceFee = Math.round(subtotal * 0.05);
  const totalPHP = subtotal + serviceFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail) return;

    const randomCode = 'YMT-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmationCode(randomCode);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#0f1014] border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-stone-100 my-8 animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-mono tracking-widest text-[#c5a880] uppercase">
                Direct Reservation &amp; Inquiry
              </span>
              <h3 className="text-2xl font-display font-medium text-white mt-1">
                Reserve Your Stay at Yamato Hostel
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Best price guarantee · No booking fees · Instant confirmation
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Room Selection */}
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-2">
                  Select Room Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ROOMS.map((room) => {
                    const isSelected = room.id === selectedRoomId;
                    return (
                      <button
                        type="button"
                        key={room.id}
                        onClick={() => setSelectedRoomId(room.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-stone-900 border-[#c5a880] shadow-md'
                            : 'bg-stone-950/60 border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        <div className="truncate pr-2">
                          <p className="text-xs font-semibold text-white truncate">
                            {room.name}
                          </p>
                          <p className="text-[11px] text-stone-400">{room.bedType}</p>
                        </div>
                        <span className="text-xs font-mono font-semibold text-[#c5a880] shrink-0">
                          ₱{room.pricePHP.toLocaleString()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dates & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-900 border border-stone-800 text-stone-100 focus:outline-none focus:border-[#c5a880]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-900 border border-stone-800 text-stone-100 focus:outline-none focus:border-[#c5a880]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Total Guests
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-900 border border-stone-800 text-stone-100 focus:outline-none focus:border-[#c5a880]"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests (Group Pod)</option>
                  </select>
                </div>
              </div>

              {/* Guest Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kenji Tanaka"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-900 border border-stone-800 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-[#c5a880]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-900 border border-stone-800 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-[#c5a880]"
                    required
                  />
                </div>
              </div>

              {/* Phone & Special Request */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Phone / WhatsApp (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="+63 912 345 6789"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-900 border border-stone-800 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Special Requests
                  </label>
                  <input
                    type="text"
                    placeholder="Late arrival, quiet room, etc."
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-900 border border-stone-800 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>

              {/* Price Breakdown Card */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2 text-xs">
                <div className="flex justify-between text-stone-400">
                  <span>
                    ₱{currentRoom.pricePHP.toLocaleString()} × {nights} {nights === 1 ? 'night' : 'nights'}
                  </span>
                  <span className="font-mono tabular-nums text-stone-200">
                    ₱{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Service &amp; Hygiene Maintenance (5%)</span>
                  <span className="font-mono tabular-nums text-stone-200">
                    ₱{serviceFee.toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-stone-800 pt-2 flex justify-between text-sm font-semibold text-white">
                  <span>Total Estimated Cost</span>
                  <span className="font-mono tabular-nums text-[#c5a880]">
                    ₱{totalPHP.toLocaleString()} PHP
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1.5 text-xs text-stone-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Pay upon check-in or online</span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#c5a880] hover:bg-[#d8bc94] text-stone-950 font-medium text-xs shadow-lg transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <span>Confirm Reservation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="py-8 text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono tracking-widest text-[#c5a880] uppercase">
                Reservation Confirmed
              </span>
              <h3 className="text-2xl font-display font-medium text-white mt-1">
                We Look Forward to Welcoming You
              </h3>
              <p className="text-xs text-stone-400 mt-2 max-w-md mx-auto">
                A confirmation has been recorded for <strong className="text-stone-200">{guestName}</strong> ({guestEmail}).
              </p>
            </div>

            {/* Reference Badge */}
            <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 max-w-sm mx-auto text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-400">Booking Reference:</span>
                <span className="font-mono font-bold text-[#c5a880]">{confirmationCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Room Reserved:</span>
                <span className="text-white font-medium">{currentRoom.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Stay Duration:</span>
                <span className="text-stone-200">{checkInDate} to {checkOutDate} ({nights} {nights === 1 ? 'night' : 'nights'})</span>
              </div>
              <div className="flex justify-between border-t border-stone-800 pt-2 font-semibold">
                <span className="text-stone-300">Total:</span>
                <span className="text-[#c5a880] font-mono">₱{totalPHP.toLocaleString()} PHP</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#c5a880] text-stone-950 font-medium text-xs hover:bg-[#d8bc94] transition-colors cursor-pointer"
              >
                Back to Listing
              </button>
              <a
                href={LISTING_INFO.tripComUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 font-medium text-xs hover:text-white transition-colors text-center"
              >
                Open Trip.com Page
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
