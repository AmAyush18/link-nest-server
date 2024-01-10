import userModel from "../models/user.model.js";
import ErrorHandler from '../utils/ErrorHandler.js';
import { CatchAsyncError } from '../middlewares/catchAsyncError.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

export const registrationUser = CatchAsyncError(async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const existingUser = await userModel.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user with the hashed password
      const newUser = new userModel({
        email,
        password: hashedPassword,
      });
  
      // Save the user to the database
      await newUser.save();
  
      // Generate a JWT token
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: '3h', 
      });
  
      res.status(201).json({ message: 'Signup successful', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });