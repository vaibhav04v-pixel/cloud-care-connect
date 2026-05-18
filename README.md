# 🏥 CloudCare Hospital - Production-Grade Cloud & DevOps Showcase

A modern, full-stack Hospital Management System architected for **High Availability**, **Scalability**, and **Cloud-Native Deployment**. This project serves as a comprehensive showcase of modern DevOps practices, featuring a dedicated **React/Node.js** application deployed on **AWS EC2** using **Docker** and **Kubernetes**.

---

## 🚀 Cloud & DevOps Architecture

This project is not just a website—it is a production-ready infrastructure showcase:

*   **☁️ Cloud Provider**: Hosted on **AWS EC2** (Ubuntu/Linux) using high-performance compute instances.
*   **� Containerization**: Microservices architecture using **Docker**. Features multi-stage builds to keep production images tiny and secure.
*   **☸️ Orchestration**: Managed by **Kubernetes (K8s)**.
    *   **Deployments**: Self-healing pods that restart automatically if they crash.
    *   **HPA (Horizontal Pod Autoscaler)**: Automatically adds more "clones" of the website if traffic spikes.
    *   **Services & Ingress**: Handles load balancing and directs traffic to the right containers via **Nginx**.
*   **� CI/CD Ready**: Structured to integrate with GitHub Actions or Jenkins for automated cloud deployment.

## 🛠️ Tech Stack

### Core Application
*   **Frontend**: React (Vite), Framer Motion (Animations), TailwindCSS/Vanilla CSS.
*   **Backend**: Node.js, Express (RESTful API).
*   **Database**: MySQL with Sequelize ORM (Relational, Structured).

### Infrastructure Tools
*   **AWS EC2**: Our primary cloud hosting environment.
*   **Docker & Docker-Compose**: Local and remote container management.
*   **Kubernetes (K8s)**: Production-grade orchestration.
*   **Nginx**: High-performance reverse proxy and web server.

## 📂 Project Structure

```
cloudcare-hospital/
├── backend/                # Node.js API Service + Dockerfile
├── frontend/               # React UI Service + Multi-stage Dockerfile
├── k8s/                    # ☸️ Kubernetes Manifests
│   ├── deployment.yaml     # App scaling & deployment logic
│   ├── service.yaml        # Internal networking
│   ├── hpa.yaml            # Auto-scaling rules (CPU/RAM)
│   └── ingress.yaml        # External Traffic Management (Nginx)
├── docker-compose.yml      # Local dev orchestration
└── README.md               # Infrastructure Documentation
```

## ⚙️ Setup & Cloud Deployment

### 1. Local Development (Docker)
```bash
# Start the entire stack effortlessly with one command
docker-compose up --build
```

### 2. Cloud Deployment (AWS EC2 + K8s)

**Step 1: Prepare EC2**
Launch an Ubuntu instance, install Docker, and set up your Kubernetes cluster (K3s, Minikube, or EKS).

**Step 2: Build & Push Images**
```bash
docker build -t your-registry/cloudcare-frontend:latest ./frontend
docker build -t your-registry/cloudcare-backend:latest ./backend
# Push to Docker Hub or AWS ECR
docker push your-registry/cloudcare-frontend:latest
```

**Step 3: Deploy to K8s**
```bash
# Apply the infrastructure manifests
kubectl apply -f k8s/
```

## 🔐 Demo Access
*   **Admin Dashboard**: `http://<your-ec2-ip>:5173/dashboard`
*   **Email**: `admin@cloudcare.com`
*   **Password**: `password`
*   **API Health**: `http://<your-ec2-ip>:5000/api/health`

## 🌟 Key Application Features
*   **Linked Identity**: Users automatically receive a Medical Patient ID upon signup.
*   **Sanitized Search**: Regex-injection safe search for doctors and patients.
*   **Responsive UI**: Optimized for mobile, tablet, and desktop viewing.
*   **Theme Engine**: Persists user's Dark/Light mode preference across sessions.

*Created as a demonstration of Production Cloud Architecture and Node.js/MySQL Full-Stack development.*
