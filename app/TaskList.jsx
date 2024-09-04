import Link from "next/link";

const TaskList = ({ tasks }) => {
  return (
    <div className="relative">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`shadow-md rounded-lg p-4 transition-all duration-300 hover:shadow-lg border border-gray-200 ${
              task.completed ? "bg-green-100" : "bg-yellow-100"
            }`}
          >
            <div className="flex flex-col h-full">
              <h3 className="text-lg font-semibold text-black mb-2">
                {task.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Status: {task.completed ? "Completed" : "Pending"}
              </p>
              <div className="mt-auto">
                <Link
                  href={`/${task.id}`}
                  className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                >
                  Modify
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-8">
        <Link
          href="/"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default TaskList;
