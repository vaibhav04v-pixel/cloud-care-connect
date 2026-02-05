# CloudCare Hospital - Cloud & DevOps Project

A production-ready Hospital Management System designed for scalable containerized deployment. This project demonstrates a full-stack MERN application (MongoDB, Express, React, Node.js) optimized for Cloud and DevOps workflows, featuring Docker containerization and Kubernetes orchestration.

## 🚀 Project Overview

The CloudCare Hospital application is a comprehensive digital solution for healthcare management. This repository focuses on the *infrastructure* and *deployment* aspect, showcasing best practices in:

*   **Containerization**: Multi-stage Docker builds for optimized images.
*   **Orchestration**: Kubernetes manifests for Deployments, Services, Ingress, and HPA.
*   **Infrastructure as Code**: Declarative configuration for all resources.
*   **Production Readiness**: Nginx integration, Health checks, and Resource limits.

## 🛠️ Tech Stack & DevOps Tools

### Application
*   **Frontend**: React (Vite), TailwindCSS, Framer Motion
*   **Backend**: Node.js, Express
*   **Database**: MongoDB

### Infrastructure
*   **Docker**: Container runtime and image building
*   **Kubernetes (K8s)**: Container orchestration
*   **Nginx**: High-performance web server and reverse proxy
*   **Helm** (Optional): Package management

## 📂 Folder Structure

```
cloudcare-hospital-react/
├── backend/                # Node.js/Express Service
│   ├── Dockerfile          # Backend container definition
│   └── ...
├── frontend/               # React Service
│   ├── Dockerfile          # Multi-stage build (Node -> Nginx)
│   └── ...
├── k8s/                    # Kubernetes Manifests
│   ├── configmap.yaml      # Nginx configuration
│   ├── deployment.yaml     # Frontend Deployment & Service
│   ├── hpa.yaml            # Horizontal Pod Autoscaler
│   └── ingress.yaml        # Ingress rules
├── docker-compose.yml      # Local development orchestration
└── README.md               # Documentation
```

## ⚙️ Setup & Deployment

### 1. Prerequisites
*   Docker Desktop or Docker Engine
*   Kubernetes Cluster (Minikube, Kind, or Cloud Provider)
*   kubectl CLI tool

### 2. Environment Variables
Create a `.env` file in the `backend` directory based on the example below. 
**Note:** For production/K8s, these should be managed via Kubernetes Secrets.

```env
PORT=5000
# Update with your MongoDB Connection String
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/hospitalDB
JWT_SECRET=production_secret_key_here
ALLOWED_ORIGINS=http://cloudcare-hospital.local
```

### 3. Docker Deployment (Local)

Build and run the application utilizing `docker-compose`:

```bash
# Build and start services
docker-compose up --build -d

# Check status
docker-compose ps
```

Access the application at `http://localhost:5173` (Frontend) and `http://localhost:5000` (Backend).

### 4. Kubernetes Deployment

Ensure your Kubernetes cluster is running and `kubectl` is configured.

**Step 1: Build Docker Images**
```bash
docker build -t cloudcare-hospital-frontend:latest ./frontend
docker build -t cloudcare-hospital-backend:latest ./backend
```
*Note: If using Minikube/Kind, you may need to load images into the cluster cache or push to a registry.*

**Step 2: Apply Manifests**
```bash
# Apply ConfigMap (Nginx Config)
kubectl apply -f k8s/configmap.yaml

# Apply Deployment & Service
kubectl apply -f k8s/deployment.yaml

# Apply Ingress (Requires Ingress Controller)
kubectl apply -f k8s/ingress.yaml

# Apply HPA (Requires Metrics Server)
kubectl apply -f k8s/hpa.yaml
```

**Step 3: Verify Deployment**
```bash
kubectl get pods
kubectl get services
```

## 🔍 Validation & Correctness

This project has been verified for:
*   ✅ **Production Builds**: Frontend uses multi-stage Docker build serving static files via Nginx.
*   ✅ **Resilience**: Liveness and Readiness probes configured in K8s.
*   ✅ **Scalability**: Horizontal Pod Autoscalers (HPA) configured for resource usage.
*   ✅ **Security**: Non-root hints and environment variable separation (Ready for Secrets).

## 📄 License
MIT License

