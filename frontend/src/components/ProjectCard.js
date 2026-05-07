import { API } from "@/app/lib/AuthClient";
import React from "react";
import EditProject from "./EditProject";
import { formatDate } from "@/app/lib/AuthService";
import { toast } from "react-toastify";
import Delete from "./Delete";
import { MdOutlineDateRange } from "react-icons/md";
import CreateTask from "./CreateTask";
import { useRouter } from "next/navigation";

const ProjectCard = (props) => {
  const title = props.project.title;
  const description = props.project.description;
  const status = props.project.status;
  const priority = props.project.priority;
  const deadline = props.project.deadline;
  const router = useRouter()

  const handleEdit = async (data) => {
    let res = await API.put(
      `http://localhost:3000/projects/${props.project.id}`,
      data,
    );
    console.log(res)
    const newProject = [...props.projects];
    const idx = newProject.findIndex((item) => item.id === props.project.id);
    newProject[idx] = res;
    props.setprojects(newProject);
    toast.success("Edited Project Successfuly");
  };

  const handleDelete = async () => {
    await API.delete(`http://localhost:3000/projects/${props.project.id}`);
    const projects = props.projects.filter(
      (item) => item.id !== props.project.id,
    );
    props.setprojects(projects);
    toast.success("Project Deleted Successfully");
  };

  const handleAddTask = async (task) => {
    const data = {...task,'project_id':props.project.id}
    await API.post('http://localhost:3000/tasks',data)
    toast.success('Task Created Successfully')
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
            {title}
          </h2>
          <p className="text-gray-500 text-sm mt-1">{description}</p>
        </div>

        <div className="flex gap-2">
          <EditProject
            title={props.project.title}
            description={props.project.description}
            status={props.project.status}
            priority={props.project.priority}
            deadline={deadline}
            edit={handleEdit}
          />
          <Delete delete={handleDelete} />
        </div>
      </div>

     
      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-3 items-center">
      
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full bg-green-100 ${
              status === "DONE"
                ? "text-green-600"
                : status === "In Progress"
                ? "text-yellow-600"
                : "text-red-600"
            } shadow-sm`}
          >
            {status}
          </span>

        
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 ${
              priority === "HIGH"
                ? "text-red-600"
                : priority === "Medium"
                ? "text-yellow-600"
                : "text-green-600"
            } shadow-sm`}
          >
            {priority} Priority
          </span>

        
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full shadow-sm text-gray-600 text-xs">
            <MdOutlineDateRange size={16} />
            <span>{formatDate(deadline)}</span>
          </div>
        </div>


        <button onClick={() => router.push(`/admin/projects/${props.project.id}`)} className="text-sm font-medium text-white transition-all duration-300 hover:bg-blue-400 py-2 px-3 rounded-xl bg-blue-500 cursor-pointer">
          Show Tasks
        </button>
      </div>
      <CreateTask addTask={handleAddTask} />
      
    </div>
  );
};

export default ProjectCard;
