import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/slices/authSlice";

export default function EditCaseStudy() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    link: "",
  });

  const { caseStudyId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [caseStudyData, setCaseStudyData] = useState(null);

  useEffect(() => {
    const fetchCaseStudyData = async () => {
      try {
        const response = await axios.get(
          `https://pmfolio-v1.onrender.com/api/v1/case-studies/${caseStudyId}`
        );
        const fetchedCaseStudyData = response.data;

        // Set the form data with the fetched values
        setFormData({
          title: fetchedCaseStudyData.title,
          description: fetchedCaseStudyData.description,
          image: null,
          link: fetchedCaseStudyData.link,
        });

        setCaseStudyData(fetchedCaseStudyData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCaseStudyData();
  }, [caseStudyId]);

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(formData);

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.put(
        `https://pmfolio-v1.onrender.com/ender.com/api/v1/case-studies/${caseStudyId}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
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

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `https://pmfolio-v1.onrender.com/api/v1/case-studies/${caseStudyId}`,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      navigate("/feed");
    } catch (error) {
      // Handle network error or server error
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Edit Case Study</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Modify your case study details.
        </p>
      </div>
      {caseStudyData && <img src={caseStudyData.coverImage} alt="" />}
      <form className="space-y-4">
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
            type="file"
            onChange={handleImageChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="link">File Link</Label>
          <Input
            id="link"
            name="link"
            placeholder="Enter the link to your file"
            value={formData.link}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex space-x-4">
          <Button className="w-1/2" onClick={handleUpdate}>
            Update
          </Button>
          <Button
            className="w-1/2"
            variant="destructive"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </form>
    </div>
  );
}
