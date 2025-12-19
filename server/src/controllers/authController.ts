import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/U'; // Importing the TS Model

// 1. REGISTER LOGIC
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    // We expect name, email, password from the body
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        res.status(400).json({ msg: 'Please enter all fields' });
        return; 
    }

    try {
        // Check for existing user
        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ msg: 'User already exists' });
            return;
        }

        // Create new user instance
        user = new User({ name, email, password });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save to DB
        await user.save();

        // Create Token
       const payload = { 
            user: { 
                id: (user._id as any).toString() 
            } 
        };
        
        // Fix: Use process.env.JWT_SECRET safely
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error("JWT_SECRET is missing in .env");

        // Sign Token (Synchronous is cleaner)
        const token = jwt.sign(payload, secret, { expiresIn: 3600 });
        
        res.json({ token });

    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server Error');
    }
};

// 2. LOGIN LOGIC
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        res.status(400).json({ msg: 'Please enter all fields' });
        return;
    }

    try {
        // Check for user
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ msg: 'Invalid Credentials' });
            return;
        }

        // Compare Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ msg: 'Invalid Credentials' });
            return;
        }

        // Return Token
        const payload = { 
            user: { 
                id: (user._id as any).toString() 
            } 
        };
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error("JWT_SECRET is missing in .env");

        const token = jwt.sign(payload, secret, { expiresIn: 3600 });
        
        res.json({ token });

    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server Error');
    }
};