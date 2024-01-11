import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";

const ProfilePage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

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

    fetchUserData();
  }, [userId]);

  return (
    <div className="container mx-auto p-4">
      {userData ? (
        <div className="flex items-center flex-col">
          <Avatar className="mb-4 h-20 w-20">
            <AvatarImage src={userData.profilePicture} />
            <AvatarFallback>IMG</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold">{userData.username}</h2>
          <p className="text-muted-foreground">{userData.bio}</p>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
