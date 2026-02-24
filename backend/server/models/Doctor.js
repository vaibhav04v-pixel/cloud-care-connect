// Import the 'mongoose' library to define our database structure
import mongoose from 'mongoose';

// Define the 'Doctor' structure (Schema)
// This blueprint describes all the information we store about a doctor
const doctorSchema = new mongoose.Schema({
  // Store the doctor's first name
  firstName: {
    type: String,
    required: true // Must provide a first name
  },
  // Store the doctor's last name
  lastName: {
    type: String,
    required: true // Must provide a last name
  },
  // Store the professional email address
  email: {
    type: String,
    required: true, // Must provide an email
    unique: true, // No two doctors can share the same email
    index: true, // Create a database index for fast searching
    lowercase: true, // Keep emails consistently in lowercase
    trim: true // Discard extra whitespaces
  },
  // Store the contact phone number
  phone: {
    type: String,
    required: true // Must provide a phone number
  },
  // What the doctor specializes in (e.g., Cardiology)
  specialization: String,
  // Link to the Department this doctor belongs to
  department: {
    type: mongoose.Schema.Types.ObjectId, // Reference ID
    ref: 'Department', // Points to the 'Department' collection
    index: true // Fast lookup by department
  },
  // Years of professional experience
  experience: Number,
  // List of medical degrees and certifications (e.g., ['MD', 'PhD'])
  qualifications: [String],
  // Short professional biography or description
  bio: String,
  // Patient rating from 1 to 5
  rating: {
    type: Number,
    default: 0 // Starts at 0 until rated
  },
  // Total number of patients this doctor has treated
  totalPatients: {
    type: Number,
    default: 0
  },
  // List of time slots when the doctor is available for appointments
  availableSlots: [String],
  // URL to the doctor's profile picture
  avatar: String,
  // Current employment status (Active or On-Leave)
  status: {
    type: String,
    default: 'Active'
  }
}, {
  // Automatically track when the doctor record was created and last updated
  timestamps: true
});

// Create and export the 'Doctor' model
export default mongoose.model('Doctor', doctorSchema);
