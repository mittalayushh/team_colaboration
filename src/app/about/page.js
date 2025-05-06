'use client';

export default function About() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white-900 mb-8">About Project Management</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            We're dedicated to providing a simple yet powerful project management solution that helps teams collaborate effectively and deliver projects successfully.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Intuitive project organization</li>
            <li>Task management and tracking</li>
            <li>Team collaboration tools</li>
            <li>Real-time updates and notifications</li>
            <li>Customizable project workflows</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-600">
            Have questions or feedback? We'd love to hear from you. Reach out to us at support@projectmanagement.com
          </p>
        </div>
      </div>
    </main>
  );
}
