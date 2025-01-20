import express from 'express';
const router = express.Router();
import userRoutes from './users.js';
import productRoutes from './products.js';
// Rutas de la API
router.use(userRoutes);
router.use(productRoutes);
export default router;
