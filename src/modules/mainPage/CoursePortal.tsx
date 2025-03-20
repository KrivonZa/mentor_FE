import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'
import CoursePortalLayout from '../../layouts/CoursePortalLayout';
import { CourseDetailFormData, CourseDetailFormDataError, CoursePortalDetail } from '../../types/courseModel';
import courseService from '../../services/courseService';
import { Schedule, ScheduleUpdateRequest, SingleScheduleCreateRequest } from '../../types/scheduleModel';
import skillService from '../../services/skillService';
import { Skill } from '../../types/skillModel';
import { UploadFile } from 'antd';
import { Lesson, LessonDetailFormData } from '../../types/lessonModel';
import { toast } from 'react-toastify';
import { Pagable } from '../../types/apiModel';


interface CoursePortalProps {
  listCoursePortal: Pagable<CoursePortalDetail> | undefined,
  fetchPortalDetail: () => void,
  isCourseDetailModalOpen: boolean,
  setIsCourseDetailModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  showCourseDetailModal: (courseID: number) => void
  courseDetailFormData: CourseDetailFormData;
  setCourseDetailFormData: Dispatch<SetStateAction<CourseDetailFormData>>;
  resetCourseDetailModal: () => void;
  courseDetailError: CourseDetailFormDataError;
  resetCourseErrorMessage: () => void;
  courseNameQuery: string;
  setCourseNameQuery: React.Dispatch<React.SetStateAction<string>>;

  //lesson
  isLessonDetailModalOpen: boolean;
  setIsLessonDetailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  lessonDetailFormData: LessonDetailFormData;
  setLessonDetailFormData: Dispatch<SetStateAction<LessonDetailFormData>>
  showLessonDetailModal: (lessonID: number, courseID: number, lessonDetail?: Lesson,) => void;
  resetLessonDetailModal: () => void;
  lessonErrorMessage: LessonDetailFormData[];
  setLessonErrorMessage: React.Dispatch<React.SetStateAction<LessonDetailFormData[]>>
  resetLessonErrorMessage: () => void;

  //schedule
  isScheduleModalOpen: boolean;
  setIsScheduleModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpenScheduleModal: (lessonID: number) => void
  scheduleFormData: SingleScheduleCreateRequest
  setScheduleFormData: React.Dispatch<React.SetStateAction<SingleScheduleCreateRequest>>

  //skill
  listSkill: Skill[]
  // file
  fileList: UploadFile<any>[];
  setFileList: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>
  previewImage: string;
  setPreviewImage: React.Dispatch<React.SetStateAction<string>>;
  previewOpen: boolean;
  setPreviewOpen: React.Dispatch<React.SetStateAction<boolean>>;

  // tab
  activeKey: string;
  setActiveKey: React.Dispatch<React.SetStateAction<string>>;
  navigateTab: (no: string) => void

  handleCloseCourseModal: () => void;

  loading: boolean; 
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  coursePortalPage: number;
  setCoursePortalPage: React.Dispatch<React.SetStateAction<number>>
  valdateCourseDetailTabs: () => number
}

export const CoursePortalContext = createContext<CoursePortalProps | undefined>(undefined);

