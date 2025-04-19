import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
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
    currentRentalAgreements: { type: [String], required: false }, // Array of active rental agreement IDs
    pastRentalAgreements: { type: [String], required: false }, // Array of past rental agreement IDs
    active: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tenant", tenantSchema);
