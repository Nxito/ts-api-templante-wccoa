// config.js
import {config} from "dotenv";
import { projectPath } from "../helpers/projectPath.js";

const result = config({ path: projectPath()+'/.env' });

if (result.error) {
    throw result.error;
  }

export const port = process.env.PORT;
export const keyFile = process.env.KEYFILE;
export const certFile = process.env.CERTFILE;
export const baseUrl = process.env.BASEURL;