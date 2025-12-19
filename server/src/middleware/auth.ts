import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    user?: {
        id: string;
    };
}

export default function(req: Request, res: Response, next: NextFunction) {
    const token = req.header('x-auth-token');

    if (!token) {
        res.status(401).json({ msg: 'No token, authorization denied' });
        return; 
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error("JWT_SECRET is missing");

        const decoded = jwt.verify(token, secret) as any;
        
        // This is the line that fixes the error!
        (req as any).user = decoded.user;
        
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};