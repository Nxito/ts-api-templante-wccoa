import express  from 'express';
const app = express();

import { WinccoaManager, WinccoaSecurityEventId } from 'winccoa-manager';
const winccoa = new WinccoaManager();
// import * as http from 'http';
import * as https from 'https';
import swagger from './router/api/api-doc.js';
import api_v1 from './router/api/v1/index.js';
import api_v2 from './router/api/v2/index.js';
import  loginRoutes from './router/auth/index.js';
import  authMiddleware from './router/auth/middleware.js';
import { getCerts } from './helpers/getCerts.js';
import bodyParser from 'body-parser';

const credentials: https.ServerOptions = getCerts();
// const httpPORT: Number = 3000; 
const httpsPORT: Number= 3443; 
 
// Middleware para manejar JSON
app.use(express.json());
// Middleware para parsear el body de la respuesta
app.use(bodyParser.json());

// Rutas de la API
//Rutas de autorizacion
app.use("/auth",loginRoutes);
//Ejemplo ruta segura
app.use('/v1',authMiddleware, api_v1);
//Ejemplo ruta publica
app.use('/v2', api_v2);

// Documentación de Swagger
app.use("/api-doc",swagger);

// var httpServer:  http.Server = http.createServer(app);
var httpsServer:  https.Server  = https.createServer(credentials, app);

// Iniciar el servidor
// httpServer.listen(httpPORT, () => {
//   console.log(`Servidor corriendo en http://localhost:${httpPORT}`);
// });
httpsServer.listen(httpsPORT, () => {
  winccoa.securityEvent(WinccoaSecurityEventId.PortOpened, httpsPORT, 'https://');
});


