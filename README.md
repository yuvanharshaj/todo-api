# Todo API

A secure RESTful Todo API built with **Node.js**, **Express.js**, **PostgreSQL**, and **Supabase Authentication**. This project demonstrates user authentication, JWT-based authorization, and protected CRUD operations following backend development best practices.

---

## Features

- 🔐 User Registration (Sign Up)
- 🔑 User Login with Supabase Authentication
- 🛡️ JWT Bearer Token Authentication
- ✅ Protected CRUD Operations for Tasks
- 🗄️ PostgreSQL Database Integration
- 📖 Interactive API Documentation with Swagger UI
- ⚙️ Environment Variable Configuration using dotenv
- 🚀 RESTful API Design

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Supabase Auth
- Swagger UI
- dotenv
- Docker (PostgreSQL)

---

## Project Structure

```
todo-api/
├── config/
│   └── supabase.js
├── middleware/
│   └── authMiddleware.js
├── routes/
│   ├── auth.js
│   └── tasks.js
├── server.js
├── package.json
├── docker-compose.yml
├── openapi.json
├── README.md
└── .env
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register a new user |
| POST | `/auth/login` | Login and receive JWT |

### Protected Task Routes

> All task routes require a valid Bearer Token.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get task by ID |
| POST | `/tasks` | Create a task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

---

## Authentication

After logging in, include the access token in every protected request.

```http
Authorization: Bearer <access_token>
```

---

## Running the Project

### Clone the repository

```bash
git clone https://github.com/yuvanharshaj/todo-api.git
cd todo-api
```

### Install dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
DATABASE_URL=your_database_url
PORT=3000
```

### Start the server

```bash
npm start
```

---

## API Documentation

Swagger UI is available at:

```
http://localhost:3000/docs
```

---

## Testing

The API has been tested using:

- Postman
- Swagger UI

Verified features:

- User Signup
- User Login
- JWT Authentication
- Protected CRUD Operations

---

## Future Improvements

- Refresh Token Support
- Role-Based Access Control (RBAC)
- Password Reset
- Email Verification
- Task Pagination & Filtering

---

## Author

**Yuvan Harshaj**

- GitHub: https://github.com/yuvanharshaj
- LinkedIn: https://www.linkedin.com/in/yuvanharshaj/

---

## License

This project is developed for learning and backend engineering practice.