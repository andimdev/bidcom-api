# bidcom-api

## Overview
Simple RESTful API built with NestJS, TypeORM, and SQLite.
Provides a structured product management service with full CRUD capabilities, filtering, pagination, and soft deletion.

## Environment
Be sure to create an .env file before you start the installation process. You
can use .env.template as a reference (this step is mandatory and
necessary to continue)
```js
PORT=8000
DATABASE_URL="db.sqlite"
```

## Installation and setup
### 1. Manual Setup
After cloning the repository, the necessary dependencies must be installed
using your preferred package manager

```bash
npm install
or
yarn install
or
pnpm install
```

#### Migrations
Next step is to run the migrations:
- Generate migrations:
```bash
npm run migration:generate
```
- Run migrations:
```bash
npm run migration:run
```

#### Testing
Now you can run the tests and start the server:
- tests
```bash
npm run test # If you want to run all the tests
npm run test:e2e # If you just want to run e2e test
```

#### Running server
- Production build:
```bash
npm run build
npm run start
```

- Development:
```bash
npm run start:dev
```

### 2. Using docker
You can use docker compose and start the server using a container with just few steps:

- Create the build
```bash
docker compose build # You can use the flag --no-cache here
```

- Mount the container:
```bash
docker compose up
```

## Accesing the server
Once you complete the installation process, the server is deployed at:
> PORT 8000

### API Routes

- GET     http://localhost:8000/products
- POST    http://localhost:8000/products
- GET     http://localhost:8000/products/search
- GET     http://localhost:8000/products/:id
- PUT     http://localhost:8000/products/:id
- PATCH   http://localhost:8000/products/:id
- DELETE  http://localhost:8000/products/:id

### GET - /products
Returns a list with the items stored in database. You can use the limit
and offset query paramters to change pagination

Example response:
```json
{
  "traceId": "ID",
  "data": {
    "total": 1,
    "limit": 10,
    "offset": 1,
    "next": null,
    "prev": null,
    "items": []
  }
}
```

### POST - /products
Creates a new product record in the database

Required props:
- name
- price
- category
- brand

> It also validates if a product name was already registered

Example response:
```json
// Successful registration:
{
  "traceId": "ID",
  "data": {
    "id": "ID",
    "name": "Product",
    "description": null,
    "price": 1,
    "stock": 0,
    "category": "Category",
    "brand": "Brand",
    "createdAt": "Date",
    "updatedAt": null,
    "deletedAt": null
  }
}
// Product already exists:
{
  "statusCode": 409,
  "code": "PRODUCT_ALREADY_EXISTS",
  "message": "Product with name \"Product\" already exists",
  "traceId": "ID"
}
```

### GET - /products/search
Retrieves items applying parameters given by the user

Search parameters:
- name
- brand
- category
- limit
- offset

Example response:
```json
{
  "traceId": "ID",
  "data": {
    "total": 1,
    "limit": 1,
    "offset": 0,
    "next": null,
    "prev": null,
    "items": [
      {
        "id": "ID",
        "name": "Product",
        "description": "Description",
        "price": 1,
        "stock": 1,
        "category": "Category",
        "brand": "Brand",
        "createdAt": "Date",
        "updatedAt": null,
        "deletedAt": null
      }
    ]
  }
}
```

### GET - /products/:id
Allows the user to search an specific product by the given id

Example response:

```json
{
  "traceId": "ID",
  "data": {
    "id": "ID",
    "name": "Product",
    "description": "Description",
    "price": 1,
    "stock": 1,
    "category": "Category",
    "brand": "Brand",
    "createdAt": "Date",
    "updatedAt": null,
    "deletedAt": null
  }
}
```

### PUT - /products/:id
Can be used to replace product's data sending a new payload

Example response:
```json
{
  "traceId": "ID",
  "data": {
    "id": "ID",
    "name": "New product",
    "description": null,
    "price": 10,
    "stock": 10,
    "category": "Category",
    "brand": "Brand",
    "createdAt": "Date",
    "updatedAt": "Date",
    "deletedAt": null
  }
}
```

### PATCH - /products/:id
Updates partially a record

Example response:
```json
{
  "traceId": "ID",
  "data": {
    "id": "ID",
    "name": "Product",
    "description": "DEscription",
    "price": 1,
    "stock": 1,
    "category": "Category",
    "brand": "Brand",
    "createdAt": "Date",
    "updatedAt": "Date",
    "deletedAt": null
  }
}
```

### DELETE - /products/:id
_Deletes_ a record from database (The record is not physically removed from the database. it is marked as deleted and excluded from query results.)

Example response:
```json
{
  "traceId": "ID"
}
```