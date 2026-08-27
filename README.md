# Interviewly AI

**Interviewly AI** is an AI-powered interview preparation platform that helps candidates prepare for technical and behavioral interviews through personalized questions, skill-gap analysis, and structured preparation plans.

## Live Application

**Frontend:**
https://interviewly-ai-six.vercel.app/

**Backend API:**
https://interviewly-ai.onrender.com/

The frontend is deployed on **Vercel**, while the backend API is deployed on **Render**.

---

## Overview

Interviewly AI is a full-stack web application built to provide a personalized interview preparation experience.

Users can create an account, provide a target job description, and upload their resume or enter a short self-description. The application then uses Generative AI to analyze the information and create a customized interview strategy.

The generated plan includes technical questions, behavioral questions, skill gaps, a match score, and a preparation roadmap.

The project combines modern frontend development, RESTful APIs, authentication, database management, file handling, and Generative AI into a single full-stack application.

---

## Features

### Authentication

* User registration and login
* JWT-based authentication
* Password hashing using bcrypt
* Protected routes
* Persistent authentication state
* Authenticated API requests

### Personalized Interview Planning

Users can provide:

* Target job description
* Resume
* Quick self-description

The application uses this information to generate an interview strategy tailored to the target role.

### Technical Questions

The platform generates role-specific technical questions based on the job description and candidate profile.

Each question contains:

* Interview question
* Interviewer's intention
* Model answer

### Behavioral Questions

The platform generates behavioral questions focused on common interview situations and scenarios relevant to the candidate's target role.

### Skill Gap Analysis

Interviewly AI identifies areas where the candidate may need additional preparation.

Skill gaps are displayed based on their relevance to the target position.

### Preparation Roadmap

The application generates a structured preparation plan containing:

* Daily focus areas
* Recommended topics
* Preparation tasks
* Areas requiring improvement

### Match Score

A match score provides an overview of how closely the candidate's profile aligns with the target role.

### Interview Reports

Each generated interview plan provides:

* Match score
* Technical questions
* Behavioral questions
* Skill gaps
* Preparation roadmap
* AI-generated recommendations

### Resume Support

Users can upload their resume while creating an interview plan.

Supported formats:

* PDF
* DOCX

### Responsive Interface

The frontend includes dedicated interfaces for:

* Landing page
* Registration
* Login
* Interview plan generation
* Interview reports
* Technical questions
* Behavioral questions
* Preparation roadmap

---

## Technology Stack

### Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge\&logo=sass\&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge\&logo=axios\&logoColor=white)

* React.js
* JavaScript
* React Router
* Vite
* SCSS
* Axios

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge\&logo=jsonwebtokens\&logoColor=white)

* Node.js
* Express.js
* REST APIs
* JWT
* bcrypt
* Middleware architecture

### Database

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge\&logo=mongoose\&logoColor=white)

* MongoDB
* Mongoose

### Artificial Intelligence

* Generative AI
* AI-powered question generation
* AI-assisted interview analysis
* Structured AI responses
* Personalized recommendations
* Skill-gap analysis

### Tools & Deployment

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge\&logo=git\&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge\&logo=github\&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge\&logo=vercel\&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge\&logo=render\&logoColor=black)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge\&logo=postman\&logoColor=white)

* Git
* GitHub
* Postman
* Vercel
* Render
* npm

---

## System Architecture

```text
                         ┌────────────────────────┐
                         │      User / Browser     │
                         └────────────┬───────────┘
                                      │
                                      ▼
                         ┌────────────────────────┐
                         │     React Frontend      │
                         │       Vite + SCSS       │
                         └────────────┬───────────┘
                                      │
                                  REST API
                                      │
                                      ▼
                         ┌────────────────────────┐
                         │     Express Backend     │
                         │        Node.js          │
                         └────────────┬───────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
                    ▼                 ▼                 ▼
             ┌────────────┐   ┌──────────────┐   ┌─────────────┐
             │    Auth    │   │   MongoDB    │   │  AI Service │
             │ JWT/Bcrypt │   │  + Mongoose  │   │  Generative │
             └────────────┘   └──────────────┘   │      AI     │
                                                 └──────┬──────┘
                                                        │
                                                        ▼
                                            ┌────────────────────┐
                                            │  Interview Report  │
                                            │ Questions + Gaps   │
                                            │ + Preparation Plan │
                                            └────────────────────┘
```

---

## Application Workflow

```text
User
 │
 ▼
Landing Page
 │
 ▼
Register / Login
 │
 ▼
Create Interview Plan
 │
 ├── Job Description
 │
 ├── Resume
 │
 └── Self Description
 │
 ▼
Backend API
 │
 ▼
AI Processing
 │
 ├── Technical Questions
 │
 ├── Behavioral Questions
 │
 ├── Skill Gap Analysis
 │
 └── Preparation Roadmap
 │
 ▼
Interview Report
 │
 ├── Match Score
 │
 ├── Technical Questions
 │
 ├── Behavioral Questions
 │
 ├── Skill Gaps
 │
 └── Preparation Plan
 │
 ▼
Candidate Preparation
```

