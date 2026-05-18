import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Doctor = sequelize.define('Doctor', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialization: {
    type: DataTypes.STRING,
  },
  experience: {
    type: DataTypes.INTEGER,
  },
  qualifications: {
    type: DataTypes.JSON, // Array of strings
  },
  bio: {
    type: DataTypes.TEXT,
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  totalPatients: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  availableSlots: {
    type: DataTypes.JSON,
  },
  avatar: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Active',
  },
  availableDays: {
    type: DataTypes.JSON,
  },
  availableTime: {
    type: DataTypes.STRING,
  },
  consultationFee: {
    type: DataTypes.FLOAT,
  }
}, {
  timestamps: true,
});

export default Doctor;
