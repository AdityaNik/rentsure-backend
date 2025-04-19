import mongoose from "mongoose";

const rentalAgreementSchema = new mongoose.Schema(
  {
    propertyId: String, // Store property ID as string instead of reference
    landlordId: String, // Reference to landlord
    tenantAddress: String,
    agreementStartDate: Date,
    agreementEndDate: Date,
    agreementDocHash: String,
    status: {
      type: String,
      enum: ["Pending", "Active", "Terminated", "Disputed"],
      default: "Pending",
    },
    moveInInspection: {
      type: String,
      enum: ["NotPerformed", "Passed", "Failed"],
      default: "NotPerformed",
    },
    moveOutInspection: {
      type: String,
      enum: ["NotPerformed", "Passed", "Failed"],
      default: "NotPerformed",
    },
    evidenceHashes: [String],
    securityDepositPaid: {
      type: Boolean,
      default: false,
    },
    securityDepositReturned: {
      type: Boolean,
      default: false,
    },
    securityDepositMethod: {
      type: String,
      enum: ["Cryptocurrency", "Fiat"],
    },
    lastPaymentDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model("RentalAgreement", rentalAgreementSchema);
