// src/components/3d/QuantumScene.tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { BlochSphere } from './BlochSphere';
import { StateVector } from './StateVector';
import { TrajectoryArc } from './TrajectoryArc';
import type { QubitTrack } from '../../types/quantum';

interface QuantumSceneProps {
  tracks: QubitTrack[];
  activeTrackId: number;
}

export const QuantumScene: React.FC<QuantumSceneProps> = ({ tracks, activeTrackId }) => {
  const activeTrack = tracks.find((t) => t.id === activeTrackId) ?? tracks[0];
  const activeHistory = activeTrack.history;

  return (
    <div className="w-full h-full bg-slate-950">
      <Canvas camera={{ position: [2.2, 1.5, 2.5], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} />

        <OrbitControls enablePan={false} minDistance={1.6} maxDistance={5.5} />

        <BlochSphere />

        {/* in-aktív trackek aktuális (utolsó) állapotvektora */}
        {tracks
          .filter((t) => t.id !== activeTrack.id)
          .map((track) => {
            const latest = track.history[track.history.length - 1];
            return (
              <StateVector
                key={`track-${track.id}`}
                coords={latest.coords}
                isCurrent={true}
                customColor={track.color}
              />
            );
          })}

        {/* aktív track útvonal-ívei a gömb felszínén */}
        {activeHistory.map((item, index) => {
          if (index === 0) return null;
          const prevItem = activeHistory[index - 1];
          const isLatest = index === activeHistory.length - 1;
          return (
            <TrajectoryArc
              key={`arc-${activeTrack.id}-${index}`}
              fromState={prevItem.state}
              fromCoords={prevItem.coords}
              toCoords={item.coords}
              isLatest={isLatest}
              trajectory={item.trajectory}
            />
          );
        })}

        {/* aktív track előzményei (ghost) + jelenlegi vektora a saját színével */}
        {activeHistory.map((item, index) => {
          const isCurrent = index === activeHistory.length - 1;
          return (
            <StateVector
              key={`vec-${activeTrack.id}-${index}`}
              coords={item.coords}
              isCurrent={isCurrent}
              customColor={isCurrent ? activeTrack.color : undefined}
            />
          );
        })}
      </Canvas>
    </div>
  );
};