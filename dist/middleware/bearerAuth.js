import jwt from 'jsonwebtoken';
import { getCerts } from '../utils/getCerts.js';
import { setManagerUserByName } from '../utils/auth/winccoaAuth.js';
import winccoa from "../utils/globalWinccoaManager.js";
// Middleware para autenticar el token Bearer
function authBearerToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
    if (token == null)
        return res.sendStatus(401); // No token present
    jwt.verify(token, getCerts().key, (err, user) => {
        if (err)
            return res.sendStatus(403); // Invalid token
        req.user = user;
        const username = user.username;
        setManagerUserByName(username).then(() => {
            winccoa.logInfo("JS Manager User Changed: ", username);
            next();
        });
    });
}
;
export default authBearerToken;
