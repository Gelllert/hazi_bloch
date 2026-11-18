import type { ComplexNumber, QuantumState, SphericalCoords, QuantumGate } from '../types/quantum';
import {cAdd, cMult, cMag, cArg } from "./complexMaths.ts"

//kapu alkalmazása (2x2 mátrix szorzása 2x1 vektorral)
export const applyGate = (gate: QuantumGate, state: QuantumState): QuantumState => {
  const newAlpha = cAdd(cMult(gate[0][0], state.alpha), cMult(gate[0][1], state.beta));
  const newBeta = cAdd(cMult(gate[1][0], state.alpha), cMult(gate[1][1], state.beta));
  return { alpha: newAlpha, beta: newBeta };
};

//komplex állapotból --> gömb koordináták (3D rajzoláshoz)
export const stateToSpherical = (state: QuantumState): SphericalCoords => {
  const magAlpha = cMag(state.alpha);
  // Biztosítjuk, hogy a lebegőpontos pontatlanság ne adjon NaN-t az acos-nál
  const clampedMagAlpha = Math.min(magAlpha, 1); 
  const theta = 2 * Math.acos(clampedMagAlpha);
  
  const argAlpha = cArg(state.alpha);
  const argBeta = cArg(state.beta);
  
  //a globális fázist ignoráljuk, csak a relatív fázis (phi) számít
  let phi = argBeta - argAlpha;
  if (phi < 0) phi += 2 * Math.PI; //tartjuk 0 és 2PI között
  
  // Ha theta majdnem 0 (Pólusok), a phi határozatlan, ilyenkor 0-nak vesszük
  if (Math.abs(Math.sin(theta)) < 1e-6) phi = 0; 
  
  return { theta, phi };
};


//kiszámolja a 3D pontot a felületen a nyíl végéhez
export const getCartesianCoords = (theta: number, phi: number): [number, number, number] => {
  const radius = 1;
  //fizikai Z -> Three.js Y (függőleges)
  //fizikai X -> Three.js Z (mélység)
  //fizikai Y -> Three.js X (vízszintes)
  
  const x = radius * Math.sin(theta) * Math.sin(phi);
  const y = radius * Math.cos(theta);
  const z = radius * Math.sin(theta) * Math.cos(phi);
  
  return [x, y, z];
};

//kiszámolja az alfa és béta komplex amplitúdókat
export const calculateQuantumState = (theta: number, phi: number): QuantumState => {
  //alpha = cos(theta/2)
  const alpha: ComplexNumber = {
    re: Math.cos(theta / 2),
    im: 0, //a globális fázist elhagyjuk, így alfa mindig valós
  };

//beta = sin(theta/2) * e^(i*phi) = sin(theta/2) * (cos(phi) + i*sin(phi))
  const sinHalfTheta = Math.sin(theta / 2);
  const beta: ComplexNumber = {
    re: sinHalfTheta * Math.cos(phi),
    im: sinHalfTheta * Math.sin(phi),
  };

  return { alpha, beta };
};