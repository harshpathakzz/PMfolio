import CaseStudy from "../models/caseStudymodel.js";

// Create a new case study
export const createCaseStudy = async (req, res) => {
  try {
    const { userId, title, description, link, coverImage } = req.body;
    const newCaseStudy = new CaseStudy({
      userId,
      title,
      description,
      link,
      coverImage,
    });
    const savedCaseStudy = await newCaseStudy.save();
    return res.status(201).json(savedCaseStudy);
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
    const caseStudy = await CaseStudy.findById(req.params.id);
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
