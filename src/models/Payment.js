import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    rentalAgreementId: { type: String, required: false },
    amount: { type: Number, required: false },
    timestamp: {
      type: Date,
      default: Date.now,
      required: false,
    },
    method: {
      type: String,
      enum: ["Cryptocurrency", "Fiat"],
      required: false,
    },
    externalPaymentId: { type: String, required: false },
    month: { type: Number, required: false },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
