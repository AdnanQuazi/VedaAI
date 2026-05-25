<div align="center">

# 🧠 VedaAI

### AI-Powered Assignment & Question Paper Generation System

*An intelligent platform for educators — upload your syllabus, configure your paper, get a print-ready exam in seconds.*

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Redis](https://img.shields.io/badge/Redis-BullMQ-red?style=flat-square&logo=redis)](https://redis.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

</div>

---

## 📖 Overview

VedaAI is a production-grade, full-stack platform that enables teachers to generate structured question papers and assignments using AI. Teachers upload a study material or syllabus document, configure question preferences, and the system handles the rest — asynchronously, reliably, and in real-time.

---

## 🔑 Demo Access

> **No sign-up required.** When you open the app, you are automatically logged in with a pre-seeded demo account so you can explore the full platform immediately.
>


---

## ✨ Features

| Category | Features |
|---|---|
| **AI Generation** | Gemini-powered question generation, structured JSON output, auto-retry on invalid responses |
| **Question Types** | MCQ, short answer, long answer — with marks, difficulty labels, and answer keys |
| **Realtime Updates** | Live progress tracking via WebSockets (Socket.IO + Redis Pub/Sub) |
| **PDF Export** | Printable exam layout with school info, sections, MCQ options, and answer key page |
| **Regeneration** | Re-queue and regenerate any paper without losing assignment metadata |
| **Queue Processing** | BullMQ background workers with retry support and fault tolerance |
| **Authentication** | JWT-based auth with secure, ownership-scoped socket rooms |
| **Responsive UI** | Mobile-first dashboard with smooth transitions and real-time feedback |

---

## 🏗️ Architecture

### High-Level Flow

```
Teacher (Browser)
      │
      ▼
POST /assignments           ← Fast, non-blocking API
      │
      ▼
BullMQ Job Queue            ← Async, distributed
      │
      ▼
Worker Process
  ├── File Text Extraction
  ├── Gemini AI Prompt
  ├── Zod Schema Validation (with retry)
  ├── MongoDB Persistence
  └── Redis Pub/Sub Event
            │
            ▼
      Socket.IO Server
            │
            ▼
      Frontend (Live Updates)
            │
            ▼
      Structured Question Paper Renderer
            │
            ▼
      Download as PDF
```

---

### System Components

```
┌─────────────────────────────────────────┐
│                Frontend                  │
│  Next.js · Redux · RTK Query · Socket   │
└────────────────────┬────────────────────┘
                     │ HTTP / WebSocket
┌────────────────────▼────────────────────┐
│              API Server                  │
│         Express.js · TypeScript          │
└────┬────────────────────────┬───────────┘
     │                        │
┌────▼──────┐         ┌───────▼────────┐
│  MongoDB  │         │     Redis       │
│ Mongoose  │         │ BullMQ + PubSub │
└───────────┘         └───────┬────────┘
                               │
                    ┌──────────▼──────────┐
                    │   Worker Processes   │
                    │ Generation · PDF     │
                    └─────────────────────┘
```

---

## 🛠️ Tech Stack

**Frontend**
- Next.js 16, React, TypeScript
- TailwindCSS, Lucide Icons
- Redux Toolkit + RTK Query
- Socket.IO Client

**Backend**
- Node.js, Express.js, TypeScript
- MongoDB + Mongoose
- Redis, BullMQ
- Socket.IO
- PDFKit
- Gemini API
- Zod Validation

---

## 🔄 Core Flows

### Assignment Creation
1. Teacher fills out form — file, question types, marks, due date
2. `POST /assignments` validates and stores metadata, then immediately returns an `assignmentId`
3. A BullMQ job is queued for background processing
4. Frontend navigates to `/assignments/:id` and opens a socket room

### AI Generation Pipeline (Worker)
1. Extract text from the uploaded file
2. Build a dynamic prompt with configured question types and counts
3. Send request to Gemini API
4. Validate response against Zod schema
5. If invalid → inject corrective feedback and retry:
   ```
   Your previous JSON output was invalid.
   Missing required fields: answerKey, questionType
   Return ONLY valid JSON.
   ```
6. Persist validated paper to MongoDB
7. Publish completion event to Redis Pub/Sub → Socket.IO → Frontend

### Realtime Progress Statuses
```
Reading File  →  Generating Question Paper  →  Validating Output  →  Completed
```

---

## ⚡ Performance Optimizations

**Async Queues** — All heavy operations (AI, PDF) are fully removed from the request lifecycle, keeping API response times under 100ms.

**Separate PDF Worker** — PDF generation runs in its own BullMQ queue to prevent blocking generation workers and avoid memory spikes.

**Redis Caching** — BullMQ state, job progress, and pub/sub messaging all flow through Redis.

**RTK Query Caching** — Frontend automatically caches assignments, user profiles, and generated papers with smart invalidation.

**Selective MongoDB Queries** — `GET /assignments` returns lightweight metadata only; full question paper data is fetched only on the detail page.

**WebSocket + Polling Hybrid** — The detail page uses Socket.IO for live updates with a polling fallback for resilience in production.

---

## 🔐 Security

- **JWT Authentication** — All API routes are protected
- **Scoped Socket Rooms** — Users can only subscribe to assignment rooms they own
- **Triple Validation** — All inputs are validated at the frontend, backend, and AI output layer (Zod)

---

## 📡 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/assignments` | Create assignment, queue generation job |
| `GET` | `/assignments` | List assignments (metadata only) |
| `GET` | `/assignments/:id` | Fetch assignment + generated question paper |
| `POST` | `/assignments/:id/regenerate` | Re-queue generation for an assignment |
| `POST` | `/assignments/:id/download-pdf` | Stream generated PDF |

---

## 🚀 Setup

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)
- Redis instance (local or cloud)
- Gemini API key

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/vedaai.git
cd vedaai
```

### 2. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Configure Environment Variables

**Backend** — create `backend/.env`:

```env
PORT=
MONGODB_URI=
REDIS_HOST=
REDIS_PORT=
REDIS_USERNAME=
REDIS_PASSWORD=
JWT_SECRET=
GEMINI_API_KEY=
```

**Frontend** — create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

### 4. Run the Application

```bash
# Start backend API server
cd backend
npm run dev

# Start frontend
cd frontend
npm run dev
```

The app will be available at `http://localhost:3000`.

---

### 5. Build for Production

```bash
# Backend
cd backend && npm run build && npm start

# Frontend
cd frontend && npm run build && npm start
```

---

## 📦 Data Model

```
Assignment
  ├── metadata (title, dueDate, status, instructions)
  └── QuestionPaper
        └── Sections[]
              └── Questions[]
                    ├── questionText
                    ├── questionType
                    ├── marks
                    ├── difficulty
                    ├── options[] (MCQ)
                    └── answerKey
```
