# Interviewly AI

<p align="center">
  <strong>AI-Powered Interview Preparation Platform</strong>
</p>

<p align="center">
  Analyze your resume and target job description to generate personalized interview questions, skill-gap analysis, and a structured preparation plan.
</p>

<p align="center">

</p>

<p align="center">

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge\&logo=jsonwebtokens\&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge\&logo=github\&logoColor=white)

</p>

---

## Overview

Interviewly AI is a full-stack AI-powered interview preparation platform designed to help candidates prepare for technical and behavioral interviews.

The platform analyzes a candidate's **resume or self-description** against a **target job description** and generates a personalized interview preparation report.

The generated report includes technical questions, behavioral questions, skill-gap analysis, a job-match score, and a structured preparation plan.

---

## Key Features

### Authentication

* User registration and login
* JWT-based authentication
* HTTP cookie-based authentication
* Protected routes
* Logout functionality
* Token blacklisting

### Resume & Profile Analysis

* Upload PDF or DOCX resumes
* Provide a self-description as an alternative
* Analyze candidate experience and technical skills
* Compare candidate profile with job requirements

### AI-Powered Interview Generation

Interviewly AI generates customized interview preparation material including:

* Technical interview questions
* Behavioral interview questions
* Skill-gap analysis
* Job compatibility score
* Day-by-day preparation plan
* Personalized interview strategy

### Interview Reports

* View generated interview plans
* Access previous reports
* View individual interview reports
* Track job-match scores
* Generate personalized preparation strategies

### Modern Frontend

* Responsive React interface
* Component-based architecture
* React Router navigation
* Axios API integration
* SCSS-based styling
* Loading states and interactive UI

---

## Technology Stack

### Frontend

| Technology   | Purpose                    |
| ------------ | -------------------------- |
| React.js     | User interface             |
| JavaScript   | Application logic          |
| React Router | Client-side routing        |
| Axios        | API communication          |
| SCSS         | Styling                    |
| Vite         | Development and build tool |

### Backend

| Technology | Purpose             |
| ---------- | ------------------- |
| Node.js    | Server-side runtime |
| Express.js | REST API framework  |
| MongoDB    | Database            |
| Mongoose   | MongoDB ODM         |
| JWT        | Authentication      |
| bcryptjs   | Password hashing    |
| Multer     | File uploads        |

### AI & Development Tools

| Technology        | Purpose                                     |
| ----------------- | ------------------------------------------- |
| Google Gemini API | AI-powered analysis and question generation |
| Git               | Version control                             |
| GitHub            | Source code management                      |
| Postman           | API testing                                 |
| Vercel            | Frontend deployment                         |
| Render            | Backend deployment                          |

---

## System Architecture

```text
                         +----------------------+
                         |       User           |
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
                         |   React Frontend     |
                         |      + Vite          |
                         +----------+-----------+
                                    |
                              REST API / Axios
                                    |
                                    v
                         +----------------------+
                         |   Express Backend    |
                         +----------+-----------+
                                    |
                  +-----------------+-----------------+
                  |                 |                 |
                  v                 v                 v
           +-------------+   +-------------+   +-------------+
           |    JWT      |   |  MongoDB    |   |   Multer    |
           |    Auth     |   |  Database   |   | File Upload |
           +-------------+   +-------------+   +-------------+
                                    |
                                    v
                         +----------------------+
                         |    Gemini AI API     |
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
                         | Interview Report     |
                         | - Questions          |
                         | - Skill Gaps         |
                         | - Match Score        |
                         | - Preparation Plan   |
                         +----------------------+
```

---

## Project Structure

```text
Interviewly AI/
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── Frontend/
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
└── README.md
```

---

## Application Workflow

