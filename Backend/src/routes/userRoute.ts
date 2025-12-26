import express from "express";
import { register, login } from "../services/user.service";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const { statusCode, data } = await register({
      firstName,
      lastName,
      email,
      password,
    });

    res.status(statusCode).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Register failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const { statusCode, data } = await login({
      email,
      password,
    });

    res.status(statusCode).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Login failed" });
  }
});

export default router;
