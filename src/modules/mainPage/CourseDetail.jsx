import { createContext, useEffect, useState } from "react";
import CourseDetailLayout from "../../layouts/CourseDetailLayout";
import { useLocation, useParams } from "react-router-dom";
import courseService from "../../services/courseService";

export const CourseDetailContext = createContext({});

export const CourseDetailProvider = ({ children }) => {
  //Path Param & Variable
  const location = useLocation();
  const { courseID } = useParams();
  const courseName = location.state?.courseName || courseID || 0; // Get courseName from state

  //CourseDetail
  const [courseDetail, setCourseDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchCourseDetail = async () => {
    setIsLoading(true);
    const paginationItem = await courseService.getCourseDetail(courseID)
    setCourseDetail(paginationItem.data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchCourseDetail();
  }, [])

  return (
    <CourseDetailContext.Provider value={{
      courseDetail,
      courseID,
      courseName
    }}>
      {children}
    </CourseDetailContext.Provider>
  )
}

export default function CourseDetail() {
  return (
    <CourseDetailProvider>
      <CourseDetailLayout />
    </CourseDetailProvider>
  );
}
