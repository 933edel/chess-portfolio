// import { Canvas } from "@react-three/fiber";
// import {
//   OrbitControls,
//   Stars,
//   ContactShadows,
//   Environment,
// } from "@react-three/drei";

// import ChessPieces from "./ChessPieces";

// export default function ChessBoard({ fen, activeSection, setActiveSection }) {
//   return (
//     <Canvas
//       shadows
//       camera={{ position: [7, 7, 7], fov: 45 }}
//       gl={{ antialias: true }}
//     >
//       {/* Background stars */}
//       <Stars radius={100} depth={50} count={3000} factor={3} fade speed={1} />
//       {/* Lighting */}
//       <ambientLight intensity={0.5} />
//       <spotLight
//         position={[12, 18, 10]}
//         angle={0.3}
//         intensity={1.3}
//         penumbra={0.6}
//         castShadow
//         shadow-mapSize-width={2048}
//         shadow-mapSize-height={2048}
//       />
//       <pointLight position={[-10, 10, -10]} intensity={0.4} color="#88aaff" />
//       {/* Chessboard squares */}
//       {[...Array(8)].map((_, row) =>
//         [...Array(8)].map((_, col) => {
//           const isDark = (row + col) % 2 === 1;
//           return (
//             <mesh
//               key={`${row}-${col}`}
//               position={[col - 3.5, 0, row - 3.5]}
//               receiveShadow
//               castShadow
//             >
//               <boxGeometry args={[1, 0.1, 1]} />
//               <meshStandardMaterial
//                 color={isDark ? "#1c1c1c" : "#fafafa"} // deep black vs bright white
//                 metalness={0.9} // shiny & reflective
//                 roughness={0.15} // smooth polish
//               />
//             </mesh>
//           );
//         })
//       )}
//       <Environment preset="city" /> {/* reflections & overall brightness */}
//       {/* Pieces */}
//       <ChessPieces
//         fen={fen}
//         activeSection={activeSection}
//         setActiveSection={setActiveSection}
//       />
//       {/* Soft ground shadows under the board */}
//       <ContactShadows
//         position={[0, -0.1, 0]}
//         opacity={0.4}
//         scale={12}
//         blur={2.5}
//         far={4.5}
//       />
//       {/* Camera controls */}
//       <OrbitControls
//         enablePan={false}
//         enableZoom={true}
//         autoRotate
//         autoRotateSpeed={0.6}
//       />
//     </Canvas>
//   );
// }

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  ContactShadows,
  Environment,
} from "@react-three/drei";

import ChessPieces from "./ChessPieces";

export default function ChessBoard({
  fen,
  activeSection,
  setActiveSection,
  highlightColor = "white",
  activePieceTypes = ["king", "queen", "bishop", "knight"],
}) {
  return (
    <Canvas
      shadows
      camera={{ position: [7, 7, 7], fov: 45 }}
      gl={{ antialias: true }}
    >
      {/* Background stars */}
      <Stars radius={100} depth={50} count={3000} factor={3} fade speed={1} />
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <spotLight
        position={[12, 18, 10]}
        angle={0.3}
        intensity={1.3}
        penumbra={0.6}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, 10, -10]} intensity={0.4} color="#88aaff" />
      {/* Chessboard squares */}
      {[...Array(8)].map((_, row) =>
        [...Array(8)].map((_, col) => {
          const isDark = (row + col) % 2 === 1;
          return (
            <mesh
              key={`${row}-${col}`}
              position={[col - 3.5, 0, row - 3.5]}
              receiveShadow
              castShadow
            >
              <boxGeometry args={[1, 0.1, 1]} />
              <meshStandardMaterial
                color={isDark ? "#1c1c1c" : "#fafafa"} // deep black vs bright white
                metalness={0.9} // shiny & reflective
                roughness={0.15} // smooth polish
              />
            </mesh>
          );
        })
      )}
      <Environment preset="city" /> {/* reflections & overall brightness */}
      {/* Pieces */}
      <ChessPieces
        fen={fen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        highlightColor={highlightColor}
        activePieceTypes={activePieceTypes}
      />
      {/* Soft ground shadows under the board */}
      <ContactShadows
        position={[0, -0.1, 0]}
        opacity={0.4}
        scale={12}
        blur={2.5}
        far={4.5}
      />
      {/* Camera controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        autoRotate
        autoRotateSpeed={0.6}
      />
    </Canvas>
  );
}
