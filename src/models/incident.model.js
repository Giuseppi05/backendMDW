import mongoose from "mongoose"

const incidentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    }, 
    date: {
        type: Date,
        required: true
    }, 
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

export default mongoose.model('Incident', incidentSchema)