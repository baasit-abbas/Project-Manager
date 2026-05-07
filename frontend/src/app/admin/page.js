"use client";
import { useEffect, useState } from "react";
import { getUser, logOut } from "../lib/AuthService";
import { useRouter } from "next/navigation";
import ProjectCard from "@/components/ProjectCard";
import CreateProject from "@/components/CreateProject";
import { API } from "../lib/AuthClient";


export default function AdminPage() {
  const router = useRouter();
  const [projects, setprojects] = useState([]);
  const [user, setuser] = useState("");
  

  useEffect(() => {
    const loadData = async () => {
      const user = getUser();
      setuser(user);
      const projects = await API.get("http://localhost:3000/projects");
      if (projects.message){
        setprojects([])
        return
      }
      setprojects(projects);
    };

    loadData();
  }, []);

  const handleAdd = async (data) => {
    const new_project = await API.post("http://localhost:3000/projects", data);
    setprojects((prev) => [...prev, new_project]);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 p-6 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, <span className="text-indigo-600">{user.username}</span>
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your projects and tasks efficiently
          </p>
          <button
            onClick={() => logOut(router)}
            className="py-2 px-3 rounded-xl bg-red-500 hover:bg-red-400 transition-all duration-300 cursor-pointer text-white"
          >
            LogOut
          </button>
        </div>
        <div>
          <CreateProject add={handleAdd} />
        </div>

        {projects.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center bg-white/70 backdrop-blur mb-8">
            <h2 className="text-xl font-semibold text-gray-700">
              No Projects Found
            </h2>
            <p className="text-gray-500 mt-2 text-center">
              You haven’t created any projects yet. Start by creating one
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((item) => (
              <ProjectCard
                key={item.id}
                project={item}
                projects={projects}
                setprojects={setprojects}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
