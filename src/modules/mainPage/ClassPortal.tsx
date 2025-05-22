import React, { createContext, useEffect, useState } from 'react'
import ClassPortalLayout from '../../layouts/ClassLayout/ClassPortalLayout';
import { ClassCreateRequest, ClassOverallQueryParam, ClassPortalOverallResposne, ClassUpdateRequest } from '../../types/classModel';
import classService from '../../services/classService';
import courseService from '../../services/courseService';
import { SelectProps } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { toast } from 'react-toastify';
import dayjs from 'dayjs'; // Use dayjs
import { Pagable } from '../../types/apiModel';
import { toastLoadingFailAction, toastLoadingSuccessAction } from '../../utils/functions';

interface ClassFormDataProps {
  classID: number
  classDescription: string
  totalStudent: number
  price: number
  courseID?: number
  expectedStartDate?: string
  totalSession: number
  classSchedules: ClassSchedules[] | any
}

interface ClassSchedules {
  classScheduleID: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

interface Session {
  sessionID: number
  selectedClassSchedule: {
    classScheduleID: number
    startTime: string
    endTime: string
    dayOfWeek: number
  }
  sessionDate: string
  googleMeetUrl: string
  classID: string
}

interface CellInfo {
  expectedStartDate: string
  classSchedules: ClassSchedules[],
  createdSessions: Session[]
  classID: number
}

interface ClassPortalProps {
  loading: boolean
  classPaginationParam: ClassOverallQueryParam
  setClassPaginationParam: React.Dispatch<React.SetStateAction<ClassOverallQueryParam>>
  classPagination: Pagable<ClassPortalOverallResposne>
  isClassModalOpen: boolean
  closeClassModel: () => void
  showClassModal: (classDetail: ClassPortalOverallResposne | null) => void
  classModalFormData: ClassFormDataProps,
  setClassModalFormData: React.Dispatch<React.SetStateAction<ClassFormDataProps>>
  courseOptionList: DefaultOptionType[] | undefined
  classFormDataError: any,
  handleCreateClass: () => Promise<void>,
  handleUpdateClass: () => Promise<void>,
  handleDeleteClass: (classID: number) => Promise<void>
  fetchClassPortal: () => Promise<void>,
  isClassSessionModalOpen: boolean, setClassSessionModalOpen,
  handleCancelSessionModal, handleOkSessionModal,
  showSessionModal: (item: ClassPortalOverallResposne) => void
  classSchedules: ClassSchedules[],
  setClassSchedules: React.Dispatch<React.SetStateAction<ClassSchedules[]>>,
  cellInfoData: CellInfo
  setCellInfoData: React.Dispatch<React.SetStateAction<CellInfo>>
  isCreateSessionModal, setCreateSessionModal
  handleOpenCreateSessionModal: (item: any) => void
  handleCloseCreateSessionModal: () => void
  createSessionModalData, setCreateSessionModalData,
  fetchClassSessions: (classID: number) => Promise<void>
}

export const ClassPortalContext = createContext<ClassPortalProps | undefined>(undefined);

export const ClassPortalProvider = ({ children }) => {

  const [loading, setLoading] = useState<boolean>(false)
  const [classPaginationParam, setClassPaginationParam] = useState<ClassOverallQueryParam>({
    page: 1,
    name: '',
    perPage: 5,
    priceStart: 0,
    priceEnd: 0
  });
  const [classPagination, setClassPagination] = useState<Pagable<ClassPortalOverallResposne> | any>({});

  //classModal
  const [isClassModalOpen, setClassModalOpen] = useState(false)

  //classSessionModal
  const [isClassSessionModalOpen, setClassSessionModalOpen] = useState(false)
  const [classSchedules, setClassSchedules] = useState<ClassSchedules[]>([]);
  const [cellInfoData, setCellInfoData] = useState<CellInfo>({
    expectedStartDate: '',
    classSchedules: [],
    createdSessions: [],
    classID: -1
  })

  //createSessionModal
  const [isCreateSessionModal, setCreateSessionModal] = useState(false)
  const [createSessionModalData, setCreateSessionModalData] = useState<any>({})
  const handleOpenCreateSessionModal = (item: any) => {
    setCreateSessionModalData({
      ...item
    })
    setCreateSessionModal(true)
  }

  const handleCloseCreateSessionModal = () => {
    setCreateSessionModal(false)
  }

  // Modal control functions
  const showSessionModal = async (item: ClassPortalOverallResposne) => {
    await fetchClassSessions(item.classID)

    setCellInfoData((prev) => ({
      ...prev,
      classID: item.classID,
      expectedStartDate: item.expectedStartDate,
      classSchedules: item.classSchedules,
    }));

    setClassSessionModalOpen(true);
  };

  const handleOkSessionModal = () => {
    setClassSessionModalOpen(false);
  };

  const handleCancelSessionModal = () => {
    setClassSessionModalOpen(false);
  };

  //ForApisubmit?
  const [classModalFormData, setClassModalFormData] = useState<ClassFormDataProps>({
    classID: -1,
    classDescription: '',
    totalStudent: 0,
    price: 0,
    courseID: undefined,
    expectedStartDate: undefined,
    totalSession: 0,
    classSchedules: []
  })
  const [classFormDataError, setClassFormDataError] = useState({
    classDescription: '',
    totalStudent: '',
    price: '',
    courseID: '',
    expectedStartDate: '',
    totalSession: '',
    classSchedules: ''
  })

  const [courseOptionList, setCourseOptionList] = useState<SelectProps['options']>([]);

  const resetClassModalFormData = () => {
    setClassModalFormData({
      classID: -1,
      classDescription: '',
      totalStudent: 0,
      price: 0,
      totalSession: 0,
      courseID: undefined,
      expectedStartDate: undefined,
      classSchedules: []
    })
  }

  const fetchClassPortal = async () => {
    const response = await classService.getClassPortalPagination(classPaginationParam);
    setClassPagination(response.data);
  }

  const closeClassModel = () => {
    resetErrorMessage();
    resetClassModalFormData()
    setClassModalOpen(false)
  }

  const fetchCourseOptionsForPortal = async () => {
    const response = await courseService.getMentorCourseOptionForPortal();
    const options = response?.data?.map((item) => {
      return {
        value: item.courseID,
        label: item.courseName
      }
    })
    setCourseOptionList(options)
  }

  const showClassModal = (classDetail: ClassPortalOverallResposne | null) => {
    resetClassModalFormData()
    setClassModalOpen(true);
    if (classDetail) {
      setClassModalFormData({
        classID: classDetail.classID,
        classDescription: classDetail.classDescription,
        totalStudent: classDetail.totalStudent,
        price: classDetail.price,
        courseID: classDetail.courseDetail.courseID,
        expectedStartDate: classDetail.expectedStartDate,
        totalSession: classDetail.totalSession,
        classSchedules: classDetail.classSchedules.map((schedule) => ({
          ...schedule,
          startTime: schedule?.startTime ? dayjs(schedule?.startTime, 'HH:mm:ss') : dayjs('00:00:00', 'HH:mm:ss'),
          endTime: schedule?.endTime ? dayjs(schedule?.endTime, 'HH:mm:ss') : dayjs('00:00:00', 'HH:mm:ss'),
        })) || [],
      })
    }
  }

  const validateFormData = () => {
    resetErrorMessage();

    let errCount = 0;

    const newCourseDetailError: any = {};


    // Validate classDescription
    if (classModalFormData.classDescription.trim() === "") {
      // setClassFormDataError(prevState => ({ ...prevState, classDescription: "Class Description is required" }));
      newCourseDetailError.classDescription = "Vui lòng nhập mô tả lớp học";
      errCount++;
    }

    if (classModalFormData.totalStudent <= 0) {
      newCourseDetailError.totalStudent = "Vui lòng nhập số lượng học viên";
      errCount++;
    }

    if (classModalFormData.totalStudent > 100) {
      newCourseDetailError.totalStudent = "Số lượng học viên không thể lớn hơn 100 người";
      errCount++;
    }

    if (classModalFormData.price < 10000) {
      newCourseDetailError.price = "Học phí phải lớn hơn 10.000đ";
      errCount++;
    }

    if (!classModalFormData.courseID) {
      newCourseDetailError.courseID = "Vui lòng chọn khoá học của lớp học này";
      errCount++;
    }

    if (!classModalFormData.expectedStartDate) {
      newCourseDetailError.expectedStartDate = "Vui lòng chọn ngày bắt đầu lớp học.";
      errCount++;
    } else if (dayjs(classModalFormData.expectedStartDate).isBefore(dayjs(), "day")) {
      newCourseDetailError.expectedStartDate = "Ngày bắt đầu phải lớn hơn hoặc bằng ngày hiện tại.";
      errCount++;
    }

    if (classModalFormData.totalSession <= 0) {
      newCourseDetailError.totalSession = "Lớp học phải có tối thiểu 1 buổi học";
      errCount++;
    }

    if (classModalFormData.totalSession > 50) {
      newCourseDetailError.totalSession = "Một lớp học không thể kéo dài quá 50 buổi học.";
      errCount++;
    }

    if (classModalFormData.classSchedules.length <= 0) {
      newCourseDetailError.classSchedules = "Lịch học phải có ít nhất 1 ngày học";
      errCount++;
    }

    classModalFormData.classSchedules.forEach((schedule: ClassSchedules) => {
      if (!schedule.startTime || !schedule.endTime) {
        newCourseDetailError.classSchedules = "Vui lòng chọn thời gian bắt đầu và kết thúc cho lịch học";
        errCount++;
      } else if (dayjs(schedule.startTime).isAfter(dayjs(schedule.endTime))) {
        newCourseDetailError.classSchedules = "Thời gian bắt đầu phải trước thời gian kết thúc";
        errCount++;
      } else if (dayjs(schedule.startTime) == (dayjs(schedule.endTime))) {
        newCourseDetailError.classSchedules = "Thời gian bắt đầu không được trùng với thời gian kết thúc";
        errCount++; 
      }
      
      // CASE if want to validate the time range
      // if (schedule.startTime && schedule.endTime) {
      //   const startTime = dayjs(schedule.startTime, 'HH:mm:ss');
      //   const endTime = dayjs(schedule.endTime, 'HH:mm:ss');
      //   const startTimeString = startTime.format('HH:mm');
      //   const endTimeString = endTime.format('HH:mm');
      //   const startTimeHour = parseInt(startTimeString.split(':')[0]);
      //   const startTimeMinute = parseInt(startTimeString.split(':')[1]);
      //   const endTimeHour = parseInt(endTimeString.split(':')[0]);
      //   const endTimeMinute = parseInt(endTimeString.split(':')[1]);
      //   if (startTimeHour < 8 || (startTimeHour === 8 && startTimeMinute < 0)) {
      //     newCourseDetailError.classSchedules = "Thời gian bắt đầu phải lớn hơn hoặc bằng 08:00";
      //     errCount++;
      //   }
      //   if (endTimeHour > 22 || (endTimeHour === 22 && endTimeMinute > 0)) {
      //     newCourseDetailError.classSchedules = "Thời gian kết thúc phải nhỏ hơn hoặc bằng 22:00";
      //     errCount++;
      //   } 
      // }

    }
  );

    setClassFormDataError(newCourseDetailError);

    return errCount;
  }

  const resetErrorMessage = () => {
    setClassFormDataError({
      classDescription: '',
      totalStudent: '',
      price: '',
      courseID: '',

      totalSession: '',
      expectedStartDate: '',
      classSchedules: ''
    })
  }

  const handleCreateClass = async () => {
    const error = validateFormData();
    if (error > 0) return;

    const classCreateReq: ClassCreateRequest = {
      classDescription: classModalFormData.classDescription,
      totalStudent: classModalFormData.totalStudent,
      price: classModalFormData.price,
      courseID: classModalFormData.courseID || -1,
      expectedStartDate: classModalFormData.expectedStartDate || '',
      totalSession: classModalFormData.totalSession,
      classSchedules: classModalFormData.classSchedules || []
    }

    setLoading(true);
    const loadingId = toast.loading("Đang tạo lớp học...");
    try {
      const response = await classService.createClass(classCreateReq)
      if (response) {
        toast.success("Tạo Lớp Học Thành Công!");
        toastLoadingSuccessAction(loadingId, "Đang tạo lớp học...");
        fetchClassPortal()
        closeClassModel()
        setLoading(false);
      }
    } catch (error) {
      toastLoadingFailAction(loadingId, error.response.data.message);
      setLoading(false);
    }
  }

  const handleUpdateClass = async () => {
    const error = validateFormData();
    if (error > 0) return;

    const classUpdateReq: ClassUpdateRequest = {
      classID: classModalFormData.classID,
      classDescription: classModalFormData.classDescription,
      totalStudent: classModalFormData.totalStudent,
      expectedStartDate: classModalFormData.expectedStartDate || '',
      totalSession: classModalFormData.totalSession,
      price: classModalFormData.price,
    }

    try {
      const response = await classService.updateClass(classUpdateReq)
      if (response) {
        toast.success("Cập nhật lớp học thành công!");
        fetchClassPortal()
      }
    } catch (error) {
    }

  }

  const handleDeleteClass = async (classID: number) => {
    const loadingId = toast.loading("Đang cập nhật khoá học...");
    try {
      const response = await classService.deleteClass(classID)
      if (response) {
        toastLoadingSuccessAction(loadingId, response.message);
        fetchClassPortal()
      }
    } catch (error) {
      toastLoadingFailAction(loadingId, error.response.data.message)
    }
  }

  const fetchClassSessions = async (classID: number) => {
    try {
      const response = await classService.getClassSessionForPortal(classID)
      if (response) {
        setCellInfoData((prev) => ({
          ...prev,
          classID: classID,
          createdSessions: response.data
        }));
      }
    } catch (error) {
    }
  }
  useEffect(() => {
    fetchClassPortal()
  }, [classPaginationParam])

  //Init UE
  useEffect(() => {
    fetchCourseOptionsForPortal()
  }, [])

  return (
    <ClassPortalContext.Provider value={{
      loading,
      classPaginationParam, setClassPaginationParam,
      classPagination,
      isClassModalOpen, closeClassModel, showClassModal,
      classModalFormData, setClassModalFormData,
      courseOptionList,
      handleCreateClass,
      classFormDataError,
      handleUpdateClass,
      handleDeleteClass,
      fetchClassPortal,
      isClassSessionModalOpen, setClassSessionModalOpen,
      handleCancelSessionModal, handleOkSessionModal, showSessionModal,
      classSchedules, setClassSchedules,
      cellInfoData, setCellInfoData,
      isCreateSessionModal, setCreateSessionModal,
      handleOpenCreateSessionModal,
      handleCloseCreateSessionModal,
      createSessionModalData, setCreateSessionModalData, fetchClassSessions
    }}>
      {children}
    </ClassPortalContext.Provider>
  )
}

export const ClassPortal = () => {
  return (
    <ClassPortalProvider>
      <ClassPortalLayout />
    </ClassPortalProvider>
  )
}

export default ClassPortal