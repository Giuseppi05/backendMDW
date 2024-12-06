import Incident from "../models/incident.model.js"

export const createIncident = async (req, res) => {
    const { title, date, description } = req.body

    const newIncident = new Incident({
        title, 
        date,
        description
    })

    const savedIncident = await newIncident.save()
    res.json(savedIncident)
}

export const readIncidents = async (req, res) => {
    const incident = await Incident.find();
    res.json(incident)
}

export const readIncident = async (req, res) => {
    const incident = await Incident.findById(req.params.id)
    if (!incident) return res.status(404).json({message: "Incidente no encontrado"})
        res.json(incident)
}

export const updateIncident = async (req, res) => {
    const incident = await Incident.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    if (!incident) return res.status(404).json({message: "Incidente no encontrado"})
        res.json(incident)
}

export const deleteIncident = async (req, res) => {
    const incident = await Incident.findByIdAndDelete(req.params.id)
    if (!incident) return res.status(404).json({message: "Incidente no encontrado"})
        return res.sendStatus(204)
}