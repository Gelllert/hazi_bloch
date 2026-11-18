// src/utils/gates.ts
import type { QuantumGate, QuantumState, GateTrajectory } from '../types/quantum';
import { c } from '../utils/complexMaths';

const invSqrt2 = 1 / Math.SQRT2;

export const GATES: Record<string, QuantumGate> = {
  I:    [ [c(1), c(0)], [c(0), c(1)] ],
  X:    [ [c(0), c(1)], [c(1), c(0)] ],
  Y:    [ [c(0), c(0, -1)], [c(0, 1), c(0)] ],
  Z:    [ [c(1), c(0)], [c(0), c(-1)] ],
  H:    [ [c(invSqrt2), c(invSqrt2)], [c(invSqrt2), c(-invSqrt2)] ],
  S:    [ [c(1), c(0)], [c(0), c(0, 1)] ],
  'S†': [ [c(1), c(0)], [c(0), c(0, -1)] ],
  T:    [ [c(1), c(0)], [c(0), c(invSqrt2, invSqrt2)] ],
  'T†': [ [c(1), c(0)], [c(0), c(invSqrt2, -invSqrt2)] ],
};

//minden alapkapu pontos Bloch-gömb tengelye és előjeles szöge
export const GATE_TRAJECTORIES: Record<string, GateTrajectory> = {
  X:    { axis: [1, 0, 0], angleRad: Math.PI },
  Y:    { axis: [0, 1, 0], angleRad: Math.PI },
  Z:    { axis: [0, 0, 1], angleRad: Math.PI },
  H:    { axis: [invSqrt2, 0, invSqrt2], angleRad: Math.PI },
  S:    { axis: [0, 0, 1], angleRad: Math.PI / 2 },
  'S†': { axis: [0, 0, 1], angleRad: -Math.PI / 2 },
  T:    { axis: [0, 0, 1], angleRad: Math.PI / 4 },
  'T†': { axis: [0, 0, 1], angleRad: -Math.PI / 4 },
};

//általános kvantum-forgatási mátrix bármilyen [nx, ny, nz] tengely és szög köré
export const createArbitraryRotationGate = (
  axis: [number, number, number],
  angleRad: number
): QuantumGate => {
  const [nx, ny, nz] = axis;
  const len = Math.hypot(nx, ny, nz) || 1;
  const ux = nx / len;
  const uy = ny / len;
  const uz = nz / len;

  const half = angleRad / 2;
  const cos = Math.cos(half);
  const sin = Math.sin(half);

  //R_n(θ) = [[cos - i*uz*sin, (-uy - i*ux)*sin], [(uy - i*ux)*sin, cos + i*uz*sin]]
  return [
    [c(cos, -uz * sin), c(-uy * sin, -ux * sin)],
    [c(uy * sin, -ux * sin), c(cos, uz * sin)],
  ];
};

export const createRotationGate = (axis: 'X' | 'Y' | 'Z', angleRad: number): QuantumGate => {
  const vec: [number, number, number] =
    axis === 'X' ? [1, 0, 0] : axis === 'Y' ? [0, 1, 0] : [0, 0, 1];
  return createArbitraryRotationGate(vec, angleRad);
};

export const PRESET_STATES: Record<string, QuantumState> = {
  '|0⟩ (Z+)':  { alpha: c(1), beta: c(0) },
  '|1⟩ (Z-)':  { alpha: c(0), beta: c(1) },
  '|+⟩ (X+)':  { alpha: c(invSqrt2), beta: c(invSqrt2) },
  '|-⟩ (X-)':  { alpha: c(invSqrt2), beta: c(-invSqrt2) },
  '|+i⟩ (Y+)': { alpha: c(invSqrt2), beta: c(0, invSqrt2) },
  '|-i⟩ (Y-)': { alpha: c(invSqrt2), beta: c(0, -invSqrt2) },
};