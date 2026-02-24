// Import mongoose for defining data structures
import mongoose from 'mongoose';

// Define the 'Department' structure (Schema)
// This blueprint describes a hospital department (e.g., Cardiology, Neurology)
const departmentSchema = new mongoose.Schema({
  // Unique name of the department
  name: {
    type: String,
    required: true,
    unique: true // No two departments can have the same name
  },
  // Description of what the department does
  description: String,
  // Link to the Head Doctor or a representative doctor for this department
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  },
  // What floor this department is located on
  floor: Number,
  // Direct phone number for this department
  phone: String,
  // Official email address for this department
  email: String,
  // Current status (Active or Closed)
  status: {
    type: String,
    default: 'Active'
  }
}, {
  // Automatically store 'createdAt' and 'updatedAt' times
  timestamps: true
});

// Create and export the 'Department' model
export default mongoose.model('Department', departmentSchema);
