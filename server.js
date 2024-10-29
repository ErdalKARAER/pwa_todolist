const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let todos = []; // Table des tâches en mémoire

// Routes API
app.get("/api/todos", (req, res) => res.json(todos));
app.post("/api/todos", (req, res) => {
  const newTodo = { id: Date.now(), ...req.body };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});
app.delete("/api/todos/:id", (req, res) => {
  todos = todos.filter((todo) => todo.id !== parseInt(req.params.id));
  res.status(204).end();
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Serveur backend sur http://localhost:${PORT}`)
);
