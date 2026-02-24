// Import routing framework and our business logic
import express from 'express';
import * as appointmentController from '../controllers/appointmentController.js';

// Setup router
const router = express.Router();

// URL: GET /api/appointments/stats/overview -> Totals for Dashboard
router.get('/stats/overview', appointmentController.getStats);

// URL: GET /api/appointments -> Get list of all hospital visits
router.get('/', appointmentController.getAppointments);

// URL: GET /api/appointments/patient/:patientId -> Get appointments for a specific user
router.get('/patient/:patientId', appointmentController.getAppointmentsByPatient);

// URL: GET /api/appointments/doctor/:doctorId -> Get a doctor's agenda
router.get('/doctor/:doctorId', appointmentController.getAppointmentsByDoctor);

// URL: GET /api/appointments/:id -> Details for one specific scheduled visit
router.get('/:id', appointmentController.getAppointmentById);

// URL: POST /api/appointments -> Book a new medical visit
router.post('/', appointmentController.createAppointment);

// URL: PUT /api/appointments/:id -> Reschedule or update appointment notes
router.put('/:id', appointmentController.updateAppointment);

// URL: PATCH /api/appointments/:id/cancel -> Mark an appointment as explicitly 'Cancelled'
router.patch('/:id/cancel', appointmentController.cancelAppointment);

// URL: DELETE /api/appointments/:id -> Wipe an appointment from history
router.delete('/:id', appointmentController.deleteAppointment);

// Export router
export default router;
