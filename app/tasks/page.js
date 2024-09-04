"use client";

import { useState, useEffect } from "react";
import SearchBar from "../SearchBar";
import TaskList from "../TaskList";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
  }, []);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "completed") {
      return a.completed === b.completed ? 0 : a.completed ? -1 : 1;
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Task List
        </h1>
        <div className="mb-6">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <select
            className="mt-4 w-full p-2 border rounded text-black"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="createdAt">Sort by Date</option>
            <option value="completed">Sort by Completion</option>
          </select>
        </div>
        <TaskList tasks={sortedTasks} />
      </div>
    </div>
  );
}
