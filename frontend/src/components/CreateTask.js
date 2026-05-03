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

const CreateTask = (props) => {
  const [open, setopen] = useState(false);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [priority, setpriority] = useState("LOW");
  const [deadline, setdeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { title, description, priority, deadline: new Date(deadline) };
    props.addTask(data);
    settitle("");
    setdescription("");
    setpriority("");
    setdeadline("");
    setopen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger asChild>
      <div className="flex justify-end">
      <button className="flex items-center justify-center gap-2 bg-linear-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-all duration-300 cursor-pointer w-full">
            <span className="text-lg">＋</span>
            Create Task
          </button>
      </div>
          
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200 space-y-5"
          >
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              Create Task
            </h2>

            <div>
              <label className="block text-gray-600 mb-1">Title</label>
              <input
                value={title}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                placeholder="Enter task title"
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
                placeholder="Enter task description"
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

export default CreateTask;
