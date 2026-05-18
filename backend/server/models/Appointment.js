import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  appointmentDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
  },
  reason: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM('Scheduled', 'Completed', 'Cancelled', 'No-show'),
    defaultValue: 'Scheduled',
  },
  notes: {
    type: DataTypes.TEXT,
  },
  duration: {
    type: DataTypes.INTEGER,
    defaultValue: 30,
  },
}, {
  timestamps: true,
});

export default Appointment;
