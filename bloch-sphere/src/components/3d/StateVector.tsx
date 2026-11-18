// src/components/3d/StateVector.tsx
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getCartesianCoords } from '../../utils/quantumMath';
import type { SphericalCoords } from '../../types/quantum';

interface StateVectorProps {
  coords: SphericalCoords;
  isCurrent?: boolean;
  customColor?: number;
}

export const StateVector: React.FC<StateVectorProps> = ({
  coords,
  isCurrent = true,
  customColor,
}) => {
  const arrow = useMemo(() => {
    const [x, y, z] = getCartesianCoords(coords.theta, coords.phi);
    const dir = new THREE.Vector3(x, y, z).normalize();
    const color = customColor ?? (isCurrent ? 0xff0000 : 0x888888);

    const helper = new THREE.ArrowHelper(dir, new THREE.Vector3(0, 0, 0), 1, color, 0.2, 0.08);

    if (!isCurrent && customColor === undefined) {
      const lineMat = helper.line.material as THREE.LineBasicMaterial;
      lineMat.transparent = true;
      lineMat.opacity = 0.3;

      const coneMat = helper.cone.material as THREE.MeshBasicMaterial;
      coneMat.transparent = true;
      coneMat.opacity = 0.3;
    }

    return helper;
  }, [coords, isCurrent, customColor]);

  return <primitive object={arrow} />;
};