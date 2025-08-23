import {
  FaJava,
  FaNodeJs,
  FaReact,
  FaGitAlt,
  FaLinkedin,
  FaGithub,
  FaDatabase,
} from "react-icons/fa";
import {
  SiCplusplus,
  SiSpringboot,
  SiNextdotjs,
  SiMongodb,
  SiMysql,
  SiLeetcode,
} from "react-icons/si";

export default function AboutSection() {
  return (
    <div className="flex flex-col h-full">
      <p className="mb-4 leading-relaxed">
        I am a results-driven software engineer with hands-on experience in
        building scalable, secure, and user-focused applications. I enjoy
        problem solving, designing efficient solutions, and turning ideas into
        reliable products.
      </p>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Core Strengths</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Backend development with Java and Node.js</li>
          <li>
            Frontend development using React.js, HTML, and CSS with emphasis on
            responsive design
          </li>
          <li>
            Building and integrating RESTful APIs with authentication & error
            handling
          </li>
          <li>
            Strong foundation in Data Structures, debugging, and Agile teamwork
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Technical Skills</h3>
        <div className="grid grid-cols-3 gap-4 text-3xl">
          <div className="flex flex-col items-center">
            <SiCplusplus title="C++" />
            <span className="mt-2 text-sm">C++</span>
          </div>
          <div className="flex flex-col items-center">
            <FaJava title="Java" />
            <span className="mt-2 text-sm">Java</span>
          </div>
          <div className="flex flex-col items-center">
            <FaNodeJs title="Node.js" />
            <span className="mt-2 text-sm">Node.js</span>
          </div>
          <div className="flex flex-col items-center">
            <SiSpringboot title="Spring Boot" />
            <span className="mt-2 text-sm">Spring Boot</span>
          </div>
          <div className="flex flex-col items-center">
            <FaReact title="React.js" />
            <span className="mt-2 text-sm">React.js</span>
          </div>
          <div className="flex flex-col items-center">
            <SiNextdotjs title="Next.js" />
            <span className="mt-2 text-sm">Next.js</span>
          </div>
          <div className="flex flex-col items-center">
            <FaDatabase title="Databases" />
            <span className="mt-2 text-sm">Databases</span>
          </div>
          <div className="flex flex-col items-center">
            <SiMysql title="MySQL" />
            <span className="mt-2 text-sm">MySQL</span>
          </div>
          <div className="flex flex-col items-center">
            <SiMongodb title="MongoDB" />
            <span className="mt-2 text-sm">MongoDB</span>
          </div>
          <div className="flex flex-col items-center">
            <FaGitAlt title="Git" />
            <span className="mt-2 text-sm">Git</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Education</h3>
        <p>
          B.Tech in Electronics & Communication Engineering <br />
          <span className="font-medium">
            National Institute of Technology Raipur
          </span>{" "}
          | CGPA: 7.61/10
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Profiles</h3>
        <ul className="space-y-1">
          <li className="flex items-center">
            <span className="mr-2 text-2xl">•</span>
            <a
              href="https://www.linkedin.com/in/siddharth-patil-972b60246/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <FaLinkedin className="mr-2" />
              <span>LinkedIn</span>
            </a>
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-2xl">•</span>
            <a
              href="https://github.com/933edel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <FaGithub className="mr-2" />
              <span>GitHub</span>
            </a>
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-2xl">•</span>
            <a
              href="https://leetcode.com/u/933edel/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <SiLeetcode className="mr-2" />
              <span>LeetCode</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
