# CloudCare Hospital - Full-Stack Management System

A professional, production-ready Hospital Management System built with the **MERN Stack** (MongoDB, Express, React, Node.js). This project features a modern fintech-inspired UI, robust authentication, and is optimized for both local development and containerized cloud deployment.

## 🌟 Key Features (Newly Optimized)

*   **🔗 Smart Authentication**: Advanced login/signup system. When a new user registers, the system automatically creates a linked **Medical Patient Profile**.
*   **📊 Integrated Dashboard**: Real-time analytics showing patient counts, doctor availability, and appointment trends using `Recharts`.
*   **🩺 Medical Management**: Specialized modules for managing Patients, Doctors, Departments, and Appointments.
*   **🛡️ Secure Database matching**: Enforced lowercase email normalization and sanitized search queries to prevent database crashes.
*   **🌓 Theme Support**: Built-in Dark and Light mode preference tracking.
*   **🐳 DevOps Ready**: Includes Docker containerization and Kubernetes orchestration manifests.

## 🛠️ Tech Stack

### Application
*   **Frontend**: React (Vite), Vanilla CSS (Premium Aesthetics), Framer Motion (Animations), Lucide-React (Icons)
*   **Backend**: Node.js, Express, Mongoose (MongoDB Modeling)
*   **Database**: MongoDB (Indexed for performance)

### Infrastructure
*   **Docker**: Multi-stage builds for optimized image sizes.
*   **Kubernetes**: Manifests for Deployment, HPA, and Ingress.
*   **Nginx**: Used as a high-performance reverse proxy.

## 📂 Folder Structure

```
cloudcare-hospital/
├── backend/                # Node.js/Express Server
│   ├── server/             # Core logic (Models, Controllers, Routes)
│   └── Dockerfile          # Server container definition
├── frontend/               # React (Vite) Application
│   ├── src/                # UI Components, Pages, and Hooks
│   └── Dockerfile          # Multi-stage build (App -> Nginx)
├── k8s/                    # Kubernetes Manifests (Deployments, HPA)
├── docker-compose.yml      # Orchestration for local development
└── README.md               # You are here!
```

## ⚙️ Setup & Installation

### 1. Prerequisites
*   Node.js (v18+)
*   MongoDB (Installed locally or running via Docker)
*   Docker Desktop (Optional)

### 2. Manual Setup (Local Development)

**Step 1: Database**
Ensure MongoDB is running on `127.0.0.1:27017`.

**Step 2: Backend**
```bash
cd backend
npm install
npm run dev
```

**Step 3: Frontend**
```bash
cd frontend
npm install
npm run dev
```

### 3. Docker Deployment (Recommended)
```bash
# Build and start the entire stack in the background
docker-compose up --build -d
```

## 🔐 Credentials for Testing
You can use these demo credentials to explore the dashboard:
*   **Admin Email**: `admin@cloudcare.com`
*   **Password**: `password`

## 📊 API Health Check
Once the backend is running, you can verify connection at:
`http://localhost:5000/api/health`

## 📄 License
MIT License
