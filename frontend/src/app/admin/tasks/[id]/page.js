"use client";

import { API } from "@/app/lib/AuthClient";
import { getUser, IsLoggedIn } from "@/app/lib/AuthService";
import AdminCard from "@/components/AdminCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserTasksPage({ params }) {
  const [usernname, setusernname] = useState("");
  const [email, setemail] = useState("");
  const [tasks, settasks] = useState([]);
  const [users, setusers] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const { id } = await params;
      const UserData = await API.get(`http://localhost:3000/user/${id}`);
      setusernname(UserData.username);
      setemail(UserData.email);
      const tasks = UserData.tasks.map(item => item.task)
      settasks(tasks);
      const users = await API.get('http://localhost:3000/user')
      setusers(users)
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{usernname} 👤</h1>

          <p className="text-gray-500 mt-2">{email}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            User Tasks 📋
          </h2>

          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
              <div className="text-6xl mb-4">📭</div>

              <h3 className="text-xl font-semibold text-gray-700">
                No Tasks Assigned
              </h3>

              <p className="text-gray-500 mt-2 text-center">
                This user has no assigned tasks yet.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {tasks.map((item) => {
                return (
                  <AdminCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    deadline={item.deadline}
                    status={item.status}
                    priority={item.priority}
                    tasks={tasks}
                    settasks={settasks}
                    users={users}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
