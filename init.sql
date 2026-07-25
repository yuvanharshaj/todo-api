CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    done BOOLEAN DEFAULT FALSE
);

INSERT INTO tasks (title, done)
SELECT 'Learn Express', FALSE
WHERE NOT EXISTS (SELECT 1 FROM tasks);

INSERT INTO tasks (title, done)
SELECT 'Build CRUD API', FALSE
WHERE NOT EXISTS (
    SELECT 1 FROM tasks WHERE title='Build CRUD API'
);

INSERT INTO tasks (title, done)
SELECT 'Submit FlyRank Assignment', TRUE
WHERE NOT EXISTS (
    SELECT 1 FROM tasks WHERE title='Submit FlyRank Assignment'
);