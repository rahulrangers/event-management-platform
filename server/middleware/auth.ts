import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ;
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string,
    role: string,
   };
}

export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
   res.status(401).json({ error: "Access Denied: No Token Provided" });
   return
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET!);
    if (typeof decoded === "object" && "id" in decoded && "role" in decoded) {
      req.user = {
        id: decoded.id as string,
        role: decoded.role as string,
      };
      next();
  
    }
} catch (error) {
    res.status(403).json({ error: "Invalid Token" });
    return;
  }
};
export const authorizeAdmin = async (req: AuthenticatedRequest, res: Response, next: NextFunction):Promise<any> => {
  const userRole = req.user?.role; 
  if (userRole !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};
