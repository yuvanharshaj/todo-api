# Task API

A simple RESTful Task Management API built using **Node.js**, **Express.js**, and **Swagger UI**.

This project demonstrates CRUD (Create, Read, Update, Delete) operations using an in-memory data store without a database.

---

## Features

- Create new tasks
- Retrieve all tasks
- Retrieve a task by ID
- Update existing tasks
- Delete tasks
- Health check endpoint
- Interactive Swagger API documentation
- Proper HTTP status codes and validation

---

## Tech Stack

- Node.js
- Express.js
- Swagger UI Express
- OpenAPI 3.0
- Git & GitHub

---

## Installation

### Clone the repository

```bash
git clone https://github.com/yuvanharshaj/todo-api.git
```

### Navigate into the project

```bash
cd todo-api
```

### Install dependencies

```bash
npm install
```

### Start the server

```bash
node server.js
```

The server runs at:

```
http://localhost:3000
```

---

## API Documentation

Swagger UI is available at:

```
http://localhost:3000/docs
```

Open the above URL in your browser to explore and test all API endpoints.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | API information |
| GET | /health | Health check |
| GET | /tasks | Retrieve all tasks |
| GET | /tasks/:id | Retrieve a task by ID |
| POST | /tasks | Create a new task |
| PUT | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |

---

## Example cURL Request

Create a new task:

```bash
curl -i -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d "{\"title\":\"Buy milk\"}"
```

### Sample Response

```http
HTTP/1.1 201 Created

{
  "id": 4,
  "title": "Buy milk",
  "done": false
}
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Successful request |
| 201 | Resource created |
| 204 | Resource deleted successfully |
| 400 | Invalid request |
| 404 | Resource not found |

---

## Project Structure

```
todo-api/
│
├── node_modules/
├── server.js
├── openapi.json
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

---

## Notes

This API stores tasks only in memory. When the server restarts, all newly created tasks are lost because no database is connected.

---

## Future Improvements

- MongoDB Integration
- User Authentication
- Persistent Database Storage
- Pagination
- Search & Filtering
- Docker Support

---

## Author

**Yuvan Harshaj**

GitHub:
https://github.com/yuvanharshaj

LinkedIn:
https://www.linkedin.com/in/yuvanharshaj/