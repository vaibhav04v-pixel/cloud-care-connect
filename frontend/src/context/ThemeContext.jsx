// ThemeContext allows the whole app to share 'DarkMode' settings easily.
import { createContext, useContext, useState, useEffect } from 'react';

// Create the context (like a global container for our settings)
const ThemeContext = createContext();

// This is the "Provider" component that wraps around our whole App.
export const ThemeProvider = ({ children }) => {
    // 'theme' state: Stores if we are currently using 'light' or 'dark' mode.
    // It checks the browser storage (localStorage) first, defaulting to 'light'.
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    // This code runs whenever the 'theme' changes
    useEffect(() => {
        // 1. Save the choice to the browser storage so it remembers on next visit.
        localStorage.setItem('theme', theme);
        // 2. Add or remove the 'dark' class on the global <html> element.
        // This allows our CSS to change colors based on that single class.
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    // Function to switch between Light and Dark
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        // Put the 'theme' and the 'toggleTheme' function into the container
        // so all child components can access them directly.
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook: This makes it super easy to use the theme in any component
// Usage: const { theme, toggleTheme } = useTheme();
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
