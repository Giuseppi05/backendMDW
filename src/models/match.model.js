import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    user: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Usuario",
      },

      name: {
        type: String,
        required: true,
      },
    },

    restaurant: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Restaurante",
      },

      name: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Match", matchSchema);
