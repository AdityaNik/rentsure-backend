import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    rentalAgreementId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RentalAgreement",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    method: {
      type: String,
      enum: ["Cryptocurrency", "Fiat"],
      required: true,
    },
    externalPaymentId: {
      type: String,
    },
    month: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
