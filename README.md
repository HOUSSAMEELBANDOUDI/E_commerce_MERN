# E-Commerce MERN Application

A full-stack e-commerce web application built with **React + TypeScript** on the frontend and **Express.js + TypeScript** on the backend.
The application includes authentication, product management, cart functionality, checkout, orders, and secure API communication.

---

## Tech Stack

### Frontend
- **React 19** + **TypeScript**
- **Vite** — fast dev server & build tool
- **Material UI (MUI)** — UI components
- **React Router v7** — client-side routing
- **Context API** — state management (Auth & Cart)

### Backend
- **Node.js** + **Express.js 5**
- **TypeScript**
- **MongoDB** + **Mongoose**
- **JWT** — authentication
- **bcrypt** — password hashing

---

## Features

### Authentication
- User registration & login
- JWT-based authentication with Bearer tokens
- Password hashing with bcrypt
- Protected routes (frontend & backend)

### Products
- Fetch products from MongoDB
- Display product list with ProductCard component
- Responsive product grid

### Cart
- Add / remove products from cart
- View cart items & calculate total price
- Global cart state using Context API
- Secure cart API (authentication required)

### Orders & Checkout
- Checkout page
- Order placement & order history

### Security
- JWT middleware for protected backend routes
- Frontend route protection with ProtectedRoute component
- CORS configuration

---

## Project Structure

```
E_commerce_MERN/
│
├── Backend/
│   ├── src/
│   │   ├── index.ts              # Express server entry point
│   │   ├── routes/
│   │   │   ├── userRoute.ts      # Auth routes (register/login)
│   │   │   ├── product.ts        # Product routes
│   │   │   └── cartRoute.ts      # Cart routes
│   │   ├── services/
│   │   │   ├── user.service.ts   # User business logic
│   │   │   ├── productService.ts # Product business logic
│   │   │   └── cartService.ts    # Cart business logic
│   │   ├── models/
│   │   │   ├── userModel.ts      # User schema
│   │   │   ├── productModel.ts   # Product schema
│   │   │   ├── cartModel.ts      # Cart schema
│   │   │   └── orderModel.ts     # Order schema
│   │   └── middlewares/
│   │       └── validateJWT.ts    # JWT auth middleware
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx               # Main app with routing
│   │   ├── main.tsx              # React entry point
│   │   ├── pages/
│   │   │   ├── Homepage.tsx      # Product listing
│   │   │   ├── LoginPage.tsx     # Login form
│   │   │   ├── RegisterPage.tsx  # Registration form
│   │   │   ├── CartPage.tsx      # Cart view
│   │   │   ├── CheckoutPage.tsx  # Checkout flow
│   │   │   └── OrderPage.tsx     # Order history
│   │   ├── components/
│   │   │   ├── Navbar.tsx        # Navigation bar
│   │   │   ├── ProductCard.tsx   # Product display card
│   │   │   └── ProtectedRoute.tsx# Route guard
│   │   ├── context/
│   │   │   ├── auth/             # Auth context & provider
│   │   │   └── Cart/             # Cart context, provider & service
│   │   ├── constants/
│   │   │   └── api.ts            # API base URL
│   │   └── types/
│   │       ├── Product.ts        # Product type definition
│   │       └── CartItem.ts       # CartItem type definition
│   └── package.json
│
└── README.md
```

---

## Environment Variables

Create a `.env` file inside the **Backend** folder:

```env
PORT=3001
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
JWT_SECRET=your_secret_key
```

---

## How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/HOUSSAMEELBANDOUDI/E_commerce_MERN.git
cd E_commerce_MERN
```

### 2. Run Backend

```bash
cd Backend
npm install
npm run dev
```

Backend runs on: **http://localhost:3001**

### 3. Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: **http://localhost:5173**

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/user/register` | Register a new user | No |
| POST | `/user/login` | Login & get JWT token | No |
| GET | `/products` | Get all products | No |
| POST | `/cart` | Add item to cart | Yes |
| GET | `/cart` | Get user's cart | Yes |

---

## Author

**Houssame El Bandoudi** — [GitHub](https://github.com/HOUSSAMEELBANDOUDI)

## License

This project is open source and available for educational purposes.
