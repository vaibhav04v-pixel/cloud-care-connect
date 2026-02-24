// Import all database models to gather statistics
import Patient from '../models/Patient.js';
import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';
import Department from '../models/Department.js';

// GET DASHBOARD STATS: Prepares the high-level summary seen on the homepage analytics
export const getDashboardStats = async (req, res) => {
    try {
        // STEP 1: Get raw counts for the summary cards
        const totalPatients = await Patient.countDocuments();
        const totalDoctors = await Doctor.countDocuments();
        const totalAppointments = await Appointment.countDocuments();
        const totalDepartments = await Department.countDocuments();

        // STEP 2: Fetch the 5 most recently created appointments
        const recentAppointments = await Appointment.find()
            .sort({ createdAt: -1 }) // Sort by date (newest first)
            .limit(5) // Only take the top 5
            .populate('patient', 'firstName lastName') // Get patient names only
            .populate('doctor', 'firstName lastName') // Get doctor names only
            // Ensure ID fields are included so we can click on them in the UI
            .select('time status appointmentDate reason patient doctor');

        // STEP 3: Format the data for the Frontend
        // We transform the database objects into simple, easy-to-read strings
        const formattedRecent = recentAppointments.map(app => ({
            id: app._id,
            // Safety check: If patient is missing, show 'Unknown'
            patient: app.patient ? `${app.patient.firstName} ${app.patient.lastName}` : 'Unknown Patient',
            // Safety check: If doctor is missing, show 'Unassigned'
            doctor: app.doctor ? `Dr. ${app.doctor.firstName} ${app.doctor.lastName}` : 'No Doctor Assigned',
            time: app.time,
            status: app.status
        }));

        // STEP 4: Send the combined data back in one go
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
        // Log error if stats fail to generate
        res.status(500).json({ error: error.message });
    }
};
