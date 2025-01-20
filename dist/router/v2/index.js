import express from 'express';
const router = express.Router();
import userRoutes from './users.js';
import productRoutes from './products.js';
// Rutas de la API
router.use('/users', userRoutes);
router.use('/products', productRoutes);
export default router;