export const CoursePortalProvider = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [listCoursePortal, setListCoursePortal] = useState<Pagable<CoursePortalDetail> | undefined>();
  const [listSkill, setListSkill] = useState<Skill[]>([]);

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
    skill: [],
    lesson: []
  });
  const [courseNameQuery, setCourseNameQuery] = useState<string>("");
  const [coursePortalPage, setCoursePortalPage] = useState<number>(1);

  const [courseDetailError, setCourseDetailError] = useState<CourseDetailFormDataError>({
    courseID: -1,
    courseName: "",
    description: "",
    price: "",
    thumbnail: "",
    freeTrial: false,
    totalStudent: "",
    level: "BEGINNER",
    skill: "",
  });

  //* File list
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  //upload
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const showCourseDetailModal = (courseID: number) => {
    setIsCourseDetailModalOpen(true);
    if (courseID != -1) {
      const courseDetail = listCoursePortal?.content.find((course) => course.courseID == courseID);
      
      setCourseDetailFormData({
        courseID: courseDetail?.courseID || -1,
        courseName: courseDetail?.courseName || "",
        description: courseDetail?.description || "",
        price: courseDetail?.price || 0,
        thumbnail: courseDetail?.thumbnail || "",
        freeTrial: courseDetail?.freeTrial || false,
        totalStudent: courseDetail?.totalStudent || 0,
        level: courseDetail?.level || "BEGINNER",
        skill: courseDetail?.skills.map((item) => item.skillDetail.skillID) || [],
        lesson: []
      })
      //Set File with thumbnail
      setFileList([
        {
          uid: '-1',
          name: courseDetail?.courseName || "",
          status: 'done',
          url: courseDetail?.thumbnail || ""
        }
      ])
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
      skill: [],
      lesson: []
    })
    // also reset fileList
    setFileList([]);
  }

  //* Lesson Detail Modal
  const [isLessonDetailModalOpen, setIsLessonDetailModalOpen] = useState(false);
  const [lessonDetailFormData, setLessonDetailFormData] = useState<LessonDetailFormData>({
    lessonID: -1,
    courseID: -1,
    description: "",
    lessonStatus: "",
    trialLesson: false,
    schedule: [],
  })
  const [lessonErrorMessage, setLessonErrorMessage] = useState<LessonDetailFormData[]>([]);


  const showLessonDetailModal = (lessonID: number, courseID: number, lessonDetail?: Lesson,) => {
    setIsLessonDetailModalOpen(true);
    if (lessonID != -1 && lessonDetail) {
      
      setLessonDetailFormData({
        lessonID: lessonDetail?.lessonID || -1,
        courseID: courseID || -1,
        description: lessonDetail?.description || "",
        lessonStatus: lessonDetail?.lessonStatus || "",
        trialLesson: lessonDetail?.trialLesson || false,
        schedule: lessonDetail?.schedule || [],
      })
    } else {
      setLessonDetailFormData({
        lessonID: -1,
        courseID: courseID || -1,
        description: "",
        lessonStatus: "",
        trialLesson: false,
        schedule: [],
      })
    }

  };

  const resetLessonDetailModal = () => {
    setLessonDetailFormData({
      lessonID: -1,
      courseID: -1,
      description: "",
      lessonStatus: "",
      trialLesson: false,
      schedule: [],
    })
  }

  const fetchPortalDetail = async () => {
    try {
      const listCourse = await courseService.getCoursePortalDetail(courseNameQuery, coursePortalPage);
      setListCoursePortal(listCourse.data);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  }

  const fetchSkills = async () => {
    try {
      const skills = await skillService.getAllSkill();
      setListSkill(skills);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  }

  //* Schedule Plan Modal
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleFormData, setScheduleFormData] = useState<SingleScheduleCreateRequest>({
    lessonID: -1,
    startTime: null,
    endTime: null,
    googleMeetUrl: null
  })

  const handleOpenScheduleModal = (lessonID: number) => {
    setScheduleFormData({
      lessonID: lessonID,
      startTime: null,
      endTime: null,
      googleMeetUrl: null
    })
    setIsScheduleModalOpen(true);
  }


  //* Tabs
  const valdateCourseDetailTabs = () => {
    let errCount = 0;

    // Clone current error state
    let newCourseDetailError: CourseDetailFormDataError = { ...courseDetailError };

    // Validate course name
    if (courseDetailFormData.courseName.trim() === "") {
      newCourseDetailError.courseName = "Course Name is required";
      errCount++;
    } else {
      newCourseDetailError.courseName = "";
    }

    // Validate description
    if (courseDetailFormData.description.trim() === "") {
      newCourseDetailError.description = "Course Description is required";
      errCount++;
    } else {
      newCourseDetailError.description = "";
    }

    // Validate price
    // if (courseDetailFormData.price == 0) {
    //   newCourseDetailError.price = "Course Price must be greater than 0";
    //   errCount++;
    // } else {
    //   newCourseDetailError.price = "";
    // }

    // Validate thumbnail
    if (fileList.length == 0) {
      newCourseDetailError.thumbnail = "Course Thumbnail is required";
      errCount++;
    } else {
      newCourseDetailError.thumbnail = "";
    }

    // Validate skill
    if (courseDetailFormData.skill.length == 0) {
      newCourseDetailError.skill = "At least one skill is required";
      errCount++;
    } else {
      newCourseDetailError.skill = "";
    }

    // Validate total student
    // if (courseDetailFormData.totalStudent == 0) {
    //   newCourseDetailError.totalStudent = "Total Student must be greater than 0";
    //   errCount++;
    // } else {
    //   newCourseDetailError.totalStudent = "";
    // }

    // Update state to trigger re-render
    setCourseDetailError(newCourseDetailError);

    return errCount;

  }

  const resetCourseErrorMessage = () => {
    setCourseDetailError({
      courseID: -1,
      courseName: "",
      description: "",
      price: "",
      thumbnail: "",
      freeTrial: false,
      totalStudent: "",
      level: "BEGINNER",
      skill: "",
    });
  }

  const resetLessonErrorMessage = () => {
    setLessonErrorMessage([]);
  }

  const [activeKey, setActiveKey] = useState("1"); // Default: Course Tab

  const navigateTab = (no: string) => {
    // if (valdateCourseDetailTabs() != "") {
    //     toast.error(valdateCourseDetailTabs());
    //     return
    // }
    if (valdateCourseDetailTabs() != 0) return;

    setActiveKey(no); // Move to Lessons tab when enabled
  };

  const handleCloseCourseModal = () => {
    setPreviewOpen(false);
    setIsCourseDetailModalOpen(false);
    resetCourseDetailModal();
    resetCourseErrorMessage();
    resetLessonErrorMessage();
    setActiveKey("1")
    resetLessonDetailModal();
  }

  //Fetch for re-use
  useEffect(() => {
    fetchSkills();
  }, [])

  return (
    <CoursePortalContext.Provider value={{
      listCoursePortal,
      fetchPortalDetail,
      isCourseDetailModalOpen, setIsCourseDetailModalOpen, showCourseDetailModal,
      courseDetailFormData, setCourseDetailFormData, resetCourseDetailModal, courseDetailError, resetCourseErrorMessage,
      setCourseNameQuery, courseNameQuery, coursePortalPage, setCoursePortalPage,

      //Lesson
      isLessonDetailModalOpen, setIsLessonDetailModalOpen, showLessonDetailModal,
      resetLessonDetailModal,
      lessonDetailFormData, setLessonDetailFormData,
      lessonErrorMessage, setLessonErrorMessage, resetLessonErrorMessage,

      //Schedule
      isScheduleModalOpen, setIsScheduleModalOpen,
      handleOpenScheduleModal,
      scheduleFormData, setScheduleFormData,

      //Skill
      listSkill,

      //File
      fileList,
      setFileList,
      previewImage,
      setPreviewImage,
      previewOpen,
      setPreviewOpen,

      //Tab
      activeKey, setActiveKey,
      navigateTab,

      handleCloseCourseModal,

      loading, setLoading,

      valdateCourseDetailTabs
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