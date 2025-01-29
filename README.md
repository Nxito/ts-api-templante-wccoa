# Creacion de api rest con expressjs

## Requisitos previos

- winccoa >= v3.20
- nodejs >= v20.16

---

## Integracion con winccoa

Winccoa 3.20 incluye un manager para nodejs: JsManager.

Se requiere realizar los siguientes pasos:

- Crear un jsManager apuntando a la ruta del modulo de node ubicado en /javascript/ del proyecto de winccoa

> [!nota]
> El archivo principal es /src/index.ts, pero en el manager hay que indicar `-user root:  express-api-https/dist/index.js`
> Winccoa pide el archivo una vez compilado

- Crear un package.json con "npm init" y instalar el modulo de winccoa ubicado en la carpeta de instalacion de winccoa.
 	- El modulo de winccoa se suele ubicar en  `Siemens/Automation/WinCC_OA/3.20/javascript/winccoa-manager`
 	- Para typescript, necesitarás instalar como devDependencies los tipos. Estos se ubican en `Siemens/Automation/WinCC_OA/3.20/javascript/@types/winccoa-manager`
 
- Configurar las variables de entorno en un archivo .env:

```sh
PORT=6443
CERTFILE=C:\\Users\\User\\Documents\\certscreated\\server-cert.pem
KEYFILE=C:\\Users\\User\\Documents\\certscreated\\server-key.pem
BASEURL=192.168.44.158 # solo usado en testing
```

El puerto tambien se podrá definir como comando del js manager

`-user=root:  express-api-https/dist/index.js 6443`

### Problema enrutado base

Si bien este funciona correctamente, sigue habiendo problemas con como se especifica la ruta base del proyecto Javascript
Winccoa javascript manager toma como ruta principal la del propio proyecto de winccoa en lugar de como suele hacer nodejs, que toma la ruta del package.json como directorio root.

#### Solución

Esto se corrige con el script /src/helpers/projectPath.ts, que sirve como sustituto de parametros como *__dirname*
para especificar la ruta del proyecto  

---

## Rutas del API

Las distintas rutas del api se definen en este arbol:

- /src/index.ts: quien levanta el servidor
 	- /src/router/routes.ts:  Donde se especifican las rutas comunes y de las distintas versiones ( y tambien del middleware si es necesario securizar todas las rutas subyacences)
  		- /src/router/auth: Incluye el middleware, temas de autenticacion y la ruta de login para obtener el token
  		- /src/router/health: para comprobar periodicamente el estado del servidor
  		- /src/router/api: Se incluyen las rutas de la documentacion del api y las distintas versiones
De esta forma, se puede partir de routes.ts para añadir nuevas versiones del api, rutas comunes o middleware
Cada version replica lo que hace routes.ts con un index.ts para separar las distintas funcionalidades o rutas en archivos separados
Cada ruta final o "EndPoint" de cada version esta comentado con el formato de `swagger-jsdoc`

---

## Documentacion OpenApi Swagger

El api se documenta con `swagger-ui-express` y `swagger-jsdoc`
De forma que las rutas serán documentadas directamente en el código y luego compiladas para su publicacion

Para acceder a la documentacion se usará la ruta api-doc y se especificará la versión
ej: /api-doc/v1

### Configuracion

Se dispone de las siguientes carpetas para la documentacion swagger

- **`src/config/swagger`**: aqui el config.ts será la base de la especificacion del api
- **`src/swagger`**: aqui se tienen los scripts para escribir el archivo swagger
- **`src/router/api/api-doc.ts`**: aquí se especifica el enturamiento de los documentos del api para su visionado web
- **`doc/api/`**: aqui se tendrán los archivos swagger donde se llamarán como la version a la que corresponden v1.yaml, v2.yaml... donde el ultimo creado será api-doc.yaml
Para actualizar a una siguiente versión, se cambiarán datos en `src/config/swagger.config.ts`, se modificarán las rutas de `src/router/api/api-doc.ts` y se renombrará el archivo api-doc.yaml con la version antigua

Estos leerán los comentarios `swagger-jsdoc` de las apis en *src/router* y contruirán el documento en */doc/api-doc*
Para contruir el documento:

```sh
npm run build-and-update-api-doc
```

### Enrutamiento

El enrutamiento para la documentacion swagger se realiza en *src/router/api/api-doc.ts*.

### Versionado

A la hora de ejecutar `npm run build-and-update-api-doc`, se creará un archivo api-doc.yaml
Este se considerará como la version "latest"
El resto de archivos se llamarán con el formato v1.yaml ,v2.yaml...

Luego en el `src/router/api/api-doc.ts` se añadirán la ruta a la nueva versión con las funciones getSwaggerYaml y router.use

- `getSwaggerYaml`: especifica la ruta donde irá el archivo de la documentacion.
- `router.use`: especifica la ruta web que se usará para dicho archivo.

---

## Testing

Se utilizará **PlayWright** para realizar los tests. Esta es una herramienta preparada para realizar pruebas end-to-end en webs, dispositivos móviles y de API, entre otros
Se hara uso de esta biblioteca ya que desde su salida en 2020 se ha vuelo muy popular por su fiabilidad y utilidad
Al contrario que otras como supertest para las apis, playWright ya soporta typescript de base y viene con la configuracion de carpetas de testing al instalar

Ver <https://playwright.dev/docs/intro>

>[!tip]
>
>- En **playwright.config.ts** cambia la baseURL de la configuracion a la correspondiente
>- Los comandos puedes verlos en web:
>   - <https://playwright.dev/docs/running-tests>

## Seguridad

### HTTPS

Se hace uso de certificados TLS para hacer uso de una conexion https.
Para ello, se especifican el archivo */src/index.ts* en la funcion `getCerts` los certificados necesarios para el uso de https
En este archivo tambien se muestra el puerto a utilizar para el api.

Existen dos archivos de ejemplo en assets/certs
Se aceptan los formatos de key y certificate propios de expressjs ( como la pareja *.key - .crt* o archivos *.pem* entre otros)

### Autenticacion por Token

Se usa el protocolo Bearer Tokens para autenticarse con expressjs, quien hace uso de un script de winccoa para comprobar si las credenciales de un usuario son validas.

Tras autenticarse en la ruta /login, se devolverá un token temporal ( JWT ) que permitirá al usuario hacer uso del api.
Este token expirará ( de forma predeterminada ) en una hora

Al realizar una peticion al api, haciendo uso del token, el middleware lo decodifica para recoger el usuario y preguntar a winccoa su Id para cambiar los permisos de la peticion a las del usuario. Esto hace uso de la función [setUserId](https://www.winccoa.com/documentation/WinCCOA/latest/en_US/apis/winccoa-manager/classes/WinccoaManager.html#setUserId)

Esto requiere que el jsManager sea manejado por el Root
Sin embargo, esto permite que el token usado tenga los permisos del usuario especificado y tenga acceso, por ejemplo, a los mismos datapoints que el usuario de winccoa. Incluso si tiene un grupo o rol asignado.
