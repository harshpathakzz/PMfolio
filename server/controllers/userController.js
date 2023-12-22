import User from "../models/userModel.js";

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
    console.log(req.user.id);
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
