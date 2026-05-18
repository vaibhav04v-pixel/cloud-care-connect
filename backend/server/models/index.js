import sequelize from '../config/database.js';
import User from './User.js';
import Patient from './Patient.js';
import Doctor from './Doctor.js';
import Department from './Department.js';
import Appointment from './Appointment.js';

// Define Associations

// User <-> Patient (One-to-One)
User.hasOne(Patient, { foreignKey: 'userId', as: 'patientProfile' });
Patient.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Department <-> Doctor (One-to-Many for doctors in department)
Department.hasMany(Doctor, { foreignKey: 'departmentId', as: 'doctors' });
Doctor.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });

// Department <-> Doctor (One-to-One for department head)
Department.belongsTo(Doctor, { foreignKey: 'headDoctorId', as: 'headDoctor' });

// Appointment Associations
Appointment.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });
Patient.hasMany(Appointment, { foreignKey: 'patientId', as: 'appointments' });

Appointment.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });
Doctor.hasMany(Appointment, { foreignKey: 'doctorId', as: 'appointments' });

Appointment.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });
Department.hasMany(Appointment, { foreignKey: 'departmentId', as: 'appointments' });

export {
  sequelize,
  User,
  Patient,
  Doctor,
  Department,
  Appointment
};
