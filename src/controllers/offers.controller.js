import Offer from "../models/offer.model.js"
import Restaurant from "../models/restaurants.model.js"

export const createOffer = async (req, res) => {

    const { title, description, discount, restaurant, startDate, endDate } = req.body;

    const newOffer = new Offer({
      title,
      description,
      discount,
      restaurant: {
        id: restaurant.id, 
        name: "",
      },
      startDate,
      endDate,
    });

    const findRestaurant = await Restaurant.findById(newOffer.restaurant.id)
    newOffer.restaurant.name = findRestaurant.name

    const savedOffer = await newOffer.save()
    res.json(savedOffer)
}

export const readOffers = async (req, res) => {
    const offers = await Offer.find();
    res.json(offers)
}

export const readOffer = async (req, res) => {
    const offer = await Offer.findById(req.params.id)
    if (!offer) return res.status(404).json({message: "Oferta no encontrado"})
        res.json(offer)
}

export const updateOffer = async (req, res) => {
    const { title, description, discount, restaurant, startDate, endDate } = req.body;

    const findRestaurant = await Restaurant.findById(restaurant.id);
    if (!findRestaurant) {
        return res.status(404).json({ message: "Restaurante no encontrado" });
    }

    const updatedOffer = {
        title,
        description,
        discount,
        restaurant: {
            id: restaurant.id,
            name: findRestaurant.name, 
        },
        startDate,
        endDate,
    };

    const offer = await Offer.findByIdAndUpdate(req.params.id, updatedOffer, {
        new: true, 
    });

    if (!offer) {
        return res.status(404).json({ message: "Oferta no encontrada" });
    }

    res.json(offer);
};


export const deleteOffer = async (req, res) => {
    const offer = await Offer.findByIdAndDelete(req.params.id)
    if (!offer) return res.status(404).json({message: "Oferta no encontrado"})
        return res.sendStatus(204)
}