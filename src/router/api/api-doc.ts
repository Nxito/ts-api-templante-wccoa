import express from 'express';
const router = express.Router();
import swaggerUi from 'swagger-ui-express';
import { getSwaggerYaml } from '../../helpers/getSwaggerYaml.js';

/*USO:

    - Se especificará solo la ultima versión en src\config\swagger\config.ts
      De esta forma la documentacion de las antiguas versiones no se toca

    - Se copiará el archivo api-doc.yaml a api-doc-v1.yaml o la version correspondiente
      y se cambiará/creará el archivo en la ruta

*/

const swaggerDocument = getSwaggerYaml("doc/api", "api-doc.yaml");
const swaggerDocument_v2 = getSwaggerYaml("doc/api", "api-doc copy.yaml");


router.use('/latest',
    swaggerUi.serve,
    (req: express.Request, res: express.Response, next: express.NextFunction) =>
        swaggerUi.setup(swaggerDocument)(req, res, next)
);
router.use('/v1',
    swaggerUi.serve,
    (req: express.Request, res: express.Response, next: express.NextFunction) =>
        swaggerUi.setup(swaggerDocument)(req, res, next)
);
router.use('/v2',
    swaggerUi.serve,
    (req: express.Request, res: express.Response, next: express.NextFunction) =>
        swaggerUi.setup(swaggerDocument_v2)(req, res, next));

export default router;
