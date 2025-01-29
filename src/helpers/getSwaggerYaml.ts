import { parse } from 'yaml';
import { projectPath } from './projectPath.js';
import fs from "fs"
import path from 'path';
import { JsonObject } from 'swagger-ui-express';

const realProjectPath = projectPath()
export function getSwaggerYaml(fileLocation: string, filename: string): JsonObject {
    const swaggerYAML = fs.readFileSync(path.join(realProjectPath, fileLocation, filename), "utf-8");
    const swaggerDocument = parse(swaggerYAML);
    return swaggerDocument
}
