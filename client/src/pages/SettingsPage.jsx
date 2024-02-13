import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/slices/authSlice";
export default function SettingsPage() {
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    profilePicture: null,
  });

  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user._id);

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/user/${userId}/profile`
        );
        const fetchedUserData = response.data;

        // Set the form data with the fetched values
        setFormData({
          username: fetchedUserData.username,
          bio: fetchedUserData.bio,
          profilePicture: fetchedUserData.profilePicture, // Set profile picture data
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, [userId, accessToken]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      profilePicture: e.target.files[0],
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("username", formData.username);
    data.append("bio", formData.bio);
    if (formData.profilePicture) {
      data.append("profilePicture", formData.profilePicture);
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/user/update`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      navigate("/dashboard");
    } catch (error) {
      // Handle network error or server error
      if (error.response && error.response.status === 401) {
        dispatch(logout());
        navigate("/login");
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Edit Profile</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Modify your profile details.
        </p>
      </div>

      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            className="min-h-[100px]"
            id="bio"
            name="bio"
            placeholder="Write a short bio about yourself"
            value={formData.bio}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profilePicture">Profile Picture</Label>
          <Input
            id="profilePicture"
            name="profilePicture"
            type="file"
            onChange={handleImageChange}
          />
        </div>
        <div className="flex space-x-4">
          <Button className="w-full" onClick={handleUpdate}>
            Update Profile
          </Button>
        </div>
      </form>
    </div>
  );
}
