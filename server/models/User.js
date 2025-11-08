import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, unique: true, sparse: true },
    password: { type: String, required: true, minlength: 6 },
    dob: { type: Date, required: false },
    role: {
      type: String,
      enum: ["user", "admin", "driver", "guide", "hotel_owner"],
      default: "user",
    },
    address:{
      type: String,
      required: false
    },
    isVerified: { type: Boolean, default: true },

    profilePic: { type: String, default: "" },
    fcmToken: String,

    trips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trip" }],
    transportation: { type: mongoose.Schema.Types.ObjectId, ref: "Transportation" },
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

userSchema.index({ role: 1, isVerified: 1 });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model("User", userSchema);
