import Patient from './models/Patient.js';
import Doctor from './models/Doctor.js';
import Department from './models/Department.js';
import Appointment from './models/Appointment.js';
import User from './models/User.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectDB = async () => {
  try {
    // await mongoose.connect(process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

const seedDB = async () => {
  try {
    // Clear existing data
    await Patient.deleteMany({});
    await Doctor.deleteMany({});
    await Department.deleteMany({});
    await Appointment.deleteMany({});
    await User.deleteMany({});

    // Create Admin User
    await User.create({
      name: 'Hospital Admin',
      email: 'admin@cloudcare.com',
      password: 'password', // Matching the frontend hint
      role: 'admin'
    });

    // Create departments
    const cardiology = await Department.create({
      name: 'Cardiology',
      description: 'Heart and cardiovascular diseases',
      floor: 2,
      phone: '555-0101'
    });

    const neurology = await Department.create({
      name: 'Neurology',
      description: 'Brain and nervous system disorders',
      floor: 3,
      phone: '555-0102'
    });

    const orthopedics = await Department.create({
      name: 'Orthopedics',
      description: 'Bone and joint disorders',
      floor: 4,
      phone: '555-0103'
    });

    const pediatrics = await Department.create({
      name: 'Pediatrics',
      description: 'Medical care for infants, children, and adolescents',
      floor: 5,
      phone: '555-0104'
    });

    const generalMedicine = await Department.create({
      name: 'General Medicine',
      description: 'Comprehensive medical care for adults',
      floor: 1,
      phone: '555-0105'
    });

    const dermatology = await Department.create({
      name: 'Dermatology',
      description: 'Skin, hair, and nail conditions',
      floor: 2,
      phone: '555-0106'
    });

    // Create doctors
    // D001
    await Doctor.create({
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@cloudcare.com',
      phone: '+1 (555) 123-4567',
      specialization: 'Cardiology',
      department: cardiology._id,
      experience: 15,
      qualifications: ['MD', 'FACC'],
      bio: 'Specializes in interventional cardiology and heart failure management.',
      rating: 4.9,
      totalPatients: 1250,
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
      availableTime: '9:00 AM - 5:00 PM',
      consultationFee: 150,
      avatar: 'https://i.pravatar.cc/150?img=9'
    });

    // D002
    await Doctor.create({
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@cloudcare.com',
      phone: '+1 (555) 123-4568',
      specialization: 'Interventional Cardiology',
      department: cardiology._id,
      experience: 12,
      qualifications: ['MD', 'PhD'],
      bio: 'Expert in minimally invasive cardiac procedures and advanced imaging.',
      rating: 4.8,
      totalPatients: 980,
      availableDays: ['Monday', 'Wednesday', 'Thursday', 'Saturday'],
      availableTime: '10:00 AM - 6:00 PM',
      consultationFee: 140,
      avatar: 'https://i.pravatar.cc/150?img=13'
    });

    // D003
    await Doctor.create({
      firstName: 'Emily',
      lastName: 'Rodriguez',
      email: 'emily.rodriguez@cloudcare.com',
      phone: '+1 (555) 123-4569',
      specialization: 'Pediatric Cardiology',
      department: cardiology._id,
      experience: 10,
      qualifications: ['MD', 'FAAP'],
      bio: 'Specializes in congenital heart defects and pediatric cardiac care.',
      rating: 4.9,
      totalPatients: 850,
      availableDays: ['Tuesday', 'Thursday', 'Friday'],
      availableTime: '9:00 AM - 3:00 PM',
      consultationFee: 130,
      avatar: 'https://i.pravatar.cc/150?img=45'
    });

    // D004
    await Doctor.create({
      firstName: 'David',
      lastName: 'Thompson',
      email: 'david.thompson@cloudcare.com',
      phone: '+1 (555) 234-5678',
      specialization: 'Neurology',
      department: neurology._id,
      experience: 18,
      qualifications: ['MD', 'FAAN'],
      bio: 'Expert in treating complex neurological disorders like epilepsy and stroke.',
      rating: 4.7,
      totalPatients: 1100,
      availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
      availableTime: '8:00 AM - 4:00 PM',
      consultationFee: 160,
      avatar: 'https://i.pravatar.cc/150?img=12'
    });

    // D005
    await Doctor.create({
      firstName: 'Jennifer',
      lastName: 'Lee',
      email: 'jennifer.lee@cloudcare.com',
      phone: '+1 (555) 234-5679',
      specialization: 'Neurosurgery',
      department: neurology._id,
      experience: 14,
      qualifications: ['MD', 'FACS'],
      bio: 'Specializes in minimally invasive brain and spine surgery.',
      rating: 4.9,
      totalPatients: 720,
      availableDays: ['Monday', 'Wednesday', 'Friday'],
      availableTime: '7:00 AM - 3:00 PM',
      consultationFee: 200,
      avatar: 'https://i.pravatar.cc/150?img=47'
    });

    // D006
    await Doctor.create({
      firstName: 'Robert',
      lastName: 'Martinez',
      email: 'robert.martinez@cloudcare.com',
      phone: '+1 (555) 345-6789',
      specialization: 'Orthopedic Surgery',
      department: orthopedics._id,
      experience: 16,
      qualifications: ['MD', 'FAAOS'],
      bio: 'Expert in joint replacement surgery and sports medicine.',
      rating: 4.8,
      totalPatients: 1350,
      availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
      availableTime: '9:00 AM - 5:00 PM',
      consultationFee: 145,
      avatar: 'https://i.pravatar.cc/150?img=14'
    });

    // D007
    await Doctor.create({
      firstName: 'Amanda',
      lastName: 'Taylor',
      email: 'amanda.taylor@cloudcare.com',
      phone: '+1 (555) 345-6790',
      specialization: 'Sports Medicine',
      department: orthopedics._id,
      experience: 11,
      qualifications: ['MD', 'FACSM'],
      bio: 'Specializes in athletic injury prevention and treatment.',
      rating: 4.7,
      totalPatients: 890,
      availableDays: ['Monday', 'Tuesday', 'Friday', 'Saturday'],
      availableTime: '10:00 AM - 6:00 PM',
      consultationFee: 135,
      avatar: 'https://i.pravatar.cc/150?img=48'
    });

    // D008
    await Doctor.create({
      firstName: 'James',
      lastName: 'Wilson',
      email: 'james.wilson@cloudcare.com',
      phone: '+1 (555) 456-7890',
      specialization: 'General Practice',
      department: generalMedicine._id,
      experience: 20,
      qualifications: ['MD', 'FAAFP'],
      bio: 'Experienced family physician providing comprehensive primary care.',
      rating: 4.8,
      totalPatients: 2100,
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      availableTime: '8:00 AM - 6:00 PM',
      consultationFee: 100,
      avatar: 'https://i.pravatar.cc/150?img=15'
    });

    // D009
    await Doctor.create({
      firstName: 'Patricia',
      lastName: 'Anderson',
      email: 'patricia.anderson@cloudcare.com',
      phone: '+1 (555) 567-8901',
      specialization: 'Dermatology',
      department: dermatology._id,
      experience: 13,
      qualifications: ['MD', 'FAAD'],
      bio: 'Expert in medical and cosmetic dermatology.',
      rating: 4.9,
      totalPatients: 1050,
      availableDays: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
      availableTime: '9:00 AM - 5:00 PM',
      consultationFee: 125,
      avatar: 'https://i.pravatar.cc/150?img=44'
    });

    // D010
    const doctor10 = await Doctor.create({
      firstName: 'Christopher',
      lastName: 'Brown',
      email: 'christopher.brown@cloudcare.com',
      phone: '+1 (555) 678-9012',
      specialization: 'Pediatrics',
      department: pediatrics._id,
      experience: 17,
      qualifications: ['MD', 'FAAP'],
      bio: 'Compassionate pediatrician dedicated to comprehensive child care.',
      rating: 4.9,
      totalPatients: 1800,
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      availableTime: '8:00 AM - 4:00 PM',
      consultationFee: 110,
      avatar: 'https://i.pravatar.cc/150?img=51'
    });
    // Create patients
    const patient1 = await Patient.create({
      firstName: 'James',
      lastName: 'Wilson',
      email: 'james.wilson@email.com',
      phone: '555-2001',
      dateOfBirth: new Date('1975-03-15'),
      gender: 'Male',
      bloodGroup: 'O+',
      address: '123 Main St, City',
      emergencyContact: '555-2011',
      status: 'Active'
    });

    const patient2 = await Patient.create({
      firstName: 'Emily',
      lastName: 'Brown',
      email: 'emily.brown@email.com',
      phone: '555-2002',
      dateOfBirth: new Date('1988-07-22'),
      gender: 'Female',
      bloodGroup: 'A+',
      address: '456 Oak Ave, City',
      emergencyContact: '555-2012',
      status: 'Active'
    });

    const allDoctors = await Doctor.find({});
    // Need to find created doctors for appointments
    // Assuming the order of creation, or find by name
    const doc1 = await Doctor.findOne({ firstName: 'Sarah', lastName: 'Johnson' });
    const doc2 = await Doctor.findOne({ firstName: 'Michael', lastName: 'Chen' });

    // Create appointments
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    await Appointment.create({
      patient: patient1._id,
      doctor: doc1._id,
      department: cardiology._id,
      appointmentDate: tomorrow,
      time: '10:00 AM',
      reason: 'Regular checkup',
      status: 'Scheduled'
    });

    await Appointment.create({
      patient: patient2._id,
      doctor: doc2 ? doc2._id : doc1._id, // Fallback if doc2 not found
      department: neurology._id,
      appointmentDate: tomorrow,
      time: '2:00 PM',
      reason: 'Neurological evaluation',
      status: 'Scheduled'
    });

    console.log('✅ Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

connectDB().then(seedDB);
