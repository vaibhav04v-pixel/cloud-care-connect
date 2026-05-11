import { Patient, Doctor, Appointment, Department } from '../models/index.js';

export const getDashboardStats = async (req, res) => {
    try {
        const totalPatients = await Patient.count();
        const totalDoctors = await Doctor.count();
        const totalAppointments = await Appointment.count();
        const totalDepartments = await Department.count();

        const recentAppointments = await Appointment.findAll({
            order: [['createdAt', 'DESC']],
            limit: 5,
            include: [
                { model: Patient, as: 'patient', attributes: ['firstName', 'lastName'] },
                { model: Doctor, as: 'doctor', attributes: ['firstName', 'lastName'] }
            ],
            attributes: ['id', 'time', 'status', 'appointmentDate', 'reason']
        });

        const formattedRecent = recentAppointments.map(app => ({
            id: app.id,
            patient: app.patient ? `${app.patient.firstName} ${app.patient.lastName}` : 'Unknown Patient',
            doctor: app.doctor ? `Dr. ${app.doctor.firstName} ${app.doctor.lastName}` : 'No Doctor Assigned',
            time: app.time,
            status: app.status
        }));

        res.json({
            overview: {
                totalPatients,
                totalDoctors,
                appointments: totalAppointments,
                departments: totalDepartments
            },
            recentAppointments: formattedRecent
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
