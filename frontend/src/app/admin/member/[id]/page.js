"use client";
import { API } from "@/app/lib/AuthClient";
import UserTaskCard from "@/components/UserTaskCard";
import { useEffect, useState } from "react";

export default function TaskUsersPage({ params }) {
  const [users, setusers] = useState([]);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const { id } = await params;
      const task = await API.get(`http://localhost:3000/tasks/${id}`);
      const users = task.assigned_to.map(item => item.user)
      setusers(users);
      settitle(task.title);
      setdescription(task.description);
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-500 mt-2">{description}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Assigned Users 
          </h2>

          {users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
              <div className="text-6xl mb-4">👤</div>

              <h3 className="text-xl font-semibold text-gray-700">
                No Users Assigned
              </h3>

              <p className="text-gray-500 mt-2 text-center">
                This task has no assigned users yet.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {users.map((item) => {
                return (
                  <UserTaskCard
                    key={item.id}
                    id={item.id}
                    username={item.username}
                    email={item.email}
                    role={item.role}
                    users={users}
                    setusers={setusers}
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
