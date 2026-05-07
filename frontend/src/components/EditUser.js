import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const EditUser = (props) => {
  const [open, setopen] = useState(false);
  const [username, setusername] = useState(props.username)
  const [email, setemail] = useState(props.email)
  const [role, setrole] = useState(props.role)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {username,email,role}
    props.edit(data)
    setopen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger asChild>
        <button className="text-xs px-2 py-1 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all duration-300 cursor-pointer">
          Edit
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200 space-y-5">
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              User Details 👤
            </h2>
            <div>
              <label className="block text-gray-600 mb-1">Username</label>
              <input
                value={username}
                type="text"
                placeholder="Enter username"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                onChange={(e) => setusername(e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                value={email}
                type="email"
                placeholder="Enter email"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                onChange={(e) => setemail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Role</label>
              <select value={role} onChange={(e) => setrole(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-linear-to-r from-indigo-500 to-purple-500 text-white font-semibold py-2 rounded-xl hover:scale-[1.02] transition duration-200 shadow-lg"
            >
              Save User
            </button>
          </form>
          <DialogDescription></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditUser;
