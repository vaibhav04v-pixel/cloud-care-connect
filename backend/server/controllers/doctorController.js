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
    // If frontend sends department instead of departmentId
    if (req.body.department && !req.body.departmentId) {
      req.body.departmentId = req.body.department;
    }
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateDoctor = async (req, res) => {
  try {
    if (req.body.department && !req.body.departmentId) {
      req.body.departmentId = req.body.department;
    }
    await Doctor.update(req.body, { where: { id: req.params.id } });
    const doctor = await Doctor.findByPk(req.params.id, {
      include: [{ model: Department, as: 'department' }]
    });
    res.json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    await Doctor.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Doctor deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchDoctors = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.json([]);

    const doctors = await Doctor.findAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.like]: `%${query}%` } },
          { lastName: { [Op.like]: `%${query}%` } },
          { specialization: { [Op.like]: `%${query}%` } }
        ]
      },
      include: [{ model: Department, as: 'department' }]
    });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
