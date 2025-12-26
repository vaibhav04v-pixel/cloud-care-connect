import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Mail, Phone, MapPin, Calendar, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import Badge from '../components/Badge/Badge';
import Modal from '../components/Modal/Modal';
import { doctorsAPI, departmentsAPI } from '../utils/api';
import { mockDoctors } from '../data/doctors';
import './Doctors.css';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [departmentsList, setDepartmentsList] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docsResult, deptsResult] = await Promise.allSettled([
          doctorsAPI.getAll(),
          departmentsAPI.getAll()
        ]);

        // Handle Doctors Data
        if (docsResult.status === 'fulfilled') {
          const rawDocs = docsResult.value.data;
          const apiDoctors = Array.isArray(rawDocs) ? rawDocs : (rawDocs.data || []);

          if (apiDoctors.length === 0) {
            console.log('No doctors in API, using mock data');
            setDoctors(mockDoctors);
          } else {
            // Prepare a pool of professional avatars
            const professionalAvatars = [
              ...mockDoctors.map(d => d.avatar),
              '/doctors/doc16.jpg',
              '/doctors/doc17.jpg',
              '/doctors/doc18.jpg',
              '/doctors/doc19.jpg',
              '/doctors/doc20.jpg'
            ];

            // Merge API data with mock data
            const mergedDoctors = apiDoctors.map((doc, index) => {
              const matchedMockDoc = mockDoctors.find(m =>
                (m.firstName === doc.firstName && m.lastName === doc.lastName) ||
                m.specialization === doc.specialization
              );

              const mockDoc = matchedMockDoc || mockDoctors[0];

              // Use matched mock avatar only if names match, otherwise rotate through professional avatars
              const hasNameMatch = matchedMockDoc &&
                matchedMockDoc.firstName === doc.firstName &&
                matchedMockDoc.lastName === doc.lastName;

              const selectedAvatar = hasNameMatch
                ? matchedMockDoc.avatar
                : professionalAvatars[index % professionalAvatars.length];

              return {
                ...mockDoc,
                ...doc,
                patients: doc.totalPatients || mockDoc.patients,
                qualification: Array.isArray(doc.qualifications)
                  ? doc.qualifications.join(', ')
                  : (doc.qualifications || mockDoc.qualification),
                experience: typeof doc.experience === 'number'
                  ? `${doc.experience} years`
                  : (doc.experience || mockDoc.experience),
                avatar: selectedAvatar,
                consultationFee: doc.consultationFee || mockDoc.consultationFee || 150,
                availableDays: doc.availableDays || mockDoc.availableDays || ['Mon', 'Wed', 'Fri'],
                availableTime: doc.availableTime || mockDoc.availableTime || '9:00 AM - 5:00 PM',
                bio: doc.bio || mockDoc.bio
              };
            });
            setDoctors(mergedDoctors);
          }
        } else {
          console.warn('Doctors API failed, falling back to mock data:', docsResult.reason);
          setDoctors(mockDoctors);
        }

        // Handle Departments Data
        if (deptsResult.status === 'fulfilled') {
          const rawDepts = deptsResult.value.data;
          setDepartmentsList(Array.isArray(rawDepts) ? rawDepts : (rawDepts.data || []));
        } else {
          console.warn('Departments API failed:', deptsResult.reason);
          const uniqueDepts = [...new Set(mockDoctors.map(d => d.department))].map(name => ({ name }));
          setDepartmentsList(uniqueDepts);
        }
      } catch (error) {
        console.error('Unexpected error in data fetching:', error);
        setDoctors(mockDoctors);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="doctors-page">
        <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          <p>Loading doctors...</p>
        </div>
      </div>
    );
  }

  const departments = ['All', ...departmentsList.map(d => d.name)];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch =
      doctor.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase());

    // Check both potential department formats (string name or populated object)
    const deptName = doctor.department?.name || doctor.department;
    const matchesDepartment = selectedDepartment === 'All' || deptName === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  const handleBookAppointment = (doctor) => {
    toast.success(`Booking appointment with ${doctor.firstName} ${doctor.lastName}`);
    setSelectedDoctor(null);
  };

  return (
    <div className="doctors-page">
      <div className="page-header">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1>Our Expert Doctors</h1>
            <p>Meet our team of highly qualified medical professionals</p>
          </motion.div>
        </div>
      </div>

      <div className="container page-content">
        {/* Search and Filter */}
        <div className="filters-section">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search doctors by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="department-filters">
            <Filter size={18} />
            <div className="filter-buttons">
              {departments.map(dept => (
                <button
                  key={dept}
                  className={`filter-btn ${selectedDepartment === dept ? 'active' : ''}`}
                  onClick={() => setSelectedDepartment(dept)}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="doctors-grid">
          {filteredDoctors.map((doctor, index) => (
            <motion.div
              key={doctor._id || doctor.id || index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="doctor-card" hover onClick={() => setSelectedDoctor(doctor)}>
                <div className="doctor-card-header">
                  <img
                    src={doctor.avatar}
                    alt={`Dr. ${doctor.firstName}`}
                    className="doctor-avatar"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://cdn-icons-png.flaticon.com/512/377/3774299.png';
                    }}
                  />
                  <div className="doctor-rating">
                    <Star size={16} fill="currentColor" />
                    <span>{doctor.rating}</span>
                  </div>
                </div>
                <div className="doctor-card-body">
                  <h3>Dr. {doctor.firstName} {doctor.lastName}</h3>
                  <Badge variant="primary" size="sm">{doctor.specialization}</Badge>
                  <div className="doctor-details">
                    <p><strong>{doctor.qualification}</strong></p>
                    <p>{doctor.experience} experience</p>
                  </div>
                  <div className="doctor-stats-row">
                    <div className="stat-item">
                      <span className="stat-value">{doctor.patients}+</span>
                      <span className="stat-label">Patients</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">${doctor.consultationFee}</span>
                      <span className="stat-label">Fee</span>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    icon={<Calendar size={16} />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookAppointment(doctor);
                    }}
                  >
                    Book Appointment
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="no-results">
            <p>No doctors found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Doctor Detail Modal */}
      {selectedDoctor && (
        <Modal
          isOpen={!!selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          title={`Dr. ${selectedDoctor.firstName} ${selectedDoctor.lastName}`}
          size="md"
        >
          <div className="doctor-modal-content">
            <div className="doctor-modal-header">
              <img
                src={selectedDoctor.avatar}
                alt="Doctor"
                className="modal-avatar"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://cdn-icons-png.flaticon.com/512/377/3774299.png';
                }}
              />
              <div>
                <Badge variant="primary">{selectedDoctor.specialization}</Badge>
                <div className="modal-rating">
                  <Star size={18} fill="currentColor" />
                  <span>{selectedDoctor.rating} Rating</span>
                </div>
              </div>
            </div>
            <div className="doctor-modal-body">
              <p><strong>Qualification:</strong> {selectedDoctor.qualification}</p>
              <p><strong>Experience:</strong> {selectedDoctor.experience}</p>
              <p><strong>Department:</strong> {selectedDoctor.department}</p>
              <p><strong>Patients Treated:</strong> {selectedDoctor.patients}+</p>
              <p><strong>Consultation Fee:</strong> ${selectedDoctor.consultationFee}</p>
              <div className="availability">
                <p><strong>Available Days:</strong></p>
                <div className="days-list">
                  {selectedDoctor.availableDays.map(day => (
                    <Badge key={day} variant="success" size="sm">{day}</Badge>
                  ))}
                </div>
                <p><strong>Timings:</strong> {selectedDoctor.availableTime}</p>
              </div>
              <div className="bio">
                <p><strong>About:</strong></p>
                <p>{selectedDoctor.bio}</p>
              </div>
              <div className="contact-info">
                <p><Mail size={16} /> {selectedDoctor.email}</p>
                <p><Phone size={16} /> {selectedDoctor.phone}</p>
              </div>
            </div>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              icon={<Calendar size={18} />}
              onClick={() => handleBookAppointment(selectedDoctor)}
            >
              Book Appointment
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Doctors;
