import "./App.css";
import AddTodo from "./components/AddTodo";
import Navbar from "./pages/Navbar";
import { Toaster } from "./components/ui/sonner";
import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <AddTodo />
      </>
    ),
  },
  {
    path: "login",
    element: <Login />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster />
    </>
  );
}

export default App;
