// Import the Doctor database model
import Doctor from '../models/Doctor.js';

// GET ALL DOCTORS: Retrieves a list of all doctors across all departments
export const getDoctors = async (req, res) => {
  try {
    // Fetch all doctor records
    // .populate('department') brings in full Department info instead of just an ID
    const doctors = await Doctor.find().populate('department');
    // Return the full list as JSON
    res.json(doctors);
  } catch (error) {
    // If a server error occurs, send back a 500 status
    res.status(500).json({ error: error.message });
  }
};

// GET ONE DOCTOR BY ID: Retrieves details for a specific physician
export const getDoctorById = async (req, res) => {
  try {
    // Look up one doctor using the unique ID provided in the URL
    const doctor = await Doctor.findById(req.params.id).populate('department');
    // Return the doctor's data
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET DOCTORS BY DEPARTMENT: Filters doctors for a specific hospital wing (e.g., Cardiology)
export const getDoctorsByDepartment = async (req, res) => {
  try {
    // Find all doctors whose 'department' ID matches the one provided in the URL
    const doctors = await Doctor.find({ department: req.params.departmentId }).populate('department');
    // Return resulting list
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE DOCTOR: Adds a new doctor to the system (Managerial feature)
export const createDoctor = async (req, res) => {
  try {
    // Create a new structure from the incoming request data
    const doctor = new Doctor(req.body);
    // Save to database
    await doctor.save();
    // Respond with a 201 (Created) status
    res.status(201).json(doctor);
  } catch (error) {
    // If the data was invalid, return a 400 (Client Error) status
    res.status(400).json({ error: error.message });
  }
};

// UPDATE DOCTOR: Modifies existing doctor information
export const updateDoctor = async (req, res) => {
  try {
    // Locate doctor by ID and update with new data sent from the UI
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // Return updated data
    res.json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE DOCTOR: Terminates a doctor's record from the hospital system
export const deleteDoctor = async (req, res) => {
  try {
    // Remove the record from the database
    await Doctor.findByIdAndDelete(req.params.id);
    // Confirmation message
    res.json({ message: 'Doctor deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// SEARCH DOCTORS: Finds doctors by name or medical specialty
export const searchDoctors = async (req, res) => {
  try {
    // Extract search text from URL
    const { query } = req.query;
    // Return empty if nothing was typed
    if (!query) return res.json([]);

    // Safety: Escape reserved regex characters to prevent crashes
    const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Search for matches in First Name, Last Name, or Specialization
    // Uses case-insensitive regex for a flexible user experience
    const doctors = await Doctor.find({
      $or: [
        { firstName: { $regex: safeQuery, $options: 'i' } },
        { lastName: { $regex: safeQuery, $options: 'i' } },
        { specialization: { $regex: safeQuery, $options: 'i' } }
      ]
    }).populate('department');
    // Send results
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
