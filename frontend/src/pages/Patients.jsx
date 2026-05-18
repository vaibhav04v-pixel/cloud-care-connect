import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import Table from '../components/Table/Table';
import Badge from '../components/Badge/Badge';
import Modal from '../components/Modal/Modal';
import Input from '../components/Input/Input';
import { patientsAPI } from '../utils/api';
import './Patients.css';

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: 'Male',
        bloodGroup: 'O+',
        address: '',
        emergencyContact: '',
        insurance: ''
    });

    // Fetch patients on component mount
    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            setLoading(true);
            const response = await patientsAPI.getAll();
            setPatients(response.data.data || []);
        } catch (error) {
            console.error('Error fetching patients:', error);
            toast.error('Failed to load patients. Using offline mode.');
            // Fallback to empty array or you could load mock data
        } finally {
            setLoading(false);
        }
    };

    const filteredPatients = patients.filter(p =>
        p.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this patient?')) {
            try {
                await patientsAPI.delete(id);
                setPatients(patients.filter(p => p.id !== id && p.id !== id));
                toast.success('Patient deleted successfully');
            } catch (error) {
                console.error('Error deleting patient:', error);
                toast.error('Failed to delete patient');
            }
        }
    };

    const handleAddPatient = async (e) => {
        e.preventDefault();
        try {
            const response = await patientsAPI.create(formData);
            setPatients([response.data.data, ...patients]);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                dateOfBirth: '',
                gender: 'Male',
                bloodGroup: 'O+',
                address: '',
                emergencyContact: '',
                insurance: ''
            });
            setIsAddModalOpen(false);
            toast.success('Patient added successfully');
        } catch (error) {
            console.error('Error adding patient:', error);
            toast.error('Failed to add patient');
        }
    };

    const columns = [
        { header: 'ID', accessor: 'id' },
        {
            header: 'Patient Name',
            render: (row) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={row.avatar || 'https://via.placeholder.com/150'} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                    <div>
                        <div style={{ fontWeight: 600 }}>{row.firstName} {row.lastName}</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>{row.email}</div>
                    </div>
                </div>
            )
        },
        { header: 'Phone', accessor: 'phone' },
        { header: 'Blood Group', accessor: 'bloodGroup' },
        { header: 'Last Visit', accessor: 'lastVisit' },
        {
            header: 'Status',
            render: (row) => (
                <Badge variant={row.status === 'Active' ? 'success' : 'default'}>
                    {row.status}
                </Badge>
            )
        },
        {
            header: 'Actions',
            render: (row) => (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button size="sm" variant="ghost" icon={<Eye size={16} />} onClick={() => setSelectedPatient(row)} />
                    <Button size="sm" variant="ghost" icon={<Edit size={16} />} onClick={() => toast.info('Edit feature coming soon')} />
                    <Button size="sm" variant="ghost" icon={<Trash2 size={16} />} onClick={() => handleDelete(row.id || row.id)} />
                </div>
            )
        }
    ];

    return (
        <div className="patients-page">
            <div className="container">
                <motion.div
                    className="page-header-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div>
                        <h1>Patient Management</h1>
                        <p>Manage and view all patient records</p>
                    </div>
                    <Button
                        icon={<Plus size={18} />}
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        Add New Patient
                    </Button>
                </motion.div>

                <Card className="search-card">
                    <div className="search-wrapper">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Search patients by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="stats-row">
                        <div className="stat-box">
                            <span className="stat-value">{patients.length}</span>
                            <span className="stat-label">Total Patients</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-value">{patients.filter(p => p.status === 'Active').length}</span>
                            <span className="stat-label">Active</span>
                        </div>
                    </div>
                </Card>

                <Card>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                            <p>Loading patients...</p>
                        </div>
                    ) : (
                        <Table
                            columns={columns}
                            data={filteredPatients}
                            emptyMessage="No patients found"
                        />
                    )}
                </Card>
            </div>

            {/* Patient Detail Modal */}
            {selectedPatient && (
                <Modal
                    isOpen={!!selectedPatient}
                    onClose={() => setSelectedPatient(null)}
                    title="Patient Details"
                    size="lg"
                >
                    <div className="patient-details">
                        <img src={selectedPatient.avatar || 'https://via.placeholder.com/150'} alt="" className="patient-avatar-large" />
                        <h3>{selectedPatient.firstName} {selectedPatient.lastName}</h3>
                        <div className="detail-grid">
                            <div><strong>Email:</strong> {selectedPatient.email}</div>
                            <div><strong>Phone:</strong> {selectedPatient.phone}</div>
                            <div><strong>Gender:</strong> {selectedPatient.gender}</div>
                            <div><strong>Blood Group:</strong> {selectedPatient.bloodGroup}</div>
                            <div><strong>Date of Birth:</strong> {selectedPatient.dateOfBirth}</div>
                            <div><strong>Address:</strong> {selectedPatient.address}</div>
                            <div><strong>Emergency Contact:</strong> {selectedPatient.emergencyContact}</div>
                            <div><strong>Insurance:</strong> {selectedPatient.insurance}</div>
                            <div><strong>Last Visit:</strong> {selectedPatient.lastVisit}</div>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Add Patient Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add New Patient"
            >
                <form onSubmit={handleAddPatient}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Input
                            label="First Name"
                            required
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                        <Input
                            label="Last Name"
                            required
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                        <Input
                            label="Email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <Input
                            label="Phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                        <Input
                            label="Date of Birth"
                            type="date"
                            required
                            value={formData.dateOfBirth}
                            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        />
                        <div className="input-group">
                            <label>Gender</label>
                            <select
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd', width: '100%' }}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Blood Group</label>
                            <select
                                value={formData.bloodGroup}
                                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd', width: '100%' }}
                            >
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                        </div>

                        <Button type="submit" fullWidth>Add Patient</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Patients;
