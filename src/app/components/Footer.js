import React from "react";

export default function Footer({ onNext, currentGame }) {
  const credits = "3D Chess Models by Jarlan Perez [CC-BY] via Poly Pizza";

  return (
    <footer className="fixed bottom-0 w-full px-4 py-2 bg-black/60 text-white font-sans text-sm z-10 backdrop-blur-md">
      {/* Desktop layout */}
      <div className="hidden sm:flex justify-between items-center w-full relative">
        <span>© 2025 Siddharth Patil</span>

        <p className="font-bold absolute left-1/2 transform -translate-x-1/2">
          {currentGame}
        </p>

        <div className="flex items-center space-x-4">
          <span className="text-gray-400 text-xs">{credits}</span>
          <span
            onClick={onNext}
            className="font-bold text-sky-400 cursor-pointer hover:underline"
          >
            Next →
          </span>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex flex-col sm:hidden items-center w-full">
        <div className="flex justify-between w-full mb-1">
          <span className="text-sm">© 2025 Siddharth Patil</span>
          <p className="font-bold">{currentGame}</p>
          <span
            onClick={onNext}
            className="font-bold text-sky-400 cursor-pointer hover:underline"
          >
            Next →
          </span>
        </div>
        <span className="text-gray-400 text-xs text-center">{credits}</span>
      </div>
    </footer>
  );
}
