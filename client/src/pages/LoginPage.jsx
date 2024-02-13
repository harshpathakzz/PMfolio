import { useEffect, useState } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { login } from "@/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the server
      const response = await axios.post(
        "https://pmfolio-v1.onrender.com/api/v1/auth/login",
        formData
      );

      // Assuming the server returns user and access token information
      const { user, accessToken } = response.data;

      // Dispatch the login action to update the Redux state
      dispatch(login({ user, accessToken }));

      // Add any additional logic, such as redirecting the user to a different page
      navigate("/");

      console.log("Login successful:", response.data);
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-1">
      <form onSubmit={handleSubmit} className=" p-8 rounded shadow-md">
        <h2 className="text-4xl font-semibold mb-6">Login</h2>
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
          <Label htmlFor="password" className="block text-sm font-medium ">
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
          Login
        </Button>
        <div className="flex justify-center items-center">
          {" "}
          <Label>Don't have an account?</Label>
          <Button variant="link" onClick={handleRegisterRedirect}>
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
