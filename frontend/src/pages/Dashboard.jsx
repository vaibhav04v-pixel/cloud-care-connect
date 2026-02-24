import { useState, useEffect } from 'react';
// motion for entry animations
import { motion } from 'framer-motion';
// Icons for the dashboard cards and lists
import { Users, Calendar, Activity, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
// Recharts library: This is what draws the beautiful graphs and charts
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// Custom UI cards and badges
import Card from '../components/Card/Card';
import Badge from '../components/Badge/Badge';
// Our API bridge
import { dashboardAPI } from '../utils/api';
// Default mock data (to fill the charts until we have more real data)
import { mockDashboardStats } from '../data/dashboard';
import './Dashboard.css';

/**
 * Dashboard Component:
 * The main analytics page that shows how the hospital is performing.
 */
const Dashboard = () => {
  // 'stats' combines real data from the backend with mock data for the charts
  const [stats, setStats] = useState(mockDashboardStats);
  const [loading, setLoading] = useState(true);

  // Load the analytics from the server as soon as the page opens
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Request stats from the Node.js backend
        const response = await dashboardAPI.getStats();

        // Update our state with the real counts and recent appointment list
        setStats(prev => ({
          ...prev, // Keep the mock data for charts
          overview: response.data.overview, // Real numbers for Doctors, Patients, etc.
          recentAppointments: response.data.recentAppointments.length > 0
            ? response.data.recentAppointments
            : prev.recentAppointments
        }));
      } catch (error) {
        console.error('Failed to fetch dashboard stats', error);
      } finally {
        // Stop the loading indicator
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Use "Destructuring" to extract individual pieces of the stats object for easier use
  const { overview, appointmentsByMonth, patientsByDepartment, appointmentStatus, topDoctors, recentAppointments } = stats;

  // Helper function to decide which color a status badge should be
  const getStatusBadge = (status) => {
    const variants = {
      'Confirmed': 'success', // Green
      'Pending': 'warning', // Orange
      'Completed': 'primary', // Blue
      'Cancelled': 'danger' // Red
    };
    return variants[status] || 'default';
  };

  // Helper function to pick the right icon for an appointment's status
  const getStatusIcon = (status) => {
    const icons = {
      'Confirmed': <CheckCircle size={16} />,
      'Pending': <Clock size={16} />,
      'Completed': <CheckCircle size={16} />,
      'Cancelled': <XCircle size={16} />
    };
    return icons[status] || <AlertCircle size={16} />;
  };

  // Show a simple loading text while we wait for the server
  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        {/* PAGE HEADER: Shows "Dashboard" and today's date */}
        <motion.div className="dashboard-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back! Here's what's happening today.</p>
          </div>
          <div className="dashboard-date">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </motion.div>

        {/* OVERVIEW GRID: The four main cards at the top */}
        <div className="overview-grid">
          {/* Total Patients Card */}
          <Card className="overview-card card-primary">
            <div className="overview-icon" style={{ background: 'rgba(0, 102, 204, 0.1)', color: 'var(--primary-blue)' }}>
              <Users size={32} />
            </div>
            <div className="overview-details">
              <h3>{overview.totalPatients}</h3>
              <p>Total Patients</p>
            </div>
          </Card>

          {/* Expert Doctors Card */}
          <Card className="overview-card card-success">
            <div className="overview-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
              <Activity size={32} />
            </div>
            <div className="overview-details">
              <h3>{overview.totalDoctors}</h3>
              <p>Expert Doctors</p>
            </div>
          </Card>

          {/* Appointments Card */}
          <Card className="overview-card card-warning">
            <div className="overview-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}>
              <Calendar size={32} />
            </div>
            <div className="overview-details">
              <h3>{overview.appointments}</h3>
              <p>Appointments</p>
            </div>
          </Card>

          {/* Departments Card */}
          <Card className="overview-card card-info">
            <div className="overview-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--info)' }}>
              <TrendingUp size={32} />
            </div>
            <div className="overview-details">
              <h3>{overview.departments}</h3>
              <p>Departments</p>
            </div>
          </Card>
        </div>

        {/* CHARTS AREA: Visual graphs of hospital performance */}
        <div className="charts-grid">
          {/* Monthly Trend Graph (Line Chart) */}
          <Card className="chart-card">
            <h3 className="chart-title">Monthly Appointments Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={appointmentsByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="appointments" stroke="#0066cc" strokeWidth={3} dot={{ fill: '#0066cc', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Status Distribution (Pie Chart) */}
          <Card className="chart-card">
            <h3 className="chart-title">Appointment Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={appointmentStatus} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
                  {appointmentStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* TABLES AREA: Lists of Doctors and Appointments */}
        <div className="tables-grid">
          {/* Top Doctors Section */}
          <Card className="table-card">
            <h3 className="table-title">Top Performing Doctors</h3>
            <div className="doctors-list">
              {topDoctors.map((doctor, index) => (
                <div key={doctor.id} className="doctor-item">
                  <div className="doctor-rank">#{index + 1}</div>
                  <div className="doctor-info">
                    <h4>{doctor.name}</h4>
                    <p>{doctor.specialization}</p>
                  </div>
                  <div className="doctor-stats">
                    <div className="stat-badge"><Users size={14} /><span>{doctor.patients}</span></div>
                    <div className="stat-badge rating"><span>⭐ {doctor.rating}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Appointments Table */}
          <Card className="table-card">
            <h3 className="table-title">Recent Appointments</h3>
            <div className="appointments-list">
              {recentAppointments.map((appointment) => (
                <div key={appointment.id} className="appointment-item">
                  <div className="appointment-info">
                    <h4>{appointment.patient}</h4>
                    <p>{appointment.doctor}</p>
                  </div>
                  <div className="appointment-meta">
                    <span className="appointment-time"><Clock size={14} />{appointment.time}</span>
                    <Badge variant={getStatusBadge(appointment.status)} size="sm">
                      {getStatusIcon(appointment.status)}
                      {appointment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
