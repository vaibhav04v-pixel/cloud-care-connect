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
    if (!department) return res.status(404).json({ message: 'Department not found' });
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createDepartment = async (req, res) => {
  try {
    // Note: If req.body.doctor is passed, it should be mapped to headDoctorId
    const data = { ...req.body };
    if (data.doctor) {
      data.headDoctorId = data.doctor;
      delete data.doctor;
    }
    const department = await Department.create(data);
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department) return res.status(404).json({ message: 'Department not found' });
    
    const data = { ...req.body };
    if (data.doctor) {
      data.headDoctorId = data.doctor;
      delete data.doctor;
    }

    await department.update(data);
    res.json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const deletedAmount = await Department.destroy({ where: { id: req.params.id } });
    if (!deletedAmount) return res.status(404).json({ message: 'Department not found' });
    res.json({ message: 'Department deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
