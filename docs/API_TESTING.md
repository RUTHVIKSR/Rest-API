# API Testing Guide

## Swagger UI Documentation

The API documentation is available at: [http://localhost:8080/api-docs](http://localhost:8080/api-docs)

## Testing the Registration Endpoint

### Using Swagger UI:
1. Navigate to `http://localhost:8080/api-docs`
2. Find the `/auth/register` endpoint
3. Click "Try it out"
4. Fill in the request body with test data
5. Click "Execute"

### Using curl:
```bash
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "securePassword123"
  }'
```

### Expected Response:
**Success (201):**
```json
{
  "message": "User registered successfully",
  "userId": "60f7b1b3e1b3c4a4e8b3c4a4"
}
```

**Error (400):**
```json
{
  "message": "All fields are required"
}
```

## Sample Test Data

### Valid User Registration:
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "mySecurePassword123"
}
```

### Invalid Test Cases:

**Missing fields:**
```json
{
  "username": "johndoe"
}
```

**Duplicate email:**
Try registering the same email twice to test duplicate prevention.
