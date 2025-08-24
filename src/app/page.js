"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import Header from "./components/Header";
import Modal from "./components/Modal";
import ChessBoard from "./components/ChessBoard";
import Footer from "./components/Footer";

// Famous games FENs
const games = [
  {
    name: "Anand's Immortal Game",
    fen: "2rq1rk1/pb1n1ppN/4p3/1pb5/3P1Pn1/P1NB4/1PQ3PP/R1B2RK1 w - - 1 16",
    highlightColor: "black",
    activePieceTypes: ["king", "queen", "bishop", "knight"],
  },
  {
    name: "Kasparov's Immortal Game",
    fen: "b2r3r/k3qp1p/p4np1/Nppn4/3pPQ2/P4PPB/1PP4P/1K1RR3 w - - 0 23",
    highlightColor: "white",
    activePieceTypes: ["king", "queen", "bishop", "knight"],
  },
  {
    name: "Morphy vs Allies",
    fen: "rn2kb1r/p3qppp/2p2n2/1N2p1B1/2B1P3/1Q6/PPP2PPP/R3K2R b KQkq - 0 10",
    highlightColor: "white",
    activePieceTypes: ["king", "queen", "bishop", "knight"],
  },
  {
    name: "Game of the Century",
    fen: "r3r1k1/pp3pbp/1qp1b1p1/2B5/2BP4/Q1n2N2/P4PPP/3R1K2 w - - 4 18",
    highlightColor: "black",
    activePieceTypes: ["king", "queen", "bishop", "knight"],
  },
  {
    name: "The Immortal Game",
    fen: "r1b1k1nr/p2p1ppp/n2B4/1p1NPN1P/6P1/3P1Q2/P1P1K3/q5b1 w kq - 2 21",
    highlightColor: "white",
    activePieceTypes: ["king", "queen", "bishop", "knight"],
  },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [currentGameIndex, setCurrentGameIndex] = useState(0);

  const currentGame = games[currentGameIndex];

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleNextGame = () => {
    setCurrentGameIndex((prev) => (prev + 1) % games.length);
    setActiveSection(null);
  };

  return (
    <main
      className={`w-screen h-screen relative overflow-hidden ${
        theme === "dark" ? "bg-black" : "bg-gray-100"
      }`}
    >
      {/* Header */}
      <Header
        setActiveSection={setActiveSection}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Modal */}
      <Modal
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        theme={theme}
      />

      {/* 3D Scene */}
      <motion.div
        className="absolute inset-0"
        animate={{ x: activeSection ? "-10%" : "0%" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <ChessBoard
          fen={currentGame.fen}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          highlightColor={currentGame.highlightColor}
          activePieceTypes={currentGame.activePieceTypes}
          theme={theme}
        />
      </motion.div>

      {/* Footer */}
      <Footer onNext={handleNextGame} currentGame={currentGame.name} />
    </main>
  );
}
