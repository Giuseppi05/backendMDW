import Auth from "../models/auth.models.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";

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

        const token = await createAccessToken({ id: userFound._id });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none', 
        });
        res.json({
            id: userFound._id,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const logout = async (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })
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