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
  CourseDetail
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
      ],
    },
  ]);
  return element;
};
export default useRoutesElements;
