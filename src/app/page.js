"use client";

import { useEffect, useState } from "react";
import TodoInput from "./component/TodoInput";
import Nav from "./component/Nav";
import TodoList from "./component/TodoList";
import Footer from "./component/Footer";

export default function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  const handleAddTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleToggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <Nav />
      <TodoInput
        onAdd={handleAddTodo}
        total={todos.length}
        completed={todos.filter((todo) => todo.completed).length}
      />
      <TodoList
        todos={todos}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
      />
      <Footer />
    </>
  );
}
