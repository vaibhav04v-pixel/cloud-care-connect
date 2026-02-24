// Import mongoose for database modeling
import mongoose from 'mongoose';

// Define the 'Appointment' structure (Schema)
// This blueprint tracks whenever a patient books a time with a doctor
const appointmentSchema = new mongoose.Schema({
  // Link to the patient who is visiting
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true, // Must have a patient
    index: true // Fast lookup by patient ID
  },
  // Link to the doctor who is being visited
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    index: true // Fast lookup by doctor ID
  },
  // Link to the department where the appointment takes place
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    index: true
  },
  // Date and Time when the visit is scheduled
  appointmentDate: {
    type: Date,
    required: true,
    index: true
  },
  // The specific time of day (e.g., '10:30 AM')
  time: String,
  // The reason for the visit (e.g., 'Regular Checkup')
  reason: String,
  // Current state of the visit
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled', 'No-show'], // Possible states
    default: 'Scheduled' // Starts as Scheduled
  },
  // Clinical notes taken during the visit
  notes: String,
  // How long the appointment lasted in minutes
  duration: {
    type: Number,
    default: 30
  }
}, {
  // Automatically record timestamps for creation and changes
  timestamps: true
});

// Create and export the 'Appointment' model
export default mongoose.model('Appointment', appointmentSchema);
