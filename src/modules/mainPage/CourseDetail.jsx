import { createContext, useState } from "react";
import CourseDetailLayout from "../../layouts/CourseDetailLayout";

export const CourseDetailContext = createContext({});

export const CourseDetailProvider = ({ children }) => {

  const [courseDetail, setCourseDetail] = useState({});

  return (
    <CourseDetailContext.Provider value={{
      courseDetail
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
