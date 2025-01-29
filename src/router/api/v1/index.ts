import express from 'express';
const router = express.Router();
import userRoutes from './users.js';
import productRoutes from './products.js';
import winccoaTestRoutes from './routest.js';

// Rutas de la API
router.use(userRoutes);
router.use(productRoutes);
router.use(winccoaTestRoutes);

export default router

