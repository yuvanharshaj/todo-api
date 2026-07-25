# Task API

A simple REST API built using Node.js and Express.

## Features

- GET /
- GET /health
- GET /tasks
- GET /tasks/:id
- POST /tasks
- 404 error handling

## Installation

```bash
npm install
```

## Run

```bash
node server.js
```

Server runs on:

```
http://localhost:3000
```

## Test Endpoints

- GET `/`
- GET `/health`
- GET `/tasks`
- GET `/tasks/1`
- POST `/tasks`

Example POST body:

```json
{
  "title": "Learn Node.js"
}
```

Built for the FlyRank Backend AI Engineering Internship.