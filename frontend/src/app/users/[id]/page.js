"use client";

import { API } from "@/app/lib/AuthClient";
import { formatDate, getUser, IsLoggedIn, logOut } from "@/app/lib/AuthService";
import UserCard from "@/components/UserCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserDashboard({ params }) {
  const [User, setUser] = useState("");
  const [Tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      if (!IsLoggedIn()) {
        router.push("/login");
        return;
      }
      const { id } = await params;
      const user = getUser();
      if (user.role === "user" && user.id !== Number(id)) {
        router.push(`${user.id}`);
        return;
      }
      if (user.role === "admin") {
        router.push("/admin");
      }

      setUser(user);
      const data = await API.get(`http://localhost:3000/user/${id}`);
      
      const tasks = data.tasks.map(item => item.task)
      setTasks(tasks);
    };

    loadData();
  }, []);

  const handleLogout = () => {
    logOut(router);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Hello, <span className="text-purple-600">{User.username}</span> 👋
            </h1>
            <p className="text-gray-500">
              Welcome back! Here&apos;s what&apos;s happening today.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-linear-to-r from-red-500 to-pink-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-pink-700 transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <span>🚪</span>
            <span>Log Out</span>
          </button>
        </div>

        {Tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
            <div className="text-6xl mb-4">📭</div>

            <h2 className="text-xl font-semibold text-gray-700">
              No Tasks Assigned
            </h2>

            <p className="text-gray-500 mt-2 text-center">
              You currently don’t have any tasks assigned. Sit back and relax or
              wait for your admin to assign one 😉
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Tasks.map((item) => {
              console.log(item);
              return (
                <UserCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  status={item.status}
                  priority={item.priority}
                  deadline={formatDate(item.deadline)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
