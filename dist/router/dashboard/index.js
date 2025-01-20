import express from 'express';
import { requireAuth } from '../auth/index.js';
import path from 'path';
const router = express.Router();
router.get("/", requireAuth, (req, res) => {
    if (req.session.user) {
        // res.send(`Bienvenido, ${req.session.user}`);
        res.sendFile(path.join(__dirname, '/index.html'));
    }
    else {
        res.status(403).send('No estás autenticado');
    }
});
export { router };
