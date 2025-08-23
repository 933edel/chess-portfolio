import { motion, AnimatePresence } from "framer-motion";

import AboutSection from "./sections/AboutSection";
import ProjectsSection from "./sections/ProjectsSection";
import ResumeSection from "./sections/ResumeSection";
import ContactSection from "./sections/ContactSection";

export default function Modal({
  activeSection,
  setActiveSection,
  theme = "dark",
}) {
  const sections = {
    about: <AboutSection />,
    projects: <ProjectsSection />,
    resume: <ResumeSection />,
    contact: <ContactSection />,
  };

  const isDark = theme === "dark";
  const bgGradient = isDark
    ? "bg-gradient-to-br from-black via-slate-950 to-indigo-950"
    : "bg-gradient-to-br from-white via-gray-100 to-gray-200";
  const textColor = isDark ? "text-slate-200" : "text-gray-900";
  const headerBg = isDark ? "bg-black" : "bg-white";
  const headerText = isDark ? "text-purple-200" : "text-indigo-900";
  const closeBtnBg = isDark
    ? "bg-purple-800/60 hover:bg-purple-700/70"
    : "bg-indigo-200/60 hover:bg-indigo-300/70";
  const closeBtnText = isDark ? "text-purple-200" : "text-indigo-900";
  const sectionText = isDark ? "text-gray-200" : "text-gray-900";
  const borderColor = isDark ? "border-blue-900/40" : "border-indigo-300/40";
  const headerBorder = isDark ? "border-purple-900/30" : "border-indigo-300/30";

  return (
    <AnimatePresence>
      {activeSection && (
        <motion.div
          className={`absolute top-0 right-0 w-full min-h-full sm:w-1/3 max-h-screen
                     ${bgGradient} ${textColor} border ${borderColor} z-20 flex flex-col rounded-l-2xl`}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          {/* Sticky header */}
          <div
            className={`sticky top-0 flex justify-between items-center
                       ${headerBg} px-6 py-4 z-30 rounded-tl-2xl border-b ${headerBorder}`}
          >
            <h2
              className={`text-xl sm:text-2xl font-bold capitalize ${headerText} drop-shadow`}
            >
              {activeSection}
            </h2>
            <button
              className={`px-3 py-1 ${closeBtnBg} ${closeBtnText} rounded-lg transition`}
              onClick={() => setActiveSection(null)}
            >
              ✕
            </button>
          </div>

          {/* Scrollable section content */}
          <div
            className={`flex-1 min-h-full overflow-y-auto px-6 py-6 ${sectionText}`}
          >
            {sections[activeSection] || (
              <p className={isDark ? "text-gray-400" : "text-gray-700"}>
                Coming soon...
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
