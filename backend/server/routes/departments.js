// Set up routing
import express from 'express';
import * as departmentController from '../controllers/departmentController.js';

const router = express.Router();

// URL: GET /api/departments -> List all divisions (Surgery, Pediatrics, etc.)
router.get('/', departmentController.getDepartments);

// URL: GET /api/departments/:id -> Full profile for a hospital division
router.get('/:id', departmentController.getDepartmentById);

// URL: POST /api/departments -> Create a new hospital division
router.post('/', departmentController.createDepartment);

// URL: PUT /api/departments/:id -> Modify department details (Floor, Contact)
router.put('/:id', departmentController.updateDepartment);

// URL: DELETE /api/departments/:id -> Remove a division from system
router.delete('/:id', departmentController.deleteDepartment);

// Export router
export default router;
