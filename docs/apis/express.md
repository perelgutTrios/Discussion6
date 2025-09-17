# Express API

Base URL: `http://localhost:5000`

All protected endpoints require a JWT in the `Authorization` header using the `Bearer <token>` scheme. Obtain a token via the Login endpoint. Tokens expire in 1 hour.

## Authentication

### POST /api/auth/register
Register a new user.

Request body:
```json
{
  "email": "user@example.com",
  "password": "StrongPass1",
  "name": "Jane Doe",
  "phone": "1234567890"
}
```

Validation:
- `email`: valid email format
- `password`: at least 8 chars, contains uppercase, lowercase, and a digit
- `name`: required, non-empty
- `phone`: 10-digit North American number (digits only)

Responses:
- 201: `{ "message": "Registration successful." }`
- 400: `{ "error": "..." }` (validation or duplicate email)

Example:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"email":"user@example.com","password":"StrongPass1","name":"Jane Doe","phone":"1234567890"}'
```

### POST /api/auth/login
Authenticate and receive a JWT.

Request body:
```json
{ "email": "user@example.com", "password": "StrongPass1" }
```

Success response:
```json
{
  "token": "<JWT>",
  "user": { "email": "user@example.com", "name": "Jane Doe", "phone": "1234567890" }
}
```

Example:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"user@example.com","password":"StrongPass1"}'
```

Include the token for protected endpoints:
```bash
-H "Authorization: Bearer <JWT>"
```

---

## Subjects

### GET /api/subjects
List subjects (most recent first). Requires JWT.

Response (array):
```json
[
  {
    "_id": "...",
    "title": "...",
    "description": "...",
    "userId": { "_id": "...", "email": "...", "name": "..." },
    "timestamp": "2025-01-01T00:00:00.000Z",
    "commentCount": 3
  }
]
```

Example:
```bash
curl http://localhost:5000/api/subjects \
  -H "Authorization: Bearer <JWT>"
```

### POST /api/subjects
Create a subject. Requires JWT.

Request body:
```json
{ "title": "Topic title", "description": "Up to 1000 chars" }
```

Responses:
- 201: returns the created subject with `commentCount: 0`
- 400: validation error

Example:
```bash
curl -X POST http://localhost:5000/api/subjects \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer <JWT>" \
  -d '{"title":"Topic title","description":"Details"}'
```

### GET /api/subjects/:id
Get a subject by ID. Requires JWT.

Example:
```bash
curl http://localhost:5000/api/subjects/<SUBJECT_ID> \
  -H "Authorization: Bearer <JWT>"
```

---

## Comments

### GET /api/comments/subject/:subjectId
List comments for a subject as previews (first 75 chars). Requires JWT.

Response (array):
```json
[
  {
    "_id": "...",
    "text": "First 75 chars...",
    "userId": { "_id": "...", "email": "...", "name": "..." },
    "timestamp": "2025-01-01T00:00:00.000Z"
  }
]
```

Example:
```bash
curl http://localhost:5000/api/comments/subject/<SUBJECT_ID> \
  -H "Authorization: Bearer <JWT>"
```

### GET /api/comments/:id
Get a full comment by ID. Requires JWT.

Example:
```bash
curl http://localhost:5000/api/comments/<COMMENT_ID> \
  -H "Authorization: Bearer <JWT>"
```

### POST /api/comments
Add a comment to a subject. Requires JWT.

Request body:
```json
{ "text": "Up to 1000 chars", "subjectId": "<SUBJECT_ID>" }
```

Responses:
- 201: returns the created comment (with populated `userId` fields `email`, `name`)
- 400: missing fields or text too long
- 404: subject not found

Example:
```bash
curl -X POST http://localhost:5000/api/comments \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer <JWT>" \
  -d '{"text":"Nice topic!","subjectId":"<SUBJECT_ID>"}'
```

---

## Errors

Common HTTP statuses:
- 400: validation error or bad input
- 401: missing token
- 403: invalid or expired token
- 404: resource not found
- 500: server error

## Environment

Required environment variables for the server:
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: secret used to sign JWTs