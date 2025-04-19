import express from "express";
import RentalAgreement from "../models/RentalAgreement.js";

const router = express.Router();

// Create new rental agreement
router.post("/", async (req, res) => {
  try {
    const rentalAgreement = new RentalAgreement(req.body);
    await rentalAgreement.save();
    res.status(201).json(rentalAgreement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all rental agreements
router.get("/", async (req, res) => {
  try {
    const agreements = await RentalAgreement.find().populate("propertyId");
    res.json(agreements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get rental agreement by ID
router.get("/:id", async (req, res) => {
  try {
    const agreement = await RentalAgreement.findById(req.params.id).populate(
      "propertyId"
    );
    if (!agreement) {
      return res.status(404).json({ message: "Rental agreement not found" });
    }
    res.json(agreement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update rental agreement status
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const agreement = await RentalAgreement.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!agreement) {
      return res.status(404).json({ message: "Rental agreement not found" });
    }
    res.json(agreement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Record inspection
router.patch("/:id/inspection", async (req, res) => {
  try {
    const { isMovingIn, passed, evidenceHash } = req.body;
    const update = isMovingIn
      ? { moveInInspection: passed ? "Passed" : "Failed" }
      : { moveOutInspection: passed ? "Passed" : "Failed" };

    if (evidenceHash) {
      update.$push = { evidenceHashes: evidenceHash };
    }

    const agreement = await RentalAgreement.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );

    if (!agreement) {
      return res.status(404).json({ message: "Rental agreement not found" });
    }
    res.json(agreement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update security deposit status
router.patch("/:id/security-deposit", async (req, res) => {
  try {
    const { paid, returned, method } = req.body;
    const update = {};

    if (paid !== undefined) update.securityDepositPaid = paid;
    if (returned !== undefined) update.securityDepositReturned = returned;
    if (method) update.securityDepositMethod = method;

    const agreement = await RentalAgreement.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );

    if (!agreement) {
      return res.status(404).json({ message: "Rental agreement not found" });
    }
    res.json(agreement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
