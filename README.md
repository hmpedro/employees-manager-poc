## Project
Application that helps us managing our team using REST

### Technologies
- NodeJS;
- MongoDb;
- Docker;
- docker-compose;

### Features
- Create, Update, Delete, Retrieve all and Retrieve by ID:
  - Tags;
  - Roles;
  - Employees;

### Running project:
Runing only nodeJS app:
- npm install;
- npm start;

Running with Docker. You'll need the following dependencies installed:
- [docker](https://docs.docker.com/engine/install/);
- [docker-compose](https://docs.docker.com/compose/install/);

There's a Makefile with the following commands:
- start: run the application and all it's dependencies with docker;
- dev: run the application dependencies with docker;
- turn-off: turn off docker containers related to the application;

# REST API

The REST API to the app is described below.

## Get list of Employees

### Request

`GET /employees?tags[]=61fa71a3f49a586e94ee0826&name=John`

### Response

```json
{
    "employees": [
        {
            "_id": "61fa71b0f49a586e94ee082e",
            "name": "John",
            "type": "employee",
            "role": {
                "_id": "61fa714af49a586e94ee081d",
                "title": "bla",
                "createdAt": "2022-02-02T11:55:54.409Z",
                "updatedAt": "2022-02-02T11:55:54.409Z"
            },
            "tags": [
                {
                    "_id": "61fa71a3f49a586e94ee0826",
                    "title": "testaa",
                    "createdAt": "2022-02-02T11:57:23.204Z",
                    "updatedAt": "2022-02-02T13:11:17.571Z"
                }
            ],
            "createdAt": "2022-02-02T11:57:36.649Z",
            "updatedAt": "2022-02-02T11:57:36.649Z"
        }
    ],
    "date": "Wed Feb 02 2022 12:17:07 GMT-0300 (Brasilia Standard Time)"
}
```

## Get an Employee

### Request

`GET /employees/61faa0d9988fd61dd9834a76`

### Response

```json
{
    "employee": {
        "name": "John",
        "type": "employee",
        "role": "61fa714af49a586e94ee081d",
        "tags": [
            "61fa71a3f49a586e94ee0826"
        ],
        "_id": "61faa0d9988fd61dd9834a76",
        "createdAt": "2022-02-02T15:18:49.765Z",
        "updatedAt": "2022-02-02T15:18:49.765Z"
    },
    "date": "Wed Feb 02 2022 12:18:49 GMT-0300 (Brasilia Standard Time)"
}
```

## Create a new Employee

### Request

`POST /employees`

```json
{
    "name": "John",
    "type": "employee",
    "role": "61fa714af49a586e94ee081d",
    "tags": ["61fa71a3f49a586e94ee0826"]
}
```

### Response

```json
{
    "employee": {
        "name": "John",
        "type": "employee",
        "role": "61fa714af49a586e94ee081d",
        "tags": [
            "61fa71a3f49a586e94ee0826"
        ],
        "_id": "61faa0d9988fd61dd9834a76",
        "createdAt": "2022-02-02T15:18:49.765Z",
        "updatedAt": "2022-02-02T15:18:49.765Z"
    },
    "date": "Wed Feb 02 2022 12:18:49 GMT-0300 (Brasilia Standard Time)"
}
```

## Upade an Employee

### Request

`PUT /employees/61fa714af49a586e94ee081d`

```json
{
    "name": "John",
    "type": "employee",
    "role": "61fa714af49a586e94ee081d",
    "tags": ["61fa71a3f49a586e94ee0826"]
}
```

### Response

```json
{
    "employee": {
        "name": "John",
        "type": "employee",
        "role": "61fa714af49a586e94ee081d",
        "tags": [
            "61fa71a3f49a586e94ee0826"
        ],
        "_id": "61faa0d9988fd61dd9834a76",
        "createdAt": "2022-02-02T15:18:49.765Z",
        "updatedAt": "2022-02-02T15:18:49.765Z"
    },
    "date": "Wed Feb 02 2022 12:18:49 GMT-0300 (Brasilia Standard Time)"
}
```

## Delete an Employee

### Request

`DELETE /employees/61faa0d9988fd61dd9834a76`

### Response

Status: 204 No Content
