// src/components/3d/TrajectoryArc.tsx
import React, { useMemo } from 'react';
import * as THREE from 'three';
import type { QuantumState, SphericalCoords, GateTrajectory } from '../../types/quantum';
import { applyGate, stateToSpherical, getCartesianCoords } from '../../utils/quantumMath';
import { createArbitraryRotationGate } from '../../utils/gates';

interface TrajectoryArcProps {
  fromState: QuantumState;
  fromCoords: SphericalCoords;
  toCoords: SphericalCoords;
  isLatest: boolean;
  trajectory?: GateTrajectory;
}

export const TrajectoryArc: React.FC<TrajectoryArcProps> = ({
  fromState,
  fromCoords,
  toCoords,
  isLatest,
  trajectory,
}) => {
  const lineObject = useMemo(() => {
    const steps = 40;
    const vecPoints: THREE.Vector3[] = [];

    if (trajectory && Math.abs(trajectory.angleRad) > 0.005) {
      for (let i = 0; i <= steps; i++) {
        const partialAngle = (trajectory.angleRad * i) / steps;
        const partialGate = createArbitraryRotationGate(trajectory.axis, partialAngle);
        const intermediateState = applyGate(partialGate, fromState);
        const intermediateCoords = stateToSpherical(intermediateState);
        const [x, y, z] = getCartesianCoords(intermediateCoords.theta, intermediateCoords.phi);
        vecPoints.push(new THREE.Vector3(x, y, z).multiplyScalar(1.006));
      }

      const moved = vecPoints.some((p) => p.distanceTo(vecPoints[0]) > 0.02);
      if (!moved) return null;
    } else {
      const start = new THREE.Vector3(...getCartesianCoords(fromCoords.theta, fromCoords.phi)).normalize();
      const end = new THREE.Vector3(...getCartesianCoords(toCoords.theta, toCoords.phi)).normalize();
      const dot = Math.max(-1, Math.min(1, start.dot(end)));
      const omega = Math.acos(dot);
      if (omega < 0.01) return null;

      let ortho = new THREE.Vector3().crossVectors(start, end);
      if (ortho.lengthSq() < 1e-6) {
        ortho = new THREE.Vector3().crossVectors(start, new THREE.Vector3(1, 0, 0));
        if (ortho.lengthSq() < 1e-6) ortho = new THREE.Vector3().crossVectors(start, new THREE.Vector3(0, 0, 1));
      }
      ortho.normalize();
      const tangent = new THREE.Vector3().crossVectors(ortho, start).normalize();

      for (let i = 0; i <= steps; i++) {
        const angle = (omega * i) / steps;
        const p = new THREE.Vector3()
          .addScaledVector(start, Math.cos(angle))
          .addScaledVector(tangent, Math.sin(angle))
          .multiplyScalar(1.006);
        vecPoints.push(p);
      }
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(vecPoints);
    const material = new THREE.LineBasicMaterial({
      color: isLatest ? 0xf59e0b : 0x64748b,
      transparent: true,
      opacity: isLatest ? 0.95 : 0.4,
    });

    return new THREE.Line(geometry, material);
  }, [fromState, fromCoords, toCoords, isLatest, trajectory]);

  if (!lineObject) return null;

  return <primitive object={lineObject} />;
};