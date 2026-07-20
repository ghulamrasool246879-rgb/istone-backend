import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      enum: ["Islamabad", "Rawalpindi"],
    },

    location: {
      type: String,
      required: true,
    },

    propertyType: {
      type: String,
      required: true,
      enum: [
        "Residential",
        "Commercial",
        "Plot",
        "House",
        "Apartment",
      ],
    },

    description: {
      type: String,
      required: true,
    },

    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model("Property", propertySchema);

export default Property;