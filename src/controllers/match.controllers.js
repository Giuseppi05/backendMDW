import Match from "../models/match.model.js"
import Restaurant from "../models/restaurants.model.js"
import User from "../models/user.model.js"

export const createMatch= async (req, res) => {
    const { user, restaurant } = req.body;

    const findUser = await User.findById(user.id)
    if (!findUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const findRestaurant = await Restaurant.findById(restaurant.id)
    if (!findRestaurant) {
        return res.status(404).json({ message: "Restaurante no encontrado" });
    }

    const newMatch = new Match({
      user:{
        id: user.id,
        name: findUser.name + " " +  findUser.lastname,
      },
      restaurant: {
        id: restaurant.id, 
        name: findRestaurant.name,
      }
    });

    const savedMatch = await newMatch.save()
    res.json(savedMatch)
}

export const readMatchs = async (req, res) => {
    const matchs = await Match.find();
    res.json(matchs)
}

export const readMatch = async (req, res) => {
    const match = await Match.findById(req.params.id)
    if (!match) return res.status(404).json({message: "Match no encontrado"})
        res.json(match)
}

export const updateMatch = async (req, res) => {
    const { user, restaurant } = req.body;

    const findUser = await User.findById(user.id)
    if (!findUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const findRestaurant = await Restaurant.findById(restaurant.id)
    if (!findRestaurant) {
        return res.status(404).json({ message: "Restaurante no encontrado" });
    }

    const updateMatch={
      user:{
        id: user.id,
        name: findUser.name + " " + findUser.lastname,
      },
      restaurant: {
        id: restaurant.id, 
        name: findRestaurant.name,
      }
    }

    const match = await Match.findByIdAndUpdate(req.params.id, updateMatch, {
        new: true, 
    });

    if (!match) {
        return res.status(404).json({ message: "Match no encontrado" });
    }

    res.json(match);
};

export const deleteMatch = async (req, res) => {
    const match = await Match.findByIdAndDelete(req.params.id)
    if (!match) return res.status(404).json({message: "Match no encontrado"})
        return res.sendStatus(204)
}