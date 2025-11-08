import mongoose from "mongoose";

const guideSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, 
    },
    
    trips: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Trip",
        },
      ],
  
    languages: [String],
    experienceYears: Number,
    specialization: String, 
    rating: { type: Number, default: 0 },
    totalTrips: { type: Number, default: 0 },
    verified: { type: Boolean, default: false },

    identityDocs: {
      panCardNumber: String,
      aadhaarNumber: String,
      documents: [
        {
          type: { type: String, enum: ["pan_card", "aadhaar", "photo_id", "certificate", "other"] },
          url: String, 
          verified: { type: Boolean, default: false },
        },
      ],
    },

    status: {
      type: String,
      enum: ["available", "on-trip", "inactive"],
      default: "available",
    },

    liveLocation: {
      lat: Number,
      lng: Number,
      lastUpdated: Date,
    },
  },
  { timestamps: true }
);

guideSchema.index({ verified: 1, status: 1 });

export default mongoose.model("Guide", guideSchema);
