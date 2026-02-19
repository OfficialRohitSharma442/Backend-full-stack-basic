import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import axios from "axios";
import ShowTodos from "./ShowTodos";
const AddTodo = () => {
  const [data, setData] = useState<any>({
    title: "",
    dectiption: "",
  });
  const [refetch, setRefetch] = useState(false);
  const handleChanage = (event: any) => {
    setData((prev: any) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const addTodoHandler = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/todo",
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.success) {
        setData({
          title: "",
          dectiption: "",
        });
        setRefetch((prev) => !prev);
        toast.success(response.data.message);
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
    <div>
      <div className="w-full flex ">
        <div className="flex justify-center items-center m-auto p-2.5 place-content-center gap-4">
          <div className="flex gap-2 flex-col">
            <Input
              onChange={handleChanage}
              name="title"
              value={data.title}
              type="text"
              className="w-full"
            />
            <Textarea
              onChange={handleChanage}
              value={data.dectiption}
              name="dectiption"
              className="w-full"
            />
          </div>
          <Button onClick={addTodoHandler}>Add👍</Button>
        </div>
      </div>
      <ShowTodos refetch={refetch} />
    </div>
  );
};

export default AddTodo;
