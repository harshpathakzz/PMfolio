import express from "express";
import {
  followUser,
  getUserBlogs,
  getUserCaseStudies,
  getUserFollowers,
  getUserFollowing,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import validateToken from "../middleware/validateToken.js";
const router = express.Router();

router.get("/", (req, res) => {
  console.log("Reached / endpoint");
  res.json({ message: "users" });
});

router.get("/:id/profile", getUserProfile);

router.put("/update", validateToken, updateUserProfile);

router.get("/:id/blogs", getUserBlogs);

router.get("/:id/case-studies", getUserCaseStudies);

router.get("/:id/followers", getUserFollowers);

router.get("/:id/following", getUserFollowing);

router.post("/:id/follow", validateToken, followUser);

router.delete("/:id/unfollow", (req, res) => {
  res.send("unfollowed profile " + req.params.id);
});

export default router;
