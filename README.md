# eBook Portal API

A REST API for user registration and login, book and category management, and book reviews. The server uses Express 5, MongoDB with Mongoose, JWTs stored in HTTP-only cookies, and Zod validation for authentication requests.

## Requirements

- Node.js 18 or newer
- npm
- A MongoDB instance (local or hosted)

## Setup

1. Install dependencies:

   ```sh
   npm install
   ```

2. Copy `.env.example` to `.env` and set the values below. Keep `.env` private.

   | Variable | Purpose |
   | --- | --- |
   | `APP_URL` | Base URL printed in the startup message, for example `http://localhost:8000` |
   | `PORT` | HTTP port; use `8000` for the default local setup |
   | `MONGODB_URI` | MongoDB connection string |
   | `JWT_SECRET` | Secret used to sign and verify login tokens |
   | `JWT_EXPIRES_IN` | Optional token lifetime accepted by `jsonwebtoken`, for example `1d` (defaults to `1d`) |
   | `APP_NAME` | Currently unused by the application |

   `APP_URL`, `MONGODB_URI`, and `JWT_SECRET` must be configured. `PORT` falls back to `8000` in the server code, though its startup check also expects a port value. Set it explicitly to avoid startup failure.

3. Start the development server:

   ```sh
   npm run dev
   ```

The API listens on the configured port. `GET /` returns a welcome message. The database connection is established at startup.

## Project layout

```text
src/
  app.js             Express app and route mounting
  server.js          Server startup
  config/db.js       MongoDB connection
  controllers/       Request handlers
  middlewares/       Authentication, roles, and validation
  models/            Mongoose schemas
  routes/             API route definitions
  validators/         Zod request schemas
```

## Scripts

- `npm run dev` — run the server with Nodemon.
