import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Users, Activity, Heart, Brain, Bone, Baby, Stethoscope, Target, Eye, ArrowRight } from 'lucide-react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import './Home.css';

const Home = () => {
  const services = [
    {
      icon: <Heart size={40} />,
      title: 'Cardiology',
      description: '24/7 emergency cardiac care with advanced diagnostic facilities'
    },
    {
      icon: <Brain size={40} />,
      title: 'Neurology',
      description: 'Expert care for brain and nervous system disorders'
    },
    {
      icon: <Bone size={40} />,
      title: 'Orthopedics',
      description: 'Advanced treatment for bone, joint, and muscle conditions'
    },
    {
      icon: <Baby size={40} />,
      title: 'Pediatrics',
      description: 'Comprehensive healthcare for children and adolescents'
    },
    {
      icon: <Stethoscope size={40} />,
      title: 'General Medicine',
      description: 'Primary care services for adults of all ages'
    },
    {
      icon: <Activity size={40} />,
      title: 'Emergency Care',
      description: 'Round-the-clock emergency medical services'
    }
  ];

  const stats = [
    { number: '2458+', label: 'Patients Treated' },
    { number: '48+', label: 'Expert Doctors' },
    { number: '8+', label: 'Departments' },
    { number: '98%', label: 'Success Rate' }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="container">
            <motion.div
              className="hero-content"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="hero-title">Your Health, Our Priority</h1>
              <p className="hero-subtitle">
                Providing world-class healthcare services with cutting-edge technology and compassionate care
              </p>
              <div className="hero-buttons">
                <Link to="/appointments">
                  <Button size="lg" icon={<Calendar size={20} />}>
                    Book Appointment
                  </Button>
                </Link>
                <Link to="/doctors">
                  <Button size="lg" variant="outline" icon={<Users size={20} />}>
                    Our Doctors
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="stat-number">{stat.number}</h3>
                <p className="stat-label">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision-section">
        <div className="container">
          <div className="mission-vision-grid">
            <Card className="mission-card" animate>
              <div className="mv-icon">
                <Target size={48} />
              </div>
              <h3>Our Mission</h3>
              <p>
                To provide exceptional healthcare services that improve the quality of life for our patients 
                through innovative medical practices, state-of-the-art technology, and compassionate care 
                delivered by our dedicated team of healthcare professionals.
              </p>
            </Card>
            <Card className="vision-card" animate>
              <div className="mv-icon">
                <Eye size={48} />
              </div>
              <h3>Our Vision</h3>
              <p>
                To be the leading healthcare provider in the region, recognized for excellence in patient care, 
                medical innovation, and community health improvement. We strive to create a healthier future 
                for all through accessible, affordable, and high-quality healthcare services.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Our Services</h2>
            <p>Comprehensive healthcare solutions for all your medical needs</p>
          </motion.div>
          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="service-card" hover>
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="services-cta">
            <Link to="/departments">
              <Button variant="primary" size="lg" icon={<ArrowRight size={20} />}>
                View All Departments
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Need Medical Assistance?</h2>
            <p>Book an appointment with our expert doctors today</p>
            <div className="cta-buttons">
              <Link to="/appointments">
                <Button size="lg" variant="success" icon={<Calendar size={20} />}>
                  Book Appointment Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
