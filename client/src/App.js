import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  // Récupérer les tâches
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Ajouter une tâche
  const addTodo = () => {
    axios
      .post("http://localhost:5000/api/todos", { task })
      .then((response) => setTodos([...todos, response.data]))
      .catch((error) => console.error(error));
    setTask("");
  };

  // Supprimer une tâche
  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)))
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Nouvelle tâche"
      />
      <button onClick={addTodo}>Ajouter</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.task}{" "}
            <button onClick={() => deleteTodo(todo.id)}>Supprimer</button>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
