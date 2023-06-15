import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home";
import AddTask from "../Pages/AddTask/AddTask";
import AllTasks from "../Pages/AllTask/AllTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    // errorElement: <Error404Page />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/addtask",
        element: <AddTask />,
      },
      {
        path: "/alltasks",
        element: <AllTasks />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
