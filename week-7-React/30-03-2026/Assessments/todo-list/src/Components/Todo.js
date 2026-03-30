import React, { useState } from "react";

function Todo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // Add Task
  const addTask = () => {
    if (task.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: task,
      completed: false
    };

    setTodos([...todos, newTodo]); // immutable update
    setTask("");
  };

  // Delete Task
  const deleteTask = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Toggle Complete
  const toggleComplete = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div style={styles.container}>
      <h2>Todo App</h2>

      <div>
        <input
          type="text"
          placeholder="Enter Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={styles.input}
        />
        <button onClick={addTask} style={styles.addBtn}>Add</button>
      </div>

      <ul style={styles.list}>
        {todos.map(todo => (
          <li key={todo.id} style={styles.listItem}>
            <span
              onClick={() => toggleComplete(todo.id)}
              style={{
                ...styles.text,
                textDecoration: todo.completed ? "line-through" : "none"
              }}
            >
              {todo.completed ? "☑" : "☐"} {todo.text}
            </span>

            <button onClick={() => deleteTask(todo.id)} style={styles.deleteBtn}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px"
  },
  input: {
    padding: "8px",
    width: "200px",
    marginRight: "10px"
  },
  addBtn: {
    padding: "8px 15px",
    cursor: "pointer"
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "20px"
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    width: "300px",
    margin: "10px auto",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px"
  },
  text: {
    cursor: "pointer"
  },
  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer"
  }
};

export default Todo;