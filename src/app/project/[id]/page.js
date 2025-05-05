'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProjectDetail() {
  const [project, setProject] = useState({
    id: 1,
    name: "Website Redesign",
    description: "Complete overhaul of the company website with modern design and improved UX",
    tasks: [
      {
        id: 101,
        title: "Design Homepage",
        description: "Create new homepage layout with modern UI elements",
        assignee: "John Doe",
        status: "in-progress",
        dueDate: "2024-04-15",
        createdAt: "2024-03-20T10:00:00Z"
      },
      {
        id: 102,
        title: "Implement Navigation",
        description: "Build responsive navigation menu with dropdowns",
        assignee: "Alice Brown",
        status: "pending",
        dueDate: "2024-04-20",
        createdAt: "2024-03-20T11:00:00Z"
      },
      {
        id: 103,
        title: "Mobile Responsiveness",
        description: "Ensure website works perfectly on all devices",
        assignee: "Mike Wilson",
        status: "pending",
        dueDate: "2024-04-25",
        createdAt: "2024-03-20T12:00:00Z"
      }
    ],
    createdAt: "2024-03-20T10:00:00Z"
  });

  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignee: '',
    dueDate: '',
  });

  const handleCreateTask = (e) => {
    e.preventDefault();
    const task = {
      id: Date.now(),
      ...newTask,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setProject({
      ...project,
      tasks: [...project.tasks, task],
    });

    setNewTask({
      title: '',
      description: '',
      assignee: '',
      dueDate: '',
    });
    setShowNewTaskForm(false);
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back to Projects
          </Link>
          <h1 className="text-3xl font-bold text-white-900">{project.name}</h1>
        </div>

        <div className="mb-8">
          <p className="text-gray-600">{project.description}</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Tasks</h2>
          <button
            onClick={() => setShowNewTaskForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add New Task
          </button>
        </div>

        {showNewTaskForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
              <form onSubmit={handleCreateTask}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Task Title</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    rows="3"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Assignee</label>
                  <input
                    type="text"
                    value={newTask.assignee}
                    onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowNewTaskForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid gap-4">
          {project.tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-600">{task.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  task.status === 'completed' ? 'bg-green-100 text-green-800' :
                  task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {task.status}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{task.description}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Assigned to: {task.assignee}</span>
                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))}

          {project.tasks.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-500">No tasks yet. Add your first task!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 