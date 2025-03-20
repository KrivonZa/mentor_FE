import { useRoutes, useLocation, Navigate } from "react-router-dom";
import useTitle from "./useTitle";
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
  CoursePortal,
  Checkout
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
  Report,
} from "../modules/adminPage";
import { UserProfile, Wallet, UserViewSchedule, ViewDetailSchedule, TransactionHistory } from "../modules/userPage";
import { NotFound, ServerError } from "../modules/errorPage"
import ClassPortal from "../modules/mainPage/ClassPortal";
import CourseRequestPortal from "../modules/mainPage/CourseRequestPortal";
import MentorRequestForm from "../components/User/MentorRequestForm";
import MentorApprovalRequest from "../modules/adminPage/Mentor/MentorApprovalRequest";
import CourseManagement from "../modules/adminPage/CourseManagement/CourseManagement";
import RecentComments from "../modules/adminPage/CourseManagement/Feedback";
const role = localStorage.getItem("ROLE")

const titleMap = {
  "/": "Homepage",
  "/about": "About",
  "/courses": "Courses",
  "/courses/:courseID": "Course Detail",
  "/trainers": "Trainers",
  "/events": "Events",
  "/pricing": "Pricing",
  "/contact": "Contact",
  "/checkout": "Checkout",
  "/auth": "Log in",
  "/auth/signup": "Sign up",
  "/auth/update-password": "Forget Password",
  "/user": "My Profile",
  "/user/wallet": "My Wallet",
  "/user/schedule": "My Schedule",
  "/user/schedule/:id": "Detail Schedule",
  "/user/course-portal": "Manage Courses",
  "/user/class-portal": "Manage Classes",
  "/user/course-request": "Manage Course Requests",
  "/admin": "Users Dashboard",
  "/admin/mentors": "Mentors Dashboard",
  "/admin/students": "Students Dashboard",
  "/admin/staffs": "Staffs Dashboard",
  "/admin/report": "Reports Dashboard",
  "*": "Not Found",
  "/500": "Server Error",
};

const useRoutesElements = () => {
  useTitle(titleMap)

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
          path: "checkout/:courseID",
          element: <Checkout />,
        },
        {
          path: "make-approval-request",
          element: <MentorRequestForm />
        },
        {
          path: "feedback",
          element: <RecentComments/>
        }
        ,
      ],
    },

    //routes dành cho Student và MENTOR
    ...(role === "USER" || role === "MENTOR" ?
      [
        {
          path: "/user",
          element: <UserLayout />,
          children: [
            {
              index: true,
              element: <UserProfile />,
            },
            {
              path: "wallet",
              element: <Wallet />,
            },
            {
              path: "schedule",
              element: <UserViewSchedule />,
            },
            {
              path: "schedule/:courseID",
              element: <ViewDetailSchedule />,
            },
            {
              path: "transaction-history",
              element: <TransactionHistory />,
            },
          ],
        },] : []),

    // //routes dành riêng cho STUDENT
    // ...(role === "USER" ?
    //   [
    //     {
    //       path: "/user",
    //       element: <UserLayout />,
    //       children: [
    //         {
    //           path: "weekly-schedule",
    //           element: <CourseDetailSchedule />,
    //         },
    //       ],
    //     },] : []),

    // //routes dành riêng cho MENTOR
    ...(role === "MENTOR" ?
      [
        {
          path: "/user",
          element: <UserLayout />,
          children: [
            {
              path: "course-portal",
              element: <CoursePortal />
            }
          ],
        },] : []),

    //routes dành cho Admin
    ...(role === "STAFF" ? [
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
            path: "report",
            element: <Report />,
          },
          {
            path: "mentor-approval",
            element: <MentorApprovalRequest />
          },
        ],
      },
    ] : []),
    {
      path: "/admin",
      element: <Navigate to="*" replace />,
    },
    {
      path: "/user",
      element: <UserLayout />,
      children: [
        {
          path: "checkout/:courseID",
          element: <Checkout />,
        },
      ],
    },

    //routes dành cho Student và MENTOR
    ...(role === "USER" || role === "MENTOR" ?
      [
        {
          path: "/user",
          element: <UserLayout />,
          children: [
            {
              index: true,
              element: <UserProfile />,
            },
            {
              path: "wallet",
              element: <Wallet />,
            },
            {
              path: "schedule",
              element: <UserViewSchedule />,
            },
            {
              path: "schedule/:courseID",
              element: <ViewDetailSchedule />,
            },
            {
              path: "transaction-history",
              element: <TransactionHistory />,
            },
          ],
        },] : []),

    // //routes dành riêng cho STUDENT
    // ...(role === "USER" ?
    //   [
    //     {
    //       path: "/user",
    //       element: <UserLayout />,
    //       children: [
    //         {
    //           path: "weekly-schedule",
    //           element: <CourseDetailSchedule />,
    //         },
    //       ],
    //     },] : []),

    // //routes dành riêng cho MENTOR
    ...(role === "MENTOR" ?
      [
        {
          path: "/user",
          element: <UserLayout />,
          children: [
            {
              path: "course-portal",
              element: <CoursePortal />
            },
            {
              path: "class-portal",
              element: <ClassPortal />
            },
            {
              path: "course-request",
              element: <CourseRequestPortal />
            }
          ],
        },] : []),

    //routes dành cho Admin
    ...(role === "STAFF" ? [
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
          {
            path: "approve-course",
            element: <CourseManagement />
          }
        ],
      },
    ] : []),
    {
      path: "/admin",
      element: <Navigate to="*" replace />,
    },
    {
      path: "/user",
      element: <Navigate to="/auth" replace />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/500",
      element: <ServerError />,
    },
  ]);
  return element;
};
export default useRoutesElements;
