# Interviewly AI

> AI-powered interview preparation and assessment platform designed to help candidates practice interviews, receive intelligent feedback, and improve their interview performance.

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Generative%20AI-412991?style=for-the-badge&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
</p>

---

## Overview

**Interviewly AI** is a full-stack Generative AI-powered interview preparation platform that provides candidates with a personalized interview preparation experience.

The platform analyzes a candidate's target job description and profile information to generate a customized interview strategy containing technical questions, behavioral questions, skill gaps, and a preparation roadmap.

Interviewly AI combines **React, Node.js, Express.js, MongoDB, JWT authentication, REST APIs, and Generative AI** to deliver an end-to-end interview preparation workflow.

---

## Key Features

### Authentication & User Management

* User registration and login
* Secure password hashing using bcrypt
* JWT-based authentication
* Protected API routes
* Persistent authentication state
* User session management

### AI-Powered Interview Preparation

* Job-description-based interview preparation
* AI-generated technical questions
* AI-generated behavioral questions
* Personalized interview strategy
* Candidate-specific preparation roadmap
* Skill-gap identification

### Interview Analysis

The platform generates structured insights based on the candidate's profile and target role, including:

* Technical skill requirements
* Behavioral interview preparation
* Skill gaps
* Interview-focused recommendations
* Preparation roadmap
* Overall job-match score

### Interview Reports

Each generated interview plan provides:

* Technical questions
* Behavioral questions
* Model answers
* Question intentions
* Preparation roadmap
* Skill-gap analysis
* Match score

### Resume Support

* Resume upload support
* Resume-based candidate analysis
* AI-powered resume processing
* Resume PDF generation

### Modern Frontend

* Responsive user interface
* React component architecture
* React Router navigation
* Protected routes
* Authentication pages
* Landing page
* Interview dashboard
* Loading states
* Error handling
* SCSS-based styling

---

# Technology Stack

## Frontend

| Technology   | Purpose                       |
| ------------ | ----------------------------- |
| React.js     | Frontend UI development       |
| JavaScript   | Application logic             |
| Vite         | Development and build tooling |
| React Router | Client-side routing           |
| Axios        | API communication             |
| SCSS         | Styling and responsive design |

<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white" />
</p>

## Backend

| Technology | Purpose                               |
| ---------- | ------------------------------------- |
| Node.js    | Server-side runtime                   |
| Express.js | REST API framework                    |
| JWT        | Authentication                        |
| bcrypt     | Password hashing                      |
| REST API   | Frontend-backend communication        |
| Middleware | Authentication and request processing |

<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
</p>

## Database

| Technology | Purpose                 |
| ---------- | ----------------------- |
| MongoDB    | Database                |
| Mongoose   | MongoDB object modeling |

<p>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>

## Artificial Intelligence

* Generative AI
* AI-powered question generation
* AI-assisted interview preparation
* Structured AI responses
* Candidate profile analysis
* Skill-gap analysis
* Personalized preparation recommendations

## Development Tools

* Git
* GitHub
* VS Code
* Postman
* npm
* REST APIs
* Environment variables

---

# System Architecture

```text
                         ┌────────────────────────┐
                         │        User            │
                         │   Web Browser / Client  │
                         └────────────┬───────────┘
                                      │
                                      ▼
                         ┌────────────────────────┐
                         │    React + Vite        │
                         │       Frontend         │
                         └────────────┬───────────┘
                                      │
                              HTTP / REST API
                                      │
                                      ▼
                         ┌────────────────────────┐
                         │      Express.js        │
                         │        Backend         │
                         └────────────┬───────────┘
                                      │
              ┌───────────────────────┼──────────────────────┐
              │                       │                      │
              ▼                       ▼                      ▼
       ┌──────────────┐       ┌──────────────┐       ┌──────────────┐
       │ Authentication│       │   MongoDB    │       │ Generative AI│
       │  JWT + bcrypt │       │   Database   │       │    Service   │
       └──────────────┘       └──────────────┘       └──────────────┘
                                      │                      │
                                      └──────────┬───────────┘
                                                 ▼
                                    ┌────────────────────────┐
                                    │   Interview Report     │
                                    │ Questions & Insights   │
                                    └────────────────────────┘
```

---

# Application Workflow

```text
                        ┌──────────────┐
                        │     User     │
                        └──────┬───────┘
                               │
                               ▼
                      ┌─────────────────┐
                      │  Landing Page   │
                      └────────┬────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Register / Login    │
                    └──────────┬──────────┘
                               │
                               ▼
                     ┌──────────────────┐
                     │ Interview Setup  │
                     └────────┬─────────┘
                              │
                   ┌──────────┴──────────┐
                   │                     │
                   ▼                     ▼
            Job Description        Resume / Profile
                   │                     │
                   └──────────┬──────────┘
                              ▼
                    ┌──────────────────┐
                    │   Generative AI  │
                    └────────┬─────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │ Interview Strategy  │
                  └──────────┬───────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
            ▼                ▼                ▼
      Technical        Behavioral        Skill Gaps
      Questions         Questions
            │                │                │
            └────────────────┼────────────────┘
                             ▼
                    ┌──────────────────┐
                    │ Preparation Roadmap│
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Interview Report│
                    └──────────────────┘
```

---

# Project Structure

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

# API Architecture

The backend follows a modular REST API architecture with separate routes, controllers, services, models, and middleware.

## Authentication APIs

