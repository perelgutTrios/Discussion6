# Data Models and Authentication

## Models

### User
Fields:
- `email: String` (unique, required) — regex-validated
- `password: String` (required) — stored as bcrypt hash
- `name: String` (required)
- `phone: String` (required) — 10 digits

### Subject
Fields:
- `title: String` (required, max 100)
- `description: String` (required, max 1000)
- `userId: ObjectId<User>` (required)
- `timestamp: Date` (default now)

### Comment
Fields:
- `text: String` (required, max 1000)
- `userId: ObjectId<User>` (required)
- `subjectId: ObjectId<Subject>` (required)
- `timestamp: Date` (default now)

### Relationships
- A `Subject` references the `User` who created it.
- A `Comment` references both its `User` author and the `Subject` it belongs to.
- API responses often populate `userId` with `{ email, name }` for display.

## Authentication Flow

1. Register via `POST /api/auth/register` with `email`, `password`, `name`, `phone`.
2. Login via `POST /api/auth/login` to receive a JWT (`expiresIn: 1h`).
3. Include the JWT on protected routes using `Authorization: Bearer <token>`.

Example (login and use token):
```bash
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"user@example.com","password":"StrongPass1"}' | jq -r .token)

curl http://localhost:5000/api/subjects -H "Authorization: Bearer $TOKEN"
```

Validation rules are enforced server-side and error messages are returned in `{ "error": "..." }` shape.