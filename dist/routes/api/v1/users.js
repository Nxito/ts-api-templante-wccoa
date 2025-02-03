import express from 'express';
import { WinccoaCtrlScript } from 'winccoa-manager';
import winccoa from '../../../utils/globalWinccoaManager.js';
const router = express.Router();
/**
 *  @openapi
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags:
 *       - Usuarios
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/User"
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
*/
router.get('/users', async (req, res) => {
    const wccoaScript = new WinccoaCtrlScript(winccoa, `dyn_mapping getAllUsers() 
            {
                return getAllUsersPVSS();
            }`);
    let userList = await wccoaScript.start('getAllUsers');
    res.status(200).json(userList);
});
export default router;
