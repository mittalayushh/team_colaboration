'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [notificationCount, setNotificationCount] = useState(0);
  const [theme, setTheme] = useState('light');
  const pathname = usePathname();

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');

    const fetchNotificationCount = () => {
      const projects = JSON.parse(localStorage.getItem('projects') || '[]');
      const today = new Date();
      const threeDaysFromNow = new Date(today);
      threeDaysFromNow.setDate(today.getDate() + 3);

      let count = 0;

      projects.forEach(project => {
        // Check project deadline
        const projectDeadline = new Date(project.deadline);
        if (projectDeadline < today || projectDeadline <= threeDaysFromNow) {
          count++;
        }

        // Check task deadlines
        project.tasks.forEach(task => {
          const taskDeadline = new Date(task.deadline);
          if ((taskDeadline < today || taskDeadline <= threeDaysFromNow) && !task.completed) {
            count++;
          }
        });
      });

      setNotificationCount(count);
    };

    fetchNotificationCount();
    // Refresh count every minute
    const interval = setInterval(fetchNotificationCount, 60000);
    return () => clearInterval(interval);
  }, []);

  const isActive = (path) => pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                Project Manager
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/dashboard"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/dashboard')
                    ? 'border-indigo-500 text-gray-900 dark:text-white'
                    : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/notifications"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/notifications')
                    ? 'border-indigo-500 text-gray-900 dark:text-white'
                    : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                Notifications
                {notificationCount > 0 && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                    {notificationCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link
              href="/profile"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive('/profile')
                  ? 'border-indigo-500 text-gray-900 dark:text-white'
                  : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              Profile Settings
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 