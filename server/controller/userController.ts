import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid"; 
import User from "../models/User";
import dotenv from 'dotenv';
import { AuthenticatedRequest } from "../middleware/auth";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, email, password } = req.body;
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userId, name:username, email, password: hashedPassword });
    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser.userId ,role:savedUser.role}, JWT_SECRET!, {
      expiresIn: "1h",
    });
    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        userId: savedUser.userId,
        name: savedUser.name,
        email: savedUser.email,
        role:savedUser.role,
        myevents:savedUser.myevents
      },
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export const login = async (req: Request, res: Response): Promise<any> => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const token = jwt.sign({ id: user.userId,role:user.role}, JWT_SECRET!, {
        expiresIn: "1h",
      });
      res.status(200).json({
        message: "Login successful",
        token,
        user: { userId: user.userId, name: user.name, email: user.email, role: user.role ,myevents: user.myevents},
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

export const getUserInfo = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id, role } = req.user || {};
  
    if (!id) {
      res.status(400).json({ error: "Invalid request. Missing user credentials." });
      return;
    }

    const user = await User.findOne(
      { userId: id }, 
      { password: 0, createdAt: 0, updatedAt: 0, _id: 0 } 
    );
    user!.id = id;
    res.status(200).json(user);
  }
  catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
  
  