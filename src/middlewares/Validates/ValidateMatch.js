import { matchSchema } from "../../schemas/match.schema.js";

export const validateMatch = (req, res, next) => {
    matchSchema.validate(req.body, {abortEarly: false})
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