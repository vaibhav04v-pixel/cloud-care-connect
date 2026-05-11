import { Appointment, Patient, Doctor, Department } from '../models/index.js';
import { Op } from 'sequelize';

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [
        { model: Patient, as: 'patient' },
        { model: Doctor, as: 'doctor' },
        { model: Department, as: 'department' }
      ]
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        { model: Patient, as: 'patient' },
        { model: Doctor, as: 'doctor' },
        { model: Department, as: 'department' }
      ]
    });
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAppointmentsByPatient = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { patientId: req.params.patientId },
      include: [
        { model: Doctor, as: 'doctor' },
        { model: Department, as: 'department' }
      ]
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAppointmentsByDoctor = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { doctorId: req.params.doctorId },
      include: [
        { model: Patient, as: 'patient' },
        { model: Department, as: 'department' }
      ]
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, date, time, department, reason } = req.body;

    let patient = await Patient.findOne({ where: { email } });
    if (!patient) {
      patient = await Patient.create({
        firstName,
        lastName,
        email,
        phone
      });
    }

    let departmentId = null;
    if (department) {
      const deptDoc = await Department.findOne({
        where: { name: { [Op.like]: department } }
      });
      if (deptDoc) {
        departmentId = deptDoc.id;
      }
    }

    const appointment = await Appointment.create({
      patientId: patient.id,
      appointmentDate: date,
      time,
      departmentId,
      reason,
      status: 'Scheduled'
    });

    res.status(201).json(appointment);
  } catch (error) {
    console.error('Booking Error:', error);
    res.status(400).json({ error: error.message });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    await appointment.update(req.body);
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    await appointment.update({ status: 'Cancelled' });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const deletedAmount = await Appointment.destroy({ where: { id: req.params.id } });
    if (!deletedAmount) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStats = async (req, res) => {
  try {
    const total = await Appointment.count();
    const completed = await Appointment.count({ where: { status: 'Completed' } });
    const scheduled = await Appointment.count({ where: { status: 'Scheduled' } });
    const cancelled = await Appointment.count({ where: { status: 'Cancelled' } });

    res.json({ total, completed, scheduled, cancelled });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
