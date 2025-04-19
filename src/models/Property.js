import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    propertyHash: String,
    landlordId: String,
    landlord: String,
    rentAmountInCrypto: Number,
    rentAmountInFiat: Number,
    securityDeposit: Number,
    rentDueDay: Number,
    leaseDuration: Number,
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);
