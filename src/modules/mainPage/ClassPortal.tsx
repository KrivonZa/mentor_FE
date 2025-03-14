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

interface ClassFormDataProps {
  classID: number
  classDescription: string
  totalStudent: number
  price: number
  courseID?: number
  classSchedules: {
    classScheduleID: number
    dayOfWeek: number
    startTime: string
    endTime: string
  }[] | any
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
  fetchClassPortal: () => Promise<void>
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
  const [classPagination, setClassPagination] = useState<Pagable<ClassPortalOverallResposne>| any>({});


  //classModal
  const [isClassModalOpen, setClassModalOpen] = useState(false)
  //ForApisubmit?
  const [classModalFormData, setClassModalFormData] = useState<ClassFormDataProps>({
    classID: -1,
    classDescription: '',
    totalStudent: 0,
    price: 0,
    courseID: undefined,
    classSchedules: []
  })
  const [classFormDataError, setClassFormDataError] = useState({
    classDescription: '',
    totalStudent: '',
    price: '',
    courseID: ''
  })

  const [courseOptionList, setCourseOptionList] = useState<SelectProps['options']>([]);

  const resetClassModalFormData = () => {
    setClassModalFormData({
      classID: -1,
      classDescription: '',
      totalStudent: 0,
      price: 0,
      courseID: undefined,
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
      newCourseDetailError.classDescription = "Class Description is required";
      errCount++;
    }

    if (classModalFormData.totalStudent <= 0) {
      newCourseDetailError.totalStudent = "Class must have at least 1 student";
      errCount++;
    }

    if (classModalFormData.price < 10000) {
      newCourseDetailError.price = "Price must be above 10000VND";
    }

    if (!classModalFormData.courseID) {
      newCourseDetailError.courseID = "Please select a course";
    }

    setClassFormDataError(newCourseDetailError);

    return errCount;
  }

  const resetErrorMessage = () => {
    setClassFormDataError({
      classDescription: '',
      totalStudent: '',
      price: '',
      courseID: ''
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
      classSchedules: classModalFormData.classSchedules || []
    }

    try {
      const response = await classService.createClass(classCreateReq)
      if (response) {
        toast.success(response.message);
        fetchClassPortal()
      }
    } catch (error) {
      console.log("error: ", error);
    }

  }

  const handleUpdateClass = async () => {
    const error = validateFormData();
    if (error > 0) return;

    const classUpdateReq: ClassUpdateRequest = {
      classID: classModalFormData.classID,
      classDescription: classModalFormData.classDescription,
      totalStudent: classModalFormData.totalStudent,
      price: classModalFormData.price,
    }

    try {
      const response = await classService.updateClass(classUpdateReq)
      if (response) {
        toast.success(response.message);
        fetchClassPortal()
      }
    } catch (error) {
      console.log("error: ", error);
    }

  }

  const handleDeleteClass = async (classID: number) => {
    try {
      const response = await classService.deleteClass(classID)
      if (response) {
        toast.success(response.message);
        fetchClassPortal()
      }
    } catch (error) {
      console.log("error: ", error);
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
      fetchClassPortal
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