import User from "../models/userModel.js";
import { storage } from "../config/firebaseConfig.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { username, bio } = req.body;

    // Check if profile picture is provided for update
    let profilePicture;
    if (req.file) {
      const imageBuffer = req.file.buffer;
      const filename = Date.now() + "_" + req.file.originalname;
      const contentType = req.file.mimetype;

      // Upload the new image to Firebase storage
      const storageRef = ref(storage, `profilePictures/${filename}`);
      await uploadBytes(storageRef, imageBuffer, { contentType });

      // Get the download URL of the uploaded image
      profilePicture = await getDownloadURL(storageRef);
    }

    // Find the user by ID
    const existingUser = await User.findById(req.user.id);

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete the old profile picture if it exists
    if (
      existingUser.profilePicture &&
      existingUser.profilePicture !== "https://ui.shadcn.com/avatars/02.png"
    ) {
      const oldImageRef = ref(storage, existingUser.profilePicture);
      await deleteObject(oldImageRef);
    }

    // Update the user in the database
    const updatedFields = { username, bio };
    if (profilePicture) {
      updatedFields.profilePicture = profilePicture;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updatedFields,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserBlogs = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.json(user.blogs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserCaseStudies = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.json(user.caseStudies);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.json(user.followers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.json(user.following);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const followUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const userToFollowId = req.params.id;

    if (userId === userToFollowId) {
      return res.status(400).json({ message: "Cannot follow yourself" });
    }

    const userToFollow = await User.findById(userToFollowId);
    const currentUser = await User.findById(userId);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userToFollow.followers.includes(userId)) {
      return res.status(400).json({ message: "User already followed" });
    }

    // Update userToFollow's followers and currentUser's following
    userToFollow.followers.push(userId);
    currentUser.following.push(userToFollowId);

    // Increase followingCount of currentUser by one
    currentUser.followingCount += 1;

    // Increase followerCount of userToFollow by one
    userToFollow.followerCount += 1;

    // Save changes to the database
    await Promise.all([userToFollow.save(), currentUser.save()]);

    return res.json({ message: "User followed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const userToUnfollowId = req.params.id;

    const userToUnfollow = await User.findById(userToUnfollowId);
    const currentUser = await User.findById(userId);

    if (!userToUnfollow || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!userToUnfollow.followers.includes(userId)) {
      return res.status(400).json({ message: "User not followed" });
    }

    // Remove userId from userToUnfollow's followers and userToUnfollowId from currentUser's following
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id !== userId
    );
    currentUser.following = currentUser.following.filter(
      (id) => id !== userToUnfollowId
    );

    // Decrease followingCount of currentUser by one
    currentUser.followingCount -= 1;

    // Decrease followerCount of userToUnfollow by one
    userToUnfollow.followerCount -= 1;

    // Save changes to the database
    await Promise.all([userToUnfollow.save(), currentUser.save()]);

    return res.json({ message: "User unfollowed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
