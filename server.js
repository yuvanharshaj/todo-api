const express = require("express");
require("dotenv").config();
const { Pool } = require("pg");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");

const supabase = require("./config/supabase");
const authRoutes = require("./routes/auth");
const authenticateUser = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Auth Routes
app.use("/auth", authRoutes);

// PostgreSQL Connection
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

pool.connect()
    .then(() => console.log("✅ Connected to PostgreSQL"))
    .catch(err => console.error("❌ Database connection error:", err));

// Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Root
app.get("/", (req, res) => {
    res.json({
        name: "Task API",
        version: "1.0",
        endpoints: [
            "/auth/signup",
            "/auth/login",
            "/tasks",
            "/health",
            "/docs"
        ]
    });
});

// Health
app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});


// ===============================
// PROTECTED TASK ROUTES
// ===============================

// GET all tasks
app.get("/tasks", authenticateUser, async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM tasks ORDER BY id"
        );

        res.json({
            loggedInUser: req.user.email,
            tasks: result.rows
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// GET task by id
app.get("/tasks/:id", authenticateUser, async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const result = await pool.query(
            "SELECT * FROM tasks WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: `Task ${id} not found`
            });
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// CREATE task
app.post("/tasks", authenticateUser, async (req, res) => {
    try {
        const { title } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                error: "Title is required"
            });
        }

        const result = await pool.query(
            "INSERT INTO tasks (title, done) VALUES ($1,$2) RETURNING *",
            [title.trim(), false]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// UPDATE task
app.put("/tasks/:id", authenticateUser, async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const { title, done } = req.body;

        const existing = await pool.query(
            "SELECT * FROM tasks WHERE id = $1",
            [id]
        );

        if (existing.rows.length === 0) {
            return res.status(404).json({
                error: `Task ${id} not found`
            });
        }

        const updatedTitle =
            title !== undefined
                ? title.trim()
                : existing.rows[0].title;

        const updatedDone =
            done !== undefined
                ? done
                : existing.rows[0].done;

        const result = await pool.query(
            `UPDATE tasks
             SET title=$1,
                 done=$2
             WHERE id=$3
             RETURNING *`,
            [updatedTitle, updatedDone, id]
        );

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// DELETE task
app.delete("/tasks/:id", authenticateUser, async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const result = await pool.query(
            "DELETE FROM tasks WHERE id=$1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: `Task ${id} not found`
            });
        }

        res.status(204).send();

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// Start Server
app.listen(PORT, async () => {
    try {
        const { error } = await supabase.auth.getSession();

        if (error) {
            console.error("❌ Supabase initialization failed:", error.message);
        } else {
            console.log("✅ Supabase client initialized");
        }
    } catch (err) {
        console.error("❌ Supabase error:", err.message);
    }

    console.log(`🚀 Server running at http://localhost:${PORT}`);
});