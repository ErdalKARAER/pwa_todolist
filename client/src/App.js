import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTask, setEditingTask] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error(error));
  }, []);

  const addTodo = () => {
    axios
      .post("http://localhost:5000/api/todos", { task })
      .then((response) => setTodos([...todos, response.data]))
      .catch((error) => console.error(error));
    setTask("");
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)))
      .catch((error) => console.error(error));
  };

  const startEditing = (id, currentTask) => {
    setEditingId(id);
    setEditingTask(currentTask);
  };

  const updateTodo = () => {
    axios
      .put(`http://localhost:5000/api/todos/${editingId}`, {
        task: editingTask,
      })
      .then((response) => {
        setTodos(
          todos.map((todo) => (todo.id === editingId ? response.data : todo))
        );
        setEditingId(null);
        setEditingTask("");
      })
      .catch((error) => console.error(error));
  };

  const toggleComplete = (id) => {
    axios
      .put(`http://localhost:5000/api/todos/${id}/completed`)
      .then((response) => {
        setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-center text-blue-500 mb-6">
          Todo List
        </h1>
        <div className="flex mb-4">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Nouvelle tâche"
            className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white font-semibold px-4 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Ajouter
          </button>
        </div>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex justify-between items-center bg-gray-50 border border-gray-200 p-3 rounded-lg shadow-sm ${
                todo.completed ? "line-through text-gray-400" : ""
              }`}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  className="mr-3"
                />
                <span>{todo.task}</span>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => startEditing(todo.id, todo.task)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  Modifier
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
