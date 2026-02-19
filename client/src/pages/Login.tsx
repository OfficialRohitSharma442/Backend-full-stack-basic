import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userdata, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: any) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        userdata,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
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
    <div className="h-screen container flex justify-center place-items-center">
      <div className="max-w-2xs flex flex-col gap-2 ">
        <Input onChange={handleChange} name="email" type="text" />
        <Input onChange={handleChange} name="password" type="password" />
        <Button onClick={handleSubmit}>Login</Button>
      </div>
    </div>
  );
};

export default Login;
