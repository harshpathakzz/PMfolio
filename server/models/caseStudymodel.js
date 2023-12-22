import mongoose from "mongoose";

const { Schema } = mongoose;

const caseStudySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CaseStudy = mongoose.model("CaseStudy", caseStudySchema);

export default CaseStudy;
