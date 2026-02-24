// Import the Department database model
import Department from '../models/Department.js';

// GET ALL DEPARTMENTS: Fetches a list of all wings/divisions in the hospital
export const getDepartments = async (req, res) => {
  try {
    // Get all records and fill in details for the head doctor
    const departments = await Department.find().populate('doctor');
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ONE DEPARTMENT: Fetches details for a specific department (e.g., Surgery)
export const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id).populate('doctor');
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE DEPARTMENT: Establishes a new wing in the hospital
export const createDepartment = async (req, res) => {
  try {
    const department = new Department(req.body);
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE DEPARTMENT: Modifies department settings, floor, or phone
export const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE DEPARTMENT: Removes a department from the system
export const deleteDepartment = async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: 'Department deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
