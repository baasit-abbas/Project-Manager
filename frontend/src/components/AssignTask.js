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
import { toast } from "react-toastify";
import { API } from "@/app/lib/AuthClient";
import { FaPlus } from "react-icons/fa";

const AssignTask = (props) => {
  const [open, setopen] = useState(false);
  const allUsers = props.users;
  const users = allUsers.filter(user => user.role !== 'admin')
  const [selected, setselected] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selected === "Select") {
      toast.error("Select User");
      return;
    }
    const userSelected = users.filter((item) => item.email === selected);
    const id = userSelected[0].id;
    const data = await API.post("http://localhost:3000/tasks/assign", {
      userId: Number(id),
      taskId: Number(props.id),
    });
    if (data.message){
        toast.error('You already assigned same task to this user')
        return
    }
    toast.success('Assigned Task Successfully')
    setopen(false)
  };

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger asChild>
        <button className="w-full bg-green-100 text-green-700 hover:bg-green-200 transition py-2 rounded-xl text-sm font-medium cursor-pointer flex items-center justify-center gap-3">
          <FaPlus size={20} className="text-purple-500" /> Assign Task
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign This Task</DialogTitle>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-600 mb-1">Select User:</label>
              <select
                value={selected}
                onChange={(e) => setselected(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none cursor-pointer"
                required
              >
                <option>Select</option>
                {users.map((user) => {
                  return <option key={user.id}>{user.email}</option>;
                })}
              </select>
            </div>
            <button className="bg-green-500 hover:bg-green-400 text-white py-2 px-3 w-full rounded-xl cursor-pointer">
              Assign
            </button>
          </form>
          <DialogDescription></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AssignTask;
