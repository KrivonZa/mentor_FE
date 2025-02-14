import { useRoutes, useLocation } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import {
  Homepage,
  About,
  Courses,
  Trainers,
  Events,
  Pricing,
  Contact,
  CourseDetail,
  UserBody,
  AddNewStaff,
  MentorBody,
  AdminDashboard,
  UpdateMentorForm,
  UpdateStaffForm,
  LoginForm,
  Report,
  SingupForm,
  StaffBody,
  StudentBody,
} from "../modules/mainPage";
import { useEffect } from "react";
import AuthLayout from "../layouts/LoginLayout";
import RegisterForm from "../components/templates/auth/RegisterForm";
import CourseAdmin from "../components/templates/courseAdmin/CourseAdmin";

const useRoutesElements = () => {
  const location = useLocation();

  const element = useRoutes([
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <LoginForm />,
        },
        {
          path: "/auth/register",
          element: <RegisterForm />,
        },
      ],
    },
    {
      path: "/course-portal",
      element: <CourseAdmin />,
    },
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <Homepage />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/courses",
          element: <Courses />,
        },
        {
          path: "/courses/:courseID",
          element: <CourseDetail />, // Component for course details
        },
        {
          path: "/trainers",
          element: <Trainers />,
        },
        {
          path: "/events",
          element: <Events />,
        },
        {
          path: "/pricing",
          element: <Pricing />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/course-detail",
          element: <CourseDetail />,
        },
        {
          path: "/login",
          element: <LoginForm />,
        },
        {
          path: "/signup",
          element: <SingupForm />,
        },
        {
          path: "/report",
          element: <Report />,
        },
        {
          path: "/login",
          element: <LoginForm />,
        },

        {
          path: "admin",
          element: <AdminDashboard />,
          children: [
            {
              path: "users",
              element: <UserBody />,
            },
            {
              path: "staffs",
              element: <StaffBody />,
            },
            {
              path: "staffs/add-new-staff",
              element: <AddNewStaff />,
            },
            {
              path: "mentors",
              element: <MentorBody />,
            },
            {
              path: "mentors/update-mentor",
              element: <UpdateMentorForm />,
            },
            {
              path: "staffs/update-staff",
              element: <UpdateStaffForm />,
            },
            {
              path: "students",
              element: <StudentBody />,
            },
          ],
        },
      ],
    },
  ]);
  return element;
};
export default useRoutesElements;
