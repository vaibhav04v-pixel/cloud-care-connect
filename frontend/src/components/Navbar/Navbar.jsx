// Link is used instead of <a> tags to make the website load pages instantly without refreshing
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// motion is for those smooth fade-in and slide animations
import { motion } from 'framer-motion';
// Icons from the Lucide-React library
import { Menu, X, Activity, LogOut, LayoutDashboard, Sun, Moon } from 'lucide-react';
// Context to handle changing colors from Light to Dark
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const Navbar = ({ isAuthenticated, onLogout }) => {
  // 'isOpen' tracks if the mobile menu (hamburger) is open or closed
  const [isOpen, setIsOpen] = useState(false);
  // 'scrolled' tracks if the user has scrolled down the page (to change navbar background)
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation(); // Useful to see which page we are currently on
  const navigate = useNavigate(); // Used to force the browser to change pages
  const { theme, toggleTheme } = useTheme(); // Our Dark/Light mode tools

  // Check for mouse scroll every time the user moves their wheel
  useEffect(() => {
    const handleScroll = () => {
      // If user scrolls more than 20 pixels, make the navbar background solid
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // What happens when the user clicks 'Logout'
  const handleLogout = () => {
    onLogout(); // Call the logout function passed down from App.jsx
    navigate('/login'); // Redirect them back to the login screen
    setIsOpen(false); // Close the mobile menu if it was open
  };

  // Define the set of links that always show up in the menu
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/doctors', label: 'Doctors' },
    { path: '/departments', label: 'Departments' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' }
  ];

  // Helper function to check if a specific link is the "active" page (to highlight it)
  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* LOGO AREA */}
        <Link to="/" className="navbar-brand">
          <Activity className="brand-icon" />
          <span>CloudCare Hospital</span>
        </Link>

        {/* DESKTOP MENU: Usually hidden on phones, visible on computers */}
        <div className="navbar-menu desktop-menu">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ACTION AREA: Theme toggle and Login/Dashboard buttons */}
        <div className="navbar-actions desktop-menu">
          {/* Theme Button (Sun/Moon) */}
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', color: 'var(--gray-800)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem' }}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* If the user IS logged in, show Dashboard and Logout links */}
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link" style={{ marginRight: '1rem', display: 'flex', alignItems: 'center' }}>
                <LayoutDashboard size={18} style={{ marginRight: '0.5rem' }} /> Dashboard
              </Link>
              <button onClick={handleLogout} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center' }}>
                <LogOut size={18} style={{ marginRight: '0.5rem' }} /> Logout
              </button>
            </>
          ) : (
            // If NOT logged in, just show a simple "Book Appointment" button
            <Link to="/appointments" className="btn btn-primary">
              Book Appointment
            </Link>
          )}
        </div>

        {/* MOBILE MENU TOGGLE: The "Hamburger" icon for phones */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE NAVIGATION: Only pops out when the user clicks the Hamburger icon */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mobile-menu"
        >
          {/* Main Links */}
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Theme Switcher for mobile */}
          <button
            onClick={() => { toggleTheme(); setIsOpen(false); }}
            className="mobile-nav-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', width: '100%', textAlign: 'left' }}
          >
            {theme === 'dark' ? (
              <><Sun size={20} style={{ marginRight: '0.5rem' }} /> Light Mode</>
            ) : (
              <><Moon size={20} style={{ marginRight: '0.5rem' }} /> Dark Mode</>
            )}
          </button>

          {/* Dashboard/Logout for mobile */}
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="mobile-nav-link" onClick={() => setIsOpen(false)} style={{ display: 'flex', alignItems: 'center' }}>
                <LayoutDashboard size={20} style={{ marginRight: '0.8rem' }} /> Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="mobile-nav-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', width: '100%', textAlign: 'left', color: '#ef4444' }}
              >
                <LogOut size={20} style={{ marginRight: '0.8rem' }} /> Logout
              </button>
            </>
          ) : (
            <Link to="/appointments" className="mobile-nav-link action-btn" onClick={() => setIsOpen(false)}>
              Book Appointment
            </Link>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
