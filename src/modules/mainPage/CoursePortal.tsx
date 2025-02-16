import React, { createContext, Dispatch, SetStateAction, useState } from 'react'
import CoursePortalLayout from '../../layouts/CoursePortalLayout';
import { CoursePortalDetail } from '../../types/courseModel';
import courseService from '../../services/courseService';
import { Schedule } from '../../types/scheduleModel';


interface CoursePortalProps {
  listCoursePortal: CoursePortalDetail[],
  fetchPortalDetail: () => void,
  isCourseDetailModalOpen: boolean,
  setIsCourseDetailModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  showCourseDetailModal: (courseID: number) => void
  courseDetailFormData: CourseDetailFormData;
  setCourseDetailFormData: Dispatch<SetStateAction<CourseDetailFormData>>;

  //lesson
  isLessonDetailModalOpen: boolean;
  setIsLessonDetailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  lessonDetailFormData: LessonDetailFormData;
  setLessonDetailFormData: Dispatch<SetStateAction<LessonDetailFormData>>
  showLessonDetailModal: (lessonID: number) => void,
  resetCourseDetailModal: () => void
}

interface CourseDetailFormData {
  courseID: number
  courseName: string;
  description: string;
  price: number;
  thumbnail: string;
  freeTrial: boolean;
  totalStudent: number;
  level: string;
}

interface LessonDetailFormData {
  description: string;
  lessonStatus: string;
  trialLesson: boolean;
  schedule: Schedule[];
}

export const CoursePortalContext = createContext<CoursePortalProps | undefined>(undefined);



export const CoursePortalProvider = ({ children }) => {
  const [listCoursePortal, setListCoursePortal] = useState<CoursePortalDetail[]>([]);
  //* Course Detail Modal
  const [isCourseDetailModalOpen, setIsCourseDetailModalOpen] = useState(false);
  const [courseDetailFormData, setCourseDetailFormData] = useState<CourseDetailFormData>({
    courseID: -1,
    courseName: "",
    description: "",
    price: 0,
    thumbnail: "",
    freeTrial: false,
    totalStudent: 0,
    level: "BEGINNER",
  });

  //* Lesson Detail Modal
  const [isLessonDetailModalOpen, setIsLessonDetailModalOpen] = useState(false);
  const [lessonDetailFormData, setLessonDetailFormData] = useState<LessonDetailFormData>({
    description: "",
    lessonStatus: "",
    trialLesson: false,
    schedule: [],
  })

  const showCourseDetailModal = (courseID: number) => {
    setIsCourseDetailModalOpen(true);

    if (courseID !== -1) {
      const courseDetail = listCoursePortal.find((course) => course.courseID === courseID);
      setCourseDetailFormData({
        courseID: courseDetail?.courseID || -1,
        courseName: courseDetail?.courseName || "",
        description: courseDetail?.description || "",
        price: courseDetail?.price || 0,
        thumbnail: courseDetail?.thumbnail || "",
        freeTrial: courseDetail?.freeTrial || false,
        totalStudent: courseDetail?.totalStudent || 0,
        level: courseDetail?.level || "BEGINNER",
      })
    }else {
      resetCourseDetailModal();
    }
  };

  const resetCourseDetailModal = () => {
    setCourseDetailFormData({
      courseID: -1,
      courseName: "",
      description: "",
      price: 0,
      thumbnail: "",
      freeTrial: false,
      totalStudent: 0,
      level: "BEGINNER",
    })
  }

  const showLessonDetailModal = (lessonID: number) => {
    setIsLessonDetailModalOpen(true);

    // setLessonDetailFormData({
    //   description: lessonDetail?.description || "",
    //   lessonStatus: lessonDetail?.l || "",
    //   trialLesson: lessonDetail?.trialLesson || false,
    //   schedule: lessonDetail?.schedule || [],
    // })
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
      courseDetailFormData, setCourseDetailFormData, resetCourseDetailModal,

      //Lesson
      isLessonDetailModalOpen, setIsLessonDetailModalOpen, showLessonDetailModal,
      lessonDetailFormData, setLessonDetailFormData
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