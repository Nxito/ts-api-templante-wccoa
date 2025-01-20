import {Router , Request, Response,NextFunction } from 'express';
const router = Router();
import jwt  from 'jsonwebtoken';
import { getCerts } from '../../helpers/getCerts.js';
import authMiddleware from './middleware.js';
import ctrlScriptAuth from './winccoaAuth.js';

/**
 * 
 */
router.post('/login', async (req: Request, res: Response) => {

  const { username, password }: { username: string; password: string } = req.body;
 // const user = (users as any)[username];
  let success = await ctrlScriptAuth(username, password) as boolean
  if (success) {
      const token = jwt.sign({ username }, getCerts().key, { expiresIn: '1h' ,algorithm: 'RS256'});
      res.json({ token });
  } else {
      res.status(401).send('Invalid credentials');
  }
});

//Ejemplo de ruta protegida
router.get('/protected', authMiddleware, (req, res) => {
    res.send('This is a protected route');
  });
export default router;