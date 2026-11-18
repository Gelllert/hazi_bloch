import type { ComplexNumber } from '../types/quantum';

export const c = (re: number, im: number = 0): ComplexNumber => ({ re, im });

export const cAdd = (a: ComplexNumber, b: ComplexNumber): ComplexNumber => 
  ({ re: a.re + b.re, im: a.im + b.im });

export const cMult = (a: ComplexNumber, b: ComplexNumber): ComplexNumber => ({
  re: a.re * b.re - a.im * b.im,
  im: a.re * b.im + a.im * b.re
});

export const cMag = (a: ComplexNumber): number => 
  Math.sqrt(a.re * a.re + a.im * a.im);

export const cArg = (a: ComplexNumber): number => 
  Math.atan2(a.im, a.re);