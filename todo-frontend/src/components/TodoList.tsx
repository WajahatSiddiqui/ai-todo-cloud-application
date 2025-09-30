"use client";

import { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL!);
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const data = await res.json();
      setTodos(data);
    } catch (e: any) {
      setError(e?.message || "Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  const toggleDone = async (todo: Todo) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...todo, done: !todo.done }),
    });
    fetchTodos();
  };

  const deleteTodo = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <ul className="flex flex-col gap-3 mt-6">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-md"
        >
          <div>
            <h2 className={`font-semibold ${todo.done ? "line-through text-gray-500" : ""}`}>
              {todo.title}
            </h2>
            <p className="text-sm text-gray-600">{todo.description}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => toggleDone(todo)}
              className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
            >
              {todo.done ? "Undo" : "Done"}
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
