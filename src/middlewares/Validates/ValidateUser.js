import { userSchema } from "../../schemas/user.schema.js";

export const validateUser = (req, res, next) => {
    userSchema.validate(req.body, {abortEarly: false})
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