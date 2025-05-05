'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Website Redesign",
      description: "Complete overhaul of the company website with modern design and improved UX",
      tasks: [
        {
          id: 101,
          title: "Design Homepage",
          description: "Create new homepage layout",
          assignee: "John Doe",
          status: "in-progress",
          dueDate: "2024-04-15",
          createdAt: "2024-03-20T10:00:00Z"
        }
      ],
      createdAt: "2024-03-20T10:00:00Z"
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "Build a new mobile app for iOS and Android platforms",
      tasks: [
        {
          id: 201,
          title: "Setup Development Environment",
          description: "Configure React Native and necessary tools",
          assignee: "Jane Smith",
          status: "completed",
          dueDate: "2024-03-25",
          createdAt: "2024-03-19T10:00:00Z"
        },
        {
          id: 202,
          title: "Design App Screens",
          description: "Create wireframes and mockups",
          assignee: "Mike Johnson",
          status: "pending",
          dueDate: "2024-04-01",
          createdAt: "2024-03-19T11:00:00Z"
        }
      ],
      createdAt: "2024-03-19T10:00:00Z"
    },
    {
      id: 3,
      name: "Marketing Campaign",
      description: "Launch new marketing campaign for Q2",
      tasks: [
        {
          id: 301,
          title: "Create Social Media Content",
          description: "Design posts for Instagram and Twitter",
          assignee: "Sarah Wilson",
          status: "pending",
          dueDate: "2024-04-10",
          createdAt: "2024-03-18T10:00:00Z"
        }
      ],
      createdAt: "2024-03-18T10:00:00Z"
    }
  ]);

  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });

  const handleCreateProject = (e) => {
    e.preventDefault();
    const project = {
      id: Date.now(),
      ...newProject,
      tasks: [],
      createdAt: new Date().toISOString(),
    };
    setProjects([...projects, project]);
    setNewProject({ name: '', description: '' });
    setShowNewProjectForm(false);
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white-900">Project Management</h1>
          <button
            onClick={() => setShowNewProjectForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create New Project
          </button>
        </div>

        {showNewProjectForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gre p-6 rounded-lg w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
              <form onSubmit={handleCreateProject}>
                <div className="mb-4">
                  <label className="block text-black-700 mb-2">Project Name</label>
                  <input
                    type="text"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-black-700 mb-2">Description</label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    rows="3"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowNewProjectForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Create Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              href={`/project/${project.id}`}
              key={project.id}
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-600 mb-2">{project.name}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{project.tasks.length} tasks</span>
                <span>{new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
            </Link>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects yet. Create your first project!</p>
          </div>
        )}
      </div>
    </main>
  );
}
