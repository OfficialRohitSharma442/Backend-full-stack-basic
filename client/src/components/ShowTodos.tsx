import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { MdDeleteOutline } from "react-icons/md";

const ShowTodos = ({ refetch }) => {
  const [todo, setTodo] = useState([]);
  useEffect(() => {
    fetch();
  }, [refetch]);
  async function fetch() {
    try {
      let res = await axios.get("http://localhost:8000/api/v1/todo", {
        withCredentials: true,
      });
      setTodo(res?.data?.todos);
    } catch (error) {
      console.log({ error });
    }
  }
  const handleDelete = async (Id: any) => {
    try {
      let res = await axios.delete(`http://localhost:8000/api/v1/todo/${Id}`, {
        withCredentials: true,
      });
      await fetch();
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <div className="flex gap-2 flex-wrap">
      {todo.map((ele: any) => {
        return (
          <>
            <Card
              key={ele?._id}
              className="bg-gray-200 border-2 border-amber-100  w-[clamp(200px,30vw,300px)]"
            >
              <div className="flex flex-col">
                <div className="flex justify-end">
                  <MdDeleteOutline
                    onClick={() => handleDelete(ele?._id)}
                    className="cursor-pointer"
                    size={20}
                  />
                </div>
                <div className="flex flex-col">
                  <h2>{ele.title}</h2>
                  <p>{ele.dectiption}</p>
                </div>
              </div>
            </Card>
          </>
        );
      })}
    </div>
  );
};

export default ShowTodos;
