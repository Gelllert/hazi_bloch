// src/components/ui/GatePanel.tsx
import React, { useState } from 'react';
import { GATES, PRESET_STATES } from '../../utils/gates';
import { calculateQuantumState } from '../../utils/quantumMath';
import type { QuantumState } from '../../types/quantum';
import { Panel, Button } from './primitives';

interface Props {
  onApplyGate: (gateName: string) => void;
  onSetPreset: (presetName: string, state: QuantumState) => void;
}

export const GatePanel: React.FC<Props> = ({ onApplyGate, onSetPreset }) => {
  const [initThetaDeg, setInitThetaDeg] = useState<number>(67);
  const [initPhiDeg, setInitPhiDeg] = useState<number>(20);

  const handleCustomInit = () => {
    const thetaRad = (Math.max(0, Math.min(180, initThetaDeg)) * Math.PI) / 180;
    const phiRad = (((initPhiDeg % 360) + 360) % 360 * Math.PI) / 180;
    const customState = calculateQuantumState(thetaRad, phiRad);
    onSetPreset(`Egyedi (${initThetaDeg}°, ${initPhiDeg}°)`, customState);
  };

  return (
    <div className="flex flex-col gap-3">
      <Panel title="Kezdőállapot" accent="emerald">
        <div className="grid grid-cols-3 gap-1.5">
          {Object.entries(PRESET_STATES).map(([name, state]) => (
            <Button
              key={name}
              variant="slate"
              className="text-xs py-1.5"
              onClick={() => onSetPreset(name, state)}
            >
              {name}
            </Button>
          ))}
        </div>

        <details className="pt-2 border-t border-slate-700/70">
          <summary className="text-xs font-semibold text-emerald-400/90 uppercase tracking-wider cursor-pointer hover:text-emerald-300 select-none">
            Egyedi kezdőállapot (θ, φ)
          </summary>
          <div className="grid grid-cols-2 gap-2 pt-2.5">
            <label className="flex flex-col gap-1 text-xs text-slate-300">
              <span>Theta θ (0–180°)</span>
              <input
                type="number"
                min={0}
                max={180}
                step={1}
                value={initThetaDeg}
                onChange={(e) => setInitThetaDeg(Number(e.target.value))}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 font-mono text-white text-xs focus:outline-none focus:border-emerald-500"
              />
            </label>
            <label className="flex flex-col gap-1 text-xs text-slate-300">
              <span>Phi φ (0–360°)</span>
              <input
                type="number"
                min={0}
                max={360}
                step={1}
                value={initPhiDeg}
                onChange={(e) => setInitPhiDeg(Number(e.target.value))}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 font-mono text-white text-xs focus:outline-none focus:border-emerald-500"
              />
            </label>
            <Button
              variant="emerald"
              fullWidth
              className="col-span-2 text-xs py-1.5 mt-1"
              onClick={handleCustomInit}
            >
              Indítás erről az állapotról
            </Button>
          </div>
        </details>
      </Panel>

      <Panel title="Egybites Kvantumkapuk" accent="purple">
        <div className="grid grid-cols-5 gap-1.5">
          {Object.keys(GATES).map((gate) => (
            <Button
              key={gate}
              variant="purple"
              className="font-bold text-center px-1"
              onClick={() => onApplyGate(gate)}
            >
              {gate}
            </Button>
          ))}
        </div>
      </Panel>
    </div>
  );
};