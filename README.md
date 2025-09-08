# REST API Project Setup

This document details the steps taken to set up this REST API project. Each step is explained to provide a clear understanding of the project's foundation.

## 1. Project Initialization

```bash
npm init -y
```

This command initializes a new Node.js project with a `package.json` file. The `-y` flag automatically fills in the default values, which is a quick way to get started. The `package.json` file is crucial as it manages the project's metadata, dependencies, and scripts.

## 2. TypeScript Installation

```bash
npm install -D typescript
```

TypeScript is a statically typed superset of JavaScript that adds optional types. It helps in catching errors early during development and improves code quality and maintainability. We install it as a development dependency (`-D`) because it's only needed during the development phase to compile TypeScript code into JavaScript.

## 3. ts-node Installation

```bash
npm install -D ts-node
```

`ts-node` is a TypeScript execution engine and REPL for Node.js. It allows you to run TypeScript files directly without pre-compiling them into JavaScript. This is extremely useful for development and testing. It's also installed as a development dependency.

## 4. nodemon Installation

```bash
npm install -D nodemon
```

`nodemon` is a tool that helps develop Node.js-based applications by automatically restarting the node application when file changes in the directory are detected. This speeds up the development process as you don't have to manually restart the server every time you make a change. This is also a development dependency.

## 5. .gitignore

A `.gitignore` file was added to the project to prevent sensitive and unnecessary files from being committed to the Git repository. This includes `node_modules`, environment variables, build outputs, and editor-specific files.

## 6. Initial Server Setup (`src/index.ts`)

The main entry point of the application is `src/index.ts`. This file is responsible for setting up the Express server and its middleware.

- **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **http**: A built-in Node.js module to create an HTTP server.
- **cookie-parser**: Middleware to parse `Cookie` header and populate `req.cookies` with an object keyed by the cookie names.
- **body-parser**: Middleware to parse incoming request bodies. It's a crucial part of handling POST requests.
- **compression**: Middleware to compress response bodies for better performance.
- **cors**: Middleware to enable Cross-Origin Resource Sharing (CORS) with various options.

The server is configured to use these middlewares and listens on port 8080.

## 7. Express Dependencies Installation

```bash
npm install express cookie-parser body-parser compression cors
npm install @types/express @types/cookie-parser @types/body-parser @types/compression @types/cors --save-dev
```

Installation of core Express.js dependencies and their TypeScript type definitions:
- **express**: Web application framework for Node.js
- **cookie-parser**: Parse Cookie header and populate req.cookies
- **body-parser**: Parse incoming request bodies in middleware before handlers
- **compression**: Compress response bodies for all requests
- **cors**: Enable CORS (Cross-Origin Resource Sharing) with various options

## 8. MongoDB Integration

```bash
npm install mongoose dotenv
```

Added MongoDB database support and environment variable management:

### MongoDB Connection (`mongoose`)
- **mongoose**: Elegant MongoDB object modeling for Node.js
- Provides schema-based solution to model application data
- Includes built-in type casting, validation, query building, and business logic hooks

### Environment Variables (`dotenv`)
- **dotenv**: Loads environment variables from `.env` file into `process.env`
- Keeps sensitive configuration (like database URLs) separate from code
- Essential for security and different environment configurations

### Database Configuration
The MongoDB connection is configured in `src/index.ts` with:
- Environment variable validation to ensure `MONGO_URL` is defined
- Error handling for connection failures
- Success logging when connection is established
- Connection string stored securely in `.env` file (excluded from version control)

## 9. Environment Configuration

Created `.env` file to store sensitive configuration:
```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/database
```

The `.env` file is automatically ignored by Git (included in `.gitignore`) to prevent sensitive data from being committed to the repository.

## 10. Database Structure

Created `src/db/` directory to organize database-related files:
- `src/db/users.ts` - User model and schema definitions (ready for implementation)
