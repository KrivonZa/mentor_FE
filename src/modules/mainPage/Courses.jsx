import { createContext, useEffect, useState } from "react";
import CourseLayout from "../../layouts/CourseLayout";
import courseService from "../../services/courseService";
import classService from "../../services/classService";

export const CourseContext = createContext({});

export const CourseProvider = ({ children }) => {
  const [courseList, setCourseList] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [classFilter, setClassFilter] = useState({
    page: 1,
    name: '',
    perPage: 6,
    priceStart: 0,
    priceEnd: 0
  })

  const fetchCoursePagi = async () => {
    setIsLoading(true);
    try {
      const response = await classService.getClassPagination(classFilter);
      setCourseList(response.data || {}); // ✅ REPLACES instead of appending
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoursePagi();
  }, [classFilter]);

  return (
    <CourseContext.Provider value={{
      courseList, isLoading,
      classFilter, setClassFilter, setCourseList
    }}>
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
