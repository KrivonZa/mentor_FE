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
  StudentBody,
  StaffBody,
} from "../modules/mainPage";
import { useEffect } from "react";

const useRoutesElements = () => {
  const location = useLocation();

  const element = useRoutes([
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
