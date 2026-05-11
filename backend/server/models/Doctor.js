import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Doctor = sequelize.define('Doctor', {
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
  specialization: {
    type: DataTypes.STRING
  },
  experience: {
    type: DataTypes.INTEGER
  },
  qualifications: {
    type: DataTypes.JSON, // Array of strings stored as JSON
    defaultValue: []
  },
  bio: {
    type: DataTypes.TEXT
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  totalPatients: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  availableDays: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  availableTime: {
    type: DataTypes.STRING
  },
  consultationFee: {
    type: DataTypes.FLOAT
  },
  avatar: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Active'
  }
}, {
  timestamps: true
});

export default Doctor;