| Method | Endpoint             | Description                     |
| ------ | -------------------- | ------------------------------- |
| `POST` | `/api/auth/register` | Register a new user             |
| `POST` | `/api/auth/login`    | Authenticate a user             |
| `GET`  | `/api/auth/get-me`   | Retrieve the authenticated user |

## Interview APIs

| Method | Endpoint                    | Description                           |
| ------ | --------------------------- | ------------------------------------- |
| `POST` | `/api/interview`            | Generate an interview strategy        |
| `GET`  | `/api/interview/:id`        | Retrieve an interview report          |
| `GET`  | `/api/interview`            | Retrieve user's interview reports     |
| `GET`  | `/api/interview/:id/resume` | Generate or download interview resume |

> API endpoints may change as the application evolves.

---

# Authentication Flow

Interviewly AI uses JWT-based authentication for securing user-specific resources.

```text
User
 │
 ▼
Registration
 │
 ▼
Password Hashing
 │
 ▼
MongoDB
 │
 ▼
Login
 │
 ▼
Credential Verification
 │
 ▼
JWT Generation
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

### Security Measures

* Passwords are hashed using bcrypt.
* JWT tokens are used for authentication.
* Protected routes validate authenticated requests.
* Sensitive configuration is stored using environment variables.
* `.env` files are excluded from version control.

---

# AI Interview Pipeline

```text
┌──────────────────────────┐
│    Job Description       │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│ Candidate Profile/Resume │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│     Generative AI        │
│     Analysis Pipeline    │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│ Technical Questions      │
├──────────────────────────┤
│ Behavioral Questions     │
├──────────────────────────┤
│ Model Answers            │
├──────────────────────────┤
│ Skill Gaps               │
├──────────────────────────┤
│ Match Score              │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│ Preparation Roadmap      │
└──────────────────────────┘
```

The AI pipeline transforms job requirements and candidate information into structured, role-specific interview preparation content.

---

# Installation & Setup

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* MongoDB or MongoDB Atlas
* Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/Vaibhvee012/Interviewly-AI.git

cd Interviewly-AI
```

---

## 2. Backend Setup

Navigate to the backend:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `Backend` directory:

```env
PORT=8000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

AI_API_KEY=your_ai_api_key
```

Start the backend:

```bash
npm run dev
```

---

## 3. Frontend Setup

Open a new terminal:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at the local Vite development URL displayed in your terminal.

---

# Environment Variables

The backend requires environment variables for sensitive configuration.

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AI_API_KEY=your_ai_api_key
```

### Important

Never commit `.env` files or API credentials to GitHub.

Make sure `.env` is included in `.gitignore`:

```gitignore
.env
node_modules/
dist/
```

---

# Development Workflow

```text
Feature Planning
       │
       ▼
Implementation
       │
       ▼
Local Testing
       │
       ▼
API Testing with Postman
       │
       ▼
Frontend Integration
       │
       ▼
Bug Fixing
       │
       ▼
Git Commit
       │
       ▼
GitHub
       │
       ▼
Deployment
```

---

# Error Handling

The application follows a structured approach to handling errors across the frontend and backend.

### Backend

* Request validation
* Authentication errors
* Database errors
* API errors
* AI service errors
* Centralized error handling

### Frontend

* Loading states
* API error handling
* Authentication failures
* Form validation
* User-friendly error messages

---

# Security

Interviewly AI follows several standard security practices:

* Password hashing with bcrypt
* JWT-based authentication
* Protected API routes
* Environment-based configuration
* Sensitive credentials excluded from Git
* Backend validation
* Authentication middleware
* Separation of frontend and backend responsibilities

---

# Deployment

The application is designed to support independent deployment of the frontend and backend.

### Frontend

The React application can be deployed using platforms such as:

* Vercel
* Netlify

### Backend

The Node.js/Express backend can be deployed using platforms such as:

* Render
* Railway
* AWS

### Database

MongoDB Atlas can be used as the production database.

---

# Future Enhancements

Planned and potential improvements include:

* Real-time AI interview conversations
* Voice-based interview sessions
* Speech-to-text integration
* Resume-driven question generation
* Difficulty-based interview customization
* Interview history and analytics
* Candidate performance dashboards
* Skill-wise performance tracking
* AI-generated learning plans
* Advanced interview scoring
* Docker containerization
* AWS cloud deployment
* CI/CD pipeline integration
* Monitoring and observability

---

# Project Goals

The primary goals of Interviewly AI are to:

1. Provide a realistic and personalized interview preparation environment.
2. Use Generative AI to automate interview preparation.
3. Provide structured and actionable candidate insights.
4. Help candidates identify technical and behavioral skill gaps.
5. Create personalized preparation roadmaps.
6. Demonstrate a production-oriented full-stack architecture.
7. Integrate modern web technologies with Generative AI.

---

# Learning Outcomes

Developing Interviewly AI provided practical experience in:

* Full-stack application development
* React application architecture
* REST API development
* Node.js and Express.js
* MongoDB and Mongoose
* JWT authentication
* Password hashing
* API integration
* Generative AI integration
* File upload handling
* Frontend state management
* Error handling
* Git and GitHub workflows
* Deployment architecture

---

# Author

## Vaibhvee Prakash

**Computer Science Engineering**
**Cloud Computing and Automation**

GitHub: [Vaibhvee012](https://github.com/Vaibhvee012)

---

# License

This project is developed for **educational, portfolio, and demonstration purposes**.

---

<p align="center">
  Built with React, Node.js, MongoDB and Generative AI.
</p>
