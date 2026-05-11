import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Patient = sequelize.define('Patient', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    set(val) {
      if (val) {
        this.setDataValue('email', val.toLowerCase().trim());
      }
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other')
  },
  bloodGroup: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  emergencyContact: {
    type: DataTypes.STRING
  },
  insurance: {
    type: DataTypes.STRING
  },
  medicalHistory: {
    type: DataTypes.JSON, // Array of strings stored as JSON
    defaultValue: []
  },
  avatar: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Active'
  },
  lastVisit: {
    type: DataTypes.DATE
  }
}, {
  timestamps: true
});

export default Patient;
