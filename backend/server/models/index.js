import User from './User.js';
import Patient from './Patient.js';
import Doctor from './Doctor.js';
import Department from './Department.js';
import Appointment from './Appointment.js';

// Define Associations

// User -> Patient (1-to-1)
User.hasOne(Patient, { foreignKey: 'userId', as: 'patientProfile' });
Patient.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Department -> Doctor (1-to-Many)
Department.hasMany(Doctor, { foreignKey: 'departmentId', as: 'doctors' });
Doctor.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });

// Department -> Head Doctor (1-to-1)
Department.belongsTo(Doctor, { foreignKey: 'headDoctorId', as: 'headDoctor' });

// Doctor -> Appointment (1-to-Many)
Doctor.hasMany(Appointment, { foreignKey: 'doctorId', as: 'appointments' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });

// Patient -> Appointment (1-to-Many)
Patient.hasMany(Appointment, { foreignKey: 'patientId', as: 'appointments' });
Appointment.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });

// Department -> Appointment (1-to-Many)
Department.hasMany(Appointment, { foreignKey: 'departmentId', as: 'appointments' });
Appointment.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });

export { User, Patient, Doctor, Department, Appointment };
