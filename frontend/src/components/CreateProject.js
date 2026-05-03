"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CreateProject = (props) => {
  const [open, setopen] = useState(false);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [priority, setpriority] = useState("LOW");
  const [deadline, setdeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { title, description, priority, deadline: new Date(deadline) };
    props.add(data);
    settitle("");
    setdescription("");
    setpriority("");
    setdeadline("");
    setopen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger asChild>
        <button className="px-4 py-3 rounded-xl bg-purple-500 hover:bg-purple-400 transition-all duration-300 cursor-pointer text-white mb-4">
          Create Project
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200 space-y-5"
          >
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              Create Project
            </h2>

            <div>
              <label className="block text-gray-600 mb-1">Title</label>
              <input
                value={title}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                placeholder="Enter project title"
                onChange={(e) => settitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Description</label>
              <textarea
                value={description}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                rows="3"
                placeholder="Enter project description"
                onChange={(e) => setdescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setpriority(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none cursor-pointer"
              >
                <option>LOW</option>
                <option>MEDIUM</option>
                <option>HIGH</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Deadline</label>
              <input
                value={deadline}
                type="date"
                onChange={(e) => setdeadline(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none cursor-pointer"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-linear-to-r from-indigo-500 to-purple-500 text-white font-semibold py-2 rounded-xl hover:scale-[1.02] transition duration-200 shadow-lg cursor-pointer"
            >
              Create Task
            </button>
          </form>
          <DialogDescription></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProject;
