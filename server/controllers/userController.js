import User from "../models/userModel.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserBlogs = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user.blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserCaseStudies = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user.caseStudies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user.followers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user.following);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

    // Save changes to the database
    await Promise.all([userToFollow.save(), currentUser.save()]);

    res.json({ message: "User followed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
