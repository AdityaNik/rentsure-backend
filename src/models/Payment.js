import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    rentalAgreementId: String, // Store agreement ID as string instead of reference
    amount: Number,
    timestamp: {
      type: Date,
      default: Date.now,
    },
    method: {
      type: String,
      enum: ["Cryptocurrency", "Fiat"],
    },
    externalPaymentId: String,
    month: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
