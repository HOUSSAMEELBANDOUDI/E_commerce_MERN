import express, { Application } from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";


const app = express();
app.use(express.json()); 
const PORT = process.env.PORT || 3001;

app.use("/user", userRoute);

// Middleware

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

// Test route
app.get("/", (req, res) => {
  res.send("E-commerce Backend is running 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
