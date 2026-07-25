# Task API

A simple RESTful Task Management API built using **Node.js**, **Express.js**, **SQLite**, and **Swagger UI**.

This project demonstrates CRUD (Create, Read, Update, Delete) operations with **persistent SQLite storage**. The API automatically creates the database and tables, seeds initial data, and provides interactive API documentation using Swagger UI.

---

## Features

- Create new tasks
- Retrieve all tasks
- Retrieve a task by ID
- Update existing tasks
- Delete tasks
- Health check endpoint
- Interactive Swagger UI documentation
- SQLite database integration
- Automatic database and table creation
- Automatic sample data seeding (first run only)
- Persistent storage across server restarts
- Parameterized SQL queries
- Proper HTTP status codes and validation

---

## Tech Stack

- Node.js
- Express.js
- SQLite3
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
| PUT | /tasks/:id | Update an existing task |
| DELETE | /tasks/:id | Delete a task |

---

## Example cURL Request

Create a new task:

```bash
curl -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d "{\"title\":\"Buy milk\"}"
```

### Sample Response

```json
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
| 500 | Internal server error |

---

## Database

The application automatically:

- Creates **tasks.db** if it does not exist.
- Creates the **tasks** table.
- Inserts three sample tasks only on the first run.
- Stores all task data permanently using SQLite.
- Uses parameterized SQL queries to improve security.

---

## Project Structure

```text
todo-api/
│
├── images/
├── server.js
├── tasks.db
├── openapi.json
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

---

## Future Improvements

- JWT Authentication
- User Accounts
- Search & Filtering
- Pagination
- Docker Support
- Unit Testing
- CI/CD Pipeline

---

## Author

**Yuvan Harshaj**

GitHub:
https://github.com/yuvanharshaj

LinkedIn:
https://www.linkedin.com/in/yuvanharshaj