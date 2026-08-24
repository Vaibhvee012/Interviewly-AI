# Interviewly AI

Interviewly AI is an AI-powered meeting and interview analysis platform that transforms recorded conversations into structured, actionable insights.

The application allows users to upload meeting or interview recordings, automatically generate transcripts, and use an LLM to extract summaries, key decisions, and actionable tasks. Processed meetings are stored and can be accessed through a centralized dashboard.

## Overview

Interviewly AI is designed to reduce the time required to manually review lengthy meetings and interviews.

The application follows an automated processing pipeline:

```text
Audio / Meeting Recording
          |
          v
     File Upload
          |
          v
   Speech-to-Text (ASR)
          |
          v
       Transcript
          |
          v
      LLM Analysis
          |
          v
Structured Meeting Data
          |
          +-------------------+
          |                   |
          v                   v
       Dashboard         Meeting Details
```

The system converts unstructured audio into structured information that can be quickly reviewed and acted upon.

## Core Features

### Audio Upload

Users can upload recorded meetings or interviews in supported audio formats such as:

* MP3
* WAV
* M4A

The backend handles the uploaded file and initiates the processing pipeline.

### Automatic Transcription

Audio recordings are converted into text using a speech-to-text model.

The generated transcript is stored alongside the corresponding meeting record.

### AI-Powered Summarization

The transcript is processed using a Large Language Model to generate a concise and structured summary.

### Key Decisions

The system identifies important decisions discussed during the meeting, allowing users to review the outcomes without going through the complete transcript.

### Action Items

Interviewly AI extracts actionable tasks from the conversation.

Each action item can contain:

* Task
* Assignee
* Deadline

This makes it easier to convert meeting discussions into follow-up work.

### Meeting Dashboard

The dashboard provides an overview of processed meetings and allows users to access previously generated results.

### Meeting Details

Each meeting contains its associated:

* Summary
* Transcript
* Key decisions
* Action items
* Processing information

## Technology Stack

### Frontend

* React
* Vite
* React Router
* Axios
* CSS

### Backend

* Node.js
* Express.js
* REST APIs
* Multer for file uploads

### AI

* Speech-to-Text / Whisper
* Large Language Model API

### Database

* MongoDB
* MongoDB Atlas

## Project Architecture

```text
Interviewly AI
|
├── Frontend
|   ├── Authentication
|   ├── Dashboard
|   ├── Meeting Upload
|   ├── Meeting History
|   └── Meeting Details
|
├── Backend
|   ├── REST API
|   ├── File Upload
|   ├── Speech-to-Text Processing
|   ├── LLM Processing
|   └── Database Operations
|
└── Database
    └── MongoDB
```

## Application Workflow

### 1. Upload

The user uploads a meeting or interview recording through the React application.

### 2. File Processing

The backend receives the file using a REST API and handles the uploaded audio.

### 3. Transcription

The audio is sent to the speech-to-text service and converted into a transcript.

### 4. AI Analysis

The transcript is passed to the LLM with a structured prompt.

The model extracts:

* Meeting summary
* Key decisions
* Action items
* Assignees
* Deadlines

### 5. Data Storage

The generated results and transcript are stored in MongoDB.

### 6. Dashboard

The frontend retrieves the processed meeting information through the backend API and displays it in the dashboard.

## Project Structure

```text
Interviewly-AI/
|
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── App.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* MongoDB Atlas account
* Speech-to-text API access
* LLM API access

### Clone the Repository

```bash
git clone <repository-url>

cd Interviewly-AI
```

## Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000/api
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at the local URL provided by Vite.

## Backend Setup

Open another terminal and navigate to the backend:

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_api_key
```

Start the backend:

```bash
npm run dev
```

For production:

```bash
npm start
```

## Environment Variables

The following environment variables are required by the application.

| Variable         | Description                          |
| ---------------- | ------------------------------------ |
| `PORT`           | Port used by the backend server      |
| `MONGODB_URI`    | MongoDB database connection string   |
| `OPENAI_API_KEY` | API key used for AI processing       |
| `VITE_API_URL`   | Backend API URL used by the frontend |

Do not commit `.env` files or API keys to the repository.

## API Overview

The backend exposes REST APIs for meeting processing and retrieval.

### Upload Meeting

```http
POST /api/meetings/upload
```

Uploads an audio recording and starts the processing pipeline.

### Get Meetings

```http
GET /api/meetings
```

Returns previously processed meetings.

### Get Meeting

```http
GET /api/meetings/:id
```

Returns the details of a specific meeting.

### Processing Flow

```text
POST /upload
      |
      v
Audio Processing
      |
      v
Transcription
      |
      v
LLM Analysis
      |
      v
MongoDB
      |
      v
GET /meetings/:id
```

## AI Output

The AI processing layer is designed to produce structured information rather than returning an unstructured response.

Example:

```json
{
  "summary": "The team discussed the upcoming product release and finalized the deployment timeline.",
  "decisions": [
    "Release will be deployed next week."
  ],
  "actionItems": [
    {
      "task": "Prepare the production deployment",
      "assignee": "Development Team",
      "deadline": "Next Week"
    }
  ]
}
```

## Error Handling

The application handles common failure scenarios including:

* Invalid audio formats
* Missing uploaded files
* Failed transcription
* LLM processing errors
* Database connection failures
* Invalid meeting IDs
* API request failures

The frontend also provides appropriate loading and error states during meeting processing.

## Security Considerations

* API keys are stored using environment variables.
* Sensitive credentials are excluded from version control.
* Uploaded files are validated before processing.
* Backend APIs validate incoming requests.
* Database credentials are not exposed to the frontend.

## Development

Run the frontend and backend independently during development.

Frontend:

```bash
cd frontend
npm run dev
```

Backend:

```bash
cd backend
npm run dev
```

## Future Improvements

Potential improvements include:

* Real-time meeting transcription
* Speaker identification
* Support for video recordings
* Search across meeting transcripts
* Advanced meeting analytics
* Automatic task reminders
* Calendar integration
* Export meeting reports
* Role-based access control
* Improved AI processing for domain-specific interviews

## Deployment

The application can be deployed using a separate frontend and backend architecture.

### Frontend

The React/Vite application can be deployed using platforms such as Vercel.

### Backend

The Node.js/Express API can be deployed using platforms such as Render or Railway.

### Database

MongoDB Atlas can be used as the production database.

The production architecture can be represented as:

```text
                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             |
                             v
                    ┌──────────────────┐
                    │ React Frontend   │
                    │     (Vite)       │
                    └────────┬─────────┘
                             |
                         REST API
                             |
                             v
                    ┌──────────────────┐
                    │ Node + Express   │
                    └───────┬──────────┘
                            |
              ┌─────────────┼─────────────┐
              |             |             |
              v             v             v
          Speech-to-Text   LLM       MongoDB Atlas
              |             |
              └──────┬──────┘
                     |
                     v
              Structured Results
```

## Project Status

Interviewly AI is currently under active development.

The core application focuses on the complete pipeline from audio upload to transcription, AI analysis, structured results, and meeting history.

## License

This project is intended for educational, portfolio, and demonstration purposes.

## Author

**Vaibhvee Prakash**
