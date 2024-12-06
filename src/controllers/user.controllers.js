import User from "../models/user.model.js"

export const createUser = async (req, res) => {

    const { name, lastname, age, email, district, address } = req.body

    const newUser = new User({
        name, 
        lastname, 
        age, 
        email, 
        district, 
        address
    })

    const savedUser = await newUser.save()
    res.json(savedUser)
}

export const readUsers = async (req, res) => {
    const user = await User.find();
    res.json(user)
}

export const readUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({message: "Usuario no encontrado"})
        res.json(user)
}

export const updateUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    if (!user) return res.status(404).json({message: "Usuario no encontrado"})
        res.json(user)
}

export const deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({message: "Usuario no encontrado"})
        return res.sendStatus(204)
}