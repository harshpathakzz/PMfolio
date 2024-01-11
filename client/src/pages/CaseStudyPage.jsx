import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const CaseStudyPage = () => {
  const { caseStudyId } = useParams();
  const [caseStudyData, setCaseStudyData] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCaseStudyData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/case-studies/${caseStudyId}`
        );
        setCaseStudyData(response.data);

        // Fetch user data only if case study data is available
        if (response.data) {
          try {
            const userResponse = await axios.get(
              `http://localhost:5000/api/v1/user/${response.data.userId}/profile`
            );
            setUserData(userResponse.data);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      } catch (error) {
        console.error("Error fetching case study data:", error);
      }
    };

    fetchCaseStudyData();
  }, [caseStudyId]);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      {caseStudyData && (
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            src={caseStudyData.coverImage}
            alt="Cover Image"
            className="w-full h-64 object-cover object-center"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">{caseStudyData.title}</h2>
            {userData && (
              <div className="flex items-center mb-4">
                <Avatar className="mr-2">
                  <AvatarImage
                    src={userData.profilePicture}
                    alt="Profile Picture"
                    className="rounded-full"
                  />
                  <AvatarFallback>{userData.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="text-gray-700">{userData.username}</p>
              </div>
            )}
            <Button
              className="px-4 py-2"
              onClick={() => (window.location.href = caseStudyData.link)}
            >
              Visit Link
              <ArrowTopRightIcon />
            </Button>
            <p className="mt-4">{caseStudyData.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudyPage;
