import { useState } from 'react';
import { QuantumScene } from './components/3d/QuantumScene';
import { GATES, PRESET_STATES, createRotationGate, GATE_TRAJECTORIES } from './utils/gates';
import { applyGate, stateToSpherical, calculateQuantumState } from './utils/quantumMath';
import type { StateHistoryItem, QuantumState, QubitTrack } from './types/quantum';

import { SimulatorLayout } from './components/layout/SimulatorLayout';
import { TrackBar } from './components/ui/TrackBar';
import { InfoPanel } from './components/ui/InfoPanel';
import { GatePanel } from './components/ui/GatePanel';
import { RotationPanel } from './components/ui/RotationPanel';
import { HistoryPanel } from './components/ui/HistoryPanel';

const TRACK_COLORS = [0xef4444, 0x06b6d4, 0x10b981, 0xd946ef, 0xeab308];

const createTrack = (
  id: number,
  name: string,
  color: number,
  initialState: QuantumState,
  initialLabel = 'Kezdőállapot |0⟩'
): QubitTrack => ({
  id,
  name,
  color,
  history: [{ state: initialState, coords: stateToSpherical(initialState), label: initialLabel }],
});

export default function App() {
  const initialState = PRESET_STATES['|0⟩ (Z+)'];

  const [tracks, setTracks] = useState<QubitTrack[]>(() => [
    createTrack(1, 'Állapot #1', TRACK_COLORS[0], initialState),
  ]);
  const [activeTrackId, setActiveTrackId] = useState<number>(1);

  const activeTrack = tracks.find((t) => t.id === activeTrackId) ?? tracks[0];
  const currentItem = activeTrack.history[activeTrack.history.length - 1];

  const updateActiveHistory = (updater: (prev: StateHistoryItem[]) => StateHistoryItem[]) => {
    setTracks((prev) =>
      prev.map((track) =>
        track.id === activeTrack.id ? { ...track, history: updater(track.history) } : track
      )
    );
  };

  // --- KAPUK ÉS ÁLLAPOTMÓDOSÍTÁSOK ---

  const handleApplyGate = (gateName: string) => {
    const newState = applyGate(GATES[gateName], currentItem.state);
    updateActiveHistory((h) => [
      ...h,
      {
        state: newState,
        coords: stateToSpherical(newState),
        label: `${gateName} kapu`,
        trajectory: GATE_TRAJECTORIES[gateName], // <-- Ennek kötelezően itt kell lennie!
      },
    ]);
  };

  const handleAxisRotation = (axis: 'X' | 'Y' | 'Z', angleDeg: number) => {
    const angleRad = (angleDeg * Math.PI) / 180;
    const gate = createRotationGate(axis, angleRad);
    const newState = applyGate(gate, currentItem.state);
    const axisVec: [number, number, number] =
      axis === 'X' ? [1, 0, 0] : axis === 'Y' ? [0, 1, 0] : [0, 0, 1];
    updateActiveHistory((h) => [
      ...h,
      {
        state: newState,
        coords: stateToSpherical(newState),
        label: `R${axis.toLowerCase()}(${angleDeg}°)`,
        trajectory: { axis: axisVec, angleRad },
      },
    ]);
  };

  const handleSetPreset = (presetName: string, state: QuantumState) => {
    updateActiveHistory(() => [
      { state, coords: stateToSpherical(state), label: `Preset: ${presetName}` },
    ]);
  };

  const handleManualAngle = (theta: number, phi: number) => {
    const newState = calculateQuantumState(theta, phi);
    updateActiveHistory((h) => [
      ...h,
      { state: newState, coords: { theta, phi }, label: 'Kézi pozíció' },
    ]);
  };

  const handleReset = () => handleSetPreset('|0⟩ (Z+)', initialState);

  // --- TRACK KEZELÉS ---

  const handleAddTrack = () => {
    const nextId = Date.now();
    const color = TRACK_COLORS[tracks.length % TRACK_COLORS.length];
    const newTrack = createTrack(
      nextId,
      `Állapot #${tracks.length + 1}`,
      color,
      currentItem.state,
      `Másolat (${currentItem.label})`
    );
    setTracks((prev) => [...prev, newTrack]);
    setActiveTrackId(nextId);
  };

  const handleRemoveTrack = (id: number) => {
    if (tracks.length <= 1) return;
    const remaining = tracks.filter((t) => t.id !== id);
    setTracks(remaining);
    if (activeTrackId === id) {
      setActiveTrackId(remaining[0].id);
    }
  };

  return (
    <SimulatorLayout
      headerTitle="Bloch-gömb Szimulátor"
      headerBadge={
        <TrackBar
          tracks={tracks}
          activeTrackId={activeTrack.id}
          onSelectTrack={setActiveTrackId}
          onAddTrack={handleAddTrack}
          onRemoveTrack={handleRemoveTrack}
        />
      }
      leftSidebar={
        <HistoryPanel
          history={activeTrack.history}
          onRevert={(idx) => updateActiveHistory((h) => h.slice(0, idx + 1))}
          onReset={handleReset}
        />
      }
      viewport={<QuantumScene tracks={tracks} activeTrackId={activeTrack.id} />}
      rightSidebar={
        <>
          <InfoPanel coords={currentItem.coords} state={currentItem.state} />
          <GatePanel onApplyGate={handleApplyGate} onSetPreset={handleSetPreset} />
          <RotationPanel
            currentCoords={currentItem.coords}
            onApplyAxisRotation={handleAxisRotation}
            onApplyManualCoords={handleManualAngle}
          />
        </>
      }
    />
  );
}