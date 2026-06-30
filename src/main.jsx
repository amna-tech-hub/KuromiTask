import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import AddSubTodo from "./pages/AddSubTodo";
import "./index.css";
import Layout from "./pages/layout/Layout";
import GetAllTODO from "./pages/GetAllTODO";
import GetAllSubtodo from "./pages/GetAllSubtodo";
import LoginUser from "./pages/LoginUser";
import User from "./pages/User";
import AddTodo from "./pages/AddTodo";
import OtpVerification from "./pages/OtpVerification";
import ResendOtp from "./pages/ResendOtp";
import ResetPassword from "./pages/ResetPassword";
import ForgetPassword from "./pages/ForgetPassword";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Parent layout
    children: [
      {
        index: true, // This renders at "/"
        element: <User />,
      },
      {
        path: "auth/login",
        element: <LoginUser />,
      },
      {
        path: "auth/register-user",
        element: <User />,
      },
      {
        path: "todo/getsubtodo/:categoryname",
        element: <AddSubTodo />,
      },
      {
        path: "todo/getalltodo",
        element: <GetAllTODO />,
      },

      {
        path: "todo/addtodo",
        element: <AddTodo />,
      },
      {
        path: "/auth/verify-otp",
        element: <OtpVerification/>,
      },
       {
        path: "/auth/resend-otp",
        element: <ResendOtp/>,
      },
      {
        path:'/auth/resetpassword/:token',
        element:<ResetPassword/>
      },
      {
        path:'/auth/forgetpassword',
        element:<ForgetPassword/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} /> 
  </QueryClientProvider>,
);
