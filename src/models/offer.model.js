import mongoose from "mongoose"

const offerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  discount: {
    type: Number,
    required: true,
  },

  restaurant: {
    id: {
      type: mongoose.Schema.Types.ObjectId, 
      required: true,
      ref: 'Restaurante',
    },

    name: {
      type: String,
      required: true,
    }
  },

  startDate: {
    type: Date,
    required: true,
  },

  endDate: {
    type: Date,
    required: true,
  },
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model('Offer', offerSchema)