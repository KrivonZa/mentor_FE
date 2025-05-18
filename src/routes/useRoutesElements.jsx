import { useContext } from "react";
import { useRoutes, Navigate } from "react-router-dom";
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
  Checkout,
} from "../modules/mainPage";
import { LoginForm, SignupForm, ForgotPassForm } from "../modules/authPage";
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
import { UserProfile, Wallet, UserViewSchedule, ViewDetailSchedule, RegisteredClasses, CreateMentorApproval, RequestWithdraw } from "../modules/userPage";
import { NotFound, ServerError } from "../modules/errorPage";
import ClassPortal from "../modules/mainPage/ClassPortal";
import CourseRequestPortal from "../modules/mainPage/CourseRequestPortal";
import MentorApprovalRequest from "../modules/adminPage/Mentor/MentorApprovalRequest";
import CourseManagement from "../modules/adminPage/CourseManagement/CourseManagement";
import RecentComments from "../modules/adminPage/CourseManagement/Feedback";
import { WithdrawRequestsPage } from "../modules/adminPage/Withdraw";
import { AppContext } from "./AppProvider";

// Title mapping for useTitle hook
const titleMap = {
  "/": "Homepage",
  "/about": "About",
  "/courses": "Courses",
  "/courses/:courseID": "Course Detail",
  "/trainers": "Trainers",
  // "/events": "Events",
  // "/pricing": "Pricing",
  // "/contact": "Contact",
  "/checkout/:courseID": "Checkout",
  "/auth": "Log in",
  "/auth/signup": "Sign up",
  "/auth/update-password": "Forget Password",
  "/user": "My Profile",
  "/user/wallet": "My Wallet",
  "/user/schedule": "My Schedule",
  // "/user/schedule/:id": "Detail Schedule",
  "/user/registered-class": "Registered Class",
  "/user/request-withdraw": "Withdraw Request",
  "/user/approval": "Create Mentor Approval",
  "/user/course-portal": "Manage Courses",
  "/user/class-portal": "Manage Classes",
  "/user/course-request": "Manage Course Requests",
  "/admin": "Users Dashboard",
  "/admin/mentors": "Mentors Dashboard",
  "/admin/mentors/update-mentor": "Updated Mentors",
  "/admin/students": "Students Dashboard",
  // "/admin/staffs": "Staffs Dashboard",
  // "/admin/report": "Reports Dashboard",
  "/admin/withdraw-requests": "Withdraw Requests Dashboard",
  "/admin/mentor-approval": "Approval Mentors",
  "/admin/approve-course": "Approval Courses",
  "*": "Not Found",
  "/500": "Server Error",
};

const useRoutesElements = () => {
  // Get user data from context and determine role
  const { user } = useContext(AppContext);
  const role = user?.role || localStorage.getItem("ROLE"); // Fallback to localStorage if no user in context
  useTitle(titleMap); // Set document title based on current route

  // Define public routes (accessible to all users unless STAFF)
  const publicRoutes = [
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        { index: true, element: <LoginForm /> }, // Default auth route
        { path: "signup", element: <SignupForm /> },
        { path: "update-password", element: <ForgotPassForm /> },
      ],
    },
    ...(role !== "STAFF" // STAFF users don't get public main routes
      ? [
        {
          path: "",
          element: <MainLayout />,
          children: [
            { index: true, element: <Homepage /> }, // Root route
            { path: "about", element: <About /> },
            { path: "courses", element: <Courses /> },
            { path: "courses/:courseID", element: <CourseDetail /> },
            { path: "trainers", element: <Trainers /> },
            { path: "contact", element: <Contact /> },
            { path: "feedback", element: <RecentComments /> },

            ...(role === "USER" || role === "MENTOR" // Additional routes only for MENTOR
              ? [
                { path: "checkout/:courseID", element: <Checkout /> },
              ]
              : []),
          ],
        },
      ]
      : []),
  ];

  // Define user routes (for USER and MENTOR roles)
  const userRoutes = [
    {
      path: "/user",
      element: <UserLayout />,
      children: [
        { index: true, element: <UserProfile /> }, // Default user route
        { path: "wallet", element: <Wallet /> },
        { path: "schedule", element: <UserViewSchedule /> },
        // { path: "schedule/:courseID", element: <ViewDetailSchedule /> },
        { path: "request-withdraw", element: <RequestWithdraw /> },
        { path: "checkout/:courseID", element: <Checkout /> },
        ...(role === "USER" ? [ // Additional routes only for USER
          { path: "approval", element: <CreateMentorApproval /> },
          { path: "registered-class", element: <RegisteredClasses /> },
        ] : []),
        ...(role === "MENTOR" // Additional routes only for MENTOR
          ? [
            { path: "course-portal", element: <CoursePortal /> },
            { path: "class-portal", element: <ClassPortal /> },
            { path: "course-request", element: <CourseRequestPortal /> },
          ]
          : []),
      ],
    },
  ];

  // Define admin routes (for STAFF role)
  const adminRoutes = [
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { index: true, element: <UserBody /> }, // Default admin route
        // { path: "staffs", element: <StaffBody /> },
        // { path: "staffs/add-new-staff", element: <AddNewStaff /> },
        { path: "mentors", element: <MentorBody /> },
        { path: "mentors/update-mentor", element: <UpdateMentorForm /> },
        // { path: "staffs/update-staff", element: <UpdateStaffForm /> },
        { path: "students", element: <StudentBody /> },
        { path: "withdraw-requests", element: <WithdrawRequestsPage /> },
        // { path: "report", element: <Report /> },
        { path: "mentor-approval", element: <MentorApprovalRequest /> },
        { path: "approve-course", element: <CourseManagement /> },
      ],
    },
  ];

  // Define error routes (always available)
  const errorRoutes = [
    { path: "*", element: <NotFound /> }, // Catch-all for undefined routes
    { path: "/500", element: <ServerError /> },
  ];

  // Combine routes based on role and add redirects for unauthorized access
  const routes = [
    ...publicRoutes,
    ...(role === "USER" || role === "MENTOR" ? userRoutes : []), // Include user routes if USER or MENTOR
    ...(role === "STAFF" ? adminRoutes : []), // Include admin routes if STAFF
    // Redirects for unauthorized access
    ...(role && role !== "STAFF" // If logged in but not STAFF, restrict /admin
      ? [{ path: "/admin", element: <Navigate to="*" replace /> }]
      : []),
    ...(role // If logged in, no redirect needed for /user; otherwise, redirect to /auth
      ? []
      : [{ path: "/user", element: <Navigate to="/auth" replace /> }]),
    ...errorRoutes, // Always include error routes
  ];

  // Return the constructed route elements
  return useRoutes(routes);
};

export default useRoutesElements;