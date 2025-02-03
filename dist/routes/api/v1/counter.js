import express from 'express';
import winccoa from "../../../utils/globalWinccoaManager.js";
const router = express.Router();
/**
 *  @openapi
 * /counters:
 *   get:
 *     summary: Obtener todos los contadores
 *     tags:
 *       - Contadores
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de contadores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Counter"
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       500:
 *         description: Internal Server Problem
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
*/
router.get('/counters', async (req, res) => {
    let units;
    try {
        let systemName = winccoa.getSystemName();
        units = await winccoa.dpGet(systemName + 'nodeclass.count');
        console.info('DP Count: ' + units);
        res.status(200).json([{ counter: units }]);
    }
    catch (err) {
        res.status(500).send("some happens: " + err);
    }
});
export default router;
