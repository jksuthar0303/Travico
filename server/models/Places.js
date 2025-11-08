import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, default: "Rajasthan" },
    country: { type: String, default: "India" },

    description: { type: String, required: true },
    entryFee: {
      description: {type:String},
      indian: { type: Number, default: 0 },
      foreigner: { type: Number, default: 0 },
    },
    timings: {
      open: { type: String },
      close: { type: String },
    },
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
      mapLink: { type: String },
    },
    
    mainImage: { type: String },
    photos: [{ type: String }],
    tips: { type: String },
    category: { type: String },

    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

export default mongoose.model("Place", placeSchema);
