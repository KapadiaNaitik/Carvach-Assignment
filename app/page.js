"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import TaskForm from "./TaskForm";

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
  }, []);

  const addTask = (newTask) => {
    const updatedTasks = [
      ...tasks,
      { ...newTask, id: Date.now(), createdAt: new Date(), completed: false },
    ];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Task Manager
        </h1>
        <TaskForm onAddTask={addTask} />
        <div className="mt-6 text-center">
          <Link
            href="/tasks"
            className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            View Tasks
          </Link>
        </div>
      </div>
    </div>
  );
}
