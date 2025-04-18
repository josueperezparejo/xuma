# 🧱 Backend Template – Express + TypeScript + Sequelize

# Design Pattern Repository

This is a clean, scalable backend template built with **Express.js**, **TypeScript**, and **Sequelize**. It includes a class-based server structure, PostgreSQL database integration, Sequelize CLI support for migrations and seeds, and essential middlewares for security and logging.

## 📦 Features

- ⚙️ **Express 5** with TypeScript
- 🧠 **Sequelize ORM** for PostgreSQL with CLI support (migrations, seeds)
- 🗃️ Class-based server architecture
- 🌱 Environment-specific database configs via `.env`
- 🪪 Security with `helmet`
- 🔍 Logging with `morgan`
- 🔁 Live reload with `tsx watch`
- ✅ Ready for input validation with `express-validator`
- 🌍 CORS support
- 🧹 Clean build process using `rimraf`

## 🚀 Getting Started

### 1. Clone the repo and install dependencies

```bash
git clone https://github.com/your-username/backend-template-express.git
cd backend-template-express
npm install
```

### 2. Create your .env file

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

```

### 3. Project Structure

```bash
src/
├── config/            # DB credentials loaded from .env
├── controllers/       # Business logic for each route
├── database/          # Sequelize setup (authenticate, sync, instance)
├── middlewares/       # Middlewares for validation, errors, etc.
├── models/            # Sequelize model definitions
├── routes/            # Express routes grouped by resource
├── services/          # Optional: logic separated from controllers
├── validators/        # express-validator schemas
├── server.ts          # Class-based server configuration
└── index.ts           # App entry point
```

### 4. Scripts

| Script                  | Description                                             |
| ----------------------- | ------------------------------------------------------- |
| `npm run dev`           | Starts the server in development mode with tsx watch    |
| `npm run build`         | Compiles TypeScript into JavaScript inside `dist/`      |
| `npm start`             | Builds and starts the server in production mode         |
| `npm run clean`         | Removes the `dist/` folder                              |
| `db:migrate`, `db:seed` | Sequelize CLI commands for managing DB migrations/seeds |

### 5. Sequelize CLI Scripts

| Command                   | Environment | Description                       |
| ------------------------- | ----------- | --------------------------------- |
| `npm run db:migrate`      | Development | Run all pending migrations        |
| `npm run db:migrate:undo` | Development | Revert the last migration         |
| `npm run db:seed`         | Development | Seed the database with dummy data |
| `npm run db:migrate:prod` | Production  | Run migrations on production DB   |
| `npm run db:seed:prod`    | Production  | Seed production database          |

💡 Sequelize reads the environment from NODE_ENV and uses matching .env variables.

### 6. Database Handling

```typescript
const database = {
  sequelize,
  Sequelize,
  async authenticate() {
    try {
      await sequelize.authenticate();
      console.log("✅ Database connected");
    } catch (error) {
      console.error("❌ Unable to connect to the database");
      process.exit(1);
    }
  },
  async sync() {
    if (process.env.NODE_ENV === "development") {
      try {
        await sequelize.sync({ alter: true });
        console.log("✅ Models synchronized");
      } catch (error) {
        console.error("❌ Error synchronizing models");
        process.exit(1);
      }
    }
  },
};
```

### 7. Middleware & Utilities

- helmet – sets secure HTTP headers

- morgan – logs HTTP requests in development

- cors – enables CORS

- express.json and express.urlencoded – parses incoming requests

- express-validator – validates incoming data (optional)

### 9. Clean Build

To remove old builds before creating a new one:

```
npm run clean
npm run build
```

### 10. Production Notes

- Avoid using sequelize.sync({ alter: true }) in production.

- Use migrations (db:migrate:prod) instead for consistent DB changes.

- Make sure .env variables for production are set securely.

### Tech Stack

- Express.js

- TypeScript

- PostgreSQL + Sequelize

- dotenv for environment config

- helmet, morgan, cors for middleware

## 🛠️ Migrations Guide

This project uses Sequelize CLI to manage database migrations. Below is a typical workflow for creating, running, and reverting migrations in both development and production environments.

### Creating a New Migration

```
npx sequelize-cli migration:generate --name <migration-name>
```

🔧 Replace <migration-name> with a descriptive name like create-name-table.

This will generate a new file in the migrations/ directory with a boilerplate structure to define your schema changes.

### Running Migrations (Development)

```
npm run db:migrate
```

### Reverting the Last Migration

```
npm run db:migrate:undo
```

This command applies all pending migrations to your local development database.

This will undo the last executed migration.

To revert all migrations (e.g., for resetting the development database):

```
npx sequelize-cli db:migrate:undo:all
```

### Creating and Running Seeders

Create a seeder file:

```
npx sequelize-cli seed:generate --name <seed-name>
```

### Running Seeders (Dummy/Test Data)

```
npm run db:seed
```

Make sure you have seeder files inside the seeders/ folder.

### Running Migrations in Development

```
npm run db:migrate
npm run db:seed
```

### Running Migrations in Production

When working in production, carefully apply migrations to the live database:

```
npm run db:migrate:prod
npm run db:seed:prod
```

⚠️ Use these commands with caution in production environments.

### Author

[GitHub](https://github.com/josueperezparejo)
[Linkedin](https://www.linkedin.com/in/josueperezparejo/)
