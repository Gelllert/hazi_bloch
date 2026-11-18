// src/types/quantum.ts

export interface SphericalCoords {
  theta: number;
  phi: number;
}

export interface ComplexNumber {
  re: number;
  im: number;
}

export interface QuantumState {
  alpha: ComplexNumber;
  beta: ComplexNumber;
}

export type QuantumGate = [
  [ComplexNumber, ComplexNumber],
  [ComplexNumber, ComplexNumber]
];

export interface GateTrajectory {
  axis: [number, number, number];
  angleRad: number;
}

export interface StateHistoryItem {
  state: QuantumState;
  coords: SphericalCoords;
  label: string;
  trajectory?: GateTrajectory;
}

export interface QubitTrack {
  id: number;
  name: string;
  color: number;
  history: StateHistoryItem[];
}