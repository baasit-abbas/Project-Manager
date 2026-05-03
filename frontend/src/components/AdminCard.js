"use client";
import { API } from "@/app/lib/AuthClient";
import { formatDate } from "@/app/lib/AuthService";
import React, { useState } from "react";
import { FcHighPriority } from "react-icons/fc";
import { FcLowPriority } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { MdOutlineDateRange } from "react-icons/md";
import EditTask from "./EditTask";
import { toast } from "react-toastify";
import Delete from "./Delete";
import AssignTask from "./AssignTask";
import { useRouter } from "next/navigation";
import { IoManSharp } from "react-icons/io5";

const AdminCard = (props) => {
  const priority = props.priority;
  const title= props.title
  const description = props.description
  const status = props.status;
  const deadline = props.deadline;
  const router = useRouter()

  const handleEdit = async (data) => {
    const res = await API.put(`http://localhost:3000/tasks/${props.id}`, data);
    const newTasks = [...props.tasks];
    const idx = newTasks.findIndex(item => item.id === props.id)
    newTasks[idx] = res
    props.settasks(newTasks)
    toast.success("Updated Task Successfully");
  };

  const handleDelete = async () => {
    await API.delete(`http://localhost:3000/tasks/${props.id}`)
    const newTasks = props.tasks.filter(item => item.id !== props.id)
    props.settasks(newTasks)
    toast.success('Deleted Task Successfully')
  }

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-200 overflow-hidden">
      <div
        className={`${
          status === "DONE"
            ? "bg-green-500"
            : status === "In Progress"
            ? "bg-yellow-500"
            : "bg-red-500"
        } text-white px-4 py-3 flex justify-between items-center`}
      >
        <h2 className="text-lg font-semibold tracking-wide">{title}</h2>

        <div className="flex gap-2">
          <EditTask
            edit={handleEdit}
            title={title}
            description={description}
            deadline={deadline}
            status={status}
            priority={priority}
          />

          <Delete delete={handleDelete} />
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4">
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full shadow-sm">
            {priority === "LOW" && <FcLowPriority size={20} />}
            {priority === "MEDIUM" && <FcMediumPriority size={20} />}
            {priority === "HIGH" && <FcHighPriority size={20} />}

            <span className="text-xs font-semibold text-gray-700">
              {priority}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <MdOutlineDateRange size={18} />
            <span>{formatDate(deadline)}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <button onClick={() => router.push(`../../admin/member/${props.id}`)} className="w-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition py-2 rounded-xl text-sm font-medium cursor-pointer flex items-center justify-center gap-3">
            <IoManSharp size={20} /> Show Assigned Users
          </button>

          <AssignTask id={props.id} users={props.users} />
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
