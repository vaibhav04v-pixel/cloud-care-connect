// This is the main structure of your website where we define all the "Pages" and "Routes"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Toaster is used to show those small notification popups (success/error messages)
import { Toaster } from 'react-hot-toast';
// 'useState' manages data that can change, 'useEffect' runs code when the page loads
import { useState, useEffect } from 'react';

// Context: Provides Global Settings (like Dark/Light mode) to all pages
import { ThemeProvider } from './context/ThemeContext';

// Layout: This is the frame of our website (includes the Header and Footer)
import Layout from './components/Layout/Layout';

// Importing the different pages of our application
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import Departments from './pages/Departments';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';

function App() {
  // 'isAuthenticated' is a Boolean (True/False) that tells us if a user is logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // This code runs ONCE when you first open the website
  useEffect(() => {
    // Check the browser's secret storage (localStorage) for a login token
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    // If both exist, that means the person was previously logged in
    if (token && user) {
      setIsAuthenticated(true);
    }
  }, []);

  // This function is triggered when a user successfully logs in
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // This function is triggered when a user clicks 'Logout'
  const handleLogout = () => {
    // Clear the tokens from the browser's storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Set the state to false so the UI updates (hides the dashboard)
    setIsAuthenticated(false);
  };

  return (
    // Wrap the whole app in our Theme (Dark/Light) provider
    <ThemeProvider>
      {/* 'Router' enables multiple pages (URLs) in our Single Page App */}
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        {/* The 'Toaster' handles the tiny notification popups at the top-center */}
        <Toaster position="top-center" />

        {/* 'Routes' is like a switchboard that looks at the URL and decides which Page to show */}
        <Routes>
          {/* Use the shared 'Layout' (Navbar/Footer) for all the pages listed inside it */}
          <Route element={<Layout isAuthenticated={isAuthenticated} onLogout={handleLogout} />}>

            {/* PUBLIC PAGES: Anyone can see these */}
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />

            {/* AUTH PAGES: Only visible if NOT logged in (guests) */}
            <Route
              path="/login"
              // If already logged in, redirect them to the Dashboard instead of showing the Login page
              element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" replace />}
            />
            <Route
              path="/signup"
              // If already logged in, redirect to dashboard
              element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" replace />}
            />

            {/* PROTECTED PAGES: Only visible if LOGGED IN */}
            <Route
              path="/dashboard"
              // If NOT logged in, kick them back to the Login page
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/patients"
              element={isAuthenticated ? <Patients /> : <Navigate to="/login" replace />}
            />

            {/* ERROR CATCH: If user types a random URL, send them back to the Home page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
