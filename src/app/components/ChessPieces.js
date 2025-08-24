"use client";

import parseFEN from "./utils/parseFEN";
import { useGLTF, useCursor } from "@react-three/drei";
import { Suspense, useRef, useMemo, useState } from "react";
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

// Section assignments
const sectionAssignments = {
  king: "about",
  queen: "projects",
  bishop: "resume",
  knight: "contact",
};

// Glow cylinder
// Glow cylinder
function GlowCylinder({ pulse }) {
  const matRef = useRef();

  useFrame((_, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta;
      matRef.current.uniforms.uPulse.value = pulse;
    }
  });

  const geometry = useMemo(() => {
    const g = new THREE.CylinderGeometry(
      cylinderRadius,
      cylinderRadius,
      cylinderHeight,
      24,
      1,
      true
    );
    g.translate(0, cylinderHeight / 2, 0);
    return g;
  }, []);

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

// A single sparkle particle
function Sparkle({ delay = 0, offset = [0, 0], phaseOffset = 0 }) {
  const ref = useRef();
  const sparkleHeight = 3.0; // reach above king/queen

  useFrame(({ clock }) => {
    const t = (clock.getElapsedTime() + phaseOffset + delay) % 1;
    if (ref.current) {
      ref.current.position.y = t * sparkleHeight;
      const fade = 1.0 - t;
      ref.current.material.opacity = fade;
    }
  });

  return (
    <mesh ref={ref} position={[offset[0], 0, offset[1]]}>
            <sphereGeometry args={[0.025, 8, 8]} /> {/* smaller sparkle */}
            <meshBasicMaterial color="#ffd700" transparent opacity={1} />   {" "}
    </mesh>
  );
}

// Sparkle stream (triangle arrangement of 2–3 sparkles)
function SparkleStream({ phaseOffset = 0 }) {
  const radius = 0.15; // small base radius around piece
  const angles = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3]; // 3 vertices of triangle
  return (
    <>
           {" "}
      {angles.map((a, i) => (
        <Sparkle
          key={i}
          offset={[Math.cos(a) * radius, Math.sin(a) * radius]}
          delay={i * 0.25}
          phaseOffset={phaseOffset}
        />
      ))}
         {" "}
    </>
  );
}

// Single chess piece
function ChessPiece({ piece, isActive, isSelectable, onClick, section }) {
  const { scene } = useGLTF(`/models/${piece.type}.glb`);
  const primitiveRef = useRef();
  const meshes = useRef([]);
  const pulse = useRef(0);

  const [hovered, setHovered] = useState(false);
  useCursor(hovered && !!section);

  const groupPosition = [piece.x, 0, piece.z];
  const pieceOffsetY = pieceOffsets[piece.type] ?? 0.7; // Unique random offset for sparkle asynchronicity

  const phaseOffset = useMemo(() => Math.random() * 10, []);

  const clonedScene = useMemo(() => {
    const sceneClone = scene.clone(true);
    meshes.current = [];
    sceneClone.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.color.set(piece.color === "white" ? "white" : "gray");
        child.material.metalness = 0.4;
        child.material.roughness = 0.35;
        meshes.current.push(child);
      }
    });
    return sceneClone;
  }, [scene, piece.color]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime(); // The vertical movement is dependent on the `pulse` value
    pulse.current = (Math.sin(t * 6) + 1) / 2;

    if (primitiveRef.current) {
      primitiveRef.current.position.y =
        pieceOffsetY + (isActive ? 0.25 + pulse.current * 0.12 : 0);
    }

    meshes.current.forEach((mesh) => {
      let emissiveIntensity = 0;
      if (isActive) {
        emissiveIntensity = 0.6;
      }
      mesh.material.emissive.set("#55ccff");
      mesh.material.emissiveIntensity = emissiveIntensity;
    });
  });

  return (
    <group
      position={groupPosition}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
           {" "}
      <Suspense fallback={null}>
               {" "}
        <primitive
          ref={primitiveRef}
          object={clonedScene}
          scale={5.0}
          rotation={[0, Math.PI, 0]}
        />
             {" "}
      </Suspense>
            {/* Cylinder only when active */}     {" "}
      {isActive && <GlowCylinder pulse={pulse.current} />}     {" "}
      {/* Sparkle streams only when selectable but not active */}     {" "}
      {isSelectable && !isActive && <SparkleStream phaseOffset={phaseOffset} />}
         {" "}
    </group>
  );
}

// Main ChessPieces
export default function ChessPieces({
  fen,
  activeSection,
  setActiveSection,
  highlightColor = "white",
  activePieceTypes = ["king", "queen", "bishop", "knight"],
}) {
  const pieces = useMemo(() => parseFEN(fen), [fen]);

  const sectionMapping = useMemo(() => {
    const mapping = {};
    activePieceTypes.forEach((type) => {
      if (sectionAssignments[type]) {
        const firstPiece = pieces.find(
          (p) => p.color === highlightColor && p.type === type
        );
        if (firstPiece) {
          mapping[`${firstPiece.x}-${firstPiece.z}`] = sectionAssignments[type];
        }
      }
    });
    return mapping;
  }, [pieces, activePieceTypes, highlightColor]);

  return useMemo(
    () =>
      pieces.map((p, i) => {
        const key = `${p.x}-${p.z}`;
        const section = sectionMapping[key] || null;
        const isSelectable = !!section;
        const isActive = section && activeSection === section;

        return (
          <ChessPiece
            key={i}
            piece={p}
            isActive={isActive}
            isSelectable={isSelectable}
            onClick={() => {
              if (!section) return;
              setActiveSection(isActive ? null : section);
            }}
            section={section}
          />
        );
      }),
    [pieces, sectionMapping, activeSection, setActiveSection]
  );
}
