# ⚡ SignalFlow

A full-stack **real-time alerting system** built using **Next.js, Node.js, MongoDB, Redis (Upstash), BullMQ, and Socket.IO**.

This application allows users to create price-based alert rules for assets like **BTC, ETH, and NIFTY50**.  
When conditions are met, alerts are triggered instantly using a **queue + worker architecture** and delivered in real-time.

---

## 🚀 Features

- ✅ User Registration & Login (JWT Authentication)  
- ✅ Protected Dashboard Routes  
- ✅ Create Alert Rules (Asset + Condition + Target Price)  
- ✅ Delete Alert Rules  
- ✅ Real-time Price Updates  
- ✅ Automatic Rule Evaluation (Scheduler)  
- ✅ Queue-based Processing (BullMQ + Redis)  
- ✅ Worker-based Alert Handling  
- ✅ Real-time Notifications (Socket.IO) 🔔  
- ✅ Alert History  
- ✅ Docker Setup  

---

## 🛠 Tech Stack

- **Frontend:** Next.js (App Router)  
- **Language:** TypeScript  
- **Backend:** Node.js + Express  
- **Database:** MongoDB Atlas  
- **Queue System:** Redis (Upstash) + BullMQ  
- **Real-time:** Socket.IO  
- **Deployment:** Vercel (Frontend), Render (Backend)  
## 📦 Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/rahuljraj157/signalflow.git
cd signalflow
2️⃣ Install dependencies
Backend
cd signalflow-backend
npm install
Frontend
cd signalflow-frontend
npm install
🔐 Environment Variables
Backend (.env)
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
REDIS_URL=your_upstash_redis_url
Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:5000
▶️ Running the Application
Start Backend
cd signalflow-backend
npm run dev
Start Frontend
cd signalflow-frontend
npm run dev

👉 Open in browser:
http://localhost:3000
```

## 🌐 Live Demo

- **Frontend:** https://signalflow-vert.vercel.app  
- **Backend:** https://signalflow-bq3q.onrender.com  

---

## 🔌 API Endpoints

### 🔐 Auth
- `POST /api/auth/register` → Register user  
- `POST /api/auth/login` → Login user  

### 📊 Rules
- `GET /api/rules` → Get rules  
- `POST /api/rules` → Create rule  
- `DELETE /api/rules/:id` → Delete rule  

### 🔔 Alerts
- `GET /api/alerts` → Get alert history  

### 📈 Prices
- `GET /api/prices` → Get live prices  

---

## ⚙️ System Architecture
Scheduler → Queue (Redis) → Worker → Database + Socket → Frontend

---

## ⚡ How It Works

1. User creates an alert rule  
2. Scheduler checks rules periodically  
3. If condition is met → job pushed to Redis queue  
4. Worker processes job → saves alert  
5. Socket.IO emits event  
6. Frontend updates instantly 🔔  

## 🧪 Testing Guide

1. Register / Login  
2. Create rule:

```text
BTC | LESS_THAN | 100000
Wait a few seconds

👉 You will see:

🔔 Real-time alert notification
📜 Alert history updated
🐳 Docker Setup
docker-compose up --build

##🚀 Future Improvements
Rule editing feature
Pagination for alerts
Email / SMS notifications
Advanced filtering
Dashboard analytics

```
👨‍💻 Author

Rahul J Raj

📝 Final Note

This project demonstrates:

Real-time systems
Queue-based architecture
WebSocket communication
Scalable backend design
Full-stack development
