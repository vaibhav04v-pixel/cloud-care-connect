// This is the main starting point of the backend server
// Import 'express' which is a framework that helps us handle web requests
import express from 'express';
// Import 'cors' (Cross-Origin Resource Sharing) which allows our frontend website to talk to this backend
import cors from 'cors';
// Import 'dotenv' to read secret variables (like database passwords) from the .env file
import dotenv from 'dotenv';

// Read all variables from the .env file so we can use them via process.env
dotenv.config();

// Create an instance of the Express application (this is our main 'app' object)
const app = express();

// Set up CORS (Cross-Origin Resource Sharing)
// This tells the server who is allowed to send requests to it
app.use(cors({
  // Only allow URLs listed in process.env.ALLOWED_ORIGINS (separated by commas)
  // If no origins are provided, it defaults to http://localhost:3000
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000'
}));

// Middlewares: These are functions that process the data coming in before it reaches our routes
// This line allows our app to understand and extract JSON data sent in a request body
app.use(express.json());
// This line allows our app to understand data sent from traditional HTML forms
app.use(express.urlencoded({ extended: true }));

import sequelize from './config/database.js';
import './models/index.js'; // Ensure models are loaded and associated

// Connect to MySQL Database
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ MySQL connected: ${process.env.DB_HOST}`);
    
    // Sync models without dropping existing tables in standard run
    await sequelize.sync({ alter: true });
    console.log(`✅ Database synchronized`);
  } catch (error) {
    console.error(`✗ MySQL connection error: ${error.message}`);
    process.exit(1);
  }
};

// Import the Route files. Each file contains the URLs for a specific section of the app.
import patientRoutes from './routes/patients.js';
import doctorRoutes from './routes/doctors.js';
import appointmentRoutes from './routes/appointments.js';
import departmentRoutes from './routes/departments.js';
import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';

// Route Assignments: Mapping URL paths to the imported routes
// Every request starting with /api/patients will be handled inside patientRoutes
app.use('/api/patients', patientRoutes);
// Every request starting with /api/doctors will be handled inside doctorRoutes
app.use('/api/doctors', doctorRoutes);
// Every request starting with /api/appointments will be handled inside appointmentRoutes
app.use('/api/appointments', appointmentRoutes);
// Every request starting with /api/departments will be handled inside departmentRoutes
app.use('/api/departments', departmentRoutes);
// Every request starting with /api/auth will be handled inside authRoutes (Login/Signup)
app.use('/api/auth', authRoutes);
// Every request starting with /api/dashboard will be handled inside dashboardRoutes (Stats)
app.use('/api/dashboard', dashboardRoutes);

// Health Check Route: A very simple URL used to verify the server is active
// 'req' represents the incoming Request, 'res' represents our Response back to the user
app.get('/api/health', (req, res) => {
  // We send back a JSON message with the status and current server time
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// Run the database connection function we created earlier
connectDB();

// Pick a port number to listen on. Use the one from variables, or 5000 as a backup.
const PORT = process.env.PORT || 5000;

// Tell the application to start listening for incoming traffic on that port
app.listen(PORT, () => {
  // Log message to confirm server is online and where it is running
  console.log(`\n🏥 Hospital Management Server running on http://localhost:${PORT}`);
  // Provide the link to the health check for convenience
  console.log(`📊 API documentation: http://localhost:${PORT}/api/health\n`);
});
