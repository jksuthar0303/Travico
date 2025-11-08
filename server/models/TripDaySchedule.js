import mongoose from "mongoose";

const tripDayScheduleSchema = new mongoose.Schema(
    {
      trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
      dayNumber: { type: Number, required: true },
      date: { type: Date, required: true },
      driver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      transportation: { type: mongoose.Schema.Types.ObjectId, ref: "Transportation" },
      pickupLocation: { type: String, required: true },
      dropLocation: { type: String, required: true },
      plannedPlaces: [
        {
          place: { type: mongoose.Schema.Types.ObjectId, ref: "Place" },
          status: {
            type: String,
            enum: ["pending", "visited", "skipped"],
            default: "pending",
          },
        },
      ],
      liveTracking: {
        lat: Number,
        lng: Number,
        speed: Number,
        accuracy: Number,
        lastUpdated: Date,
      },
      pickupVerification: {
        otp: String,
        verified: { type: Boolean, default: false },
        verifiedAt: Date,
      },
      dropVerification: {
        otp: String,
        verified: { type: Boolean, default: false },
        verifiedAt: Date,
      },
      activityLogs: [
        {
          message: String,
          time: { type: Date, default: Date.now },
          addedBy: { type: String, enum: ["driver", "guide", "system", "admin"] },
        },
      ],
      status: {
        type: String,
        enum: ["not_started", "in_progress", "completed"],
        default: "not_started",
      },
    },
    { timestamps: true }
  );
  
  tripDayScheduleSchema.index({ trip: 1, date: 1 });
  
  export default mongoose.model("TripDaySchedule", tripDayScheduleSchema);
  