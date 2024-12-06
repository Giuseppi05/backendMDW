import { incidentSchema } from "../../schemas/incident.schema.js";

export const validateIncident= (req, res, next) => {
    incidentSchema.validate(req.body, {abortEarly: false})
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