// Import mongoose to structure our database data
import mongoose from 'mongoose';

// Define the 'Patient' structure (Schema)
// This blueprint stores personal and medical information for patients
const patientSchema = new mongoose.Schema({
  // Patient's first name
  firstName: {
    type: String,
    required: true // Compulsory field
  },
  // Patient's last name
  lastName: {
    type: String,
    required: true // Compulsory field
  },
  // Patient's personal email address
  email: {
    type: String,
    required: true,
    unique: true, // Cannot have duplicate emails
    index: true, // Indexed for high-speed searching
    lowercase: true, // Stored in lowercase for consistency
    trim: true // Cleans up leading/trailing spaces
  },
  // Patient's primary phone number
  phone: {
    type: String,
    required: true
  },
  // Link to the 'User' account this patient uses to log in
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Points to the User collection
    index: true
  },
  // Date of birth for age calculation
  dateOfBirth: { type: Date },
  // Gender identification
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'] // Restricted to these choices
  },
  // Blood group (e.g., O+, A-, etc.)
  bloodGroup: String,
  // Residential address
  address: String,
  // Phone number of someone to call in an emergency
  emergencyContact: String,
  // Insurance provider information
  insurance: String,
  // List of previous illnesses or allergies
  medicalHistory: [String],
  // URL to a profile picture
  avatar: String,
  // Current status (Active, Inactive, etc.)
  status: {
    type: String,
    default: 'Active'
  },
  // The date of the patient's most recent visit
  lastVisit: Date
}, {
  // Automatically record creation and update times
  timestamps: true
});

// Create and export the 'Patient' model
export default mongoose.model('Patient', patientSchema);
