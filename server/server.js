import express from "express";
import mongoose from "mongoose";
import User from "./models/user.model.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// Connecting to the databases
mongoose
  .connect(
    "mongodb+srv://muralikonda2001:5dJfzdbeX36Fnnwh@mern-auth.ejwjumq.mongodb.net/?retryWrites=true&w=majority&appName=Mern-auth"
  )
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.log("this is the error", err);
  });

app.post("/login", async (req, res) => {
  // logic to get the details from the frontend and verfing
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      res.status(404).json({ message: "User not found" });
    }
    const isValidPassword = await bcrypt.compare(password, validUser.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign(
      {
        username: validUser.username,
        id: validUser._id,
        email: validUser.email,
      },
      "secretkey"
    );
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });
    res.status(200).json({ message: "Logged in successfully" });
  } catch (err) {
    console.log("error during login", err);
    res.status(500).json({ message: "error occured while logging in" });
  }
});

app.post("/signup", async (req, res) => {
  // logic to get the details from the frotend and creating the user in the database
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "user already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    // two cases over here one navigating the signed up user to login page and second one is handling the register and sending the created user to the frontend

    // first case - redirecting to the login page
    // res.status(200).json({ message: "user created" });

    // second case sending the users details to the frontend from regsiter endpoint
    const token = jwt.sign(
      { username: user.username, id: user._id, email: user.email },
      "secretkey"
    );
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });
    res.status(200).json({
      message: "User created successfully",
    });
  } catch (err) {
    console.error("Error during signup", err);
    res.status(500).json({ message: "An error occured during signup" });
  }
});

app.listen(3000, () => {
  console.log("Server is listening");
});
