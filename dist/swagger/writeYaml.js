import swaggerJSDoc from 'swagger-jsdoc';
import { projectPath } from '../helpers/projectPath.js';
import { writeFileSync } from 'fs';
import { swaggerDefinition } from '../config/swagger.js';
import YAML from 'yaml';
const realProjectPath = projectPath();
const options = {
    swaggerDefinition,
    apis: [`${realProjectPath}/src/router/**/*.ts`],
};
const openapiSpecification = swaggerJSDoc(options);
const doc = new YAML.Document();
doc.contents = openapiSpecification;
writeFileSync(`${realProjectPath}/doc/api/api-doc.yaml`, doc.toString());
