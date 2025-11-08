import mongoose from "mongoose";

const transportationSchema = new mongoose.Schema(
  {
    vehicleType: {
      type: String,
      enum: ["car", "bus", "van", "train", "flight", "other"],
      required: true,
    },
    companyName: { type: String },
    model: { type: String },
    vehicleNumber: { type: String, unique: true, required: true },
    capacity: { type: Number, default: 4 },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    driverInfo: {
      licenseNumber: { type: String, required: true },
      panCardNumber: { type: String },
      aadhaarNumber: { type: String },
      documents: [
        {
          type: {
            type: String,
            enum: [
              "license",
              "pan_card",
              "aadhaar",
              "photo_id",
              "vehicle_rc",
              "insurance",
              "other",
            ],
          },
          url: String,
          verified: { type: Boolean, default: false },
        },
      ],
      verified: { type: Boolean, default: false }, 
    },

    currentLocation: {
      lat: Number,
      lng: Number,
      lastUpdated: Date,
    },

    trips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trip" }],

    status: {
      type: String,
      enum: ["available", "booked", "in-trip", "maintenance", "unavailable"],
      default: "available",
    },

    pricePerKm: { type: Number },
    pricePerDay: { type: Number },

    remarks: { type: String },
  },
  { timestamps: true }
);

transportationSchema.index({ status: 1, vehicleType: 1 });
transportationSchema.index({ "driverInfo.verified": 1 });

export default mongoose.model("Transportation", transportationSchema);
