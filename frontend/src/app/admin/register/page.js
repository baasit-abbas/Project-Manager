"use client";

import {  useState } from "react";
import { toast } from "react-toastify";
import { API } from "@/app/lib/AuthClient";
import ShowPassword from "@/components/ShowPassword";

export default function RegisterPage() {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Confirm, setConfirm] = useState("");
  const [showPass, setshowPass] = useState(false);
  const [showCon, setshowCon] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Confirm !== password) {
      toast.error("Passwords Do not Match");
      return;
    }
    if (password.length < 3) {
      toast.error("Password Must contain atleast three chracters");
      return
    }
    const data = {
      username,
      email,
      password,
    };

    await API.post("http://localhost:3000/auth/register",data);
    setusername('')
    setemail('')
    setpassword('')
    setConfirm('')
    toast.success('User added Successfully')
  };

  return (
    <div className="min-h-screen flex items-center justify-center b p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/30">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          Create User
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Create another user 
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Full Name</label>
            <input
              value={username || ""}
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter your name"
              onChange={(e) => setusername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              value={email}
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter your email"
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              value={password}
              type={showPass ? "text" : "password"}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 pr-10"
              placeholder="Create password"
              onChange={(e) => setpassword(e.target.value)}
              required
            />
            <ShowPassword show={showPass} setshow={setshowPass} />
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-600 mb-1">Confirm Password</label>
            <input
              value={Confirm}
              type={showCon ? "text" : "password"}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 pr-10"
              placeholder="Again Type Your Password"
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            <ShowPassword show={showCon} setshow={setshowCon} />
          </div>

          <button
            type="submit"
            className="w-full bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-lg hover:scale-[1.02] transition duration-200 shadow-lg cursor-pointer"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}
