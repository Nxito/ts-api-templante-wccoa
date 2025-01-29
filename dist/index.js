/* SERVER */
import express from 'express';
const app = express();
import { port, keyFile, certFile } from "./config/environment.js";
import { WinccoaSecurityEventId } from 'winccoa-manager';
import winccoa from "./helpers/globalWinccoaManager.js";
import * as https from 'https';
import { getCerts } from './helpers/getCerts.js';
import bodyParser from 'body-parser';
import routes from "./router/routes.js";
const credentials = getCerts(keyFile, certFile);
const httpsPORT = Number(process.argv[1]) || Number(port) || 3443;
// Middleware para manejar JSON
app.use(express.json());
// Middleware para parsear el body de la respuesta
app.use(bodyParser.json());
// Aqui se añaden las direcciones del api
app.use(routes);
//Se crea el servidor con seguridad
var httpsServer = https.createServer(credentials, app);
// Iniciar el servidor
httpsServer.listen(httpsPORT, () => {
    winccoa.securityEvent(WinccoaSecurityEventId.PortOpened, httpsPORT, 'https://');
});
