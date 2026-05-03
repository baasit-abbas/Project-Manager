"use client";

import { API } from "@/app/lib/AuthClient";
import { getUser, IsLoggedIn } from "@/app/lib/AuthService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CreateTask from "@/components/CreateTask";
import { toast } from "react-toastify";
import AdminCard from "@/components/AdminCard";

export default function ProjectPage({ params }) {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [tasks, settasks] = useState([]);
  const [id, setid] = useState(null)
  const [users, setusers] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const { id } = await params;
      setid(id)
      const project = await API.get(`http://localhost:3000/projects/${id}`);
      settitle(project.title);
      setdescription(project.description);
      settasks(project.tasks);
      const users= await API.get('http://localhost:3000/user')
      setusers(users)
    };

    loadData();
  }, []);

  const handleAddTask = async (task) => {
      const data = {...task,'project_id':Number(id)}
      const newTask = await API.post('http://localhost:3000/tasks',data)
      console.log(newTask)
      toast.success('Task Created Successfully')
      settasks(prev => [...prev,newTask])
    }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 mb-6 flex flex-col gap-3">
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>

          <p className="text-gray-500 mt-2">{description}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Tasks 📋</h2>

          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
              <div className="text-6xl mb-4">🗂️</div>

              <h3 className="text-xl font-semibold text-gray-700">
                No Tasks for this Project
              </h3>
              <CreateTask addTask={handleAddTask} />

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
