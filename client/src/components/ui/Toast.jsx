import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const Toast = ({ id, message, type = "info", onClose, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);

  // Fade in/out
  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), duration - 300);
    const removeTimer = setTimeout(() => onClose(id), duration);
    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [id, duration, onClose]);

  // Determine border and text colors based on type
  const borderColor =
    type === "success"
      ? "border-l-4 border-green-500 bg-green-100"
      : type === "error"
      ? "border-l-4 border-red-500 bg-red-100"
      : "border-l-4 border-blue-500";

  const textColor =
    type === "success"
      ? "text-green-700"
      : type === "error"
      ? "text-red-600"
      : "text-blue-600";

  return (
    <div
      className={`
        transform transition-all duration-300
        ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
        flex items-center justify-between w-80 max-w-xs px-4 py-3 mb-2 rounded shadow-lg  ${borderColor} ${textColor}
      `}
    >
      <span className="text-sm">{message}</span>
      <button
        onClick={() => setVisible(false) || onClose(id)}
        className="ml-3 focus:outline-none"
      >
        <XMarkIcon className="w-5 h-5 hover:text-gray-400 transition" />
      </button>
    </div>
  );
};

export default Toast;
