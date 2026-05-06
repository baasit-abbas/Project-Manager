"use client"
import { useEffect, useState } from "react";
import AdminCard from "@/components/AdminCard";
import { API } from "@/app/lib/AuthClient";

export default function TasksPage() {
  const [tasks, settasks] = useState([]);
  const [users, setusers] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const tasks = await API.get("http://localhost:3000/tasks");
      settasks(tasks);
      const users = await API.get('http://localhost:3000/user')
      setusers(users)
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 via-gray-200 to-gray-100 p-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">All Tasks 📋</h1>
            <p className="text-gray-500 mt-1">
              Manage and track all tasks in your system
            </p>
          </div>
        </div>

        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-xl border border-gray-200">
            <div className="text-6xl mb-4">📭</div>

            <h2 className="text-xl font-semibold text-gray-700">
              No Tasks Available
            </h2>

            <p className="text-gray-500 mt-2">
              Start by creating your first task 🚀
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {tasks.map((item) => {
              return (
                <div key={item.id} className="flex flex-col">
                <p className="bg-purple-500 text-white rounded-xl py-2 text-center text-lg font-bold">{item.project.title}</p>
                <AdminCard
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  status={item.status}
                  priority={item.priority}
                  deadline={item.deadline}
                  tasks={tasks}
                  settasks= {settasks}
                  users={users}
                />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
