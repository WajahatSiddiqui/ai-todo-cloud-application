"use client";

import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

export default function HomePage() {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Todo App (By Wajahat Siddiqui)</h1>
      <TodoForm onAdd={() => window.location.reload()} />
      <TodoList />
    </main>
  );
}