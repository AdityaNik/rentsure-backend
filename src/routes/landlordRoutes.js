import express from "express";
import Landlord from "../models/Landlord.js";
import Property from "../models/Property.js";

const router = express.Router();

// Register a new landlord
router.post("/", async (req, res) => {
  try {
    // Check if landlord already exists with this UID
    const existingLandlord = await Landlord.findOne({ uid: req.body.uid });
    if (existingLandlord) {
      return res.status(200).json(existingLandlord);
    }

    const landlord = new Landlord(req.body);
    await landlord.save();
    res.status(201).json(landlord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all landlords
router.get("/", async (req, res) => {
  try {
    const landlords = await Landlord.find();
    res.json(landlords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get landlord by ID
router.get("/:id", async (req, res) => {
  try {
    const landlord = await Landlord.findById(req.params.id);
    if (!landlord) {
      return res.status(404).json({ message: "Landlord not found" });
    }
    res.json(landlord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get landlord by UID
router.get("/uid/:uid", async (req, res) => {
  try {
    const landlord = await Landlord.findOne({ uid: req.params.uid });
    if (!landlord) {
      return res.status(404).json({ message: "Landlord not found" });
    }
    res.json(landlord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get landlord by wallet address
router.get("/wallet/:address", async (req, res) => {
  try {
    const landlord = await Landlord.findOne({
      walletAddress: req.params.address,
    });
    if (!landlord) {
      return res.status(404).json({ message: "Landlord not found" });
    }
    res.json(landlord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update landlord details
router.put("/:id", async (req, res) => {
  try {
    const landlord = await Landlord.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!landlord) {
      return res.status(404).json({ message: "Landlord not found" });
    }
    res.json(landlord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all properties owned by a landlord
router.get("/:id/properties", async (req, res) => {
  try {
    const landlord = await Landlord.findById(req.params.id);
    if (!landlord) {
      return res.status(404).json({ message: "Landlord not found" });
    }

    const properties = await Property.find({ landlordId: req.params.id });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a property to landlord's portfolio
router.post("/:id/properties", async (req, res) => {
  try {
    const { propertyId } = req.body;
    const landlord = await Landlord.findById(req.params.id);

    if (!landlord) {
      return res.status(404).json({ message: "Landlord not found" });
    }

    if (!landlord.properties.includes(propertyId)) {
      landlord.properties.push(propertyId);
      await landlord.save();
    }

    res.json(landlord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove a property from landlord's portfolio
router.delete("/:id/properties/:propertyId", async (req, res) => {
  try {
    const landlord = await Landlord.findById(req.params.id);

    if (!landlord) {
      return res.status(404).json({ message: "Landlord not found" });
    }

    landlord.properties = landlord.properties.filter(
      (id) => id !== req.params.propertyId
    );
    await landlord.save();

    res.json(landlord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
