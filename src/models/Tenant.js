import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
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
    currentRentalAgreements: [String], // Array of active rental agreement IDs
    pastRentalAgreements: [String], // Array of past rental agreement IDs
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tenant", tenantSchema);
