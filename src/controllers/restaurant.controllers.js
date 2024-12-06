import Restaurant from "../models/restaurants.model.js"

export const createRestaurant = async (req, res) => {

    const { name, type, district, address, qualification, averagePrice, mainCourse, description } = req.body

    const newRestaurant = new Restaurant({
        name, 
        type,
        district,
        address,
        qualification,
        averagePrice,
        mainCourse,
        description
    })

    const savedRestaurant = await newRestaurant.save()
    res.json(savedRestaurant)
}

export const readRestaurants = async (req, res) => {
    const restaurant = await Restaurant.find();
    res.json(restaurant)
}

export const readRestaurant = async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id)
    if (!restaurant) return res.status(404).json({message: "Restaurante no encontrado"})
        res.json(restaurant)
}

export const updateRestaurant = async (req, res) => {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    if (!restaurant) return res.status(404).json({message: "Restaurante no encontrado"})
        res.json(restaurant)
}

export const deleteRestaurant = async (req, res) => {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id)
    if (!restaurant) return res.status(404).json({message: "Restaurante no encontrado"})
        return res.sendStatus(204)
}