"use client";

import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Header({ setActiveSection, theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSectionClick = (section) => {
    setActiveSection(section);
    setMenuOpen(false); // Close menu after a section is selected
  };

  return (
    <header
      className={`fixed top-0 w-full p-4 flex justify-between items-center
        ${
          theme === "dark"
            ? "bg-black/50 text-white"
            : "bg-white/60 text-gray-900"
        }
        backdrop-blur-md z-20 transition-colors duration-300`}
    >
      <h1 className="font-bold text-lg sm:text-xl">
        Siddharth&apos;s Portfolio
      </h1>

      <div className="flex items-center space-x-4 md:space-x-6">
        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-4">
          <button onClick={() => handleSectionClick("about")}>About</button>
          <button onClick={() => handleSectionClick("projects")}>
            Projects
          </button>
          <button onClick={() => handleSectionClick("resume")}>Resume</button>
          <button onClick={() => handleSectionClick("contact")}>Contact</button>
        </nav>

        {/* Theme toggle (desktop only) */}
        <button
          onClick={toggleTheme}
          className={`hidden md:block p-2 rounded-full transition-colors duration-300
            ${
              theme === "dark"
                ? "bg-white/20 text-yellow-300 hover:bg-white/30"
                : "bg-gray-800/20 text-yellow-400 hover:bg-gray-800/30"
            }`}
          title="Toggle light/dark mode"
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>

        {/* Hamburger (mobile only) */}
        <div className="relative z-50 md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl transition-transform duration-300 transform"
          >
            {menuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu (slide-in) */}
      {menuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-10 md:hidden"
            onClick={() => setMenuOpen(false)}
          />

          <nav
            className={`fixed top-0 right-0 h-full w-64 p-6 flex flex-col space-y-6 md:hidden transform transition-transform duration-300 ease-in-out
              ${menuOpen ? "translate-x-0" : "translate-x-full"}
              ${
                theme === "dark"
                  ? "bg-black/50 text-white"
                  : "bg-white/60 text-gray-900"
              }
              backdrop-blur-md z-20 shadow-lg`}
          >
            <button
              className="text-xl"
              onClick={() => handleSectionClick("about")}
            >
              About
            </button>
            <button
              className="text-xl"
              onClick={() => handleSectionClick("projects")}
            >
              Projects
            </button>
            <button
              className="text-xl"
              onClick={() => handleSectionClick("resume")}
            >
              Resume
            </button>
            <button
              className="text-xl"
              onClick={() => handleSectionClick("contact")}
            >
              Contact
            </button>

            <div className="pt-4 border-t flex justify-center mt-auto">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors duration-300
                  ${
                    theme === "dark"
                      ? "bg-white/20 text-yellow-300 hover:bg-white/30"
                      : "bg-gray-800/20 text-yellow-400 hover:bg-gray-800/30"
                  }`}
                title="Toggle light/dark mode"
              >
                {theme === "dark" ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
