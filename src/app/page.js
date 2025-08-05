"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import TodoInput from "./component/TodoInput";
import Nav from "./component/Nav";
import TodoList from "./component/TodoList";
import Footer from "./component/Footer";
import SignUp from "./component/SignUp";
import SignIn from "./component/SignIn";

export default function Home() {
  const { data: session, status } = useSession();
  const [todos, setTodos] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("todo"); // Track current view: todo, signUp, or signIn

  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    calculateProgress(todos);
  }, [todos]);

  const completedTodos = (todos) => {
    return todos.filter((el) => el.completed);
  };

  const calculateProgress = (todos) => {
    const data = completedTodos(todos);
    const total = todos.length;
    const completed = data.length;
    const percentage =
      completed < 1 ? 0 : Math.round((completed / total) * 100);
    setProgress(percentage);
  };

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

  const handleShowSignUp = () => setView("signUp");
  const handleShowSignIn = () => setView("signIn"); // New function for SignIn
  const handleShowHome = () => setView("todo");

  if (status === "loading") {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-primary">
          <div className="text-white text-xl">Loading...</div>
        </div>
    );
  }

  // If user is authenticated, show the main app
  if (session) {
    return (
        <>
          <Nav
              onSignUpClick={handleShowSignUp}
              onSignInClick={handleShowSignIn}
              onLogoClick={handleShowHome}
              user={session.user}
              isAuthenticated={true}
          />
          <>
            <TodoInput onAdd={handleAddTodo} progress={progress} />
            <TodoList
                todos={todos}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
                loading={loading}
            />
          </>
          <Footer />
        </>
    );
  }

  // If not authenticated, show sign in/up views
  return (
      <>
        <Nav
            onSignUpClick={handleShowSignUp}
            onSignInClick={handleShowSignIn}
            onLogoClick={handleShowHome}
            isAuthenticated={false}
        />
        {view === "signUp" ? (
            <SignUp />
        ) : view === "signIn" ? (
            <SignIn />
        ) : (
            // Show welcome screen when not authenticated
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-primary">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-4">Welcome to Todo App</h1>
                <p className="text-xl mb-8">Please sign in to manage your todos</p>
                <button
                    onClick={handleShowSignIn}
                    className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Get Started
                </button>
              </div>
            </div>
        )}
        <Footer />
      </>
  );
}
