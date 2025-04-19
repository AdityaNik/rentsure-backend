import express from "express";
import Property from "../models/Property.js";

const router = express.Router();

// List a new property

router.post("/", async (req, res) => {
  try {
    // Get property data directly from request body
    const propertyData = req.body;
    console.log("Property Data:", propertyData.propertyData);
    
    // Initialize empty property images array
    propertyData.propertyImages = [];
    
    // Create new property
    const property = new Property(propertyData.propertyData);
    await property.save();
    
    res.status(201).json({
      success: true,
      message: "Property created successfully",
      property,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating property",
      error: error.message,
    });
  }
});

// Get property by ID
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update property
router.put("/:id", async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete property
router.delete("/:id", async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
