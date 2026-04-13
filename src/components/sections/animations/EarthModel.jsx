import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

export default function EarthModel(props) {
  const earthRef = useRef();
  const atmosphereRef = useRef();
  
  // Using the high-res texture you provided
  const colorMap = useLoader(
    THREE.TextureLoader, 
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg'
  );

  // Cinematic slow rotation for both layers
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (earthRef.current) {
      earthRef.current.rotation.y = elapsedTime * 0.05;
    }
    // Rotate the atmosphere glow slightly faster for a dynamic feel
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = elapsedTime * 0.06;
    }
  });

  return (
    <group {...props}>
      {/* Layer 1: The Core Earth */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial 
          map={colorMap} 
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>

      {/* Layer 2: The Atmospheric Glow / Halo */}
      {/* Slightly larger (1.6 radius) with additive blending */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1.6, 64, 64]} />
        <meshStandardMaterial 
          color="#4ca1ff"
          transparent={true}
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false} // Prevents the glow from hiding the earth
          side={THREE.FrontSide}
        />
      </mesh>
    </group>
  );
}