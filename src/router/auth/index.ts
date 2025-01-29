import { Router, Request, Response, NextFunction } from 'express';
const router = Router();
import jwt from 'jsonwebtoken';
import { getCerts } from '../../helpers/getCerts.js';
import { ctrlScriptAuth } from './winccoaAuth.js';

/**
 *  @openapi
 * /auth/login:
 *   post:
 *     summary: Obtener el token de autenticación
 *     servers:
 *       - url: /
 *         description: Servidor base sin versión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     tags:
 *       - Common
 *     responses:
 *       200:
 *         description: Token de acceso para las demás rutas
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       403:
 *         description: Token expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
*/
router.post('/login', async (req: Request, res: Response) => {

  const { username, password }: { username: string; password: string } = req.body;
  // const user = (users as any)[username];
  let success = await ctrlScriptAuth(username, password) as boolean
  if (success) {
    const token = jwt.sign({ username }, getCerts().key, { expiresIn: '1h', algorithm: 'RS256' });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// //Ejemplo de ruta protegida
// router.get('/protected', authMiddleware, (req, res) => {
//     res.send('This is a protected route');
//   });
export default router;