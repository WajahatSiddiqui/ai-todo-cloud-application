# Todo List REST API

A simple and efficient Todo List REST API built with Spring Boot and PostgreSQL. This application provides full CRUD operations for managing todo items with a clean, RESTful interface.

## 🚀 Features

- **Create** new todo items
- **Read** all todos or get a specific todo by ID
- **Update** existing todo items
- **Delete** todo items
- **PostgreSQL** database integration
- **RESTful API** design
- **Spring Data JPA** for data persistence
- **HikariCP** connection pooling
- **Cross-Origin Resource Sharing (CORS)** enabled

## 🛠️ Technology Stack

- **Java 17** (or higher)
- **Spring Boot 3.5.5**
- **Spring Data JPA**
- **PostgreSQL 14+**
- **HikariCP** (connection pooling)
- **Maven** (build tool)
- **Lombok** (boilerplate code reduction)

## 📋 Prerequisites

Before running this application, make sure you have:

- **Java 17** or higher installed
- **Maven 3.6+** installed
- **PostgreSQL 14+** installed and running
- A PostgreSQL database named `todo_db`
- A PostgreSQL user with credentials (default: username=`todo`, password=`todo`)

## 🔧 Database Setup

1. **Install PostgreSQL** (if not already installed):
   ```bash
   # On macOS using Homebrew
   brew install postgresql
   
   # On Ubuntu/Debian
   sudo apt-get install postgresql postgresql-contrib
   ```

2. **Start PostgreSQL service**:
   ```bash
   # On macOS
   brew services start postgresql
   
   # On Ubuntu/Debian
   sudo systemctl start postgresql
   ```

3. **Create database and user**:
   ```sql
   -- Connect to PostgreSQL as superuser
   psql -U postgres
   
   -- Create database
   CREATE DATABASE todo_db;
   
   -- Create user
   CREATE USER todo WITH PASSWORD 'todo';
   
   -- Grant privileges
   GRANT ALL PRIVILEGES ON DATABASE todo_db TO todo;
   
   -- Exit psql
   \q
   ```

## ⚙️ Configuration

The application is configured via `src/main/resources/application.properties`:

```properties
# Application Configuration
spring.application.name=todo
server.port=9000

# PostgreSQL Database Configuration
spring.datasource.driver-class-name=org.postgresql.Driver
spring.datasource.url=jdbc:postgresql://localhost:5432/todo_db
spring.datasource.username=todo
spring.datasource.password=todo

# HikariCP Connection Pool Configuration
spring.datasource.hikari.connection-timeout=30000
spring.datasource.hikari.idle-timeout=600000
spring.datasource.hikari.max-lifetime=1800000
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=2
spring.datasource.hikari.pool-name=TodoHikariPool
spring.datasource.hikari.auto-commit=true
spring.datasource.hikari.connection-test-query=SELECT 1
spring.datasource.hikari.transaction-isolation=TRANSACTION_READ_COMMITTED

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd todo
```

### 2. Install Dependencies
```bash
mvn clean install
```

### 3. Run the Application
```bash
mvn spring-boot:run
```

The application will start on `http://localhost:9000`

### 4. Alternative: Run as JAR
```bash
# Build the JAR file
mvn clean package

# Run the JAR
java -jar target/todo-0.0.1-SNAPSHOT.jar
```

## 📚 API Documentation

### Base URL
```
http://localhost:9000/api/todos
```

### Endpoints

#### 1. Get All Todos
- **Method**: `GET`
- **URL**: `/api/todos`
- **Response**: Array of todo objects

```bash
curl -X GET http://localhost:9000/api/todos
```

#### 2. Get Todo by ID
- **Method**: `GET`
- **URL**: `/api/todos/{id}`
- **Response**: Single todo object

```bash
curl -X GET http://localhost:9000/api/todos/1
```

#### 3. Create New Todo
- **Method**: `POST`
- **URL**: `/api/todos`
- **Content-Type**: `application/json`
- **Body**:
```json
{
  "title": "Sample Todo",
  "description": "This is a sample todo item",
  "done": false
}
```

```bash
curl -X POST http://localhost:9000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Spring Boot",
    "description": "Complete the Spring Boot tutorial",
    "done": false
  }'
```

#### 4. Update Todo
- **Method**: `PUT`
- **URL**: `/api/todos/{id}`
- **Content-Type**: `application/json`
- **Body**:
```json
{
  "title": "Updated Todo",
  "description": "Updated description",
  "done": true
}
```

```bash
curl -X PUT http://localhost:9000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Spring Boot",
    "description": "Complete the Spring Boot tutorial",
    "done": true
  }'
```

#### 5. Delete Todo
- **Method**: `DELETE`
- **URL**: `/api/todos/{id}`

```bash
curl -X DELETE http://localhost:9000/api/todos/1
```

### Todo Object Structure

```json
{
  "id": 1,
  "title": "Sample Todo",
  "description": "This is a sample todo item",
  "done": false
}
```

**Field Descriptions**:
- `id` (Long): Unique identifier (auto-generated)
- `title` (String): Todo title (required)
- `description` (String): Todo description (optional)
- `done` (Boolean): Completion status (default: false)

## 🏗️ Project Structure

```
src/
├── main/
│   ├── java/
│   │   └── com/wajahat/todo/
│   │       ├── TodoApplication.java          # Main application class
│   │       ├── controller/
│   │       │   └── TodoController.java       # REST controller
│   │       ├── model/
│   │       │   └── Todo.java                 # Entity class
│   │       ├── repository/
│   │       │   └── TodoRepository.java       # JPA repository
│   │       └── service/
│   │           └── TodoService.java          # Business logic layer
│   └── resources/
│       └── application.properties            # Configuration file
└── test/
    └── java/
        └── com/wajahat/todo/
            └── TodoApplicationTests.java     # Integration tests
```

## 🧪 Running Tests

```bash
# Run all tests
mvn test

# Run tests with coverage
mvn test jacoco:report
```

## 🔍 Health Check

After starting the application, verify it's running:

```bash
# Check if the application is responding
curl -X GET http://localhost:9000/api/todos

# Should return an empty array [] if no todos exist
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Ensure PostgreSQL is running
   - Verify database credentials in `application.properties`
   - Check if database `todo_db` exists

2. **Port 9000 Already in Use**
   - Change the port in `application.properties`:
     ```properties
     server.port=8080
     ```

3. **Build Failures**
   - Ensure Java 17+ is installed
   - Run `mvn clean install` to refresh dependencies

### Logs

Application logs will show:
- Database connection status
- SQL queries (when `spring.jpa.show-sql=true`)
- HikariCP connection pool information

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Wajahat** - [GitHub Profile](https://github.com/wajahat)

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- PostgreSQL community for the reliable database
- HikariCP for high-performance connection pooling
