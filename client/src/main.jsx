import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import "./index.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import Admin from "./components/Dashboard/Admin";
import User from "./components/Dashboard/User";
import AddCategory from "./components/Dashboard/Admin/AddCategory";
import AddJob from "./components/Dashboard/Admin/AddJob";
import JobComponent from "./components/JobComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage/>,
      },
    ],
  },
  {
    path: "/login",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login/>,
      },
    ],
  },
  {
    path: "/signup",
    element: <App />,
    children: [
      {
        path: "/signup",
        element: <Signup/>,
      },
    ],
  },
  {
    path: "/dashboard/admin",
    element: <App />,
    children: [
      {
        path: "/dashboard/admin",
        element: <Admin/>,
      },
      {
        path: "/dashboard/admin/category",
        element: <AddCategory/>,
      },
      {
        path: "/dashboard/admin/job",
        element: <AddJob/>,
      },
    ],
  },
  {
    path: "/dashboard/user",
    element: <App />,
    children: [
      {
        path: "/dashboard/user",
        element: <User/>,
      },
      {
        path: "/dashboard/user/job/:jobId",
        element: <JobComponent/>,
        
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
