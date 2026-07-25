# Task API

A simple RESTful Task Management API built using Node.js and Express.js.

## Features

- Get all tasks
- Get task by ID
- Create a task
- Update a task
- Delete a task
- Health endpoint
- Swagger API Documentation

## Tech Stack

- Node.js
- Express.js
- Swagger UI
- OpenAPI 3.0

## Installation

```bash
git clone https://github.com/yuvanharshaj/todo-api.git
cd todo-api
npm install
npm start
```

Server runs at:

```
http://localhost:3000
```

Swagger Docs:

```
http://localhost:3000/docs
```

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /tasks | Get all tasks |
| GET | /tasks/:id | Get task by ID |
| POST | /tasks | Create task |
| PUT | /tasks/:id | Update task |
| DELETE | /tasks/:id | Delete task |
| GET | /health | Health check |

---

Created by **Yuvan Harshaj**