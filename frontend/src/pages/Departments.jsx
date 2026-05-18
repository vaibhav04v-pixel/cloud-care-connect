import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { departmentsAPI } from '../utils/api';
import { mockDepartments } from '../data/departments';
import Card from '../components/Card/Card';
import './Departments.css';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await departmentsAPI.getAll();
        const rawDepts = response.data;
        const apiDepartments = Array.isArray(rawDepts) ? rawDepts : (rawDepts.data || []);

        // Merge API data with mock data to preserve rich UI (icons, images, etc.)
        const mergedDepartments = apiDepartments.map(apiDept => {
          const mockDept = mockDepartments.find(m => m.name === apiDept.name) || {};

          return {
            ...mockDept, // Default to mock properties
            ...apiDept,  // Override with API properties (id, name, description, etc.)
            // Ensure we have fallbacks for UI-specific fields if not in API or Mock
            icon: mockDept.icon || '🏥',
            image: mockDept.image || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop',
            services: mockDept.services || ['General Care', 'Consultations', 'Diagnostics'],
            stats: mockDept.stats || { procedures: 'N/A', successRate: '95%', availability: 'Mon-Fri' }
          };
        });

        // If API is empty (e.g. first run), fall back to mock data
        if (mergedDepartments.length === 0) {
          setDepartments(mockDepartments);
        } else {
          setDepartments(mergedDepartments);
        }
      } catch (error) {
        console.error('Failed to fetch departments:', error);
        // Fallback to mock data on error
        setDepartments(mockDepartments);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) {
    return (
      <div className="departments-page">
        <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
          <div className="loading-spinner">Loading Departments...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="departments-page">
      <div className="page-header">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1>Our Departments</h1>
            <p>Comprehensive healthcare services across specialized departments</p>
          </motion.div>
        </div>
      </div>

      <div className="container page-content">
        {departments.map((dept, index) => (
          <motion.div
            key={dept.id || dept.id}
            className={`department-row ${index % 2 === 0 ? '' : 'reverse'}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="department-image">
              <img src={dept.image} alt={dept.name} />
            </div>
            <Card className="department-content">
              <div className="dept-icon">{dept.icon}</div>
              <h2>{dept.name}</h2>
              <p className="dept-description">{dept.description}</p>
              <div className="services-list">
                <h4>Our Services:</h4>
                <ul>
                  {dept.services?.map((service, i) => (
                    <li key={i}>✓ {service}</li>
                  ))}
                </ul>
              </div>
              <div className="dept-stats">
                <div className="stat">
                  <span className="stat-value">{dept.stats?.procedures}</span>
                  <span className="stat-label">Procedures/Year</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{dept.stats?.successRate}</span>
                  <span className="stat-label">Success Rate</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{dept.stats?.availability}</span>
                  <span className="stat-label">Availability</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Departments;
