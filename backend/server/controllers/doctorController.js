import { Doctor, Department } from '../models/index.js';
import { Op } from 'sequelize';

export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      include: [{ model: Department, as: 'department' }]
    });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id, {
      include: [{ model: Department, as: 'department' }]
    });
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDoctorsByDepartment = async (req, res) => {
  try {
    const doctors = await Doctor.findAll({ 
      where: { departmentId: req.params.departmentId },
      include: [{ model: Department, as: 'department' }]
    });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createDoctor = async (req, res) => {
  try {
    const data = { ...req.body };
    // Map 'department' ID reference to the Sequelize 'departmentId' foreign key
    if (data.department && typeof data.department === 'string' || typeof data.department === 'number') {
        data.departmentId = data.department;
        delete data.department;
    }
    const doctor = await Doctor.create(data);
    res.status(201).json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    
    const data = { ...req.body };
    if (data.department) {
        data.departmentId = data.department;
        delete data.department;
    }
    
    await doctor.update(data);
    res.json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    const deletedAmount = await Doctor.destroy({ where: { id: req.params.id } });
    if (!deletedAmount) return res.status(404).json({ message: 'Doctor not found' });
    res.json({ message: 'Doctor deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchDoctors = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.json([]);

    const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const doctors = await Doctor.findAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.like]: `%${safeQuery}%` } },
          { lastName: { [Op.like]: `%${safeQuery}%` } },
          { specialization: { [Op.like]: `%${safeQuery}%` } }
        ]
      },
      include: [{ model: Department, as: 'department' }]
    });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
