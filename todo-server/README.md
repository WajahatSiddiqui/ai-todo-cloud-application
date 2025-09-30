# Todo Backend (Spring Boot)

A Todo REST API built with Spring Boot.

## Prerequisites

- Java 17+
- Maven 3.9+
- (Optional) PostgreSQL, if you want to use a real DB. Defaults can be changed in `application.properties`.

## Quick Start

```bash
mvn clean install -DskipTests
mvn spring-boot:run
# Server will start at http://localhost:9000
```

## API Base URL

```
http://localhost:9000/api/todos
```

## Todo JSON Shape

```json
{
  "id": 1,
  "title": "Sample Todo",
  "description": "This is a sample todo item",
  "done": false
}
```

Note: The frontend expects the boolean field to be `done`.

## Frontend Integration

Set this in `todo-frontend/.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:9000/api/todos
```

Then start the frontend from `todo-frontend`:

```bash
npm run dev
# Open the printed URL (e.g. http://localhost:3000 or http://localhost:3001)
```

## Troubleshooting

- Port conflict: change the port in `src/main/resources/application.properties` (e.g. `server.port=8080`).
- Build issues: ensure Java 17+ and Maven are installed; run `mvn -v` to verify.
