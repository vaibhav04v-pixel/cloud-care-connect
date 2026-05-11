import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  appointmentDate: {
    type: DataTypes.DATEONLY, // Change to DATEONLY to make searching simpler, or just DATE. Date is better based on standard seed values.
    allowNull: false
  },
  time: {
    type: DataTypes.STRING
  },
  reason: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ENUM('Scheduled', 'Completed', 'Cancelled', 'No-show'),
    defaultValue: 'Scheduled'
  },
  notes: {
    type: DataTypes.TEXT
  },
  duration: {
    type: DataTypes.INTEGER,
    defaultValue: 30
  }
}, {
  timestamps: true
});

export default Appointment;
