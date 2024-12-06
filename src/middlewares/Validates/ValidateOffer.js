import { offerSchema } from "../../schemas/offer.schema.js";

export const validateOffer = (req, res, next) => {
    offerSchema.validate(req.body, {abortEarly: false})
    .then(()=> { 
        next();
    })
    .catch((err) => {
        res.status(400).json({errors: err.inner.map(e => ({
            path: e.path,
            message: e.message
        }))})
    })
}