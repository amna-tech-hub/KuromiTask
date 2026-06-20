# 🎀 KuromiTask - Spooky-Cute Todo App

A full-stack task management application with JWT authentication, OTP verification, and a Kuromi-themed interface.

##  Features

- **User Authentication**
  - JWT-based authentication
  - OTP verification via email
  - Secure password hashing

- **Task Management**
  - Create, read, update, and delete categories
  - Add subtasks within categories


- **User Experience**
  - Responsive design for all devices
  - Kuromi-themed UI
  - Real-time updates
  - Toast notifications

##  Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router DOM
- TanStack Query
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Nodemailer for OTP

### DevOps
- Vercel (Deployment)
- Git & GitHub


## 📦 Installation

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- Gmail account for OTP

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/kuromitask.git

# Navigate to server
cd kuromitask/server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev