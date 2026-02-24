// Import necessary models to manage appointments
import Appointment from '../models/Appointment.js';
import Patient from '../models/Patient.js';
import Department from '../models/Department.js';

// GET ALL APPOINTMENTS: Returns a complete list of all visits
export const getAppointments = async (req, res) => {
  try {
    // Fetch appointments and replace IDs with actual Patient, Doctor, and Department data
    const appointments = await Appointment.find()
      .populate('patient')
      .populate('doctor')
      .populate('department');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ONE APPOINTMENT: Fetches a single record for review or editing
export const getAppointmentById = async (req, res) => {
  try {
    // Look up by ID and fill in all related info
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient')
      .populate('doctor')
      .populate('department');
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET PATIENT APPOINTMENTS: Shows clinical history for a specific patient
export const getAppointmentsByPatient = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.params.patientId })
      .populate('doctor')
      .populate('department');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET DOCTOR APPOINTMENTS: Returns a doctor's schedule for the day
export const getAppointmentsByDoctor = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.params.doctorId })
      .populate('patient')
      .populate('department');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE APPOINTMENT: This is the logic for booking a visit
export const createAppointment = async (req, res) => {
  try {
    // Extract form data from the user's booking request
    const { firstName, lastName, email, phone, date, time, department, reason } = req.body;

    // STEP 1: Identify or Register the Patient
    // We check if this patient already exists by looking at their email
    let patient = await Patient.findOne({ email });
    if (!patient) {
      // If new, create a fresh clinical profile for them automatically
      patient = await Patient.create({
        firstName,
        lastName,
        email,
        phone
      });
    }

    // STEP 2: Resolve the Department ID
    // The user sends us a name (like 'Cardiology'), we need the database ID
    let departmentId = null;
    if (department) {
      // Search for a department that matches the name (case-insensitive)
      const deptDoc = await Department.findOne({ name: { $regex: new RegExp(`^${department}$`, 'i') } });
      if (deptDoc) {
        departmentId = deptDoc._id;
      }
    }

    // STEP 3: Create the final Appointment record
    const appointment = new Appointment({
      patient: patient._id, // Connect to the patient ID
      appointmentDate: date, // The date they picked
      time, // The time they picked
      department: departmentId, // Connect to the department ID
      reason, // Why they are visiting
      status: 'Scheduled' // Default starting status
    });

    // Save it to the database
    await appointment.save();
    // Return the new appointment with a 201 (Created) status
    res.status(201).json(appointment);
  } catch (error) {
    // If something breaks, print it in the terminal and send back an error
    console.error('Booking Error:', error);
    res.status(400).json({ error: error.message });
  }
};

// UPDATE APPOINTMENT: Change time, status, or notes
export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// CANCEL APPOINTMENT: Special operation to flip status to 'Cancelled'
export const cancelAppointment = async (req, res) => {
  try {
    // Only update the 'status' field to 'Cancelled'
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status: 'Cancelled' }, { new: true });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE APPOINTMENT: Completely erase a record (Cleanup feature)
export const deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET STATS: Summary of hospital operations (Total, Completed, etc.)
export const getStats = async (req, res) => {
  try {
    // Count how many documents exist for each category
    const total = await Appointment.countDocuments();
    const completed = await Appointment.countDocuments({ status: 'Completed' });
    const scheduled = await Appointment.countDocuments({ status: 'Scheduled' });
    const cancelled = await Appointment.countDocuments({ status: 'Cancelled' });

    // Respond with a summary object
    res.json({ total, completed, scheduled, cancelled });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
