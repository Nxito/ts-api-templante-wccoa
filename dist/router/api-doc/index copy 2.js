import express from 'express';
const router = express.Router();
import swaggerUi from 'swagger-ui-express';
import { getSwaggerYaml } from '../../helpers/getSwaggerYaml.js';
const swaggerDocument = getSwaggerYaml("doc", "api-doc.yaml");
var options = {};
//ForEach version, add a document (Swagger ui uncontemplated feature)
router.use('/api-docs-one', swaggerUi.serveFiles(swaggerDocument, options), swaggerUi.setup(swaggerDocument));
// router.use('/api-docs-two', swaggerUi.serveFiles(swaggerDocumentTwo, options), swaggerUi.setup(swaggerDocumentTwo));
router.use('/api-docs-dynamic', function (req, res, next) {
    req.swaggerDoc = swaggerDocument;
    next();
}, swaggerUi.serveFiles(), swaggerUi.setup());
export default router;
