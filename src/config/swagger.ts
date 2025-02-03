export const swaggerDefinition = {

  "openapi": "3.0.0",
  "info": {
    "title": "API de Ejemplo",
    "description": "API De pruebas",
    "version": "1.0.0",
    "contact": {
      "name": "Soporte de API",
      "email": "anxo-vilar@tecdesoft.com"
    }
  },
  "servers": [
    {
      "url": "/v1",
      "description": "Api de pruebas - version 1"
    },
    // {
    //   "url": "/v2",
    //   "description": "Api de pruebas - version 2"
    // }
  ],
  "components": {
    "securitySchemes": {
      "BearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    },
    "schemas": {
      "User": {
        "type": "object",
        "properties": {
          "OSID": {
            "type": "string",
            "format": "number"
          },
          "Name": {
            "type": "string"
          },
          "PVSSID": {
            "type": "string",
            "format": "number"
          },
          "PVSSGROUPID": {
            "type": "array"
          },
          "Disabled": {
            "type": "boolean"
          },
          "Comment": {
            "type": "string"
          },
          "FullName": {
            "type": "string"
          }
        }
      },
      "Counter": {
        "type": "object",
        "properties": {
          "counter": {
            "type": "number",
            "format": "float"
          }
        }
      },
      "Error": {
        "type": "object",
        "properties": {
          "message": {
            "type": "string"
          },
          "code": {
            "type": "integer"
          }
        }
      }
    }
  },
  "security": [
    {
      "BearerAuth": []
    }
  ],
  "tags": [
    {
      "name": "Usuarios",
      "description": "Operaciones relacionadas con la gestión de usuarios"
    },
    {
      "name": "Contadores",
      "description": "Prueba de conexión con winccoa"
    },
    {
      "name": "Common",
      "description": "Otras rutas comunes entre todas las versiones"
    }
  ]


}
