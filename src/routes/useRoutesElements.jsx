import { useRoutes, useLocation } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/LoginLayout";
import AdminLayout from "../layouts/AdminLayout";
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
import { LoginForm, SignupForm } from "../modules/authPage"
import {
  AddNewStaff,
  MentorBody,
  StaffBody,
  StudentBody,
  UpdateMentorForm,
  UpdateStaffForm,
  UserBody,
} from "../modules/adminPage";
import { Report } from "../modules/userPage"
import CourseAdmin from "../components/templates/courseAdmin/CourseAdmin";

const useRoutesElements = () => {
  const element = useRoutes([
    {
      path:"/auth",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element:<LoginForm/>
        },
        {
          path: "/auth/signup",
          element: <SingupForm />
        }
      ]
    },
    {
      path:"/course-portal",
      element: <CoursePortal />
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
        {
          path: "/course-detail",
          element: <CourseDetail />,
        },
        {
          path: "/report",
          element: <Report />,
        },
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
      ],
    },
  ]);
  return element;
};
export default useRoutesElements;
