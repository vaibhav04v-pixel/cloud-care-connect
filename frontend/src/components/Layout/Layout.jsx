// Basic components from the React Router library 
import { Outlet } from 'react-router-dom';
// Bring in the navigation bar and footer components
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
// Styling specific to the website layout
import './Layout.css';

/**
 * Layout Component:
 * This component acts as a "Frame" or "Shell" for our entire website.
 * It ensures the Navbar is always at the top and the Footer is always at the bottom.
 */
const Layout = ({ isAuthenticated, onLogout }) => {
  return (
    <div className="layout">
      {/* 1. Header Navigation: Passes info on whether the user is logged in or not */}
      <Navbar isAuthenticated={isAuthenticated} onLogout={onLogout} />

      {/* 2. Main Body Content: The specific page (like Home or Contact) appears here */}
      <main className="main-content">
        {/* 'Outlet' is a special React placeholder that fills up with whatever page you visit in the URL */}
        <Outlet />
      </main>

      {/* 3. Footer: Simple information at the bottom of the page */}
      <Footer />
    </div>
  );
};

export default Layout;
