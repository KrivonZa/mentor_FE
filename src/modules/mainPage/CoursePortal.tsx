import React, { createContext, Dispatch, SetStateAction, useState } from 'react'
import CoursePortalLayout from '../../layouts/CoursePortalLayout';
import { CoursePortalDetail } from '../../types/courseModel';
import courseService from '../../services/courseService';


interface CoursePortalProps {
  listCoursePortal: CoursePortalDetail[],
  fetchPortalDetail: () => void,
  isCourseDetailModalOpen: boolean,
  setIsCourseDetailModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  showCourseDetailModal: (courseID: number) => void
  courseDetailFormData: CourseDetailFormData;
  setCourseDetailFormData: Dispatch<SetStateAction<CourseDetailFormData>>;
}

interface CourseDetailFormData {
  courseName: string;
  description: string;
  price: number;
  thumbnail: string;
  freeTrial: boolean;
  totalStudent: number;
  level: string;
}

export const CoursePortalContext = createContext<CoursePortalProps | undefined>(undefined);



export const CoursePortalProvider = ({ children }) => {
  const [listCoursePortal, setListCoursePortal] = useState<CoursePortalDetail[]>([]);
  //* Course Detail Modal
  const [isCourseDetailModalOpen, setIsCourseDetailModalOpen] = useState(false);
  const [courseDetailFormData, setCourseDetailFormData] = useState<CourseDetailFormData>({
    courseName: "",
    description: "",
    price: 0,
    thumbnail: "",
    freeTrial: false,
    totalStudent: 0,
    level: "",
  });

  const showCourseDetailModal = (courseID: number) => {
    setIsCourseDetailModalOpen(true);
    const courseDetail = listCoursePortal.find((course) => course.courseID === courseID);    
    setCourseDetailFormData({
      courseName: courseDetail?.courseName || "",
      description: courseDetail?.description || "",
      price: courseDetail?.price || 0,
      thumbnail: courseDetail?.thumbnail || "",
      freeTrial: courseDetail?.freeTrial || false,
      totalStudent: courseDetail?.totalStudent || 0,
      level: courseDetail?.level || "",
    })
  };

  const fetchPortalDetail = async () => {
    try {
      const listCourse = await courseService.getCoursePortalDetail(2, 1);
      setListCoursePortal(listCourse);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  }

  return (
    <CoursePortalContext.Provider value={{
      listCoursePortal,
      fetchPortalDetail,
      isCourseDetailModalOpen, setIsCourseDetailModalOpen, showCourseDetailModal,
      courseDetailFormData, setCourseDetailFormData
    }}
    >
      {children}
    </CoursePortalContext.Provider>
  )
}

export const CoursePortal = () => {
  return (
    <CoursePortalProvider>
      <CoursePortalLayout />
    </CoursePortalProvider>
  )
}

export default CoursePortal