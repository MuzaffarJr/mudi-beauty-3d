import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function GlassSerumBottle(props: ThreeElements["group"]) {
  return (
    <group {...props}>
      {/* body */}
      <mesh castShadow position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.62, 0.66, 1.8, 48]} />
        <meshPhysicalMaterial
          color="#f6dfd4"
          roughness={0.16}
          metalness={0}
          transmission={0.55}
          thickness={1.4}
          clearcoat={1}
          clearcoatRoughness={0.12}
          ior={1.45}
        />
      </mesh>
      {/* label band */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.635, 0.635, 0.85, 48]} />
        <meshPhysicalMaterial color="#fdf6ee" roughness={0.35} clearcoat={0.6} />
      </mesh>
      {/* cap */}
      <mesh castShadow position={[0, 2.05, 0]}>
        <cylinderGeometry args={[0.34, 0.36, 0.52, 40]} />
        <meshPhysicalMaterial color="#caa08e" roughness={0.4} clearcoat={0.5} />
      </mesh>
      {/* dropper bulb */}
      <mesh castShadow position={[0, 2.45, 0]}>
        <sphereGeometry args={[0.21, 32, 24]} />
        <meshPhysicalMaterial color="#b98a76" roughness={0.35} />
      </mesh>
    </group>
  );
}

function CreamJar(props: ThreeElements["group"]) {
  return (
    <group {...props}>
      <mesh castShadow position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.78, 0.74, 0.64, 48]} />
        <meshPhysicalMaterial
          color="#f3e6f2"
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.25}
          thickness={0.8}
        />
      </mesh>
      <mesh castShadow position={[0, 0.78, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.26, 48]} />
        <meshPhysicalMaterial color="#e7c9dd" roughness={0.28} clearcoat={0.8} />
      </mesh>
    </group>
  );
}

function LipBalm(props: ThreeElements["group"]) {
  return (
    <group {...props}>
      <mesh castShadow position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.84, 32]} />
        <meshPhysicalMaterial color="#e8b7a9" roughness={0.22} clearcoat={1} />
      </mesh>
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.31, 0.31, 0.24, 32]} />
        <meshPhysicalMaterial color="#d98f7e" roughness={0.3} clearcoat={0.7} />
      </mesh>
    </group>
  );
}

/** Slow idle spin + gentle pointer parallax. Motion stays subtle and damped. */
function StudioRig() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const base = state.clock.elapsedTime * 0.12; // slow idle rotation
    const targetY = base + state.pointer.x * 0.28;
    const targetX = -state.pointer.y * 0.16;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      targetY,
      2.4,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      targetX,
      2.4,
      delta,
    );
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.18} floatIntensity={0.55}>
        <GlassSerumBottle position={[0, 0.35, 0]} scale={1.05} />
      </Float>
      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.5}>
        <CreamJar position={[-1.65, -0.55, 0.65]} scale={0.92} />
      </Float>
      <Float speed={1.7} rotationIntensity={0.3} floatIntensity={0.6}>
        <LipBalm position={[1.6, -0.7, 0.55]} scale={0.95} />
      </Float>
      {/* pastel backdrop orbs */}
      <mesh position={[-2.6, 1.9, -1.6]}>
        <sphereGeometry args={[0.55, 32, 24]} />
        <meshPhysicalMaterial color="#f0d3dc" roughness={0.55} />
      </mesh>
      <mesh position={[2.7, 2.2, -1.9]}>
        <sphereGeometry args={[0.4, 32, 24]} />
        <meshPhysicalMaterial color="#d9e7dc" roughness={0.55} />
      </mesh>
      <mesh position={[1.9, -1.7, -1.2]}>
        <sphereGeometry args={[0.32, 32, 24]} />
        <meshPhysicalMaterial color="#f7e3cf" roughness={0.55} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      shadows
      camera={{ position: [0, 1.15, 6.4], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      style={{ touchAction: "pan-y" }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.35}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-5, 3, -3]} intensity={0.5} color="#ffd9e8" />
      <pointLight position={[0, 2.5, 3.5]} intensity={12} color="#fff1e4" distance={9} />
      <Suspense fallback={null}>
        <StudioRig />
        <ContactShadows
          position={[0, -1.62, 0]}
          opacity={0.32}
          scale={9}
          blur={2.6}
          far={3.2}
          color="#a9887a"
        />
      </Suspense>
    </Canvas>
  );
}
