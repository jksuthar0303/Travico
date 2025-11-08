import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    body: { type: String },
    data: { type: Object, default: {} },
    type: { type: String, enum: ["info", "trip", "alert", "message"], default: "info" },
    isRead: { type: Boolean, default: false },
    fcmId: { type: String }, 
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
