"use client";
import React, { useState } from "react";
import EditUser from "./EditUser";
import { toast } from "react-toastify";
import { API } from "@/app/lib/AuthClient";
import Delete  from '../components/Delete';
import { useRouter } from "next/navigation";
import { LuClipboardPen } from "react-icons/lu";

const UserTaskCard = (props) => {
  const username = props.username;
  const email = props.email;
  const router = useRouter()

  const handleEdit = async (data) => {
    const user = await API.patch(`http://localhost:3000/user/${props.id}`,data)
    const newUsers = [...props.users]
    const idx = newUsers.findIndex(item => item.id == props.id)
    newUsers[idx] = user
    props.setusers(newUsers)
    toast.success('User Updated Successfully')
  }

  const handleDelete = async () => {
    const user = await API.delete(`http://localhost:3000/user/${props.id}`)
    const newUsers = props.users.filter(item => item.id !== props.id)
    props.setusers(newUsers)
    toast.success('User Deleted Successfully')
  }

  return (
    <div className="bg-gray-50 border rounded-2xl p-4 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{username}</h3>
          <p className="text-sm text-gray-500">{email}</p>
        </div>

        <div className="flex gap-2">
          <EditUser
            username={username}
            email={email}
            role={props.role}
            edit={handleEdit}
          />

          <Delete delete={handleDelete} />
        </div>
      </div>

      <button onClick={() => router.push(`../../admin/tasks/${props.id}`)} className="w-full mt-3 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition py-2 rounded-xl text-sm font-medium cursor-pointer flex items-center justify-center gap-3">
        <LuClipboardPen size={20} className="text-black" /> Show User Tasks
      </button>
    </div>
  );
};

export default UserTaskCard;
