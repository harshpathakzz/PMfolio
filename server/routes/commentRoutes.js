import express from "express";
import {
  createComment,
  updateComment,
  deleteComment,
  getCommentsWithProfilePictures,
} from "../controllers/commentController.js";
import validateToken from "../middleware/validateToken.js";

const router = express.Router();

// Create a new comment
router.post("/create", validateToken, createComment);

// Get comments with profile pictures for a given caseStudyId
router.get("/:caseStudyId", getCommentsWithProfilePictures);

// Update a comment by ID
router.put("/:commentId", validateToken, updateComment);

// Delete a comment by ID
router.delete("/:commentId", validateToken, deleteComment);

export default router;
