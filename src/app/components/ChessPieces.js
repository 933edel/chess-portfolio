import parseFEN from "./utils/parseFEN";
import { useGLTF } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

// Per-piece vertical offsets
const pieceOffsets = {
  king: 1.13,
  queen: 1.03,
  rook: 0.47,
  bishop: 0.6,
  knight: 0.7,
  pawn: 0.53,
};

// Cylinder settings
const cylinderHeight = 2.0;
const cylinderRadius = 0.5;

// Correct section assignments based on piece type
const sectionAssignments = {
  king: "about",
  queen: "projects",
  bishop: "resume",
  knight: "contact",
};

// Glow cylinder component
function GlowCylinder({ pulse }) {
  const matRef = useRef();

  useFrame((state, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta;
      matRef.current.uniforms.uPulse.value = pulse;
    }
  });

  const geometry = new THREE.CylinderGeometry(
    cylinderRadius,
    cylinderRadius,
    cylinderHeight,
    64,
    1,
    true
  );
  geometry.translate(0, cylinderHeight / 2, 0);

  return (
    <mesh position={[0, 0, 0]} geometry={geometry}>
      <shaderMaterial
        ref={matRef}
        blending={THREE.AdditiveBlending}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        uniforms={{ uTime: { value: 0 }, uPulse: { value: 0 } }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform float uPulse;
          varying vec2 vUv;
          void main() {
            float glow = (0.5 + 0.5 * sin(uTime*2.0 + vUv.y*10.0)) * uPulse;
            float alpha = 0.6 * (1.0 - vUv.y);
            vec3 colorBottom = vec3(0.1,1.0,0.5);
            vec3 colorTop = vec3(0.0,0.8,1.0);
            vec3 color = mix(colorBottom,colorTop,vUv.y);
            gl_FragColor = vec4(color, alpha*glow);
          }
        `}
      />
    </mesh>
  );
}

// Single chess piece component
function ChessPiece({ piece, isActive, onClick, section }) {
  const { scene } = useGLTF(`/models/${piece.type}.glb`);
  const primitiveRef = useRef();
  const pulse = useRef(0);

  const groupPosition = [piece.x, 0, piece.z];
  const pieceOffsetY = pieceOffsets[piece.type] ?? 0.7;

  const clonedScene = useMemo(() => {
    const sceneClone = scene.clone();
    sceneClone.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.color.set(piece.color === "white" ? "white" : "gray");
        child.material.metalness = 0.4;
        child.material.roughness = 0.35;
      }
    });
    return sceneClone;
  }, [scene, piece.color]);

  useFrame(({ clock }) => {
    if (primitiveRef.current) {
      pulse.current = (Math.sin(clock.getElapsedTime() * 6) + 1) / 2;
      primitiveRef.current.position.y =
        pieceOffsetY + (isActive ? 0.25 + pulse.current * 0.12 : 0);
    }

    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.material.emissive.set(isActive ? "#55ccff" : "black");
        child.material.emissiveIntensity = isActive ? 0.6 : 0;
      }
    });
  });

  return (
    <group
      position={groupPosition}
      onClick={onClick}
      onPointerOver={() => {
        if (section) document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      <Suspense fallback={null}>
        <primitive
          ref={primitiveRef}
          object={clonedScene}
          scale={5.0}
          rotation={[0, Math.PI, 0]}
        />
      </Suspense>
      {isActive && <GlowCylinder pulse={pulse.current} />}
    </group>
  );
}

// Main ChessPieces component
export default function ChessPieces({
  fen,
  activeSection,
  setActiveSection,
  highlightColor = "white",
  activePieceTypes = ["king", "queen", "bishop", "knight"],
}) {
  const pieces = parseFEN(fen);

  // Map each piece type to its corresponding section
  const sectionMapping = {};
  activePieceTypes.forEach((type) => {
    if (sectionAssignments[type]) {
      const firstPiece = pieces.find(
        (p) => p.color === highlightColor && p.type === type
      );
      if (firstPiece) {
        // We now map by piece position, which is unique.
        sectionMapping[`${firstPiece.x}-${firstPiece.z}`] =
          sectionAssignments[type];
      }
    }
  });

  return pieces.map((p, i) => {
    const key = `${p.x}-${p.z}`;
    const section = sectionMapping[key] || null;
    const isActive = section && activeSection === section;

    return (
      <ChessPiece
        key={i}
        piece={p}
        isActive={isActive}
        onClick={() => {
          if (!section) return;
          setActiveSection(isActive ? null : section);
        }}
        section={section}
      />
    );
  });
}
