import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CaseStudyCard from "@/components/component/CaseStudyCard";
import axios from "axios";

const ProfilePage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [userCaseStudies, setUserCaseStudies] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/user/${userId}/profile`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchUserCaseStudies = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/case-studies/user/${userId}`
        );
        setUserCaseStudies(response.data);
      } catch (error) {
        console.error("Error fetching case studies:", error);
      }
    };

    fetchUserData();
    fetchUserCaseStudies();
  }, [userId]);

  return (
    <div className="container mx-auto p-4">
      {userData ? (
        <div className="flex flex-col items-center">
          <Avatar className="mb-4 h-20 w-20">
            <AvatarImage src={userData.profilePicture} />
            <AvatarFallback>IMG</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold">{userData.username}</h2>
          <p className="text-muted-foreground">{userData.bio}</p>
          <div className="flex mt-2">
            <p className="mr-4">
              <span className="font-bold">{userData.followerCount}</span>{" "}
              followers
            </p>
            <p>
              <span className="font-bold">{userData.followingCount}</span>{" "}
              following
            </p>
          </div>

          {userCaseStudies ? (
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-2">Case Studies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userCaseStudies.map((caseStudy) => (
                  <CaseStudyCard
                    key={caseStudy._id}
                    title={caseStudy.title}
                    coverImage={caseStudy.coverImage}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center">Loading case studies...</p>
          )}
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
