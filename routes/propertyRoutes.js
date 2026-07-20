import express from "express";
import protect from "../middleware/protect.js";
import adminOnly from "../middleware/adminOnly.js";
import upload from "../middleware/upload.js";
import {
  getDashboardStats,
} from "../controllers/propertyController.js";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController.js";

const router = express.Router();

router.post("/", createProperty);
router.get("/", getAllProperties);
router.get("/dashboard/stats", getDashboardStats);
router.post("/",protect,upload.array("images", 10),createProperty);
router.put("/:id",protect,adminOnly("superadmin", "admin"),updateProperty);
router.delete("/:id",protect,adminOnly("superadmin"),deleteProperty);


export default router;