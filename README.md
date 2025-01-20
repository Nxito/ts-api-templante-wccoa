# Creacion de api rest con expressjs

## Integracion con winccoa

Winccoa 3.20 incluye un manager para nodejs.
Si bien este funciona correctamente, sigue habiendo problemas con como se especifica la ruta base del proyecto Javascript
Mientras que un modulo de nodejs toma como ruta principal alli donde estea el package.json,
Winccoa javascript manager toma como ruta principal la del propio proyecto de winccoa

Esto se corrije con el script /src/helpers/projectPath.ts, que sirve como sustituto de parametros como *__dirname*
para especificar la ruta del proyecto  

## Documentacion swagger

El api se documenta con swagger-ui-express y swagger-jsdoc
De forma que las rutas serán documentadas por código y luego compiladas para su publicacion

Para acceder a la documentacion se usará la api-doc/*version*

### Configuracion

Se dispone de las siguientes rutas para la documentacion swagger

- **src/config/swagger**: aqui el config.ts será la base de la especificacion del api
- **src/swagger**: aqui se tienen los scripts para escribir el archivo swagger
Estos leerán los comentarios swagger-jsdoc de las apis en *src/router* y contruirán el documento en /doc/api-doc
Para contruir el documento , usaremos

```sh
npm run build-and-update-api-doc
```

- **doc/api/api-doc**: aqui se tendrán los archivos swagger donde se llamarán como la version a la que corresponden v1.yaml, v2.yaml...
- **src/router/api-doc**: aquí se especifica el enturamiento de los documentos del api para su visionado web

### Enrutamiento

El enrutamiento todo para la documentacion swagger se realiza en *src/router/api-doc/index.ts*.
No confundir con las demás versiones del api

La ruta base se indica en el */src/router/index.ts* y es *"/api-doc"*

### Versionado

A la hora de ejecutar *build-and-update-api-doc*, se creará un archivo api-doc.yaml
Este se considerará como la version "latest"
El resto de archivos se llamarán con el formato api-doc-v1.yaml o v2, o v3..

Luego en el api-doc/index.ts se añadirán la ruta a la nueva versión con las funciones getSwaggerYaml y router.use

## Testing

Se utilizará playWrightipo de tests. Esta es una herramienta preparada para realizar pruebas end-to-end en webs, dispositivos móviles y de API, entre otros
Se hara uso de esta biblioteca ya que desde su salida en 2020 se ha vuelo muy popular por su fiabilidad y utilidad
Al contrario que otras como supertest para las apis, playWright ya soporta typescript de base y viene con la configuracion de carpetas de testing al instalar

Ver <https://playwright.dev/docs/intro>

## Seguridad

Se hace uso de certificados TLS para hacer uso de una conexion https.
Para ello, se especifican el archivo *certificate.pem* y *privkey.pem* en la carpeta config del proyecto de winccoa

Tambien es posible especificarlos en la funcion *getTLSCerts* en el index.ts
Se aceptan los formatos de key y certificate propios de expressjs ( como la pareja .key - .crt)



