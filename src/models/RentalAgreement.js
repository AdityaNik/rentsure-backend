import mongoose from "mongoose";

const rentalAgreementSchema = new mongoose.Schema(
  {
    propertyId: { type: String, required: false }, // Store property ID as string instead of reference
    landlordId: { type: String, required: false }, // Reference to landlord
    tenantId: { type: String, required: false }, // Reference to tenant
    tenantAddress: { type: String, required: false },
    agreementStartDate: { type: Date, required: false },
    agreementEndDate: { type: Date, required: false },
    agreementDocHash: { type: String, required: false },
    status: {
      type: String,
      enum: ["Pending", "Active", "Terminated", "Disputed"],
      default: "Pending",
      required: false,
    },
    moveInInspection: {
      type: String,
      enum: ["NotPerformed", "Passed", "Failed"],
      default: "NotPerformed",
      required: false,
    },
    moveOutInspection: {
      type: String,
      enum: ["NotPerformed", "Passed", "Failed"],
      default: "NotPerformed",
      required: false,
    },
    evidenceHashes: { type: [String], required: false },
    securityDepositPaid: {
      type: Boolean,
      default: false,
      required: false,
    },
    securityDepositReturned: {
      type: Boolean,
      default: false,
      required: false,
    },
    securityDepositMethod: {
      type: String,
      enum: ["Cryptocurrency", "Fiat"],
      required: false,
    },
    lastPaymentDate: { type: Date, required: false },
  },
  { timestamps: true }
);

export default mongoose.model("RentalAgreement", rentalAgreementSchema);
