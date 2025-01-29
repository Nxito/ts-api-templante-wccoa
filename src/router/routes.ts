/* Rutas de la API*/
import express from 'express';
const router = express.Router();
import swagger from './api/api-doc.js';
import api_v1 from './api/v1/index.js';
import api_v2 from './api/v2/index.js';
import loginRoutes from './auth/index.js';
import healthRoutes from './health/index.js';
import authMiddleware from './auth/middleware.js';

//Rutas de autorizacion
router.use("/auth", loginRoutes);
// Ruta de chequeo del estado del servidor
router.use(healthRoutes);
//Ejemplo ruta segura
router.use('/v1', authMiddleware, api_v1);
//Ejemplo ruta publica
router.use('/v2', api_v2);
// Documentación de Swagger
router.use("/api-doc", swagger);

export default router