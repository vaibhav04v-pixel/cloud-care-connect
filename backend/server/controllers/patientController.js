import { Patient } from '../models/index.js';
import { Op } from 'sequelize';

export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    await patient.update(req.body);
    res.json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const deletedAmount = await Patient.destroy({ where: { id: req.params.id } });
    if (!deletedAmount) return res.status(404).json({ message: 'Patient not found' });
    res.json({ message: 'Patient deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchPatients = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.json([]);

    const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const patients = await Patient.findAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.like]: `%${safeQuery}%` } },
          { lastName: { [Op.like]: `%${safeQuery}%` } },
          { email: { [Op.like]: `%${safeQuery}%` } }
        ]
      }
    });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
