import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDate } from "@/app/lib/AuthService";

const EditTask = (props) => {
    const [open, setopen] = useState(false)
    const [title, settitle] = useState(props.title);
    const [description, setdescription] = useState(props.description);
    const [priority, setpriority] = useState(props.priority);
    const [status, setstatus] = useState(props.status)
    const [deadline, setdeadline] = useState(props.deadline)

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {title,description,priority,status,deadline: new Date(deadline)}
        props.edit(data)    
        setopen(false)
    }
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger asChild>
        <button className="px-3 py-1 text-sm rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition shadow-sm cursor-pointer">
          Edit
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
              Edit Task
            </h2>

            <div>
              <label className="block text-gray-600 mb-1">Title</label>
              <input
                value={title}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                placeholder="Enter task title"
                onChange={(e) => settitle(e.target.value)}
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
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Priority</label>
              <select
                value={status}
                onChange={(e) => setstatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none cursor-pointer"
              >
                <option>TODO</option>
                <option>In Progress</option>
                <option>DONE</option>
              </select>
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
                value={formatDate(deadline)}
                type="date"
                onChange={(e) => setdeadline(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-linear-to-r from-indigo-500 to-purple-500 text-white font-semibold py-2 rounded-xl hover:scale-[1.02] transition duration-200 shadow-lg cursor-pointer"
            >
              Edit Task
            </button>
          </form>
          <DialogDescription></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditTask;
