import mongoose from "mongoose";

const rentalAgreementSchema = new mongoose.Schema(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    tenantAddress: {
      type: String,
      required: true,
    },
    agreementStartDate: {
      type: Date,
      required: true,
    },
    agreementEndDate: {
      type: Date,
      required: true,
    },
    agreementDocHash: {
      type: String,
      required: true,
    },
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
    evidenceHashes: [
      {
        type: String,
      },
    ],
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
    lastPaymentDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("RentalAgreement", rentalAgreementSchema);
