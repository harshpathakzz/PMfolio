import express from "express";
import {
  createCaseStudy,
  getCaseStudiesByUserId,
  getCaseStudyById,
  updateCaseStudy,
  deleteCaseStudy,
} from "../controllers/caseStudyController.js";
import validateToken from "../middleware/validateToken.js";
import { upload } from "../config/multerConfig.js";
const router = express.Router();

// Create a new case study
router.post("/create", validateToken, upload.single("image"), createCaseStudy);

// Get all case studies
router.get("/user/:userId", getCaseStudiesByUserId);

// Get a specific case study by ID
router.get("/:caseStudyId", getCaseStudyById);

// Update a case study by ID
router.put("/:id", validateToken, updateCaseStudy);

// Delete a case study by ID
router.delete("/:id", validateToken, deleteCaseStudy);

export default router;
