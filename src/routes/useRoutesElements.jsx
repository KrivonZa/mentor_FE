import { useRoutes, useLocation } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/LoginLayout";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";

import {
  Homepage,
  About,
  Courses,
  Trainers,
  Events,
  Pricing,
  Contact,
  CourseDetail,
} from "../modules/mainPage";
import { LoginForm, SignupForm, ForgotPassForm } from "../modules/authPage"
import {
  AddNewStaff,
  MentorBody,
  StaffBody,
  StudentBody,
  UpdateMentorForm,
  UpdateStaffForm,
  UserBody,
  Report
} from "../modules/adminPage";
import { UserProfile, Transaction } from "../modules/userPage";
import CourseAdmin from "../components/templates/courseAdmin/CourseAdmin";

const useRoutesElements = () => {
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
          path: "signup",
          element: <SignupForm />,
        },
        {
          path: "update-password",
          element: <ForgotPassForm />,
        }
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
          index: true,
          element: <Homepage />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "courses",
          element: <Courses />,
        },
        {
          path: "courses/:courseID",
          element: <CourseDetail />, // Component for course details
        },
        {
          path: "trainers",
          element: <Trainers />,
        },
        {
          path: "events",
          element: <Events />,
        },
        {
          path: "pricing",
          element: <Pricing />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
      ],
    },
    ,
    {
      path: "user",
      element: <UserProfile />,
    },
    {
      path: "transaction",
      element: <Transaction />,
    },
    {
      path: "/user",
      element: <UserLayout />,
      children: [
        {
          index: true,
          element: <UserProfile />,
        },
        {
          path: "transaction",
          element: <Transaction />,
        }

      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          index: true,
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
        {
          path: "report",
          element: <Report />,
        },
      ],
    },
  ]);
  return element;
};
export default useRoutesElements;
