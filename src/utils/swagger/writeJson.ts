import swaggerJSDoc from 'swagger-jsdoc';
import { projectPath } from '../projectPath.js';
import {writeFileSync} from 'fs';
import { swaggerDefinition } from '../../config/swagger.js';
const realProjectPath = projectPath()

//Sample from https://editor.swagger.io/


const options = {
    swaggerDefinition,
    apis: [`${realProjectPath}/src/routes/**/*.ts`],
};
 
const openapiSpecification = swaggerJSDoc(options);
writeFileSync(`${realProjectPath}/doc/api-doc.json`, JSON.stringify(openapiSpecification, null, 2));
 