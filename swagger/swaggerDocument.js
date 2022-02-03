const { Shifts, Workers, Users, Auth } = require('./index');

const config = require('../startup/config');

const swaggerDocument = {
    "swagger": "2.0",
    "info": {
        "description": "This is a sample server Petstore server.  You can find out more about     Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).      For this sample, you can use the api key `special-key` to test the authorization     filters.",
        "version": "1.0.0",
        "title": "Swagger TeamWay",
        "termsOfService": "http://swagger.io/terms/",
        "contact": {
            "email": "apiteam@swagger.io"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        }
    },
    "host": `localhost:${config.app.port}`,
    "basePath": "/api",
    "tags": [
        {
            "name": "Workers"
        },
        {
            "name": "Shifts"
        }
    ],
    "schemes": ["http", "https"],
    "paths": {
        "/shifts": { "get": Shifts.getAllShifts, "post": Shifts.addAShift },
        "/shifts/{shiftId}": { "get": Shifts.getAShift, "put": Shifts.updateAShift, "delete": Shifts.deleteAShift },
        "/workers": { "get": Workers.getAllWorkers, "post": Workers.addAWorker },
        "/workers/{workerId}": { "get": Workers.getAWorker, "put": Workers.updateAWorker, "delete": Workers.deleteAWorker },
        "/users": { "post": Users.addAUser },
        "/users/me": { "get": Users.me },
        "/auth": { "post": Auth.authAUser },
    },
    "securityDefinitions": {
        "petstore_auth": {
            "type": "oauth2",
            "authorizationUrl": "http://petstore.swagger.io/oauth/dialog",
            "flow": "implicit",
            "scopes": {
                "write:pets": "modify pets in your account",
                "read:pets": "read your pets"
            }
        },
        "api_key": {
            "type": "apiKey",
            "name": "api_key",
            "in": "header"
        }
    },
    "definitions": {
        "Shift": Shifts.shiftDefinition,
        "Shift Add": Shifts.addAShiftDefinition,
        "Shift Update": Shifts.updateAShiftDefinition,
        "Worker": Workers.workerDefinition,
        "User": Users.userDefinition,
        "User Add Response": Users.userAddResponse,
        "Auth": Auth.authDefinition,
    },
    "ApiResponse": {
        "type": "object",
        "properties": {
            "code": {
                "type": "integer",
                "format": "int32"
            },
            "type": {
                "type": "string"
            },
            "message": {
                "type": "string"
            }
        }
    },
    "externalDocs": {
        "description": "Find out more about Swagger",
        "url": "http://swagger.io"
    }
}

module.exports.swaggerDocument = swaggerDocument