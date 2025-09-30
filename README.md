# AI Todo Cloud Application


<img width="850" height="702" alt="image" src="https://github.com/user-attachments/assets/9dee3fc8-db13-44a7-b477-da8491349069" />

Monorepo containing a Spring Boot backend API and a Next.js frontend UI.

## Repository Structure

```
ai-todo-cloud-application/
├── todo-server/      # Spring Boot REST API (Java 17, Maven)
└── todo-frontend/    # Next.js App Router UI (Tailwind CSS v4)
```

## High-Level Architecture

- **Backend (`todo-server`)**
  - Exposes REST endpoints under `/api/todos`.
  - Manages Todo entities with fields: `id`, `title`, `description`, `done`.
  - Default port: `9000`.

- **Frontend (`todo-frontend`)**
  - Next.js (App Router) with Tailwind v4 for styling.
  - Reads API base URL from `NEXT_PUBLIC_API_BASE_URL`.
  - Renders a Todo form and list; allows add, toggle done, and delete.

## Prerequisites

- Java 17+, Maven 3.9+
- Node.js 18+, npm 9+

## Setup and Run

### 1) Backend (Spring Boot)

```bash
cd todo-server
mvn clean install -DskipTests
mvn spring-boot:run
# Serves at http://localhost:9000
```

API Base:
```
http://localhost:9000/api/todos
```

Todo JSON shape:
```json
{
  "id": 1,
  "title": "Sample Todo",
  "description": "This is a sample todo item",
  "done": false
}
```

### 2) Frontend (Next.js)

```bash
cd todo-frontend
npm install

# Set API base URL
printf "NEXT_PUBLIC_API_BASE_URL=http://localhost:9000/api/todos\n" > .env.local

npm run dev
# Open the printed URL (e.g. http://localhost:3000 or http://localhost:3001)
```

Notes:
- The home page component `src/app/page.tsx` is a Client Component (includes `"use client"`).
- Tailwind v4 is imported via `@import "tailwindcss";` in global CSS.

## Common Commands

- Backend tests: `cd todo-server && mvn test`
- Frontend build: `cd todo-frontend && npm run build && npm start`

## Troubleshooting

- Backend port busy: change `server.port` in `todo-server/src/main/resources/application.properties`.
- Frontend shows default Next.js page:
  - Ensure `src/app/page.tsx` renders the Todo UI and restart after removing `.next/`.
  - Open the URL printed by the dev server (may be port 3001 if 3000 is busy).
- Network errors in UI: verify `.env.local` points to the backend and the server is running.

## Where to Look in Code

- Backend controller: `todo-server/src/main/java/com/wajahat/todo/controller/TodoController.java`
- Frontend components: `todo-frontend/src/components/`
- Frontend page: `todo-frontend/src/app/page.tsx`

## License

MIT
