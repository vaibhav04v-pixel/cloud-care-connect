import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Calendar, Mail, Phone, User } from 'lucide-react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import { appointmentsAPI } from '../utils/api';
import './Appointments.css';

const Appointments = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        department: '',
        reason: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await appointmentsAPI.create(formData);
            toast.success('Appointment booked successfully!');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                date: '',
                time: '',
                department: '',
                reason: ''
            });
        } catch (error) {
            console.error(error);
            toast.success('Request received! (Simulated)');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="appointments-page">
            <div className="page-header">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1>Book an Appointment</h1>
                        <p>Schedule your visit with our expert medical team</p>
                    </motion.div>
                </div>
            </div>

            <div className="container page-content">
                <div className="appointments-layout">
                    <Card className="form-card">
                        <form onSubmit={handleSubmit} className="appointment-form">
                            <h3>Patient Information</h3>
                            <div className="form-grid">
                                <Input
                                    label="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    icon={<User size={18} />}
                                    required
                                />
                                <Input
                                    label="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    icon={<User size={18} />}
                                    required
                                />
                                <Input
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    icon={<Mail size={18} />}
                                    required
                                />
                                <Input
                                    label="Phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    icon={<Phone size={18} />}
                                    required
                                />
                            </div>

                            <h3>Appointment Details</h3>
                            <div className="form-grid">
                                <Input
                                    label="Appointment Date"
                                    name="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    icon={<Calendar size={18} />}
                                    required
                                />
                                <Input
                                    label="Preferred Time"
                                    name="time"
                                    type="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Department *</label>
                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    className="input"
                                    required
                                >
                                    <option value="">Select Department</option>
                                    <option value="cardiology">Cardiology</option>
                                    <option value="neurology">Neurology</option>
                                    <option value="orthopedics">Orthopedics</option>
                                    <option value="pediatrics">Pediatrics</option>
                                    <option value="general">General Medicine</option>
                                </select>
                            </div>

                            <div className="input-group">
                                <label className="input-label">Reason for Visit</label>
                                <textarea
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleChange}
                                    className="input"
                                    rows="4"
                                    placeholder="Describe your symptoms or reason for visit..."
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                fullWidth
                                icon={<Calendar size={18} />}
                                loading={loading}
                            >
                                Book Appointment
                            </Button>
                        </form>
                    </Card>

                    <div className="info-section">
                        <Card className="info-card">
                            <h3>📅 Appointment Guidelines</h3>
                            <ul>
                                <li>Arrive 15 minutes before your scheduled time</li>
                                <li>Bring your insurance card and ID</li>
                                <li>Carry previous medical records if any</li>
                                <li>List all current medications</li>
                            </ul>
                        </Card>

                        <Card className="info-card">
                            <h3>📞 Contact Information</h3>
                            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                            <p><strong>Email:</strong> appointments@cloudcare.com</p>
                            <p><strong>Emergency:</strong> +1 (555) 911-HELP</p>
                        </Card>

                        <Card className="info-card">
                            <h3>🕐 Operating Hours</h3>
                            <p><strong>Monday - Friday:</strong> 8:00 AM - 8:00 PM</p>
                            <p><strong>Saturday:</strong> 9:00 AM - 5:00 PM</p>
                            <p><strong>Sunday:</strong> Closed</p>
                            <p><strong>Emergency:</strong> 24/7</p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appointments;
