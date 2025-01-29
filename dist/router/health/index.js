import express from 'express';
const router = express.Router();
/**
 * @openapi
 * /health:
 *   get:
 *     summary: Verificar el estado de salud del servidor
 *     tags:
 *       - Common
 *     servers:
 *       - url: /
 *         description: Servidor base sin versión
 *     responses:
 *       200:
 *         description: El servicio está funcionando correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: El servicio está funcionando correctamente
 */
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'El servicio está funcionando correctamente' });
});
export default router;
