import CaseStudy from "../models/caseStudymodel.js";
import { storage } from "../config/firebaseConfig.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const createCaseStudy = async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const imageBuffer = req.file.buffer;
    const filename = Date.now() + "_" + req.file.originalname;
    const contentType = req.file.mimetype;

    const userId = req.user.id;

    // Upload the image to Firebase storage
    const storageRef = ref(storage, `coverImages/${filename}`);
    await uploadBytes(storageRef, imageBuffer, { contentType });

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(storageRef);
    console.log("Cover image URL:", downloadURL);

    const newCaseStudy = new CaseStudy({
      userId,
      title,
      description,
      link,
      coverImage: downloadURL,
    });

    // Save the case study to the database
    const savedCaseStudy = await newCaseStudy.save();

    // Return the saved case study in the response
    return res.status(201).json(savedCaseStudy);
  } catch (error) {
    console.error("Error:", error);

    // Handle errors appropriately
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all case studies by user ID
export const getCaseStudiesByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const caseStudies = await CaseStudy.find({ userId: userId });
    return res.status(200).json(caseStudies);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get a specific case study by ID
export const getCaseStudyById = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findById(req.params.caseStudyId);
    if (!caseStudy) {
      return res.status(404).json({ error: "Case study not found" });
    }
    return res.status(200).json(caseStudy);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update a case study by ID
export const updateCaseStudy = async (req, res) => {
  try {
    const updatedCaseStudy = await CaseStudy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCaseStudy) {
      return res.status(404).json({ error: "Case study not found" });
    }
    return res.status(200).json(updatedCaseStudy);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete a case study by ID
export const deleteCaseStudy = async (req, res) => {
  try {
    const deletedCaseStudy = await CaseStudy.findByIdAndDelete(req.params.id);
    if (!deletedCaseStudy) {
      return res.status(404).json({ error: "Case study not found" });
    }
    return res.status(200).json({ message: "Case study deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
