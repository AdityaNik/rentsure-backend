import mongoose from "mongoose";

const landlordSchema = new mongoose.Schema(
  {
    uid: String, // Firebase UID
    walletAddress: String,
    name: String,
    email: String,
    phone: String,
    photoURL: String,
    emailVerified: Boolean,
    authProvider: {
      type: String,
      default: "google",
    },
    googleProfile: {
      providerId: {
        type: String,
        default: "google.com",
      },
    },
    properties: [String], // Array of property IDs
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Landlord", landlordSchema);
