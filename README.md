# 🖥️ Xuma

## 🛠️ Technical Test Requirements

This project was developed as part of a technical test for a Semi-Senior Node.js Developer position. The goal was to build a simple, modular Order Management System using Node.js and TypeScript, following clean architecture principles and applying best practices.

### Goal

Build an **Order Management System** using **Node.js** and **TypeScript**.

### Requirements

1. **Order Management**:

- Register, update, and query customer orders.
- Each order must include:
  - **ID**: Unique identifier.
  - **Date**: Timestamp of the order.
  - **Status**: Current state of the order.
  - **Customer Info**: Name, email, and contact details.
  - **Product List**: Items with name, price, and quantity.

2. **Order Total Calculation**:

- Automatically calculate the total price for each order (`price × quantity`).

3. **Status Transitions**:

- Allowed transitions:
  - `pending → processing`
  - `processing → completed` or `processing → cancelled`
- No changes allowed once the status is `completed` or `cancelled`.

4. **Querying**:

- Search orders by:
  - **Customer email**
  - **Order status**

5. **Storage**:

- Use **in-memory storage** or a **JSON file** (no real database).

6. **Modular Architecture**:

- Separate business logic from data access.

### Bonus (Optional)

- **REST API**:

  - Implement endpoints using **Express**.

- **Input Validation**:

  - Validate incoming data for correctness.

- **Strong Typing**:

  - Use **TypeScript interfaces** and types for all entities.

- **Logging**:
  - Implement logging (console or file-based) for debugging and monitoring.

## 🚀 Getting Started

### Live Deployment

If you'd like to try the project deployed online, you can visit:

👉 https://xuma-czs5.onrender.com

This project is deployed using Render and uses Neon.tech for PostgreSQL and MongoDB databases.

### ⚠️ Temporary Availability Notice

This project was temporarily made available online solely for the purpose of the technical test. It may be taken down or become unavailable at any time after the evaluation period.

### Local Deployment

### 1. Clone the repo and install dependencies

```bash
git clone https://github.com/josueperezparejo/xuma.git
cd xuma
npm install
```

### 2. Setup environment variables

Create a .env file in the root directory:

```javascript
# App Ports
APP_PORT_DEV=3000
APP_PORT_PROD=8000

# PostgreSQL_DEV
POSTGRES_DEV_DB=example_dev_db
POSTGRES_DEV_USER=example_dev_user
POSTGRES_DEV_PASSWORD=example_dev_password
POSTGRES_DEV_PORT=5432
POSTGRES_DEV_HOST=127.0.0.1

# PostgreSQL_PROD
POSTGRES_PROD_DB=example_prod_db
POSTGRES_PROD_USER=example_prod_user
POSTGRES_PROD_PASSWORD=example_prod_password
POSTGRES_PROD_PORT=5432
POSTGRES_PROD_HOST=127.0.0.1

# PgAdmin
PGADMIN_DEFAULT_EMAIL=example_admin@example.com
PGADMIN_DEFAULT_PASSWORD=example_password
PGADMIN_PORT=8080

# Mongo
MONGO_URL=mongodb://user:password@localhost:27017/
MONGO_DB_NAME=database_name
MONGO_USER=user
MONGO_PASS=password

```

### 3. Ensure Docker is Installed

This project uses Docker to run services such as PostgreSQL, PgAdmin, and MongoDB. If you don't have Docker installed, you can download it from https://www.docker.com/get-started

### 4. Start the containers with Docker Compose

Run the following command to start the containers:

```bash
docker-compose up -d
```

### 5. Run Migrations and Seeders

Once the containers are up and the project is configured:

```
npm run db:migrate
npm run db:seed
```

### 6. Start the server in development mode

```
npm run dev
```

### 7. Available Scripts

| Script                  | Description                                             |
| ----------------------- | ------------------------------------------------------- |
| `npm run dev`           | Starts the server in development mode with tsx watch    |
| `npm run build`         | Compiles TypeScript into JavaScript inside `dist/`      |
| `npm start`             | Builds and starts the server in production mode         |
| `npm run clean`         | Removes the `dist/` folder                              |
| `db:migrate`, `db:seed` | Sequelize CLI commands for managing DB migrations/seeds |

### 8. Sequelize CLI Commands

| Command                   | Environment | Description                       |
| ------------------------- | ----------- | --------------------------------- |
| `npm run db:migrate`      | Development | Run all pending migrations        |
| `npm run db:migrate:undo` | Development | Revert the last migration         |
| `npm run db:seed`         | Development | Seed the database with dummy data |
| `npm run db:migrate:prod` | Production  | Run migrations on production DB   |
| `npm run db:seed:prod`    | Production  | Seed production database          |

💡 Sequelize reads the environment from NODE_ENV and uses matching .env variables.

## 📦 Available REST APIs for Order Management

### ✅ 1. Get All Orders

**Method:** `GET`  
**Endpoint:** `/api/orders`

**Optional Query Parameters:**

- `email`: Filter by client email.
- `status`: Filter by order status (e.g., `pending`, `processing`, etc.).

**Example Request:**

```http
GET /api/orders?email=client@email.com&status=pending
```

---

### ✅ 2. Get a Specific Order by ID

**Method:** `GET`  
**Endpoint:** `/api/orders/:id`

**Example Request:**

```http
GET /api/orders/12
```

---

### ✅ 3. Create a New Order

**Method:** `POST`  
**Endpoint:** `/api/orders`

**Required Body (JSON):**

```json
{
  "clientName": "John Doe",
  "clientEmail": "john@example.com",
  "status": "pending",
  "date": "2024-04-17T00:00:00Z",
  "products": [
    {
      "name": "Product A",
      "unitPrice": 100,
      "quantity": 2
    },
    {
      "name": "Product B",
      "unitPrice": 50,
      "quantity": 1
    }
  ]
}
```

---

### ✅ 4. Update an Order’s Status

**Method:** `PATCH`  
**Endpoint:** `/api/orders/:id/status`

**Required Body (JSON):**

```json
{
  "newStatus": "processing"
}
```

---

### ✅ 5. Delete an Order

**Method:** `DELETE`  
**Endpoint:** `/api/orders/:id`

**Example Request:**

```http
DELETE /api/orders/12
```

## 📦 Available REST APIs for Logs Management

### ✅ 1. Get Logs by Severity Level

**Method:** `POST`  
**Endpoint:** `/api/logs`

**Required Body (JSON):**

```json
{
  "level": "high"
}
```

**Description:**  
This endpoint retrieves all logs from MongoDB that match the specified severity level.

**Accepted Values for `level`:**

- `low`
- `medium`
- `high`  
  (depending on how `LogLevelSeverity` is defined).

**Description:**  
This endpoint retrieves all logs from MongoDB that match the specified severity level.

### Author

[GitHub](https://github.com/josueperezparejo)
[Linkedin](https://www.linkedin.com/in/josueperezparejo/)
