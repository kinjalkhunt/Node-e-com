import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "FIDWBF84IGRIibsuxbug8E*G&*†̂‡°·‡̂†›dushood39hudhuieuciuihoho";

export const authenticateUser = (Request, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    
    if (!token) return res.status(401).json({ message: "Access denied, no token provided" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
