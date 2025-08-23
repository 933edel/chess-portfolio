import { FaSun, FaMoon } from "react-icons/fa";

export default function Header({ setActiveSection, theme, toggleTheme }) {
  return (
    <header
      className={`absolute top-0 w-full p-4 flex justify-between items-center
                  ${
                    theme === "dark"
                      ? "bg-black/50 text-white"
                      : "bg-white/60 text-gray-900"
                  }
                  backdrop-blur-md z-10 transition-colors duration-300`}
    >
      <h1 className="font-bold text-lg sm:text-xl">
        Siddharth&apos;s Portfolio
      </h1>

      <div className="flex items-center space-x-6">
        <nav className="space-x-4">
          <button onClick={() => setActiveSection("about")}>About</button>
          <button onClick={() => setActiveSection("projects")}>Projects</button>
          <button onClick={() => setActiveSection("resume")}>Resume</button>
          <button onClick={() => setActiveSection("contact")}>Contact</button>
        </nav>

        {/* Theme toggle button */}
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
    </header>
  );
}
