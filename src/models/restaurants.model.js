import mongoose from "mongoose"

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    type: {
        type: String,
        required: true
    }, 
    district: {
        type: String,
        required: true
    }, 
    address: {
        type: String,
        required: true
    }, 
    qualification: {
        type: Number,
        required: true
    }, 
    averagePrice: {
        type: Number,
        required: true
    }, 
    mainCourse: {
        type: String,
        required: true
    },  
    description: {
        type: String,
        required: true
    }, 
}, {
    timestamps: true,
    versionKey: false
})

export default mongoose.model('Restaurant', restaurantSchema)