"use client";

import { useEffect, useState } from "react";
import UserTaskCard from "@/components/UserTaskCard";
import { API } from "@/app/lib/AuthClient";


export default function UsersPage() {
  const [users, setusers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const users = await API.get("http://localhost:3000/user");
      const members = users.filter((user) => user.role !== "admin");
      setusers(members);
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">All Users</h1>
        </div>

        {users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-xl border border-gray-200">

            <h2 className="text-xl font-semibold text-gray-700">
              No Users Found
            </h2>

            <p className="text-gray-500 mt-2">
              Users havn&apos;t registered yet.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {users.map((user) => {
              return (
                <UserTaskCard
                  key={user.id}
                  id={user.id}
                  username={user.username}
                  email={user.email}
                  role={user.role}
                  users={users}
                  setusers={setusers}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
