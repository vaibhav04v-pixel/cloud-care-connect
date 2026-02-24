// This route handles Dashboard analytics
import express from 'express';
import { getDashboardStats } from '../controllers/dashboardController.js';

const router = express.Router();

// URL: GET /api/dashboard/stats
// This single URL provides all the numbers and recent items for the Dashboard cards
router.get('/stats', getDashboardStats);

export default router;
