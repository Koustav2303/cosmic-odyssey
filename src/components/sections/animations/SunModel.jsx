import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SunModel(props) {
  const coreRef = useRef();
  const coronaRef = useRef();
  const outerGlowRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    // Complex, layered rotation to simulate a volatile surface
    if (coreRef.current) coreRef.current.rotation.y = elapsedTime * 0.02;
    if (coronaRef.current) {
      coronaRef.current.rotation.y = elapsedTime * -0.04;
      coronaRef.current.rotation.z = elapsedTime * 0.01;
    }
    if (outerGlowRef.current) {
      // Pulsing effect for the outer heat distortion
      const scale = 1 + Math.sin(elapsedTime * 2) * 0.02;
      outerGlowRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group {...props}>
      {/* Layer 1: The Blinding Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.8, 64, 64]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Layer 2: The Solar Surface (Corona) */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[1.9, 64, 64]} />
        <meshStandardMaterial 
          color="#ff4500" // Intense Orange/Red
          emissive="#ff4500"
          emissiveIntensity={2}
          wireframe={true} // Creates a geometric plasma grid effect
          transparent={true}
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Layer 3: The Massive Outer Glow / Heat Distortion */}
      <mesh ref={outerGlowRef}>
        <sphereGeometry args={[2.4, 64, 64]} />
        <meshBasicMaterial 
          color="#ff8c00"
          transparent={true}
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      
      {/* Layer 4: Extreme Outer Ambient Glow */}
      <mesh>
        <sphereGeometry args={[3.5, 64, 64]} />
        <meshBasicMaterial 
          color="#ff2a00"
          transparent={true}
          opacity={0.05}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}