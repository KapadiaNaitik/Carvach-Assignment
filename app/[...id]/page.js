"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Task() {
  const router = useRouter();
  const [task, setTask] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const pathSegments = window.location.pathname.split("/").filter(Boolean);
    if (pathSegments.length > 0) {
      setId(pathSegments[pathSegments.length - 1]);
    }
  }, []);

  useEffect(() => {
    if (id) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      const foundTask = storedTasks.find((t) => t.id === parseInt(id));
      setTask(foundTask);
    }
  }, [id]);

  const handleSave = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = storedTasks.map((t) => (t.id === task.id ? task : t));
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    router.push("/tasks");
  };

  const handleDelete = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = storedTasks.filter((t) => t.id !== task.id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    router.push("/tasks");
  };

  const handleStatusChange = () => {
    setTask({ ...task, completed: !task.completed });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Edit Task
        </h1>
        <div className="mb-4">
          <input
            type="text"
            value={task?.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <div className="flex justify-between mb-6">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            Save
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
          >
            Delete
          </button>
          <button
            onClick={handleStatusChange}
            className={`px-4 py-2 ${
              task?.completed ? "bg-yellow-500" : "bg-green-500"
            } text-white rounded hover:${
              task?.completed ? "bg-yellow-600" : "bg-green-600"
            } transition duration-300`}
          >
            {task?.completed ? "Mark as Pending" : "Mark as Completed"}
          </button>
        </div>
        <div className="text-center">
          <Link
            href="/tasks"
            className="text-blue-500 hover:text-blue-600 transition duration-300"
          >
            Back to Task List
          </Link>
        </div>
      </div>
    </div>
  );
}
