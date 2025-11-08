import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    openTime: { type: String },
    closeTime: { type: String },
    contact: { type: String },

    totalRooms: { type: Number, default: 0 },
    rating: { type: Number, min: 0, max: 5 },
    image: { type: String },

    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    trips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trip" }],

    identityDocs: {
      panCardNumber: String,
      aadhaarNumber: String,
      gstNumber: String, 
      documents: [
        {
          type: {
            type: String,
            enum: [
              "pan_card",
              "aadhaar",
              "property_proof",
              "gst_certificate",
              "trade_license",
              "fire_safety",
              "sanitation",
              "other",
            ],
          },
          url: String,
          verified: { type: Boolean, default: false },
        },
      ],
      verified: { type: Boolean, default: false },
    },

    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },

    remarks: { type: String },
  },
  { timestamps: true }
);

hotelSchema.index({ status: 1, rating: 1 });

export default mongoose.model("Hotel", hotelSchema);
