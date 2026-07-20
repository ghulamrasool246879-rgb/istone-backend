import Property from "../models/Property.js";

export const createProperty = async (req, res) => {
  try {
    // Collect uploaded image information
    const images = req.files.map((file) => ({
      public_id: file.filename,
      url: file.path,
    }));

    // Create property
    const property = await Property.create({
      title: req.body.title,
      city: req.body.city,
      location: req.body.location,
      propertyType: req.body.propertyType,
      description: req.body.description,
      featured: req.body.featured,
      images,
    });

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Dashboard Stats
export const getDashboardStats = async (req, res) => {
  try {
    const totalProperties = await Property.countDocuments();

    const featuredProperties = await Property.countDocuments({
      featured: true,
    });

    const residentialProperties = await Property.countDocuments({
      propertyType: "Residential",
    });

    const commercialProperties = await Property.countDocuments({
      propertyType: "Commercial",
    });

    res.json({
      totalProperties,
      featuredProperties,
      residentialProperties,
      commercialProperties,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Properties
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Property
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Property
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Property
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    await Property.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};