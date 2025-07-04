import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';



// Register
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashed = await bcrypt.hash(password, 10);
        const user = await userModel.create({ name, email, password: hashed });
        res.status(201).json({ message: "User registered" });
    } catch (err) {
        res.status(400).json({ message: "User already exists" });
    }
}


// Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).json({ message: "No user found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET);
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: "Login error" });
    }
}