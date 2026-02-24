import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Mail, Lock, User, Activity } from 'lucide-react';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { authAPI } from '../utils/api';
import './Login.css'; // Reusing Login styles for visual consistency

/**
 * Signup Component:
 * The page where new users can create a brand new account.
 */
const Signup = () => {
    const navigate = useNavigate();

    // Store all the user's registration data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);

    // Updates form data state as the user types
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Runs when the "Sign Up" button is clicked
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. VALIDATION CHECK: Safety first
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            toast.error('Please fill in all fields');
            return;
        }
        if (!formData.email.includes('@')) {
            toast.error('Please enter a valid email');
            return;
        }
        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            // 2. BACKEND CALL: Send the signup data to the Node.js server
            // The server will automatically create BOTH a User and a Patient profile
            const response = await authAPI.register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            // 3. SUCCESS HANDLING
            if (response.data.success) {
                toast.success('Registration successful! Please login.');
                // Send them to the login page now that they have an account
                navigate('/login');
            }
        } catch (error) {
            // 4. ERROR HANDLING: If email is already taken, etc.
            console.error(error);
            const errorMessage = error.response?.data?.error || 'Registration failed. Please try again.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
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
                        <h2>Create Account</h2>
                        <p>Join CloudCare Hospital today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        {/* Full Name Input */}
                        <Input
                            label="Full Name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            icon={<User size={20} />}
                            required
                        />

                        {/* Email Input */}
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

                        {/* Password Input */}
                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            icon={<Lock size={20} />}
                            required
                        />

                        {/* Password Confirmation */}
                        <Input
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            icon={<Lock size={20} />}
                            required
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            fullWidth
                            loading={loading}
                        >
                            Sign Up
                        </Button>

                        {/* Link back to login for existing users */}
                        <div className="login-options" style={{ justifyContent: 'center', marginTop: '1rem' }}>
                            <p>Already have an account? <Link to="/login" className="forgot-password">Login</Link></p>
                        </div>
                    </form>
                </motion.div>

                {/* Right side teaser info */}
                <div className="login-info">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h2>CloudCare Hospital</h2>
                        <p>Join our community to access personalized healthcare services.</p>
                        <ul className="login-features">
                            <li>✓ Easy appointment booking</li>
                            <li>✓ Secure medical records</li>
                            <li>✓ 24/7 Support access</li>
                            <li>✓ Family health tracking</li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
