import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
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
    <div className="max-w-2xl mx-auto mt-8 p-4">
      {caseStudyData && (
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            src={caseStudyData.coverImage}
            alt="Cover Image"
            className="w-full h-48 object-cover object-center rounded-t-lg"
          />
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">{caseStudyData.title}</h2>
            <div className="flex justify-between mb-2">
              <div>
                {userData && (
                  <div
                    className="flex items-center mb-2 cursor-pointer"
                    onClick={() => navigate(`/user/${userData._id}`)}
                  >
                    <Avatar className="mr-2">
                      <AvatarImage
                        src={userData.profilePicture}
                        alt="Profile Picture"
                        className="rounded-full"
                      />
                      <AvatarFallback>
                        {userData.username.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <p className="font-semibold">{userData.username}</p>
                  </div>
                )}
              </div>
              <div>
                <Button
                  className="text-sm font-semibold leading-none"
                  onClick={() => window.open(caseStudyData.link, "_blank")}
                >
                  Visit Link
                  <ArrowTopRightIcon className="ml-1" />
                </Button>
              </div>
            </div>
            <Separator className="my-2" />

            <p className="text-sm">{caseStudyData.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudyPage;
