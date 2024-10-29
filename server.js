const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let todos = []; // Table des tâches en mémoire

// Routes API
app.get("/api/todos", (req, res) => res.json(todos));

app.post("/api/todos", (req, res) => {
  const newTodo = { id: Date.now(), task: req.body.task, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.delete("/api/todos/:id", (req, res) => {
  todos = todos.filter((todo) => todo.id !== parseInt(req.params.id));
  res.status(204).end();
});

app.put("/api/todos/:id/completed", (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));

  if (todoIndex !== -1) {
    todos[todoIndex].completed = !todos[todoIndex].completed;
    res.json(todos[todoIndex]);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

// New PUT route for updating a todo's task
app.put("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));

  if (todoIndex !== -1) {
    todos[todoIndex].task = req.body.task; // Update the task
    res.json(todos[todoIndex]); // Respond with the updated todo
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server backend running at http://localhost:${PORT}`)
);
