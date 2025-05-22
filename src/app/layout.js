import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Project Management',
  description: 'A simple project management application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
