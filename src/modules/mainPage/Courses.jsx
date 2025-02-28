import { createContext, useEffect, useState } from "react";
import CourseLayout from "../../layouts/CourseLayout";
import courseService from "../../services/courseService";

export const CourseContext = createContext({});

export const CourseProvider = ({ children }) => {
  const [courseList, setCourseList] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchFilter, setSearchFilter] = useState("");

  const itemsPerPage = 10;
  const totalPages = Math.ceil(courseList.length / itemsPerPage);

  const fetchCoursePagi = async (page, filter) => {
    setIsLoading(true);
    const response = await courseService.getAllCoursePagination(page, filter);
    setCourseList(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCoursePagi(currentPage, searchFilter);
  }, [currentPage, searchFilter]);

  return (
    <CourseContext.Provider value={{ courseList, isLoading, currentPage, setCurrentPage, setSearchFilter }}>
      {children}
    </CourseContext.Provider>
  );
};

export function Courses() {
  return (
    <CourseProvider>
      <CourseLayout />
    </CourseProvider>
  );
}
