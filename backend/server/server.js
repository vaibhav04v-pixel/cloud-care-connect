import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = async () => {
  try {
    await sequelize.authenticate();

    console.log(`✅ MySQL connected: ${process.env.DB_HOST || 'localhost'}`);

    // Sync models
    await sequelize.sync();

    console.log('✅ MySQL Models synced');

  } catch (error) {
    console.error(`✗ MySQL connection error: ${error.message}`);
    process.exit(1);
  }
};

import patientRoutes from './routes/patients.js';
import doctorRoutes from './routes/doctors.js';
import appointmentRoutes from './routes/appointments.js';
import departmentRoutes from './routes/departments.js';
import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';

app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    timestamp: new Date() 
  });
});

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🏥 Hospital Management Server running on http://localhost:${PORT}`);
  console.log(`📊 API documentation: http://localhost:${PORT}/api/health\n`);
});