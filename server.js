const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3000;

app.use(express.json());

const db = new sqlite3.Database("./tasks.db", (err) => {
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

    db.get(
        "SELECT COUNT(*) AS count FROM tasks",
        (err, row) => {

            if (err) {
                console.error(err.message);
                return;
            }

            if (row.count === 0) {

                const stmt = db.prepare(
                    "INSERT INTO tasks (title, done) VALUES (?, ?)"
                );

                stmt.run("Learn Express", 0);
                stmt.run("Build CRUD API", 0);
                stmt.run("Submit FlyRank Assignment", 1);

                stmt.finalize();

                console.log("✅ Sample tasks inserted.");
            }

        }
    );

});

// Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Root
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

// Health
app.get("/health", (req, res) => {

    res.json({
        status: "ok"
    });

});

// GET all tasks
app.get("/tasks", (req, res) => {

    db.all(
        "SELECT * FROM tasks",
        [],
        (err, rows) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            const tasks = rows.map(task => ({
                id: task.id,
                title: task.title,
                done: Boolean(task.done)
            }));

            res.json(tasks);

        }
    );

});

// GET task by id
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
// POST task
app.post("/tasks", (req, res) => {

    const { title } = req.body;

    if (!title || !title.trim()) {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    db.run(
        "INSERT INTO tasks (title, done) VALUES (?, ?)",
        [title.trim(), 0],
        function (err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.status(201).json({
                id: this.lastID,
                title: title.trim(),
                done: false
            });

        }
    );

});

// PUT task
app.put("/tasks/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const { title, done } = req.body || {};

    if (title !== undefined && !title.trim()) {
        return res.status(400).json({
            error: "Title is required"
        });
    }

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

            const updatedTitle =
                title !== undefined ? title.trim() : row.title;

            const updatedDone =
                done !== undefined ? (done ? 1 : 0) : row.done;

            db.run(
                "UPDATE tasks SET title = ?, done = ? WHERE id = ?",
                [updatedTitle, updatedDone, id],
                function (err) {

                    if (err) {
                        return res.status(500).json({
                            error: err.message
                        });
                    }

                    res.json({
                        id,
                        title: updatedTitle,
                        done: Boolean(updatedDone)
                    });

                }
            );

        }
    );

});

// DELETE task
app.delete("/tasks/:id", (req, res) => {

    const id = parseInt(req.params.id);

    db.run(
        "DELETE FROM tasks WHERE id = ?",
        [id],
        function (err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    error: `Task ${id} not found`
                });
            }

            res.status(204).send();

        }
    );

});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});