import React, { useState } from 'react';
import { StudySpot } from '../types';
import { MapPin, Navigation, Info, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InteractiveMapProps {
  spots: StudySpot[];
  selectedSpot: StudySpot | null;
  onSelectSpot: (spot: StudySpot) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  spots,
  selectedSpot,
  onSelectSpot,
  favorites,
  onToggleFavorite,
}) => {
  const [hoveredSpot, setHoveredSpot] = useState<StudySpot | null>(null);

  return (
    <div className="relative w-full h-[320px] md:h-[480px] bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Map Header / Indicators */}
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md border border-slate-200 rounded-xl px-3 py-2 flex items-center gap-2 pointer-events-none">
        <Compass className="w-4 h-4 text-emerald-700 animate-spin-slow" />
        <span className="font-sans font-semibold text-xs text-slate-800 uppercase tracking-wider">
          Tulane Uptown Campus Map
        </span>
      </div>

      <div className="absolute bottom-4 right-4 z-10 bg-white/95 backdrop-blur-md border border-slate-200 rounded-lg p-2.5 flex flex-col gap-1.5 text-[10px] text-slate-600 font-mono shadow-sm">
        <div className="font-semibold text-slate-800 border-b border-slate-100 pb-1 mb-1">GEOGRAPHY INDICATORS</div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full inline-block"></span>
          <span>Study Spot</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-sky-500 rounded-full inline-block"></span>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-0.5 bg-emerald-700/20 border-t border-dashed border-emerald-700 inline-block"></span>
          <span>McAlister Place (Pedestrian)</span>
        </div>
      </div>

      {/* Main Stylized Campus Vector Art */}
      <div className="w-full h-full select-none relative overflow-hidden">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full object-cover bg-gradient-to-b from-emerald-50/40 via-sky-50/20 to-emerald-50/30"
          style={{ minWidth: '600px' }}
        >
          {/* Grid Background */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e2e8f0" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Major Streets (Grey Paths) */}
          {/* St. Charles Avenue (Bottom boundary) */}
          <line x1="0" y1="92" x2="100" y2="92" stroke="#cbd5e1" strokeWidth="2.5" />
          <text x="2%" y="95" className="fill-slate-400 font-sans font-bold text-[2px] tracking-wider uppercase">
            St. Charles Avenue (Streetcar Line)
          </text>

          {/* Freret Street (Mid-campus bisect) */}
          <line x1="0" y1="46" x2="100" y2="46" stroke="#cbd5e1" strokeWidth="2.0" />
          <text x="2%" y="49" className="fill-slate-400 font-sans font-bold text-[2px] tracking-wider uppercase">
            Freret Street
          </text>

          {/* Willow Street (Top boundary) */}
          <line x1="0" y1="8" x2="100" y2="8" stroke="#cbd5e1" strokeWidth="2.5" />
          <text x="2%" y="6" className="fill-slate-400 font-sans font-bold text-[2px] tracking-wider uppercase">
            Willow Street
          </text>

          {/* McAlister Place / Drive (Central pedestrian pathway - VERY ICONIC AT TULANE) */}
          <line
            x1="50"
            y1="8"
            x2="50"
            y2="92"
            stroke="#15803d"
            strokeWidth="1.2"
            strokeDasharray="1,1"
            className="opacity-70"
          />
          <text
            x="51"
            y="25"
            transform="rotate(90, 51, 25)"
            className="fill-emerald-800/60 font-sans font-bold text-[2.2px] tracking-wider uppercase"
          >
            McAlister Place (Walkway)
          </text>

          {/* Tulane Green Parks and Quads (Vector shapes) */}
          {/* Newcomb Quad (LHS, Lower Campus) */}
          <rect x="15" y="55" width="25" height="30" rx="3" fill="#d1fae5" opacity="0.6" stroke="#a7f3d0" strokeWidth="0.3" />
          <text x="27" y="70" className="fill-emerald-800/50 font-sans font-medium text-[2.2px] text-center pointer-events-none">
            Newcomb Quad
          </text>

          {/* Gibson Quad / Lawn (RHS, Lower Campus) */}
          <rect x="60" y="55" width="25" height="30" rx="3" fill="#d1fae5" opacity="0.6" stroke="#a7f3d0" strokeWidth="0.3" />
          <text x="70" y="70" className="fill-emerald-800/50 font-sans font-medium text-[2.2px] pointer-events-none">
            Gibson Lawn
          </text>

          {/* Academic Buildings Outlines (Graphic placeholders) */}
          {/* Howard Tilton Library Building */}
          <rect x="30" y="28" width="16" height="13" rx="1.5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.4" />
          <text x="31" y="34" className="fill-slate-500 font-sans text-[1.8px] font-bold">Howard-Tilton</text>
          <text x="31" y="37" className="fill-slate-400 font-sans text-[1.5px]">Library (Howie-T)</text>

          {/* Student Union Building / LBC */}
          <rect x="52" y="32" width="15" height="12" rx="1.5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.4" />
          <text x="54" y="38" className="fill-slate-500 font-sans text-[1.8px] font-bold">Lavin-Bernick</text>
          <text x="54" y="41" className="fill-slate-400 font-sans text-[1.5px]">Center (LBC)</text>

          {/* The Commons Building */}
          <rect x="52" y="16" width="15" height="11" rx="1.5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.4" />
          <text x="54" y="21" className="fill-slate-500 font-sans text-[1.8px] font-bold">The Commons</text>
          <text x="54" y="24" className="fill-slate-400 font-sans text-[1.5px]">Dining & Study</text>

          {/* Stern Science Center */}
          <rect x="20" y="18" width="14" height="8" rx="1.5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.4" />
          <text x="22" y="23" className="fill-slate-500 font-sans text-[1.8px] font-bold">Stern Hall</text>

          {/* Business Complex AB Freeman */}
          <rect x="71" y="22" width="16" height="12" rx="1.5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.4" />
          <text x="73" y="28" className="fill-slate-500 font-sans text-[1.8px] font-bold">Freeman School</text>
          <text x="73" y="31" className="fill-slate-400 font-sans text-[1.5px]">of Business</text>

          {/* Newcomb Hall */}
          <rect x="22" y="58" width="12" height="6" rx="1" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.4" />
          <text x="24" y="62" className="fill-slate-500 font-sans text-[1.8px] font-bold">Newcomb Hall</text>

          {/* Richardson Memorial Hall */}
          <rect x="22" y="74" width="14" height="7" rx="1" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.4" />
          <text x="23" y="78" className="fill-slate-500 font-sans text-[1.8px] font-bold">Richardson Hall</text>
          <text x="23" y="80" className="fill-slate-400 font-sans text-[1.3px]">Architecture School</text>

          {/* Jones Hall */}
          <rect x="73" y="58" width="13" height="7" rx="1" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.4" />
          <text x="74" y="62" className="fill-slate-500 font-sans text-[1.8px] font-bold">Jones Hall</text>
          <text x="74" y="64" className="fill-slate-400 font-sans text-[1.3px]">Special Collections</text>

          {/* Reily Student Recreation Center */}
          <rect x="69" y="8" width="13" height="7" rx="1" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.4" />
          <text x="70" y="12" className="fill-slate-500 font-sans text-[1.8px] font-bold">Reily Rec Center</text>
          <text x="70" y="14" className="fill-slate-400 font-sans text-[1.3px]">Gym & Lounge</text>

          {/* Weinmann Hall (Law School) */}
          <rect x="84" y="12" width="13" height="8" rx="1" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.4" />
          <text x="85" y="16" className="fill-slate-500 font-sans text-[1.8px] font-bold">Weinmann Hall</text>
          <text x="85" y="18" className="fill-slate-400 font-sans text-[1.3px]">Tulane Law Library</text>
        </svg>

        {/* Floating Pins Layer */}
        {spots.map((spot) => {
          const isSelected = selectedSpot?.id === spot.id;
          const isHovered = hoveredSpot?.id === spot.id;
          const isFav = favorites.includes(spot.id);

          return (
            <div
              key={spot.id}
              className="absolute cursor-pointer transition-all duration-300"
              style={{
                left: `${spot.lat}%`,
                top: `${spot.lng}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: isSelected ? 40 : isHovered ? 30 : 20,
              }}
              onClick={() => onSelectSpot(spot)}
              onMouseEnter={() => setHoveredSpot(spot)}
              onMouseLeave={() => setHoveredSpot(null)}
            >
              <div className="relative group flex items-center justify-center">
                {/* Visual Ripple Pulse for selected/hovered pins */}
                {(isSelected || isHovered) && (
                  <span className={`absolute inline-flex h-10 w-10 rounded-full opacity-60 animate-ping ${
                    isSelected ? 'bg-sky-400' : 'bg-emerald-400'
                  }`} />
                )}

                {/* Marker Wrapper */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 shadow-md transition-all duration-300 ${
                    isSelected
                      ? 'bg-sky-500 border-white text-white scale-110'
                      : isHovered
                      ? 'bg-amber-400 border-white text-slate-900 scale-105'
                      : 'bg-emerald-700 border-emerald-50 text-emerald-100 ring-2 ring-emerald-950/10'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                </div>

                {/* Micro Label under pin */}
                <div className="absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 text-white font-sans text-[9px] px-1.5 py-0.5 rounded shadow pointer-events-none tracking-tight opacity-40 group-hover:opacity-100 transition-opacity">
                  {spot.name.split(' ')[0]}..
                </div>
              </div>
            </div>
          );
        })}

        {/* Hover / Selected Spot Quick-View Card overlay */}
        <AnimatePresence>
          {(selectedSpot || hoveredSpot) && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="absolute bottom-4 left-4 right-4 md:right-auto md:w-80 bg-white/95 backdrop-blur border border-slate-200 p-4 rounded-xl shadow-xl z-50 flex gap-3"
            >
              {(() => {
                const current = selectedSpot || hoveredSpot;
                if (!current) return null;
                const isFav = favorites.includes(current.id);

                return (
                  <>
                    <img
                      src={current.imageUrl}
                      alt={current.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-lg object-cover border border-slate-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-1">
                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                          {current.building.split(' ')[0]}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">{current.hours}</span>
                      </div>
                      <h4 className="font-sans font-bold text-sm text-slate-800 leading-tight truncate">
                        {current.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-normal line-clamp-1 mt-0.5">
                        {current.description}
                      </p>
                      <div className="flex gap-2 items-center mt-2">
                        <span className="text-[9px] font-semibold bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded">
                          🔊 {current.quietLevel}
                        </span>
                        <span className="text-[9px] font-semibold bg-blue-50 text-blue-800 px-1.5 py-0.5 rounded">
                          🔌 Outlets: {current.outlets}
                        </span>
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
