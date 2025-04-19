import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    propertyHash: String,
    landlordId: String,
    propertysummary: String,
    landlord: String,
    rentAmountInCrypto: Number,
    rentAmountInFiat: Number,
    securityDeposit: Number,
    Description: String,

    location: String,
    status: {
      type: String,
      enum: ["rented", "for-sale", "sold"],
      default: "rented",
    },
    Amenities: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
  
    rentDueDay: Number,
    leaseDuration: Number,
    active: {
      type: Boolean,
      default: false,
    },
    interestedUsers: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);
