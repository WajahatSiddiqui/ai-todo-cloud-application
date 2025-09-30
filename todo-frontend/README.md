# Todo Frontend (Next.js + Tailwind v4)

A simple Todo UI built with Next.js App Router and Tailwind CSS v4.

## Prerequisites

- Node.js 18+
- npm 9+
- Backend running (see `todo-server`), default at `http://localhost:9000`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` with your backend API base URL:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:9000/api/todos
```

3. Run the dev server:

```bash
npm run dev
```

- If port 3000 is busy, Next.js will switch to the next available port (e.g. 3001). Open the printed URL.

## Important Notes

- Tailwind v4 is used. Global styles import Tailwind via:

```css
@import "tailwindcss";
```

- Avoid using `@apply` in standalone CSS files that aren’t processed by Tailwind layers.
- `src/app/page.tsx` is a Client Component (contains `"use client"`) so it can pass handlers to child client components:

```tsx
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
```

- Components live in `src/components/` and are imported from `src/app/` with `../components/...`.
- The UI expects the Todo object to have a boolean `done` field.

## Build and Start

```bash
npm run build
npm start
```

## Troubleshooting

- Still seeing the Next.js template page? Ensure `src/app/page.tsx` contains the Todo UI and restart the dev server after clearing `.next/`.
- 404s or network errors: verify the backend URL in `.env.local` and that the server is running on port 9000.
