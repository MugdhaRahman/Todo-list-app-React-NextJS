"use client";

import { useEffect, useState } from "react";
import TodoInput from "./component/TodoInput";
import Nav from "./component/Nav";
import TodoList from "./component/TodoList";
import Footer from "./component/Footer";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    calculateProgress(todos)
  }, [todos]);

  const completedTodos = (todos) => {
      return todos.filter(el => el.completed)
  }

  const calculateProgress = (todos)=> {
    const data = completedTodos(todos)

    const total = todos.length
    const completed = data.length

    const percentage = completed < 1 ? 0 : Math.round((completed /total) * 100);
    setProgress(percentage)
  }


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
        progress={progress}
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
