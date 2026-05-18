import { Department, Doctor } from '../models/index.js';

export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll({
      include: [{ model: Doctor, as: 'headDoctor' }]
    });
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id, {
      include: [{ model: Doctor, as: 'headDoctor' }]
    });
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createDepartment = async (req, res) => {
  try {
    if (req.body.doctor && !req.body.headDoctorId) {
      req.body.headDoctorId = req.body.doctor;
    }
    const department = await Department.create(req.body);
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    if (req.body.doctor && !req.body.headDoctorId) {
      req.body.headDoctorId = req.body.doctor;
    }
    await Department.update(req.body, { where: { id: req.params.id } });
    const department = await Department.findByPk(req.params.id);
    res.json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    await Department.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Department deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
