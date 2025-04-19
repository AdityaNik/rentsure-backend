import express from "express";
import Payment from "../models/Payment.js";
import RentalAgreement from "../models/RentalAgreement.js";

const router = express.Router();

// Record a payment
router.post("/", async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();

    // Update last payment date in rental agreement
    await RentalAgreement.findByIdAndUpdate(payment.rentalAgreementId, {
      lastPaymentDate: payment.timestamp,
    });

    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all payments for a rental agreement
router.get("/rental-agreement/:id", async (req, res) => {
  try {
    const payments = await Payment.find({
      rentalAgreementId: req.params.id,
    }).sort({ timestamp: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get payment by ID
router.get("/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get payment status for a specific month
router.get("/rental-agreement/:id/month/:month", async (req, res) => {
  try {
    const payment = await Payment.findOne({
      rentalAgreementId: req.params.id,
      month: parseInt(req.params.month),
    });

    res.json({
      paid: !!payment,
      payment: payment || null,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
