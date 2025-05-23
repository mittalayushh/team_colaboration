'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfileSettings() {
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    theme: 'light',
    notificationSettings: {
      dailyReminders: true,
      deadlineReminders: true,
      weeklyDigest: false,
      emailNotifications: true
    }
  });
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      router.push('/auth');
      return;
    }

    // Load user profile from localStorage
    const savedProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const user = JSON.parse(currentUser);
    
    if (Object.keys(savedProfile).length > 0) {
      setUserProfile(savedProfile);
    } else {
      // Initialize profile with user data
      setUserProfile(prev => ({
        ...prev,
        name: user.username,
        email: user.email
      }));
    }
  }, [router]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    
    // Update current user in localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    currentUser.username = userProfile.name;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Update user in users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
      users[userIndex].username = userProfile.name;
      localStorage.setItem('users', JSON.stringify(users));
    }

    // Save profile settings
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    localStorage.setItem('theme', userProfile.theme);
    document.documentElement.classList.toggle('dark', userProfile.theme === 'dark');
  };

  const handleThemeToggle = () => {
    const newTheme = userProfile.theme === 'light' ? 'dark' : 'light';
    setUserProfile(prev => ({ ...prev, theme: newTheme }));
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleNotificationSettingChange = (setting) => {
    setUserProfile(prev => ({
      ...prev,
      notificationSettings: {
        ...prev.notificationSettings,
        [setting]: !prev.notificationSettings[setting]
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
          <Link
            href="/dashboard"
            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <form onSubmit={handleProfileUpdate}>
            {/* Profile Information */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={userProfile.email}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Email cannot be changed
                  </p>
                </div>
              </div>
            </div>

            {/* Theme Settings */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Theme Settings</h2>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
                <button
                  type="button"
                  onClick={handleThemeToggle}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    userProfile.theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      userProfile.theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notification Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-700 dark:text-gray-300">Daily Reminders</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Get daily reminders for upcoming tasks</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNotificationSettingChange('dailyReminders')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      userProfile.notificationSettings.dailyReminders ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        userProfile.notificationSettings.dailyReminders ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-700 dark:text-gray-300">Deadline Reminders</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Get notified about approaching deadlines</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNotificationSettingChange('deadlineReminders')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      userProfile.notificationSettings.deadlineReminders ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        userProfile.notificationSettings.deadlineReminders ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-700 dark:text-gray-300">Weekly Digest</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive a weekly summary of your projects</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNotificationSettingChange('weeklyDigest')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      userProfile.notificationSettings.weeklyDigest ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        userProfile.notificationSettings.weeklyDigest ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-700 dark:text-gray-300">Email Notifications</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNotificationSettingChange('emailNotifications')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      userProfile.notificationSettings.emailNotifications ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        userProfile.notificationSettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 