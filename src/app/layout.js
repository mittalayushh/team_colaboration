import './globals.css';
import ClientLayout from './components/ClientLayout';

export const metadata = {
  title: 'Project Management',
  description: 'A simple project management application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
