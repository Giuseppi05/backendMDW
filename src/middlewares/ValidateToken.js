import jwt from 'jsonwebtoken'

export const authRequired = async (req, res, next) => {
    const { token } = req.cookies;
    
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token is not valid" });
    }
  };