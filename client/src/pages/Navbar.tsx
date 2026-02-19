import React from "react";
import { Button } from "../components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/user/logout",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
      console.log({ error });
    }
  };
  return (
    <div className="bg-gray-400">
      <div className="flex justify-between items-center">
        <h2>{"Welcome Rohit"}</h2>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
};

export default Navbar;