```text
User Registration / Login
          |
          v
   Authentication
          |
          v
   Enter Job Description
          |
          +--------------------+
          |                    |
          v                    v
   Upload Resume       Self Description
          |                    |
          +---------+----------+
                    |
                    v
             Backend API
                    |
                    v
            Profile Analysis
                    |
                    v
              Gemini AI
                    |
                    v
          Interview Report
                    |
       +------------+------------+
       |            |            |
       v            v            v
 Technical     Behavioral    Skill Gap
 Questions     Questions      Analysis
       |            |            |
       +------------+------------+
                    |
                    v
          Preparation Plan
```

---

## API Endpoints

### Authentication

| Method | Endpoint             | Description         | Access  |
| ------ | -------------------- | ------------------- | ------- |
| `POST` | `/api/auth/register` | Register a new user | Public  |
| `POST` | `/api/auth/login`    | Authenticate user   | Public  |
| `POST` | `/api/auth/logout`   | Logout user         | Private |
| `GET`  | `/api/auth/me`       | Get current user    | Private |

### Interview

| Method | Endpoint                                       | Description               | Access  |
| ------ | ---------------------------------------------- | ------------------------- | ------- |
| `POST` | `/api/interview`                               | Generate interview report | Private |
| `GET`  | `/api/interview`                               | Get all user reports      | Private |
| `GET`  | `/api/interview/report/:interviewId`           | Get specific report       | Private |
| `POST` | `/api/interview/resume/pdf/:interviewReportId` | Generate resume PDF       | Private |

---

## Getting Started

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* MongoDB
* Git

You will also need a Google Gemini API key.

---

## Installation

### Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd "PROJECT Interviewly AI"
```

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file inside the `Backend` directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend:

```bash
npm run dev
```

Backend:

```text
http://localhost:3000
```

### Frontend Setup

Open a new terminal:

```bash
cd Frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## Environment Variables

The following environment variables are required:

| Variable         | Description                            |
| ---------------- | -------------------------------------- |
| `PORT`           | Backend server port                    |
| `MONGO_URI`      | MongoDB connection string              |
| `JWT_SECRET`     | Secret key used for JWT authentication |
| `GEMINI_API_KEY` | Google Gemini API key                  |

Do not commit `.env` files or API keys to GitHub.

---

## API Testing

Postman can be used to test the backend APIs.

Example interview generation request:

```text
POST http://localhost:3000/api/interview
```

Request type:

```text
multipart/form-data
```

Fields:

```text
jobDescription   → Target job description
selfDescription  → Candidate profile
resume           → PDF/DOCX resume
```

Authentication is handled through the JWT authentication cookie.

---

## Security

Interviewly AI includes several backend security mechanisms:

* JWT-based authentication
* HTTP cookie-based token storage
* Password hashing with bcrypt
* Protected API routes
* Token blacklisting
* CORS configuration
* Environment-based secret management
* Resume file upload handling
* Authentication middleware

---

## Future Improvements

* AI-powered real-time mock interviews
* Voice-based interview simulation
* AI answer evaluation
* Interview performance analytics
* Resume optimization
* LinkedIn profile analysis
* Advanced skill recommendations
* AWS cloud deployment
* Docker containerization
* CI/CD pipeline
* Redis-based caching
* Automated testing and monitoring

---

## Deployment

The application can be deployed using:

### Frontend

```text
Vercel
```

### Backend

```text
Render
```

### Database

```text
MongoDB Atlas
```

The architecture can also be extended to AWS using services such as EC2, S3, CloudFront, and other cloud infrastructure.

---

## Development

Clone the repository and install dependencies separately for the frontend and backend.

```bash
# Backend
cd Backend
npm install
npm run dev
```

```bash
# Frontend
cd Frontend
npm install
npm run dev
```

---

## Author

### Vaibhvee Prakash

Computer Science Engineering
Cloud Computing & Automation

**Interests**

* Full Stack Development
* Cloud Computing
* Artificial Intelligence
* DevOps
* Software Engineering

---

## License

This project is developed for educational and portfolio purposes.

---

<p align="center">
  <strong>Interviewly AI</strong>
  <br>
  AI-powered interview preparation for modern developers.
</p>
