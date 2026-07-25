const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("tasks.db", (err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("✅ Connected to SQLite database.");
    }
});

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            done INTEGER NOT NULL DEFAULT 0
        )
    `);

    db.get("SELECT COUNT(*) AS count FROM tasks", (err, row) => {

        if (err) {
            console.error(err.message);
            return;
        }

        if (row.count === 0) {

            const insert = db.prepare(
                "INSERT INTO tasks (title, done) VALUES (?, ?)"
            );

            insert.run("Learn Express", 0);
            insert.run("Build CRUD API", 0);
            insert.run("Submit FlyRank Assignment", 1);

            insert.finalize();

            console.log("✅ Sample tasks inserted.");
        }

    });

});

const app = express();
const PORT = 3000;

app.use(express.json());

// Temporary in-memory task list
// (Will be removed in later stages)
let tasks = [
    {
        id: 1,
        title: "Learn Express",
        done: false
    },
    {
        id: 2,
        title: "Build CRUD API",
        done: false
    },
    {
        id: 3,
        title: "Submit FlyRank Assignment",
        done: true
    }
];

// Swagger Documentation
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Root endpoint
app.get("/", (req, res) => {
    res.json({
        name: "Task API",
        version: "1.0",
        endpoints: [
            "/tasks",
            "/health",
            "/docs"
        ]
    });
});

// Health check
app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});

// Get all tasks (SQLite)
app.get("/tasks", (req, res) => {

    db.all("SELECT * FROM tasks", [], (err, rows) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        const result = rows.map(task => ({
            id: task.id,
            title: task.title,
            done: Boolean(task.done)
        }));

        res.json(result);

    });

});

// Get task by ID (SQLite)
app.get("/tasks/:id", (req, res) => {

    const id = parseInt(req.params.id);

    db.get(
        "SELECT * FROM tasks WHERE id = ?",
        [id],
        (err, row) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (!row) {
                return res.status(404).json({
                    error: `Task ${id} not found`
                });
            }

            res.json({
                id: row.id,
                title: row.title,
                done: Boolean(row.done)
            });

        }
    );

});
// Create a new task (still using in-memory array)
app.post("/tasks", (req, res) => {

    const { title } = req.body;

    if (!title || !title.trim()) {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    const newTask = {
        id: tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
        title: title.trim(),
        done: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);

});

// Update a task (still using in-memory array)
app.put("/tasks/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    const { title, done } = req.body;

    if (title !== undefined) {

        if (!title.trim()) {
            return res.status(400).json({
                error: "Title is required"
            });
        }

        task.title = title.trim();
    }

    if (done !== undefined) {
        task.done = done;
    }

    res.json(task);

});

// Delete a task (still using in-memory array)
app.delete("/tasks/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    tasks.splice(index, 1);

    res.status(204).send();

});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});