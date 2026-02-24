// Import express and our controller logic
import express from 'express';
import * as doctorController from '../controllers/doctorController.js';

// Start a new router
const router = express.Router();

// URL: GET /api/doctors/search -> Find doctors by name or specialization
router.get('/search', doctorController.searchDoctors);

// URL: GET /api/doctors/department/:departmentId -> Filter doctors by their wing
router.get('/department/:departmentId', doctorController.getDoctorsByDepartment);

// URL: GET /api/doctors -> Get the list of all hospital doctors
router.get('/', doctorController.getDoctors);

// URL: GET /api/doctors/:id -> Get profile for a specific doctor
router.get('/:id', doctorController.getDoctorById);

// URL: POST /api/doctors -> Register a new doctor into the system
router.post('/', doctorController.createDoctor);

// URL: PUT /api/doctors/:id -> Edit a doctor's profile (e.g., change phone or status)
router.put('/:id', doctorController.updateDoctor);

// URL: DELETE /api/doctors/:id -> Terminate a doctor's database entry
router.delete('/:id', doctorController.deleteDoctor);

// Export of router
export default router;
