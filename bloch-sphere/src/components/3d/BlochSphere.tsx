// src/components/3d/BlochSphere.tsx
import React from 'react';
import { Sphere, Line, Text } from '@react-three/drei';

export const BlochSphere: React.FC = () => {
  return (
    <group>
      {/* enkapszuláló gömb */}
      <Sphere args={[1, 32, 32]}>
        <meshPhysicalMaterial 
          transparent 
          opacity={0.15} 
          roughness={0.1} 
          transmission={0.9} 
          color="#00bfff" 
          depthWrite={false}
        />
      </Sphere>

      {/* egyenlítői körvonal (vízszintes sík) */}
      <Line
        points={Array.from({ length: 65 }).map((_, i) => {
          const angle = (i / 64) * Math.PI * 2;
          return [Math.cos(angle), 0, Math.sin(angle)];
        })}
        color="#cccccc"
        lineWidth={1}
        transparent
        opacity={0.5}
      />

      {/* z-tengely (Függőleges: Three.js Y) --> |0> és |1> */}
      <Line points={[[0, -1.2, 0], [0, 1.2, 0]]} color="#aaaaaa" />
      <Text position={[0, 1.3, 0]} color="white" fontSize={0.15}>|0⟩</Text>
      <Text position={[0, -1.3, 0]} color="white" fontSize={0.15}>|1⟩</Text>

      {/* x-tengely (Mélység: Three.js Z) --> |+> és |-> */}
      <Line points={[[0, 0, -1.2], [0, 0, 1.2]]} color="#aaaaaa" />
      <Text position={[0, 0, 1.3]} color="white" fontSize={0.15}>|+⟩</Text>
      <Text position={[0, 0, -1.3]} color="white" fontSize={0.15}>|-⟩</Text>

      {/* y-tengely (Vízszintes: Three.js X) --> |+i> és |-i> */}
      <Line points={[[-1.2, 0, 0], [1.2, 0, 0]]} color="#aaaaaa" />
      <Text position={[1.3, 0, 0]} color="white" fontSize={0.15}>|+i⟩</Text>
      <Text position={[-1.3, 0, 0]} color="white" fontSize={0.15}>|-i⟩</Text>
    </group>
  );
};