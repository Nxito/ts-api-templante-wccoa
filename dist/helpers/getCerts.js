import { readFileSync } from "fs";
import { join } from "path";
import { wccoaProjectPath } from "./projectPath.js";
let winccoaCertsRoute = join(wccoaProjectPath(), "config");
var keyName = 'privkey.pem';
let crtName = 'certificate.pem';
/*Se pueden especificar los certificados o los pillará de winccoa
usará los certificados propios del http server
ver en -> https://www.winccoa.com/documentation/WinCCOA/latest/en_US/Authentication/Certificates/topics/certificates_certtypes.html
*/
export function getCerts(keyRoute = join(winccoaCertsRoute, keyName), crtRoute = join(winccoaCertsRoute, crtName)) {
    //obtener los archivos
    const key = readFileSync(keyRoute, "utf8");
    const cert = readFileSync(crtRoute, "utf8");
    return { key, cert };
}
