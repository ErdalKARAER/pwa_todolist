import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editingId, setEditingId] = useState(null); // Id de la tâche en cours d'édition
  const [editingTask, setEditingTask] = useState(""); // Contenu de la tâche en cours d'édition

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

  // Mettre une tâche en mode édition
  const startEditing = (id, currentTask) => {
    setEditingId(id);
    setEditingTask(currentTask);
  };

  // Enregistrer les modifications de la tâche
  const updateTodo = () => {
    axios
      .put(`http://localhost:5000/api/todos/${editingId}`, {
        task: editingTask,
      })
      .then((response) => {
        setTodos(
          todos.map((todo) => (todo.id === editingId ? response.data : todo))
        );
        setEditingId(null); // Arrête le mode d'édition
        setEditingTask("");
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
              className="flex justify-between items-center bg-gray-50 border border-gray-200 p-3 rounded-lg shadow-sm"
            >
              {editingId === todo.id ? (
                // Mode édition
                <div className="flex-1 flex space-x-2">
                  <input
                    value={editingTask}
                    onChange={(e) => setEditingTask(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    onClick={updateTodo}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    Enregistrer
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Annuler
                  </button>
                </div>
              ) : (
                // Affichage normal
                <>
                  <span className="text-gray-800">{todo.task}</span>
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
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
