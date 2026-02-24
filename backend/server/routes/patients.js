// Import express to manage routes
import express from 'express';
// Import logic from the Patient Controller
import * as patientController from '../controllers/patientController.js';

// Initialize a new router
const router = express.Router();

// URL: GET /api/patients/search -> Search for patients by name or email
// (Note: This must be ABOVE /:id so the word 'search' isn't confused for a patient ID)
router.get('/search', patientController.searchPatients);

// URL: GET /api/patients -> Get a full list of all patients
router.get('/', patientController.getPatients);

// URL: GET /api/patients/:id -> Get specific details for ONE patient
router.get('/:id', patientController.getPatientById);

// URL: POST /api/patients -> Create a brand new patient record
router.post('/', patientController.createPatient);

// URL: PUT /api/patients/:id -> Update an existing patient's information
router.put('/:id', patientController.updatePatient);

// URL: DELETE /api/patients/:id -> Completely remove a patient record
router.delete('/:id', patientController.deletePatient);

// Export for use in server.js
export default router;
