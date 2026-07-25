# Task API

A RESTful Task Management API built using **Node.js**, **Express.js**, **PostgreSQL**, **Docker**, and **Swagger UI**.

This project demonstrates CRUD (Create, Read, Update, Delete) operations using a PostgreSQL database running inside Docker. The API automatically initializes the database schema, loads sample data, and provides interactive API documentation with Swagger UI.

---

## Features

- Create new tasks
- Retrieve all tasks
- Retrieve a task by ID
- Update existing tasks
- Delete tasks
- Health check endpoint
- Interactive Swagger UI documentation
- PostgreSQL database integration
- Docker Compose support
- Automatic database initialization
- Sample data seeding
- Environment variable configuration
- Proper HTTP status codes and validation

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Docker
- Docker Compose
- Swagger UI Express
- OpenAPI 3.0
- dotenv
- Git & GitHub

---

# Installation

## Clone the repository

```bash
git clone https://github.com/yuvanharshaj/todo-api.git
```

## Navigate into the project

```bash
cd todo-api
```

## Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the project root.

Example:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=dev
DB_NAME=tasks
PORT=3000
```

You can also copy the provided template:

```bash
cp .env.example .env
```

(On Windows, simply copy `.env.example` and rename it to `.env`.)

---

# Start PostgreSQL

Start the PostgreSQL container using Docker Compose:

```bash
docker compose up -d
```

Verify the container is running:

```bash
docker ps
```

---

# Start the API

```bash
node server.js
```

The server runs at:

```
http://localhost:3000
```

---

# Swagger Documentation

Swagger UI is available at:

```
http://localhost:3000/docs
```

---

# API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | API Information |
| GET | /health | Health Check |
| GET | /tasks | Retrieve all tasks |
| GET | /tasks/:id | Retrieve task by ID |
| POST | /tasks | Create task |
| PUT | /tasks/:id | Update task |
| DELETE | /tasks/:id | Delete task |

---

# Example Request

Create a new task:

```bash
curl -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d "{\"title\":\"Learn PostgreSQL\"}"
```

Example Response:

```json
{
    "id": 4,
    "title": "Learn PostgreSQL",
    "done": false
}
```

---

# HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 204 | Deleted Successfully |
| 400 | Bad Request |
| 404 | Resource Not Found |
| 500 | Internal Server Error |

---

# Project Structure

```text
todo-api/
│
├── images/
│   └── swagger-ui.png
├── server.js
├── docker-compose.yml
├── init.sql
├── .env.example
├── openapi.json
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

---

# Future Improvements

- JWT Authentication
- User Accounts
- Pagination
- Search & Filtering
- Unit Testing
- CI/CD Pipeline

---

# Author

**Yuvan Harshaj**

GitHub:
https://github.com/yuvanharshaj

LinkedIn:
https://www.linkedin.com/in/yuvanharshaj