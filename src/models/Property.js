import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    // Core property information
    propertyHash: String,
    landlordId: String,
    landlord: String,
    
    // Property details
    propertyType: String,
    bhkType: String,
    furnishingStatus: String,
    address: {
      fullAddress: String,
      locality: String,
      landmark: String,
      city: String,
      pincode: String
    },
    
    // Rent details
    monthlyRent: Number,
    rentAmountInFiat: Number,     // Renamed for consistency with form
    rentAmountInCrypto: Number,   // Changed to Number
    preferredPaymentMode: {       // New field as requested
      type: String,
      enum: ["fiat", "crypto", "both"],
      default: "fiat"
    },
    securityDeposit: Number,
    maintenanceCharges: String,   // 'included', 'separate', 'none'
    maintenanceAmount: Number,
    rentDueDay: {
      type: Number,
      default: 1
    },
    
    // Lease and availability
    leaseDuration: String,        // Changed to String to match form ('6months', '11months', etc.)
    availability: String,
    
    // Tenant preferences
    preferredTenants: String,
    petsAllowed: String,
    additionalTerms: String,
    
    // Property status
    active: {
      type: Boolean,
      default: true
    },
    
    // Media
    propertyImages: [String]
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);