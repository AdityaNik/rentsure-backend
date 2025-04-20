import express from "express";
import Tenant from "../models/Tenant.js";
import RentalAgreement from "../models/RentalAgreement.js";

const router = express.Router();

// Register a new tenant
router.post("/", async (req, res) => {
  try {
    console.log("Registering tenant:", req.body);
    // Check if tenant already exists with this UID
    const existingTenant = await Tenant.findOne({ uid: req.body.uid });
    if (existingTenant) {
      return res.status(200).json(existingTenant);
    }

    const tenant = new Tenant(req.body);
    await tenant.save();  
    console.log("Tenant created:", tenant);
    res.status(201).json(tenant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all tenants
router.get("/", async (req, res) => {
  try {
    const tenants = await Tenant.find();
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get tenant by ID
router.get("/:id", async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }
    res.json(tenant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get tenant by UID
router.get("/uid/:uid", async (req, res) => {
  try {
    const tenant = await Tenant.findOne({ uid: req.params.uid });
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }
    res.json(tenant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get tenant by wallet address
router.get("/wallet/:address", async (req, res) => {
  try {
    const tenant = await Tenant.findOne({ walletAddress: req.params.address });
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }
    res.json(tenant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update tenant details
router.put("/:id", async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }
    res.json(tenant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all rental agreements for a tenant
router.get("/:id/rental-agreements", async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    const currentAgreements = await RentalAgreement.find({
      _id: { $in: tenant.currentRentalAgreements },
    });
    const pastAgreements = await RentalAgreement.find({
      _id: { $in: tenant.pastRentalAgreements },
    });

    res.json({
      currentAgreements,
      pastAgreements,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a rental agreement to tenant's current agreements
router.post("/:id/rental-agreements", async (req, res) => {
  try {
    const { agreementId } = req.body;
    const tenant = await Tenant.findById(req.params.id);

    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    if (!tenant.currentRentalAgreements.includes(agreementId)) {
      tenant.currentRentalAgreements.push(agreementId);
      await tenant.save();
    }

    res.json(tenant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Move rental agreement from current to past
router.patch("/:id/rental-agreements/:agreementId", async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);

    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    const agreementIndex = tenant.currentRentalAgreements.indexOf(
      req.params.agreementId
    );
    if (agreementIndex > -1) {
      tenant.currentRentalAgreements.splice(agreementIndex, 1);
      if (!tenant.pastRentalAgreements.includes(req.params.agreementId)) {
        tenant.pastRentalAgreements.push(req.params.agreementId);
      }
      await tenant.save();
    }

    res.json(tenant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