---

## Authentication Flow

Interviewly AI uses JWT-based authentication to protect user-specific resources.

```text
Register
   │
   ▼
Password Hashing
   │
   ▼
User Stored in MongoDB
   │
   ▼
Login
   │
   ▼
Credentials Verified
   │
   ▼
JWT Generated
   │
   ▼
Authenticated Request
   │
   ▼
Authentication Middleware
   │
   ▼
Protected Resource
```

Passwords are hashed before being stored and protected resources require valid authentication.

---

## AI Interview Pipeline

```text
Job Description
       │
       ▼
Candidate Profile
       │
       ▼
Resume / Self Description
       │
       ▼
AI Processing
       │
       ├───────────────┐
       ▼               ▼
Technical         Behavioral
Questions         Questions
       │               │
       └───────┬───────┘
               ▼
       Skill Gap Analysis
               │
               ▼
       Preparation Roadmap
               │
               ▼
        Interview Report
```

The AI service processes the candidate's information and generates structured interview preparation content.

---

## Project Structure

```text
Interviewly-AI/
│
├── Backend/
│   │
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
├── Frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── interview/
│   │   │   └── landing/
│   │   │
│   │   ├── app.routes.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## API Architecture

The backend follows a modular REST API architecture.

### Authentication

| Method | Endpoint             | Description                     |
| ------ | -------------------- | ------------------------------- |
| POST   | `/api/auth/register` | Register a new user             |
| POST   | `/api/auth/login`    | Authenticate an existing user   |
| GET    | `/api/auth/get-me`   | Retrieve the authenticated user |

### Interview

| Method | Endpoint                    | Description                     |
| ------ | --------------------------- | ------------------------------- |
| POST   | `/api/interview`            | Generate an interview plan      |
| GET    | `/api/interview/:id`        | Retrieve an interview report    |
| GET    | `/api/interview/:id/resume` | Generate or download the resume |

---

## Environment Variables

Create a `.env` file inside the `Backend` directory.

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

AI_API_KEY=your_ai_api_key
```

Additional environment variables may be required depending on the AI service and current backend configuration.

### Security Note

Never commit environment files or API keys to GitHub.

Make sure `.env` is included in `.gitignore`.

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Vaibhvee012/Interviewly-AI.git

cd Interviewly-AI
```

### 2. Backend Setup

```bash
cd Backend

npm install
```

Create the `.env` file:

```text
.env
```

Add the required environment variables and start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal:

```bash
cd Frontend

npm install
```

Start the frontend:

```bash
npm run dev
```

The application will be available through the Vite development server.

---

## Deployment

Interviewly AI is deployed as two separate services.

### Frontend — Vercel

The React frontend is deployed using Vercel.

**Live Application:**
https://interviewly-ai-six.vercel.app/

### Backend — Render

The Node.js and Express backend is deployed using Render.

**Backend API:**
https://interviewly-ai.onrender.com/

The deployed frontend communicates with the deployed backend through REST APIs.

---

## Development Workflow

```text
Feature Development
        │
        ▼
Local Development
        │
        ▼
API Testing
        │
        ▼
Frontend Integration
        │
        ▼
Application Testing
        │
        ▼
Git Commit
        │
        ▼
GitHub
        │
        ▼
Vercel / Render Deployment
```

---

## Security

The application implements several basic security practices:

* Password hashing using bcrypt
* JWT-based authentication
* Protected API routes
* Authentication middleware
* Environment-based configuration
* `.env` excluded from version control
* Backend validation
* Error handling
* Separation of frontend and backend responsibilities

---

## Future Improvements

Planned improvements include:

* Real-time AI interview conversations
* Voice-based interviews
* Speech-to-text integration
* AI-generated follow-up questions
* Difficulty-based interview customization
* Interview history and analytics
* Detailed candidate performance dashboards
* Skill-wise performance tracking
* Personalized learning recommendations
* Docker containerization
* AWS deployment
* CI/CD pipeline
* Automated testing

---

## Project Goals

Interviewly AI was built with the following goals:

1. Provide a personalized interview preparation experience.
2. Generate interview content based on real job requirements.
3. Help candidates identify important skill gaps.
4. Provide structured preparation recommendations.
5. Integrate Generative AI into a practical full-stack application.
6. Gain hands-on experience with modern web development and deployment.
7. Build a project that demonstrates end-to-end application development.

---

## Learning Outcomes

Developing Interviewly AI provided hands-on experience with:

* Full-stack web development
* React application architecture
* REST API development
* Express.js backend development
* JWT authentication
* Password hashing
* MongoDB and Mongoose
* File uploads
* Generative AI integration
* API testing with Postman
* Environment configuration
* Git and GitHub
* Vercel deployment
* Render deployment
* Frontend-backend integration
* Production deployment and debugging

---

## Author

**Vaibhvee Prakash**

Computer Science Engineering
Cloud Computing and Automation

**GitHub:**
https://github.com/Vaibhvee012

---

## License

This project was developed for educational, portfolio, and demonstration purposes.
