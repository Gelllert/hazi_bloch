// src/components/ui/RotationPanel.tsx
import React, { useState, useEffect } from 'react';
import type { SphericalCoords } from '../../types/quantum';
import { Panel, Button, SliderField } from './primitives';

interface Props {
  currentCoords: SphericalCoords;
  onApplyAxisRotation: (axis: 'X' | 'Y' | 'Z', angleDeg: number) => void;
  onApplyManualCoords: (theta: number, phi: number) => void;
}

export const RotationPanel: React.FC<Props> = ({
  currentCoords,
  onApplyAxisRotation,
  onApplyManualCoords,
}) => {
  const [rxDeg, setRxDeg] = useState<number>(45);
  const [ryDeg, setRyDeg] = useState<number>(45);
  const [rzDeg, setRzDeg] = useState<number>(45);

  const [localTheta, setLocalTheta] = useState(currentCoords.theta);
  const [localPhi, setLocalPhi] = useState(currentCoords.phi);

  useEffect(() => {
    setLocalTheta(currentCoords.theta);
    setLocalPhi(currentCoords.phi);
  }, [currentCoords]);

  const axes = [
    { axis: 'X' as const, label: 'Rx(θ)', value: rxDeg, setter: setRxDeg },
    { axis: 'Y' as const, label: 'Ry(θ)', value: ryDeg, setter: setRyDeg },
    { axis: 'Z' as const, label: 'Rz(θ)', value: rzDeg, setter: setRzDeg },
  ];

  return (
    <Panel title="Tengely körüli forgatás" accent="amber">
      <div className="space-y-3">
        {axes.map(({ axis, label, value, setter }) => (
          <div key={axis} className="bg-slate-900/70 p-2.5 rounded-lg border border-slate-700/60 space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-amber-400 font-mono">{label}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-200 w-11 text-right">{value}°</span>
                <Button
                  variant="amber"
                  className="py-1 px-2.5 text-xs"
                  onClick={() => onApplyAxisRotation(axis, value)}
                >
                  Forgat
                </Button>
              </div>
            </div>
            <input
              type="range"
              min={-180}
              max={180}
              step={5}
              value={value}
              onChange={(e) => setter(parseInt(e.target.value, 10))}
              className="w-full accent-amber-500 cursor-pointer h-1.5"
            />
          </div>
        ))}
      </div>

      <details className="pt-2 border-t border-slate-700/70">
        <summary className="text-xs font-semibold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-200">
          Kézi koordináták (θ, φ)
        </summary>
        <div className="flex flex-col gap-2.5 pt-2.5">
          <SliderField
            label="Theta (θ)"
            valueDisplay={`${(localTheta * (180 / Math.PI)).toFixed(0)}°`}
            min={0}
            max={Math.PI}
            step={0.05}
            value={localTheta}
            onChange={setLocalTheta}
          />
          <SliderField
            label="Phi (φ)"
            valueDisplay={`${(localPhi * (180 / Math.PI)).toFixed(0)}°`}
            min={0}
            max={2 * Math.PI}
            step={0.05}
            value={localPhi}
            onChange={setLocalPhi}
          />
          <Button
            variant="slate"
            fullWidth
            className="text-xs py-1.5"
            onClick={() => onApplyManualCoords(localTheta, localPhi)}
          >
            Pozíció rögzítése
          </Button>
        </div>
      </details>
    </Panel>
  );
};