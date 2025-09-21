# NeoServe API Documentation

## Base URL
\`\`\`
https://your-neoserve-instance.vercel.app/api
\`\`\`

## Authentication
Most endpoints require authentication. Include the user session token in the Authorization header:
\`\`\`
Authorization: Bearer <session_token>
\`\`\`

## Endpoints

### Health Check
Check system health and status.

**GET** `/health`

**Response:**
\`\`\`json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "responseTime": 45,
  "version": "1.0.0",
  "environment": "production",
  "checks": [
    {
      "service": "database",
      "status": "healthy",
      "responseTime": 23,
      "details": null
    },
    {
      "service": "ai_service",
      "status": "healthy",
      "responseTime": 156,
      "details": null
    }
  ]
}
\`\`\`

### Tickets

#### Get Tickets
Retrieve tickets with optional filtering.

**GET** `/tickets`

**Query Parameters:**
- `assignedTo` (string): Filter by assigned user ID
- `status` (string): Filter by status (pending, in_progress, resolved)
- `priority` (string): Filter by priority (low, medium, high, urgent)
- `limit` (number): Maximum number of results (default: 50)
- `offset` (number): Pagination offset (default: 0)

**Response:**
\`\`\`json
[
  {
    "id": "uuid",
    "title": "Login Issues",
    "description": "Unable to access account",
    "status": "in_progress",
    "priority": "high",
    "category": "Technical",
    "assigned_to": "user-uuid",
    "customer_id": "customer-uuid",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T14:20:00Z",
    "assigned_user": {
      "name": "John Doe",
      "email": "john@company.com"
    },
    "customer": {
      "name": "Alice Johnson",
      "email": "alice@customer.com"
    }
  }
]
\`\`\`

#### Create Ticket
Create a new support ticket.

**POST** `/tickets`

**Request Body:**
\`\`\`json
{
  "title": "Password Reset Issue",
  "description": "Cannot reset password using email link",
  "priority": "medium",
  "category": "Account",
  "customer_email": "customer@example.com"
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": "new-ticket-uuid",
  "title": "Password Reset Issue",
  "status": "pending",
  "created_at": "2024-01-15T15:30:00Z"
}
\`\`\`

#### Update Ticket
Update an existing ticket.

**PUT** `/tickets`

**Request Body:**
\`\`\`json
{
  "id": "ticket-uuid",
  "status": "resolved",
  "assigned_to": "agent-uuid",
  "priority": "high"
}
\`\`\`

### Chat

#### Send Chat Message
Send a message to the AI assistant.

**POST** `/chat`

**Request Body:**
\`\`\`json
{
  "message": "How do I reset my password?",
  "category": "account",
  "language": "en",
  "context": {
    "role": "employee",
    "name": "John Doe",
    "ticketsAssigned": 5
  }
}
\`\`\`

**Response:**
\`\`\`json
{
  "response": "To reset your password, go to the login page and click 'Forgot Password'...",
  "confidence": 0.95,
  "category": "account",
  "language": "en",
  "timestamp": "2024-01-15T10:30:00Z"
}
\`\`\`

### Analytics

#### Get Analytics Data
Retrieve comprehensive analytics and metrics.

**GET** `/analytics`

**Query Parameters:**
- `timeRange` (string): Time period (7d, 30d, 90d)
- `department` (string): Filter by department

**Response:**
\`\`\`json
{
  "sla": {
    "current": 92.5,
    "target": 95.0,
    "trend": "+2.1%"
  },
  "csat": {
    "current": 4.6,
    "target": 4.5,
    "trend": "+0.2"
  },
  "tickets": {
    "total": 247,
    "resolved": 198,
    "pending": 49
  },
  "team": [
    {
      "name": "John Doe",
      "resolved": 45,
      "rating": 4.8
    }
  ]
}
\`\`\`

### Users

#### Get Users
Retrieve user information.

**GET** `/users`

**Query Parameters:**
- `role` (string): Filter by role (employee, admin, customer)

**Response:**
\`\`\`json
[
  {
    "id": "user-uuid",
    "name": "John Doe",
    "email": "john@company.com",
    "role": "employee",
    "department": "Support",
    "status": "active"
  }
]
\`\`\`

### Mood Tracking

#### Get Mood Entries
Retrieve mood tracking data.

**GET** `/emotion`

**Query Parameters:**
- `user` (string): Filter by user ID
- `timeRange` (string): Time period

**Response:**
\`\`\`json
[
  {
    "date": "2024-01-15",
    "mood": 7,
    "user": "john.doe",
    "sentiment": "positive"
  }
]
\`\`\`

#### Submit Mood Entry
Log a mood entry.

**POST** `/emotion`

**Request Body:**
\`\`\`json
{
  "mood": 8,
  "user": "john.doe",
  "sentiment": "positive",
  "notes": "Great day, resolved many tickets"
}
\`\`\`

### File Upload

#### Upload File
Upload a file for support ticket.

**POST** `/upload`

**Request Body:** FormData with file

**Response:**
\`\`\`json
{
  "success": true,
  "fileId": "file_1642248600000",
  "fileName": "screenshot.png",
  "fileSize": 245760,
  "analysis": {
    "isScreenshot": true,
    "containsError": true,
    "suggestedCategory": "Technical Issue",
    "confidence": 0.87
  }
}
\`\`\`

## Error Responses

All endpoints return consistent error responses:

\`\`\`json
{
  "error": "Error description",
  "code": "ERROR_CODE",
  "requestId": "uuid",
  "timestamp": "2024-01-15T10:30:00Z"
}
\`\`\`

### Common Error Codes
- `400` - Bad Request: Invalid request parameters
- `401` - Unauthorized: Authentication required
- `403` - Forbidden: Insufficient permissions
- `404` - Not Found: Resource not found
- `429` - Too Many Requests: Rate limit exceeded
- `500` - Internal Server Error: Server error

## Rate Limits
- **General API**: 100 requests per minute per user
- **Chat API**: 20 requests per minute per user
- **Upload API**: 10 requests per minute per user

## Webhooks

### Ticket Events
Subscribe to ticket events by configuring webhook URLs in the admin panel.

**Event Types:**
- `ticket.created`
- `ticket.updated`
- `ticket.resolved`
- `ticket.assigned`

**Payload Example:**
\`\`\`json
{
  "event": "ticket.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "ticket": {
      "id": "ticket-uuid",
      "title": "New Issue",
      "status": "pending"
    }
  }
}
\`\`\`

## SDKs and Libraries

### JavaScript/TypeScript
\`\`\`bash
npm install @neoserve/sdk
\`\`\`

\`\`\`javascript
import { NeoServeClient } from '@neoserve/sdk'

const client = new NeoServeClient({
  baseUrl: 'https://your-instance.vercel.app/api',
  apiKey: 'your-api-key'
})

// Get tickets
const tickets = await client.tickets.list()

// Send chat message
const response = await client.chat.send({
  message: 'Hello',
  category: 'general'
})
\`\`\`

### Python
\`\`\`bash
pip install neoserve-python
\`\`\`

```python
from neoserve import NeoServeClient

client = NeoServeClient(
    base_url='https://your-instance.vercel.app/api',
    api_key='your-api-key'
)

# Get tickets
tickets = client.tickets.list()

# Send chat message
response = client.chat.send(
    message='Hello',
    category='general'
)
