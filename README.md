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

### User Model (`src/db/users.ts`)
Implemented a complete user management system with:

**User Schema:**
- `username`: Unique username for each user
- `email`: Unique email address for authentication
- `authentication`: Nested object containing:
  - `password`: Hashed password (excluded from queries by default)
  - `salt`: Random salt for password hashing (excluded from queries by default)
  - `sessionToken`: Token for session management (excluded from queries by default)

**User Operations:**
- `getUsers()`: Retrieve all users
- `findUserById(id)`: Find user by MongoDB ObjectId
- `getUserByEmail(email)`: Find user by email address
- `getUserBySessionToken(token)`: Find user by session token
- `createUser(values)`: Create new user with provided data
- `deleteUserById(id)`: Delete user by ID
- `updateUserById(id, updates)`: Update user information

## 11. Authentication Helpers (`src/helpers/index.ts`)

Created utility functions for secure authentication:

### Cryptographic Functions:
- **`random()`**: Generates a 128-byte random salt encoded in base64
  - Uses Node.js built-in `crypto` module for secure random generation
  - Essential for password security and preventing rainbow table attacks

- **`authentication(salt, password)`**: Creates secure password hash
  - Uses HMAC-SHA256 algorithm for strong cryptographic hashing
  - Combines user's salt, password, and application secret
  - Returns hexadecimal digest for storage and comparison

### Security Features:
- Application-level secret for additional security layer
- Salt-based password hashing to prevent rainbow table attacks
- Consistent hashing algorithm for reliable authentication
- Secure random generation using cryptographically strong methods

## 12. Authentication Controllers (`src/controllers/authentication.ts`)

Implemented authentication endpoints for user management:

### User Registration Controller:
- **`register(req, res)`**: Handles user registration requests

**Registration Process:**
1. **Input Validation**: Validates required fields (username, email, password)
2. **Duplicate Check**: Verifies email uniqueness to prevent duplicate accounts
3. **Secure Password Storage**:
   - Generates random salt using `random()` helper
   - Creates password hash using `authentication()` helper with salt
   - Stores only hashed password, never plain text
4. **User Creation**: Creates new user in database with secure authentication data
5. **Response Handling**: Returns success with user ID or appropriate error messages

**Security Features:**
- Input sanitization and validation
- Duplicate email prevention
- Secure password hashing with unique salts
- Proper error handling without exposing sensitive information
- HTTP status codes for different scenarios (201 for success, 400 for errors)

**API Endpoint Structure:**
```typescript
POST /register
Body: {
  username: string,
  email: string,
  password: string
}
```

This controller ensures secure user registration with industry-standard security practices.

## 13. API Routing System (`src/router/`)

Implemented a modular routing system to organize API endpoints:

### Main Router (`src/router/index.ts`)
- **Central Router Configuration**: Creates and exports the main Express router
- **Modular Route Organization**: Imports and integrates specific route modules
- **Scalable Architecture**: Easy to add new route modules as the API grows

### Authentication Routes (`src/router/authentication.ts`)
- **Registration Endpoint**: `POST /auth/register` - User registration
- **Route Binding**: Connects authentication controller to specific endpoints
- **RESTful Design**: Follows REST API conventions with `/auth` prefix

### Server Integration
The routing system is integrated into the main server (`src/index.ts`):
- Router is imported and mounted on the root path `/`
- All API endpoints are accessible through the centralized routing system
- Clean separation between server setup and route definitions

**Current API Endpoints:**
```
POST /auth/register - User registration
```

This modular approach ensures:
- **Maintainability**: Routes are organized by feature/domain
- **Scalability**: Easy to add new route modules
- **Clarity**: Clear separation of concerns between routing and business logic

## 14. API Documentation with Swagger

```bash
npm install swagger-ui-express swagger-jsdoc
npm install @types/swagger-ui-express @types/swagger-jsdoc --save-dev
```

Implemented comprehensive API documentation using Swagger/OpenAPI 3.0:

### Swagger Configuration (`src/config/swagger.ts`)
- **OpenAPI 3.0 Specification**: Modern API documentation standard
- **Interactive Documentation**: Live API testing interface
- **Schema Definitions**: Reusable component schemas for requests/responses
- **Server Configuration**: Development server endpoint configuration

### Key Features:
- **Interactive UI**: Test API endpoints directly from the documentation
- **Schema Validation**: Predefined request/response schemas
- **Error Examples**: Multiple error scenario examples
- **Live Testing**: Real-time API testing without external tools

### Documentation Access:
- **Swagger UI**: Available at `http://localhost:8080/api-docs`
- **Auto-generated**: Documentation updates automatically with code changes
- **JSDoc Integration**: Uses JSDoc comments in route files for documentation

### Route Documentation
Enhanced authentication routes with comprehensive Swagger annotations:
- **Request/Response Schemas**: Detailed API contract definitions
- **Error Handling**: Multiple error response examples
- **Parameter Validation**: Clear parameter requirements and formats
- **Example Data**: Sample requests and responses for testing

### Testing Documentation (`docs/API_TESTING.md`)
Created comprehensive testing guide including:
- **Swagger UI Instructions**: Step-by-step testing guide
- **cURL Examples**: Command-line testing examples
- **Sample Data**: Valid and invalid test cases
- **Expected Responses**: Success and error response examples

This documentation system provides:
- **Developer Experience**: Easy API exploration and testing
- **Standardization**: Consistent API documentation format
- **Maintainability**: Self-updating documentation from code annotations
