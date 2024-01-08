import { useState } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

export default function CreateCaseStudy() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    link: "",
  });
  const accessToken = useSelector((state) => state.auth.accessToken);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/case-studies/create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 201) {
        // Handle success (e.g., show a success message, redirect, etc.)
        console.log("Case study created successfully");
      } else {
        // Handle error response (e.g., show an error message)
        console.error("Failed to create case study");
      }
    } catch (error) {
      // Handle network error or server error
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Create a Case Study</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Share your success stories and learnings with the community.
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Enter the title of your case study"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            className="min-h-[100px]"
            id="description"
            name="description"
            placeholder="Describe your case study"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Image</Label>
          <Input
            id="image"
            name="image"
            required
            type="file"
            onChange={handleImageChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="file-link">File Link</Label>
          <Input
            id="link"
            name="link"
            placeholder="Enter the link to your file"
            value={formData.link}
            onChange={handleInputChange}
            required
          />
        </div>
        <Button className="w-full" type="submit">
          Save Case Study
        </Button>
      </form>
    </div>
  );
}
