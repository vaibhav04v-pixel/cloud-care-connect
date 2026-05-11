import { Patient, Doctor, Department, Appointment, User } from './models/index.js';
import sequelize from './config/database.js';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connected');
  } catch (error) {
    console.error('MySQL connection error:', error.message);
    process.exit(1);
  }
};

const seedDB = async () => {
  try {
    // Drop and recreate all tables
    await sequelize.sync({ force: true });
    
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
      departmentId: cardiology.id,
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
      departmentId: cardiology.id,
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
      departmentId: cardiology.id,
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
      departmentId: neurology.id,
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
      departmentId: neurology.id,
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
      departmentId: orthopedics.id,
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
      departmentId: orthopedics.id,
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
      departmentId: generalMedicine.id,
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
      departmentId: dermatology.id,
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
    await Doctor.create({
      firstName: 'Christopher',
      lastName: 'Brown',
      email: 'christopher.brown@cloudcare.com',
      phone: '+1 (555) 678-9012',
      specialization: 'Pediatrics',
      departmentId: pediatrics.id,
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
      dateOfBirth: '1975-03-15',
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
      dateOfBirth: '1988-07-22',
      gender: 'Female',
      bloodGroup: 'A+',
      address: '456 Oak Ave, City',
      emergencyContact: '555-2012',
      status: 'Active'
    });

    const doc1 = await Doctor.findOne({ where: { firstName: 'Sarah', lastName: 'Johnson' } });
    const doc2 = await Doctor.findOne({ where: { firstName: 'Michael', lastName: 'Chen' } });

    // Create appointments
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomoFormatted = tomorrow.toISOString().split('T')[0];

    await Appointment.create({
      patientId: patient1.id,
      doctorId: doc1.id,
      departmentId: cardiology.id,
      appointmentDate: tomoFormatted,
      time: '10:00 AM',
      reason: 'Regular checkup',
      status: 'Scheduled'
    });

    await Appointment.create({
      patientId: patient2.id,
      doctorId: doc2 ? doc2.id : doc1.id, // Fallback if doc2 not found
      departmentId: neurology.id,
      appointmentDate: tomoFormatted,
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
