import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { auth } from "../config/firebaseConfig.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

export const registerUser = async (req, res) => {
  const { email, password, username, bio, profilePicture } = req.body;
  try {
    // Create a new user in Firebase
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Store Firebase UID and email in MongoDB
    const newUser = new User({
      email,
      firebaseUid: user.uid, // Store Firebase UID
      username,
      bio,
      profilePicture,
    });
    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // console.error("Error registering user:", error);

    // Check for specific error codes and provide appropriate responses
    if (error.code === "auth/email-already-in-use") {
      return res.status(400).json({ message: "Email is already in use" });
    } else if (error.code === "auth/weak-password") {
      return res.status(400).json({ message: "Password is too weak" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Sign in user using Firebase authentication
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    // Retrieve user data from MongoDB based on the Firebase UID
    const mongoUser = await User.findOne({ firebaseUid: user.uid });

    if (!mongoUser) {
      return res.status(400).json({ message: "User not found" });
    }

    req.user = mongoUser;
    const accessToken = jwt.sign(
      { id: mongoUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    return res.status(200).json({ accessToken, user: mongoUser });
  } catch (error) {
    // Check for specific error codes and provide appropriate responses
    if (
      error.code === "auth/user-not-found" ||
      error.code === "auth/invalid-credential"
    ) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;
  try {
    // Send a password reset email using Firebase authentication
    await sendPasswordResetEmail(auth, email);
    return res.status(200).json({ message: "Reset password email sent" });
  } catch (error) {
    // Check for specific error codes and provide appropriate responses
    if (error.code === "auth/user-not-found") {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};
