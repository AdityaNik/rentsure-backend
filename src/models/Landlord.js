import mongoose from "mongoose";

const landlordSchema = new mongoose.Schema(
  {
    uid: { type: String, required: false }, // Firebase UID
    walletAddress: { type: String, required: false },
    name: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    photoURL: { type: String, required: false },
    emailVerified: { type: Boolean, required: false },
    authProvider: {
      type: String,
      default: "google",
      required: false,
    },
    googleProfile: {
      providerId: {
        type: String,
        default: "google.com",
        required: false,
      },
    },
    properties: { type: [String], required: false }, // Array of property IDs
    active: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Landlord", landlordSchema);
