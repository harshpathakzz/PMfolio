import { useState, useEffect } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RegisterPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    email: "",
    password: "",
    profilePicture: "https://ui.shadcn.com/avatars/02.png",
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send registration request to the server
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        formData
      );

      navigate("/login");

      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-1">
      <form onSubmit={handleSubmit} className=" p-8 rounded shadow-md">
        <h2 className="text-4xl font-semibold mb-6">Sign Up</h2>
        <div className="mb-4">
          <Label htmlFor="username" className="block text-sm font-medium">
            Username
          </Label>
          <Input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="bio" className="block text-sm font-medium ">
            Bio
          </Label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="3"
            className="mt-1 p-2 w-full border rounded-md"
          ></Textarea>
        </div>
        <div className="mb-4">
          <Label htmlFor="email" className="block text-sm font-medium ">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="password" className="block text-sm font-medium">
            Password
          </Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
