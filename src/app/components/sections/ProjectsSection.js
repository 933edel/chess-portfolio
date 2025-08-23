import Image from "next/image";
import QuoteWiseScreenshot from "../../assets/quotewise-home.png";
import CodeRunnerScreenshot from "../../assets/coderunner-home.png";

export default function ProjectsSection() {
  const projects = [
    {
      title: "QuoteWise",
      description:
        "QuoteWise is a full-stack MERN application that helps users save, organize, and revisit their favorite quotes. It includes secure authentication (OTP + JWT), AI-powered quote suggestions (Gemini API), and automated email reminders via cron jobs.",
      githubLink: "https://github.com/933edel/QuoteWise",
      liveLink: "https://quote-wise-orpin.vercel.app",
      features: [
        "OTP + JWT-based authentication",
        "Create, update, delete, and pin quote lists",
        "AI-powered quote generation using Gemini API",
        "Automated daily email reminders (cron job at 10 AM IST)",
        "Light & Dark theme support",
        "Rate limiting for security against DoS attacks",
      ],
      techStack: [
        "React.js",
        "Next.js",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT + OTP verification",
        "Gemini API",
        "Vercel + Render",
      ],
      image: QuoteWiseScreenshot,
    },
    {
      title: "CodeRunner",
      description:
        "Store, edit, and execute your code templates in multiple languages — all in one place. A simple and efficient CRUD-based web app with authentication and code execution support.",
      githubLink: "https://github.com/933edel/CodeRunner",
      liveLink: "https://code-runner-zkom.vercel.app/login",
      features: [
        "Create, edit, delete, and organize code templates",
        "Execute code in multiple languages via Piston API",
        "Secure authentication with JWT",
        "Integrated Monaco Editor for smooth coding experience",
        "Manage templates across multiple languages (C++, Java, Python, JS, Go)",
      ],
      techStack: [
        "React.js",
        "Next.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT",
        "Monaco Editor",
        "Piston API",
        "Vercel",
      ],
      image: CodeRunnerScreenshot,
    },
  ];

  return (
    <div className="flex flex-col h-full space-y-8">
      {projects.map((proj) => (
        <div key={proj.title} className="flex flex-col space-y-4">
          {/* Project header */}
          <h3 className="text-2xl font-bold">{proj.title}</h3>
          <p className="leading-relaxed">{proj.description}</p>

          {/* Screenshot */}
          <div className="w-full h-48 md:h-64 rounded-lg overflow-hidden relative">
            <Image
              src={proj.image}
              alt={`${proj.title} screenshot`}
              fill
              className="object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1">
              {proj.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="font-semibold mb-2">Tech Stack:</h4>
            <div className="flex flex-wrap gap-2">
              {proj.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-indigo-800/50 rounded text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-4 mt-2">
            {proj.githubLink && (
              <a
                href={proj.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-800/70 rounded hover:bg-gray-700/80 transition text-white"
              >
                GitHub
              </a>
            )}
            {proj.liveLink && (
              <a
                href={proj.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-purple-700/70 rounded hover:bg-purple-600 transition text-white"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
