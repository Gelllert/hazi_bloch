import React from 'react';
import type { SphericalCoords, QuantumState } from '../../types/quantum';
import { cMag } from "../../utils/complexMaths";
import { Panel } from './primitives';

interface Props {
  coords: SphericalCoords;
  state: QuantumState;
}

export const InfoPanel: React.FC<Props> = ({ coords, state }) => {
  const prob0 = Math.pow(cMag(state.alpha), 2) * 100;
  const prob1 = Math.pow(cMag(state.beta), 2) * 100;

  return (
    <Panel title="Állapot Információk" accent="blue">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
          <span className="block text-xs text-slate-400">Polar (θ)</span>
          <span className="text-base font-mono text-white">
            {(coords.theta * (180 / Math.PI)).toFixed(1)}°
          </span>
        </div>
        <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
          <span className="block text-xs text-slate-400">Azimut (φ)</span>
          <span className="text-base font-mono text-white">
            {(coords.phi * (180 / Math.PI)).toFixed(1)}°
          </span>
        </div>
      </div>

      <div className="space-y-2.5 pt-1">
        <ProbabilityBar label="P(|0⟩)" percent={prob0} colorClass="bg-blue-500" />
        <ProbabilityBar label="P(|1⟩)" percent={prob1} colorClass="bg-rose-500" />
      </div>
    </Panel>
  );
};

const ProbabilityBar: React.FC<{ label: string; percent: number; colorClass: string }> = ({
  label,
  percent,
  colorClass,
}) => (
  <div>
    <div className="flex justify-between text-xs mb-1">
      <span className="text-slate-300 font-medium">{label}</span>
      <span className="font-mono text-slate-200">{percent.toFixed(1)}%</span>
    </div>
    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-700/60">
      <div
        className={`${colorClass} h-full transition-all duration-300`}
        style={{ width: `${percent}%` }}
      />
    </div>
  </div>
);