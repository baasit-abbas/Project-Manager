import React, { useEffect, useState } from "react";
import { FaRobot } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { RiRobot2Fill } from "react-icons/ri";
import Loader from "./Loader";
import { API } from "@/app/lib/AuthClient";
import ReactMarkdown from "react-markdown";

const Chatbot = () => {
  const [showAI, setshowAI] = useState(false);
  const [UserandBot, setUserandBot] = useState([]);
  const [question, setquestion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tasks = await API.get("http://localhost:3000/tasks");
    const chat = { user: question, bot: null };
    const que = question;
    setquestion("");
    setUserandBot((prev) => [chat, ...prev]);
    const data = await API.post("http://127.0.0.1:5000/ask", {
      query: que,
      task_info: tasks,
    });
    const answer = data.res;
    setUserandBot((prev) => {
      const updated = [...prev];
      updated[0] = { ...updated[0], bot: answer };
      return updated;
    });
    setquestion(null);
  };

  return (
    <div>
      {showAI ? (
        <div className="fixed top-0 bottom-0 right-0 w-90 z-50 flex flex-col bg-linear-to-b from-gray-900 to-gray-800 text-gray-200 shadow-2xl border-l border-gray-700">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-gray-900/80 backdrop-blur-md">
            <h2 className="text-lg font-semibold tracking-wide flex items-center gap-2">
              <RiRobot2Fill size={25} className="text-red-500" /> AI Assistant
            </h2>

            <MdCancel
              onClick={() => setshowAI(false)}
              className="cursor-pointer hover:scale-110 transition text-gray-300 hover:text-red-400"
              size={22}
            />
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-4">
            {UserandBot.map((item, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex justify-end">
                  <p className="bg-linear-to-r from-indigo-500 to-purple-500 text-white rounded-2xl px-4 py-2 max-w-[70%] text-sm shadow-md">
                    {item.user}
                  </p>
                </div>

                <div className="bg-gray-700 text-gray-200 rounded-xl p-3 max-w-[80%] text-sm shadow">
                  {item.bot ? (
                    <div className="prose prose-invert max-w-none">
                      <ReactMarkdown
                        components={{
                          h1: ({ node, ...props }) => (
                            <h1 className="text-xl font-bold mb-2" {...props} />
                          ),
                          h2: ({ node, ...props }) => (
                            <h2
                              className="text-lg font-semibold mb-2"
                              {...props}
                            />
                          ),
                          p: ({ node, ...props }) => (
                            <p className="mb-2 leading-relaxed" {...props} />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul className="list-disc ml-5 mb-2" {...props} />
                          ),
                          li: ({ node, ...props }) => (
                            <li className="mb-1" {...props} />
                          ),
                        }}
                      >
                        {item.bot}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <Loader />
                  )}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-gray-700 bg-gray-900"
          >
            <div className="flex items-center gap-2 bg-gray-800 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
              <input
                value={question || ""}
                className="bg-transparent w-full outline-none text-sm placeholder-gray-400"
                type="text"
                placeholder="Ask anything..."
                onChange={(e) => setquestion(e.target.value)}
              />

              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 transition px-3 py-1 rounded-lg text-sm cursor-pointer"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setshowAI(true)}
          className="fixed top-2 right-4 bg-linear-to-r from-indigo-500 to-purple-500 p-3 rounded-full shadow-lg hover:scale-110 transition duration-300 cursor-pointer z-50"
        >
          <FaRobot className="text-white" size={22} />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
