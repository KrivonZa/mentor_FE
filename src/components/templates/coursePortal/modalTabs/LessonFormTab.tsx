import { Button, DatePicker, Empty, Form, Input, Select, Space, Switch } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { CoursePortalContext } from '../../../../modules/mainPage/CoursePortal';
import { toast } from 'react-toastify';
import { CourseDetailFormData, CreateCourseRequest } from '../../../../types/courseModel';
import courseService from '../../../../services/courseService';
import { LessonDetailFormData } from '../../../../types/lessonModel';
import { ScheduleCreateRequest } from '../../../../types/scheduleModel';
import dayjs from 'dayjs';
import { toastLoadingFailAction, toastLoadingSuccessAction } from '../../../../utils/functions';

export const LessonFormTab = () => {

  const context = useContext(CoursePortalContext);
  if (!context) throw new Error("SomeComponent must be used within a CoursePortalProvider");

  const { setIsCourseDetailModalOpen, resetCourseDetailModal,
    fileList, courseDetailFormData, setCourseDetailFormData,
    fetchPortalDetail, navigateTab,
    lessonErrorMessage, setLessonErrorMessage, handleCloseCourseModal
  } = context;

  const [lessonDetailFormDataList, setLessonDetailFormDataList] = useState<LessonDetailFormData[]>([]);

  useEffect(() => {
    setCourseDetailFormData((prev) => ({
      ...prev,
      lesson: lessonDetailFormDataList, // Sync lesson data
    }));

  }, [lessonDetailFormDataList])

  const handleClose = () => {
    // setPreviewOpen(false);
    setIsCourseDetailModalOpen(false);
    resetCourseDetailModal();
  }

  // IN_COMMING,
  // IN_PROGRESS,
  // CANCELLED,
  const lessonStatusOptions = [
    { value: "IN_COMMING", label: "In Comming" },
    { value: "IN_PROGRESS", label: "In Progress" },
    { value: "CANCELLED", label: "Cancelled" }
  ];

  //Validate for This tab:
  const validateLessonDetailTabs = () => {
    let errCount = 0

    let newLessonErrorMessage: LessonDetailFormData[] = [...lessonErrorMessage];

    lessonDetailFormDataList.forEach((lesson, index) => {
      if (lesson.description.trim() == "") {
        newLessonErrorMessage[index].description = "Lesson Description is required";
        errCount++;
      } else {
        newLessonErrorMessage[index].description = "";
      }
      // if (lesson.lessonStatus.trim() == "") {
      //     newLessonErrorMessage[index].lessonStatus = "Lesson Status is required";
      //     errCount++;
      // } else {
      //     newLessonErrorMessage[index].lessonStatus = "";
      // }


      // if (lesson.schedule.length > 0) {
      //     lesson.schedule.forEach((schedule, scheduleIndex) => {
      //         if (!schedule.startTime) {
      //             newLessonErrorMessage[index].schedule[scheduleIndex].startTime = "Start Time is required";
      //             errCount++;
      //         } else {
      //             newLessonErrorMessage[index].schedule[scheduleIndex].startTime = null;
      //         }
      //         if (!schedule.endTime) {
      //             newLessonErrorMessage[index].schedule[scheduleIndex].endTime = "End Time is required";
      //             errCount++;
      //         } else {
      //             newLessonErrorMessage[index].schedule[scheduleIndex].endTime = null;
      //         }
      //     });
      // }
    });

    if (lessonDetailFormDataList.length == 0) {
      errCount++;
    }

    setLessonErrorMessage([...newLessonErrorMessage]);

    return errCount
  }

  const handleCreate = async () => {
    const loadingId = toast.loading("Đang tạo nội dung khoá học...");
    try {
      const errCount = validateLessonDetailTabs()
      if (errCount > 0) {
        toastLoadingFailAction(loadingId, "Vui lòng không để trống các trường cần thiết.");
        return
      }

      const request: CreateCourseRequest = {
        thumbnail: fileList[0],
        course: {
          skillIDs: courseDetailFormData.skill,
          courseName: courseDetailFormData.courseName,
          description: courseDetailFormData.description,
          price: courseDetailFormData.price,
          freeTrial: courseDetailFormData.freeTrial,
          totalStudent: courseDetailFormData.totalStudent,
          level: courseDetailFormData.level,
          lesson: courseDetailFormData.lesson
        }
      }

      const response = await courseService.createCourse(request);
      if (response.data) toastLoadingSuccessAction(loadingId, "Không thể tạo nội dung khoá học");

      await fetchPortalDetail();
      handleCloseCourseModal();

    } catch (error) {
      console.error("Error creating courseeeeeeee:", error);
    }
  }


  return (
    <Form
      id='courseDetailForm'
      // form={courseDetailForm}
      layout="vertical"
      initialValues={courseDetailFormData}
    >
      <Form.List name="lesson">
        {(fields, { add, remove }) => (
          <>
            {fields.length === 0 ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              fields.map(({ key, name, ...restField }) => (
                <div key={key} style={{ width: "100%", display: "flex", flexDirection: "column", marginBottom: 8, padding: 10, border: "1px dashed #ccc" }}>

                  {/* Lesson Description */}
                  <Form.Item
                    {...restField}
                    label="Mô Tả Nội Dung Khoá Học"
                    name={[name, "description"]}
                    rules={[{ required: true, message: "Vui Lòng Nhập Mô Tả Nội Dung Khoá Học" }]}
                  >
                    <Input.TextArea
                      placeholder="Vd: Cài đặt thư viện và IDE cần thiết cho ReactJS."
                      onChange={(e) => {
                        setLessonDetailFormDataList((prev) =>
                          prev.map((lesson, index) =>
                            index === name ? { ...lesson, description: e.target.value } : lesson
                          )
                        );

                      }}
                    />
                    <span className='text-danger'>{lessonErrorMessage[name]?.description}</span>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="Nội Dung Học Thử?"
                    name={[name, "trialLesson"]}
                    valuePropName="checked"
                  >
                    <Switch
                      onChange={(checked) => {
                        setLessonDetailFormDataList((prev) =>
                          prev.map((lesson: LessonDetailFormData, index) =>
                            index === name ? { ...lesson, trialLesson: checked } : lesson
                          )
                        );
                      }}
                      value={lessonDetailFormDataList[name]?.trialLesson || false}
                    />
                  </Form.Item>

                  {/* Remove Lesson Button */}
                  <Button style={{ width: '90%' }} className='m-auto mt-2' type="dashed" danger onClick={() => {
                    remove(name)
                    setLessonDetailFormDataList((prev) => ([...prev.slice(0, name), ...prev.slice(name + 1)]));
                    setLessonErrorMessage((prev) => ([...prev.slice(0, name), ...prev.slice(name + 1)]));
                  }}>
                    <MinusOutlined />
                  </Button>
                </div>
              ))
            )}

            {/* Add Lesson Button */}
            <Button type="dashed" onClick={() => {
              add()
              const newLesson: LessonDetailFormData = {
                lessonID: -1,
                courseID: -1,
                description: "",
                lessonStatus: "",
                trialLesson: false,
                schedule: []
              }
              setLessonDetailFormDataList((prev) => ([...prev, newLesson]))

              setLessonErrorMessage((prev) => ([...prev, newLesson]))
            }}
              block icon={<PlusOutlined />}>
              Thêm Nội Dung Mới
            </Button>
          </>
        )
        }
      </Form.List >

      {/* Enable Lesson Tab Button */}
      <div className="text-right" style={{ marginTop: 16 }}>
        <Button type="primary" onClick={() => navigateTab("1")} style={{ marginRight: 8 }} className='bg-warning'>
          Trang Trước: Cập Nhật Khoá Học
        </Button>
        <Button type="primary" onClick={() => handleCreate()} className='bg-primary'>
          Tạo Khoá Học
        </Button>
      </div>
    </Form >
  )
}

export default LessonFormTab