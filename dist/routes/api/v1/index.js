import express from 'express';
const router = express.Router();
import userRoutes from './users.js';
import winccoaTestRoutes from './counter.js';
// Rutas de la API
router.use(userRoutes);
router.use(winccoaTestRoutes);
export default router;
