import { useEffect, useState, useRef, useCallback } from "react";
import CaseStudyCard from "@/components/component/CaseStudyCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const observer = useRef();

  const lastCaseStudyRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/v1/case-studies/all?page=${page}`
        );

        setCaseStudies((prevCaseStudies) => [
          ...prevCaseStudies,
          ...response.data,
        ]);
        setHasMore(response.data.length > 0);
      } catch (error) {
        console.error("Error fetching case studies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, [page]);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {caseStudies.map((caseStudy, index) => (
          <div
            key={caseStudy._id}
            ref={index === caseStudies.length - 1 ? lastCaseStudyRef : null}
          >
            <CaseStudyCard
              caseStudyId={caseStudy._id}
              title={caseStudy.title}
              coverImage={caseStudy.coverImage}
              onClick={(caseStudyId) => navigate(`/case-study/${caseStudyId}`)}
            />
          </div>
        ))}
      </div>
      {loading && <p className="text-center">Loading more case studies...</p>}
    </div>
  );
};

export default Feed;
