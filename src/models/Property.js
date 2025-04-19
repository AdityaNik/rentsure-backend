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
    propertyHash: { type: String, required: false },
    landlordId: { type: String, required: false },
    landlord: { type: String, required: false },

    propertyType: { type: String, required: false },
    bhkType: { type: String, required: false },
    furnishingStatus: { type: String, required: false },
    address: {
      fullAddress: { type: String, required: false },
      locality: { type: String, required: false },
      landmark: { type: String, required: false },
      city: { type: String, required: false },
      pincode: { type: String, required: false }
    },

    monthlyRent: { type: Number, required: false },
    rentAmountInFiat: { type: Number, required: false },
    rentAmountInCrypto: { type: Number, required: false },
    preferredPaymentMode: {
      type: String,
      enum: ["fiat", "crypto", "both"],
      default: "fiat",
      required: false
    },
    securityDeposit: { type: Number, required: false },
    maintenanceCharges: { type: String, required: false },
    maintenanceAmount: { type: Number, required: false },
    rentDueDay: {
      type: Number,
      default: 1,
      required: false
    },

    leaseDuration: { type: String, required: false },
    availability: { type: String, required: false },

    preferredTenants: { type: String, required: false },
    petsAllowed: { type: String, required: false },
    additionalTerms: { type: String, required: false },

    active: {
      type: Boolean,
      default: true,
      required: false
    },

    propertyImages: { type: [String], required: false }
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);