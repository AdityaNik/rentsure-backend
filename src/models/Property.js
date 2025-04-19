import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    propertyHash: {
      type: String,
      required: true,
    },
    landlord: {
      type: String,
      required: true,
    },
    rentAmountInCrypto: {
      type: Number,
      required: true,
    },
    rentAmountInFiat: {
      type: Number,
      required: true,
    },
    securityDeposit: {
      type: Number,
      required: true,
    },
    rentDueDay: {
      type: Number,
      required: true,
      min: 1,
      max: 31,
    },
    leaseDuration: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);
