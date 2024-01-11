import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    bio: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },
    // password: {
    //   type: String,
    //   required: true,
    // },

    firebaseUid: {
      type: String,
      required: true,
    },

    profilePicture: {
      type: String,
    },
    caseStudies: [
      {
        type: Schema.Types.ObjectId,
        ref: "CaseStudy",
      },
    ],
    blogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "BlogPost",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followerCount: {
      type: Number,
      default: 0,
    },
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followingCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
