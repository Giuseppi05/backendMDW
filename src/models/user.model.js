import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    lastname: {
        type: String,
        required: true
    }, 
    age: {
        type: Number,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        trim: true
    },
    district: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }, 
}, {
    timestamps: true,
    versionKey: false
})

export default mongoose.model('User', userSchema)