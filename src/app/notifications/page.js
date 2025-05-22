'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Notifications() {
  const [notifications, setNotifications] = useState({
    nearingDeadline: [],
    overdue: []
  });

  useEffect(() => {
    const fetchNotifications = () => {
      const projects = JSON.parse(localStorage.getItem('projects') || '[]');
      const today = new Date();
      const threeDaysFromNow = new Date(today);
      threeDaysFromNow.setDate(today.getDate() + 3);

      const nearingDeadline = [];
      const overdue = [];

      projects.forEach(project => {
        // Check project deadline
        const projectDeadline = new Date(project.deadline);
        if (projectDeadline < today) {
          overdue.push({
            id: project.id,
            title: project.title,
            deadline: project.deadline,
            type: 'project',
            description: 'Project deadline has passed'
          });
        } else if (projectDeadline <= threeDaysFromNow) {
          nearingDeadline.push({
            id: project.id,
            title: project.title,
            deadline: project.deadline,
            type: 'project',
            description: 'Project deadline is approaching'
          });
        }

        // Check task deadlines
        project.tasks.forEach(task => {
          const taskDeadline = new Date(task.deadline);
          if (taskDeadline < today && !task.completed) {
            overdue.push({
              id: task.id,
              title: task.title,
              deadline: task.deadline,
              type: 'task',
              projectId: project.id,
              projectTitle: project.title,
              description: 'Task is overdue'
            });
          } else if (taskDeadline <= threeDaysFromNow && !task.completed) {
            nearingDeadline.push({
              id: task.id,
              title: task.title,
              deadline: task.deadline,
              type: 'task',
              projectId: project.id,
              projectTitle: project.title,
              description: 'Task deadline is approaching'
            });
          }
        });
      });

      setNotifications({
        nearingDeadline: nearingDeadline.sort((a, b) => new Date(a.deadline) - new Date(b.deadline)),
        overdue: overdue.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
      });
    };

    fetchNotifications();
    // Refresh notifications every minute
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const getTimeRemaining = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `${Math.abs(diffDays)} days overdue`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else {
      return `Due in ${diffDays} days`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <Link
            href="/dashboard"
            className="text-indigo-600 hover:text-indigo-900"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Overdue Section */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Overdue
              </h2>
            </div>
            {notifications.overdue.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No overdue items</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {notifications.overdue.map((item) => (
                  <div key={`${item.type}-${item.id}`} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                        {item.type === 'task' && (
                          <p className="text-sm text-gray-500">Project: {item.projectTitle}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-red-600">
                          {getTimeRemaining(item.deadline)}
                        </span>
                        <Link
                          href={item.type === 'task' ? `/project/${item.projectId}` : `/project/${item.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Nearing Deadline Section */}
        <div>
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Nearing Deadline
              </h2>
            </div>
            {notifications.nearingDeadline.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No upcoming deadlines</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {notifications.nearingDeadline.map((item) => (
                  <div key={`${item.type}-${item.id}`} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                        {item.type === 'task' && (
                          <p className="text-sm text-gray-500">Project: {item.projectTitle}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-yellow-600">
                          {getTimeRemaining(item.deadline)}
                        </span>
                        <Link
                          href={item.type === 'task' ? `/project/${item.projectId}` : `/project/${item.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 