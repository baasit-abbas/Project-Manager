"use client";
import { API } from "@/app/lib/AuthClient";
import React, { useState } from "react";
import { FcHighPriority } from "react-icons/fc";
import { FcLowPriority } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { MdOutlineDateRange } from "react-icons/md";

const UserCard = (props) => {
  const [priority, setpriority] = useState(props.priority);
  const [title, settitle] = useState(props.title);
  const [description, setdescription] = useState(props.description);
  const [status, setstatus] = useState(props.status);
  const [deadline, setdeadline] = useState(props.deadline);

  const handleStatus = async (name) => {
    setstatus(name)
    const data = await API.patch(`http://localhost:3000/tasks/${props.id}`,{'status':name})
    console.log(data)
  }

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-200 overflow-hidden">
      <div className={`${status==='DONE' ? 'bg-green-500':status==='In Progress'?'bg-yellow-500':'bg-red-500'} text-white px-4 py-3`}>
        <h2 className="text-lg font-semibold tracking-wide">{title}</h2>
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
            <span>{deadline}</span>
          </div>
        </div>

        <div className="flex justify-between gap-2 mt-2">
          <button
            onClick={() => handleStatus("TODO")}
            className="flex-1 py-1.5 text-xs font-medium rounded-lg border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
          >
            TODO
          </button>

          <button
            onClick={() => handleStatus("In Progress")}
            className="flex-1 py-1.5 text-xs font-medium rounded-lg border border-yellow-400 text-yellow-600 hover:bg-yellow-100 transition cursor-pointer"
          >
            In Progress
          </button>

          <button
            onClick={() => handleStatus("DONE")}
            className="flex-1 py-1.5 text-xs font-medium rounded-lg border border-green-400 text-green-600 hover:bg-green-100 transition cursor-pointer"
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
