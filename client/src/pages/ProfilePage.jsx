import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
        console.log(response.data);
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
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
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
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
