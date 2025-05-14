# Adhikar Backend API

This is the backend API for the Adhikar consumer rights platform, built with Flask and MongoDB.

## Features

- Chatbot API for consumer rights assistance
- Complaint filing and tracking system
- Legal document download functionality

## Setup Instructions

### Prerequisites

- Python 3.8+
- MongoDB (local or remote)
- Mistral AI API key (for chatbot functionality)

### Installation

1. Clone the repository
2. Navigate to the backend directory
3. Create a virtual environment:
   ```
   python -m venv venv
   ```
4. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`
5. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
6. Copy `.env.example` to `.env` and update the values
7. Create sample documents in the `static/documents` directory

### Running the Server

```
python app.py
```

The server will start on http://localhost:5000 by default.

## API Endpoints

### Chatbot

- `POST /api/chatbot/chat` - Get a response from the chatbot
- `GET /api/chatbot/history/{session_id}` - Get chat history for a session

### Complaints

- `POST /api/complaints` - Submit a new complaint
- `GET /api/complaints/{complaint_id}` - Get a specific complaint
- `GET /api/complaints/user/{email}` - Get all complaints for a user
- `PUT /api/complaints/{complaint_id}/status` - Update complaint status

### Documents

- `GET /api/documents` - Get all documents (with optional category filter)
- `GET /api/documents/{document_id}` - Get a specific document
- `GET /api/documents/{document_id}/download` - Download a document
- `GET /api/documents/categories` - Get all document categories

## Development

### Project Structure

- `api/` - API route definitions
- `models/` - Data models
- `services/` - Business logic
- `config/` - Configuration files
- `utils/` - Utility functions
- `static/` - Static files (including documents)

### Adding New Features

1. Define models in the `models/` directory
2. Implement business logic in the `services/` directory
3. Create API routes in the `api/` directory
4. Register new blueprints in `app.py`