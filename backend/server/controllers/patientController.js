// Import the Patient database model
import Patient from '../models/Patient.js';

// GET ALL PATIENTS: Retrieves a list of every patient in the database
export const getPatients = async (req, res) => {
  try {
    // Ask the database for all records in the Patients collection
    const patients = await Patient.find();
    // Send the list back as a JSON response
    res.json(patients);
  } catch (error) {
    // If something goes wrong, send a 500 (Server Error) status
    res.status(500).json({ error: error.message });
  }
};

// GET ONE PATIENT BY ID: Retrieves details for a specific person
export const getPatientById = async (req, res) => {
  try {
    // Look up one patient using the unique ID provided in the URL path (:id)
    const patient = await Patient.findById(req.params.id);
    // Send that patient's data back
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE PATIENT: Adds a new patient manually (Admin feature)
export const createPatient = async (req, res) => {
  try {
    // Create a new patient record using all the information sent in the request body
    const patient = new Patient(req.body);
    // Save it to the database
    await patient.save();
    // Respond with a 201 (Created) status and the new patient data
    res.status(201).json(patient);
  } catch (error) {
    // If the data was invalid, send a 400 (Bad Request) status
    res.status(400).json({ error: error.message });
  }
};

// UPDATE PATIENT: Changes information for an existing patient
export const updatePatient = async (req, res) => {
  try {
    // Find the patient by ID and update them with the new data from the request body
    // { new: true } ensures we get back the updated information, not the old one
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // Send back the updated patient data
    res.json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE PATIENT: Removes a patient from the database forever
export const deletePatient = async (req, res) => {
  try {
    // Find the record by ID and remove it
    await Patient.findByIdAndDelete(req.params.id);
    // Send a confirmation message
    res.json({ message: 'Patient deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// SEARCH PATIENTS: Finds patients by their name or email
export const searchPatients = async (req, res) => {
  try {
    // Extract the search query from the URL (e.g., ?query=john)
    const { query } = req.query;
    // If the query is completely empty, don't search, just return an empty list
    if (!query) return res.json([]);

    // Safety check: Escape special characters like '(' or '*' so the database doesn't crash
    const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Search for any patient whose first name, last name, or email matches the query
    // '$regex' allows partial matches (e.g., 'jo' matches 'John')
    // '$options: i' makes the search case-insensitive (ignores Capital letters)
    const patients = await Patient.find({
      $or: [
        { firstName: { $regex: safeQuery, $options: 'i' } },
        { lastName: { $regex: safeQuery, $options: 'i' } },
        { email: { $regex: safeQuery, $options: 'i' } }
      ]
    });
    // Send the list of matching results
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
