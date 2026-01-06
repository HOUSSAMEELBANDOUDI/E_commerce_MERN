# 🛒 Full-Stack E-Commerce Application

A **full-stack e-commerce web application** built with **React + TypeScript** on the frontend and **Express.js + TypeScript** on the backend.  
The application includes authentication, product management, cart functionality, and secure API communication.

---

## 🚀 Tech Stack

### Frontend
- ⚛️ React
- 🟦 TypeScript
- ⚡ Vite
- 🎨 Material UI (MUI)
- 🔀 React Router
- 🧠 Context API (Auth & Cart)
- 🌐 Fetch API

### Backend
- 🟩 Node.js
- 🚂 Express.js
- 🟦 TypeScript
- 🔐 JWT Authentication
- 🍃 MongoDB
- 🧬 Mongoose

---

## ✨ Features

### 👤 Authentication
- User registration
- User login
- JWT-based authentication
- Protected routes (frontend & backend)

### 🛍️ Products
- Fetch products from database
- Display product list
- Product card UI

### 🛒 Cart
- Add product to cart
- View cart items
- Calculate total price
- Global cart state using Context API
- Secure cart API (authentication required)

### 🔐 Security
- Protected backend routes with middleware
- Authorization using Bearer Token
- Frontend route protection using React Router

---

## 📂 Project Structure

e_commerce_project/
│
├── backend/
│ ├── src/
│ │ ├── routes/
│ │ ├── controllers/
│ │ ├── services/
│ │ ├── models/
│ │ ├── middleware/
│ │ └── index.ts
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── context/
│ │ ├── cart/
│ │ ├── services/
│ │ └── App.tsx
│ └── package.json
│
└── README.md


---

## ⚙️ Environment Variables

Create a `.env` file inside the **backend** folder:

```env
PORT=3001
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
JWT_SECRET=your_secret_key

▶️ How to Run the Project
1️⃣ Clone the repository
git clone https://github.com/your-username/e-commerce-project.git
cd e-commerce-project

2️⃣ Run Backend
cd backend
npm install
npm run dev


Backend runs on:

http://localhost:3001

3️⃣ Run Frontend
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173
