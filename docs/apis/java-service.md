# Java Service API (Spring Boot)

Base path: `/api/business`

This auxiliary service provides comment moderation logic.

## POST /api/business/moderate-comment
Analyzes a comment and returns whether it is clean.

Request body:
```json
{ "comment": "some text" }
```

Response body:
```json
{
  "comment": "some text",
  "isClean": true,
  "reason": "OK"
}
```

Notes:
- Current implementation flags comments containing the substring `badword` (case-insensitive) as not clean.

Example:
```bash
curl -X POST http://localhost:8080/api/business/moderate-comment \
  -H 'Content-Type: application/json' \
  -d '{"comment":"hello world"}'
```