import express from "express";
import { getUserProfile } from "../controllers/userController.js";
import validateToken from "../utils/validateToken.js";
const router = express.Router();

router.get("/", (req, res) => {
  console.log("Reached / endpoint");
  res.json({ message: "users" });
});

router.get("/:id/profile", getUserProfile);

router.put("/:id/update", (req, res) => {
  res.send("profile " + req.params.id + " updated");
});

router.get("/:id/blogs", (req, res) => {
  res.send("blogs of profile " + req.params.id);
});

router.get("/:id/case-studies", (req, res) => {
  res.send("case studies of profile " + req.params.id);
});

router.get("/:id/followers", (req, res) => {
  res.send("followers of profile " + req.params.id);
});

router.get("/:id/following", (req, res) => {
  res.send("following of profile " + req.params.id);
});

router.post("/:id/follow", (req, res) => {
  res.send("followed profile " + req.params.id);
});

router.delete("/:id/unfollow", (req, res) => {
  res.send("unfollowed profile " + req.params.id);
});

export default router;
