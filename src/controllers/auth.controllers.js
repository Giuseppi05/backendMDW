import Auth from "../models/auth.models.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const {email, password, verifiedPassword} = req.body

    try {

        const existingUser = await Auth.findOne({ email });
        if (existingUser) 
            return res.status(400).json({ message: "El correo ingresado ya se encuentra registrado" });

        if (password !== verifiedPassword) return res.status(400).json({ message: "Las contraseñas no coinciden" });

        const passHash = await bcrypt.hash(password, 10)
        
        const newAuth = new Auth({
            email,
            password: passHash
        })

        const authSaved = await newAuth.save()

        res.json({
            id: authSaved._id,
            email: authSaved.email,
            createdAt: authSaved.createdAt,
            updatedAt: authSaved.updatedAt
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound = await Auth.findOne({ email });
        if (!userFound) return res.status(400).json({ message: "Correo no encontrado" });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

        console.log("User ID:", userFound._id);

        let token;
        try {
            token = await createAccessToken({ id: userFound._id });
            console.log("Generated Token:", token);
        } catch (err) {
            console.error("Error generating token:", err);
            return res.status(500).json({ message: "Error al generar el token" });
        }

        res.cookie("token", token
            , {
            httpOnly: true,
            secure: true, 
            sameSite: "none", 
            maxAge: 1000 * 60 * 60 * 24, 
          }
        );
          

        res.json({
            id: userFound._id,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


export const logout = async (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    });
    return res.sendStatus(200)
}

export const profile = async (req, res) => {
    const userFound = await Auth.findById(req.user.id)

    if (!userFound) return res.status(400).json({message: "Usuario no encontrado"})

    return res.json({
        id: userFound._id,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })
}

export const checkSession = async (req, res) => {
    try {
      const { token } = req.cookies;
      
      if (!token) {
        return res.status(401).json({ message: "No autorizado" });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const userFound = await Auth.findById(decoded.id);
      if (!userFound) {
        return res.status(401).json({ message: "Usuario no encontrado" });
      }
  
      return res.status(200).json({ 
        id: userFound._id, 
        email: userFound.email 
      });
    } catch (error) {
      return res.status(401).json({ message: "Sesión inválida" });
    }
  };