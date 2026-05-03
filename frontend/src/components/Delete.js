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

const Delete = (props) => {
  const [open, setopen] = useState(false);

  const handleDelete = () => {
    props.delete();
    setopen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger asChild>
        <button className="px-3 py-1 text-sm rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition shadow-sm cursor-pointer">
          Delete
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          
          <DialogDescription>Do you really want to delete this? You won’t be able to recover it
            later.</DialogDescription>
        </DialogHeader>
        <button
            onClick={handleDelete}
            className="px-3 py-2 rounded-xl bg-red-500 hover:bg-red-400 transition-all duration-300 cursor-pointer text-white"
          >
            Delete
          </button>
          <button onClick={() => setopen(false)} className="bg-blue-500 text-white hover:bg-blue-400 transition-all duration-300 cursor-pointer rounded-xl py-2 ">Cancel</button>
      </DialogContent>
    </Dialog>
  );
};

export default Delete;
