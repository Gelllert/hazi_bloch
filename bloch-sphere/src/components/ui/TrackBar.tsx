import React from 'react';
import type { QubitTrack } from '../../types/quantum';
import { Button } from './primitives';

interface Props {
  tracks: QubitTrack[];
  activeTrackId: number;
  onSelectTrack: (id: number) => void;
  onAddTrack: () => void;
  onRemoveTrack: (id: number) => void;
}

const toCssHex = (num: number) => `#${num.toString(16).padStart(6, '0')}`;

export const TrackBar: React.FC<Props> = ({
  tracks,
  activeTrackId,
  onSelectTrack,
  onAddTrack,
  onRemoveTrack,
}) => {
  return (
        <div className="flex items-center gap-2 overflow-x-auto max-w-[70vw]">
              <Button
                variant="blue"
                className="text-xs py-1 px-2.5 shrink-0"
                onClick={onAddTrack}
                title="Új párhuzamos állapot létrehozása az aktuális állapotból"
              >
                + Új állapot
              </Button>

              {tracks.map((track) => {
                const isActive = track.id === activeTrackId;
                return (
        <div
          key={track.id}
          className={`flex items-center rounded-full pr-1.5 py-0.5 text-xs shrink-0 border transition-all ${
            isActive
              ? 'bg-slate-700 border-amber-400 text-white shadow-sm'
              : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-500'
          }`}
        >
          <button
            onClick={() => onSelectTrack(track.id)}
            className="flex items-center gap-1.5 pl-2.5 pr-1 font-medium cursor-pointer"
          >
            <span
              className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
              style={{ backgroundColor: toCssHex(track.color) }}
            />
            <span>{track.name}</span>
          </button>
      
          {tracks.length > 1 && (
            <button
              onClick={() => onRemoveTrack(track.id)}
              title="Állapot törlése"
              className="text-slate-400 hover:text-rose-400 px-1 rounded-full cursor-pointer font-bold"
            >
              ×
            </button>
          )}
        </div>
        );
      })}
    </div>
  );
};