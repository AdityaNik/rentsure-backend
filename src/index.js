import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Import routes
import propertyRoutes from "./routes/propertyRoutes.js";
import rentalAgreementRoutes from "./routes/rentalAgreementRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import landlordRoutes from "./routes/landlordRoutes.js";
import tenantRoutes from "./routes/tenantRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/rentsure")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/properties", propertyRoutes);
app.use("/api/rental-agreements", rentalAgreementRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/landlords", landlordRoutes);
app.use("/api/tenants", tenantRoutes);

app.get("/", (req, res) => {
  res.send("Hello....!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
