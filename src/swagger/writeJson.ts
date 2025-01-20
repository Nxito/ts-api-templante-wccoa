import swaggerJSDoc from 'swagger-jsdoc';
import { projectPath } from '../helpers/projectPath.js';
import {writeFileSync} from 'fs';
import { swaggerDefinition } from '../config/swagger/config.js';
const realProjectPath = projectPath()

//Sample from https://editor.swagger.io/


const options = {
    swaggerDefinition,
    apis: [`${realProjectPath}/src/router/**/*.ts`],
};
 
const openapiSpecification = swaggerJSDoc(options);
writeFileSync(`${realProjectPath}/doc/api-doc.json`, JSON.stringify(openapiSpecification, null, 2));
 