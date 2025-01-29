import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getCerts } from '../../helpers/getCerts.js';
import { setManagerUserByName } from './winccoaAuth.js';
import winccoa from "../../helpers/globalWinccoaManager.js"

// Middleware para autenticar el token Bearer
function authBearerToken(req: Request, res: Response, next: NextFunction): any {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // Bearer <token>

    if (token == null) return res.sendStatus(401);  // No token present

    jwt.verify(token, getCerts().key, (err, user) => {
        if (err) return res.sendStatus(403);  // Invalid token

        req.user = user as string;

        const username = (user as JwtPayload).username;

        setManagerUserByName(username).then(() => {
            winccoa.logInfo("JS Manager User Changed: ", username)
            next();
        })


    });
};

export default authBearerToken;