# Adhikar - Consumer Empowerment Platform

Adhikar is a comprehensive platform designed to empower Indian consumers by providing them with information about their rights, tools to file complaints, and access to legal resources.

## Features

- **AI-powered Chatbot**: Get instant answers to consumer rights questions
- **Complaint Filing System**: Submit and track consumer complaints
- **Legal Document Repository**: Access and download templates, guides, and forms
- **Consumer Rights Information**: Learn about your rights under Indian consumer protection laws

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Shadcn UI component library
- Vite for build tooling

### Backend
- Python with Flask
- MongoDB for database
- Mistral AI integration for chatbot functionality

## Project Structure

```
consumer-empowerment-platform/
├── backend/               # Flask backend
│   ├── api/               # API routes
│   ├── config/            # Configuration files
│   ├── models/            # Data models
│   ├── services/          # Business logic
│   ├── static/            # Static files (documents)
│   └── utils/             # Utility functions
├── src/                   # React frontend
│   ├── api/               # API client code
│   ├── components/        # React components
│   ├── context/           # React context providers
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   ├── services/          # Service layer for API calls
│   ├── styles/            # Global styles
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
└── public/                # Static assets
```

## Getting Started

### Prerequisites

- Node.js 16+
- Python 3.8+
- MongoDB

### Frontend Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

3. Start the development server:
   ```
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Create a `.env` file with the following variables:
   ```
   MONGO_URI=mongodb://localhost:27017
   DB_NAME=adhikar_db
   MISTRAL_API_KEY=your_mistral_api_key
   PORT=5000
   DEBUG=True
   ```

6. Initialize the database:
   ```
   python init_db.py
   ```

7. Start the Flask server:
   ```
   python app.py
   ```

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

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Mistral AI for providing the chatbot capabilities
- Indian Consumer Protection Act, 2019 for the legal framework
