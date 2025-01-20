import jwt from 'jsonwebtoken';
import { getCerts } from '../../helpers/getCerts.js';
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
        next();
    });
}
;
export default authBearerToken;
