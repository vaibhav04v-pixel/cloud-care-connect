import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// Framer-motion for smooth entrance animations
import { motion } from 'framer-motion';
// React-hot-toast for those success/error notifications
import toast from 'react-hot-toast';
// Icons
import { Mail, Lock, Activity } from 'lucide-react';
// Pre-made custom components for Design consistency
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
// The bridge file that talks to our backend server
import { authAPI } from '../utils/api';
import './Login.css';

/**
 * Login Component:
 * The page where users enter their email and password to access the app.
 */
const Login = ({ onLogin }) => {
    const navigate = useNavigate(); // Tool to change URLs/pages

    // 'formData' stores whatever the user types into the input boxes
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // 'loading' tracks if we are currently waiting for a response from the server
    const [loading, setLoading] = useState(false);

    // This function runs every time a user types a single character in the input boxes
    const handleChange = (e) => {
        setFormData({
            ...formData, // Keep the old data
            [e.target.name]: e.target.value // Update only the box that changed
        });
    };

    // This function runs when the user clicks the "Sign In" button
    const handleSubmit = async (e) => {
        e.preventDefault(); // Stop the page from refreshing (the old way forms worked)

        // 1. SIMPLE VALIDATION: Error if boxes are empty or email is weird
        if (!formData.email || !formData.password) {
            toast.error('Please fill in all fields');
            return;
        }
        if (!formData.email.includes('@')) {
            toast.error('Please enter a valid email');
            return;
        }

        setLoading(true); // Show a loading spinner on the button

        try {
            // 2. BACKEND CALL: Send the email and password to the server
            const response = await authAPI.login(formData.email, formData.password);

            // 3. SUCCESS HANDLING
            if (response.data.success) {
                toast.success('Login successful! Welcome back');

                // SAVE SESSION: Store the secret token and user info in the browser's memory
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));

                // UPDATE APP STATE: Tell App.jsx we are now logged in
                onLogin();

                // REDIRECT: Move the user to the private Dashboard page
                navigate('/dashboard');
            }
        } catch (error) {
            // 4. ERROR HANDLING: If password is wrong or server is down
            console.error(error);
            const errorMessage = error.response?.data?.error || 'Login failed. Please check your credentials.';
            toast.error(errorMessage);
        } finally {
            setLoading(false); // Stop the loading spinner
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                {/* Visual card for the login form with animation */}
                <motion.div
                    className="login-card"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="login-header">
                        <div className="login-logo">
                            <Activity size={48} />
                        </div>
                        <h2>Welcome Back</h2>
                        <p>Sign in to access your dashboard</p>
                    </div>

                    {/* THE FORM */}
                    <form onSubmit={handleSubmit} className="login-form">
                        {/* Custom Input Box for Email */}
                        <Input
                            label="Email Address"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            icon={<Mail size={20} />}
                            required
                        />

                        {/* Custom Input Box for Password */}
                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            icon={<Lock size={20} />}
                            required
                        />

                        {/* Remember Me and Forgot Password links */}
                        <div className="login-options">
                            <label className="remember-me">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <a href="#forgot" className="forgot-password">Forgot password?</a>
                        </div>

                        {/* Switch to Signup page if they don't have an account */}
                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                            <p>Don't have an account? <Link to="/signup" className="forgot-password">Sign up</Link></p>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            fullWidth
                            loading={loading} // Automatically shows a spinner when loading=true
                        >
                            Sign In
                        </Button>
                    </form>

                    {/* Admin help info */}
                    <div className="login-footer">
                        <p>Demo Credentials:</p>
                        <p className="demo-info">
                            Email: <strong>admin@cloudcare.com</strong><br />
                            Password: <strong>password</strong>
                        </p>
                    </div>
                </motion.div>

                {/* Left-side information area (Marketing/Description) */}
                <div className="login-info">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h2>CloudCare Hospital</h2>
                        <p>Access your personalized dashboard to manage patients, appointments, and view important analytics.</p>
                        <ul className="login-features">
                            <li>✓ Manage patient records</li>
                            <li>✓ View appointments & schedules</li>
                            <li>✓ Access real-time analytics</li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Login;
