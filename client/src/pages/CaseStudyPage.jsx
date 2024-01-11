import React from "react";
import { useParams } from "react-router-dom";
const CaseStudyPage = () => {
  const { caseStudyId } = useParams();
  return <div>CaseStudyPage {caseStudyId}</div>;
};

export default CaseStudyPage;
