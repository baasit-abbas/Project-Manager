import React from "react";

const Loader = () => {
  return (
      <div className="bg-gray-700 text-gray-200 rounded-2xl px-4 py-3 shadow flex items-center gap-2 w-fit">
        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
      </div>
  );
};

export default Loader;
