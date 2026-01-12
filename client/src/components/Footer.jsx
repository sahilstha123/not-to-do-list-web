import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = ({ darkMode }) => {
  const textColor = darkMode ? "text-gray-300" : "text-gray-700";
  const bgColor = darkMode ? "bg-gray-900 border-gray-700" : "bg-gray-100 border-gray-300";

  return (
    <footer
      className={`w-full mt-auto py-6 border-t ${bgColor} shadow-inner relative flex flex-col md:flex-row items-center justify-center px-6 transition-colors duration-300`}
    >
      {/* Social Links (Right on desktop, top on mobile) */}
      <div className="flex gap-4 text-xl justify-center md:absolute md:right-6 top-4 md:top-auto">
        <a
          href="https://github.com/sahilstha123/not-to-do-list-web"
          target="_blank"
          rel="noopener noreferrer"
          className={`hover:text-blue-500 transition-transform transform hover:scale-110 ${textColor}`}
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com/in/sahilstha123"
          target="_blank"
          rel="noopener noreferrer"
          className={`hover:text-blue-600 transition-transform transform hover:scale-110 ${textColor}`}
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://twitter.com/sahilstha123"
          target="_blank"
          rel="noopener noreferrer"
          className={`hover:text-blue-400 transition-transform transform hover:scale-110 ${textColor}`}
          aria-label="Twitter"
        >
          <FaTwitter />
        </a>
      </div>

      {/* Centered Copyright */}
      <div className={`text-center ${textColor}`}>
        <p className="text-sm font-medium">
          &copy; {new Date().getFullYear()} Not-To-Do List
        </p>
        <p className="text-xs mt-1">
          Built by <span className="text-red-500">❤️</span> Sahil Shrestha
        </p>
      </div>
    </footer>
  );
};

export default Footer;
