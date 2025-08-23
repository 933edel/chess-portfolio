import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export default function ContactSection() {
  return (
    <div className="flex flex-col h-full space-y-6">
      <p className="leading-relaxed">
        Feel free to reach out to me via any of the following channels:
      </p>

      <div className="flex items-center space-x-3">
        <FaEnvelope className="text-xl" />
        <a
          href="mailto:2096siddharth@gmail.com"
          className="underline hover:text-purple-400"
        >
          2096siddharth@gmail.com
        </a>
      </div>

      <div className="flex items-center space-x-3">
        <FaPhone className="text-xl" />
        <a href="tel:+917440234761" className="underline hover:text-purple-400">
          +91 7440234761
        </a>
      </div>

      <div className="flex items-center space-x-3">
        <FaGithub className="text-xl" />
        <a
          href="https://github.com/933edel"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-purple-400"
        >
          github.com/933edel
        </a>
      </div>

      <div className="flex items-center space-x-3">
        <SiLeetcode className="text-xl" />
        <a
          href="https://leetcode.com/u/933edel/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-purple-400"
        >
          leetcode.com/u/933edel
        </a>
      </div>

      <div className="flex items-center space-x-3">
        <FaLinkedin className="text-xl" />
        <a
          href="https://www.linkedin.com/in/siddharth-patil-972b60246/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-purple-400"
        >
          linkedin.com/in/siddharth-patil-972b60246
        </a>
      </div>
    </div>
  );
}
