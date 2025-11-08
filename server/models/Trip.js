import mongoose from "mongoose";

const travelerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  photo: { type: String },
  type: { type: String, enum: ["adult", "child", "senior"], default: "adult" },
});

const tripPlaceSchema = new mongoose.Schema({
  place: { type: mongoose.Schema.Types.ObjectId, ref: "Place", required: true },
  visitDate: Date,
  status: {
    type: String,
    enum: ["pending", "in-progress", "visited", "skipped"],
    default: "pending",
  },
  visitedAt: Date,
});

const tripSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tripName: {type: String},
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    arrivalDetails: {
      fromCity: { type: String, required: true },
      toCity: { type: String, required: true },
      arrivalDate: { type: Date, required: true },
      arrivalTime: { type: String },
      arrivalStation: { type: String }, 
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "in-progress", "completed", "cancelled"],
      default: "pending",
    },

    travelerCount: { type: Number, default: 0 },
    travelers: [travelerSchema],

    selectedPlaces: [tripPlaceSchema],

    currentGuide: { type: mongoose.Schema.Types.ObjectId, ref: "Guide" },
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
    currentTransportation: { type: mongoose.Schema.Types.ObjectId, ref: "Transportation" },

    replacementHistory: [
      {
        type: { type: String, required: true },
        oldId: { type: mongoose.Schema.Types.ObjectId, refPath: "replacementHistory.type" },
        newId: { type: mongoose.Schema.Types.ObjectId, refPath: "replacementHistory.type" },
        reason: String,
        replacedAt: { type: Date, default: Date.now },
        replacedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],

    guideVerification: {
      otp: String,
      verified: { type: Boolean, default: false },
      verifiedAt: Date,
    },
    
    lastKnownLocation: {
      lat: Number,
      lng: Number,
      updatedAt: Date,
      sourceDay: { type: mongoose.Schema.Types.ObjectId, ref: "TripDaySchedule" },
    },

    totalCost: { type: Number, default: 0 },
    paymentStatus: {
      type: String,
      enum: ["pending", "partial", "paid"],
      default: "pending",
    },

    activityLogs: [
      {
        message: String,
        time: { type: Date, default: Date.now },
        addedBy: { type: String, enum: ["system", "driver", "guide", "admin", "user"] },
      },
    ],
  },
  { timestamps: true }
);

tripSchema.index({ user: 1, status: 1 });
tripSchema.index({ startDate: 1, endDate: 1 });
tripSchema.index({ "arrivalDetails.arrivalDate": 1 });

export default mongoose.model("Trip", tripSchema);
