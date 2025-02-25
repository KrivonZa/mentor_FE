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
            if (lesson.description.trim() === "") {
                newLessonErrorMessage[index].description = "Lesson Description is required";
                errCount++;
            } else {
                newLessonErrorMessage[index].description = "";
            }
            if (lesson.lessonStatus.trim() === "") {
                newLessonErrorMessage[index].lessonStatus = "Lesson Status is required";
                errCount++;
            } else {
                newLessonErrorMessage[index].lessonStatus = "";
            }

            if (lesson.schedule.length > 0) {
                lesson.schedule.forEach((schedule, scheduleIndex) => {
                    if (!schedule.startTime) {
                        newLessonErrorMessage[index].schedule[scheduleIndex].startTime = "Start Time is required";
                        errCount++;
                    } else {
                        newLessonErrorMessage[index].schedule[scheduleIndex].startTime = null;
                    }
                    if (!schedule.endTime) {
                        newLessonErrorMessage[index].schedule[scheduleIndex].endTime = "End Time is required";
                        errCount++;
                    } else {
                        newLessonErrorMessage[index].schedule[scheduleIndex].endTime = null;
                    }
                });
            }
        });

        setLessonErrorMessage([...newLessonErrorMessage]);

        return errCount
    }

    const handleCreate = async () => {
        try {
            const errCount = validateLessonDetailTabs()
            if (errCount > 0) return

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
            if (response.data) toast.success("Create course successfully!");
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
                                        label="Lesson Description"
                                        name={[name, "description"]}
                                        rules={[{ required: true, message: "Please enter lesson description" }]}
                                    >
                                        <Input.TextArea
                                            placeholder="Enter lesson description"
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

                                    {/* Lesson Status */}
                                    <Form.Item
                                        label="Lesson Status"
                                        name={[name, "lessonStatus"]}
                                        rules={[{ required: true, message: "Please select lesson status" }]}
                                    >
                                        <Select
                                            placeholder="Select lesson status"
                                            onChange={(value) => {
                                                setLessonDetailFormDataList((prev) =>
                                                    prev.map((lesson, index) =>
                                                        index === name ? { ...lesson, lessonStatus: value } : lesson
                                                    )
                                                );
                                            }}
                                            value={lessonDetailFormDataList[name]?.lessonStatus ?? undefined} // Ensures controlled component
                                            options={lessonStatusOptions}
                                        />
                                        <span className='text-danger'>{lessonErrorMessage[name]?.lessonStatus}</span>
                                    </Form.Item>

                                    {/* Trial Lesson */}
                                    <Form.Item
                                        {...restField}
                                        label="Trial Lesson"
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

                                    {/* Lesson Schedule */}
                                    <Form.List name={[name, "schedule"]}>
                                        {(scheduleFields, { add: addSchedule, remove: removeSchedule }) => (
                                            <>
                                                {scheduleFields.length === 0 ? (
                                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                                ) : (
                                                    scheduleFields.map(({ key: scheduleKey, name: scheduleName, ...scheduleRestField }) => (
                                                        <div key={scheduleKey} style={{ width: "100%", display: "flex", flexDirection: "column", marginBottom: 8, padding: 10, border: "1px dashed #ccc" }}>
                                                            <Space align="baseline" style={{ display: "flex", flexDirection: "row", marginBottom: 8 }}>
                                                                {/* Start Time */}
                                                                <Form.Item
                                                                    {...scheduleRestField}
                                                                    name={[scheduleName, "startTime"]}
                                                                    rules={[{ required: true, message: "Start time is required" }]}
                                                                >
                                                                    <DatePicker
                                                                        showTime
                                                                        format="YYYY-MM-DD HH:mm:ss"
                                                                        onChange={(date, dateString) => {
                                                                            const startTimeValue: any = dateString;

                                                                            setLessonDetailFormDataList((prev) =>
                                                                                prev.map((lesson, lessonIndex) =>
                                                                                    lessonIndex === name
                                                                                        ? {
                                                                                            ...lesson,
                                                                                            schedule: lesson.schedule.map((schedule, scheduleIndex) =>
                                                                                                scheduleIndex === scheduleName
                                                                                                    ? { ...schedule, startTime: startTimeValue }
                                                                                                    : schedule
                                                                                            ),
                                                                                        }
                                                                                        : lesson
                                                                                )
                                                                            );
                                                                        }}
                                                                        disabledDate={(current) => {
                                                                            const now = dayjs();
                                                                            const endTime = lessonDetailFormDataList[name]?.schedule[scheduleName]?.endTime
                                                                                ? dayjs(lessonDetailFormDataList[name].schedule[scheduleName].endTime)
                                                                                : null;

                                                                            // Disable past dates
                                                                            if (current.isBefore(now, "day")) {
                                                                                return true;
                                                                            }

                                                                            // Disable dates after endTime if endTime exists
                                                                            if (endTime && current.isAfter(endTime, "day")) {
                                                                                return true;
                                                                            }

                                                                            return false;
                                                                        }}
                                                                        disabledTime={(current) => {
                                                                            if (!current) return {};

                                                                            const now = dayjs();
                                                                            const endTime = lessonDetailFormDataList[name]?.schedule[scheduleName]?.endTime
                                                                                ? dayjs(lessonDetailFormDataList[name].schedule[scheduleName].endTime)
                                                                                : null;

                                                                            return {
                                                                                disabledHours: () => {
                                                                                    const hours: number[] = [];

                                                                                    // Disable past hours if the selected date is today
                                                                                    if (current.isSame(now, "day")) {
                                                                                        for (let i = 0; i < now.hour(); i++) {
                                                                                            hours.push(i);
                                                                                        }
                                                                                    }

                                                                                    // Disable hours after endTime if endTime exists and is on the same day
                                                                                    if (endTime && current.isSame(endTime, "day")) {
                                                                                        for (let i = endTime.hour() + 1; i < 24; i++) {
                                                                                            hours.push(i);
                                                                                        }
                                                                                    }

                                                                                    return hours;
                                                                                },
                                                                                disabledMinutes: (selectedHour) => {
                                                                                    const minutes: number[] = [];

                                                                                    // Disable past minutes if the selected date and hour is the current hour
                                                                                    if (current.isSame(now, "day") && selectedHour === now.hour()) {
                                                                                        for (let i = 0; i < now.minute(); i++) {
                                                                                            minutes.push(i);
                                                                                        }
                                                                                    }

                                                                                    // Disable minutes after endTime if selected hour matches endTime's hour
                                                                                    if (
                                                                                        endTime &&
                                                                                        current.isSame(endTime, "day") &&
                                                                                        selectedHour === endTime.hour()
                                                                                    ) {
                                                                                        for (let i = endTime.minute(); i < 60; i++) {
                                                                                            minutes.push(i);
                                                                                        }
                                                                                    }

                                                                                    return minutes;
                                                                                },
                                                                            };
                                                                        }}
                                                                    />
                                                                    <span className='text-danger'>{lessonErrorMessage[name]?.schedule[scheduleName].startTime}</span>
                                                                </Form.Item>

                                                                <span>-</span>

                                                                {/* End Time */}
                                                                <Form.Item
                                                                    {...scheduleRestField}
                                                                    name={[scheduleName, "endTime"]}
                                                                    rules={[{ required: true, message: "End time is required" }]}
                                                                >
                                                                    <DatePicker
                                                                        showTime
                                                                        format="YYYY-MM-DD HH:mm:ss"
                                                                        onChange={(date, dateString) => {
                                                                            const endTimeValue: any = dateString;

                                                                            setLessonDetailFormDataList((prev) =>
                                                                                prev.map((lesson, lessonIndex) =>
                                                                                    lessonIndex === name
                                                                                        ? {
                                                                                            ...lesson,
                                                                                            schedule: lesson.schedule.map((schedule, scheduleIndex) =>
                                                                                                scheduleIndex === scheduleName
                                                                                                    ? { ...schedule, endTime: endTimeValue }
                                                                                                    : schedule
                                                                                            ),
                                                                                        }
                                                                                        : lesson
                                                                                )
                                                                            );
                                                                        }}
                                                                        disabledDate={(current) => {
                                                                            const now = dayjs();
                                                                            const startTime = lessonDetailFormDataList[name]?.schedule[scheduleName]?.startTime
                                                                                ? dayjs(lessonDetailFormDataList[name]?.schedule[scheduleName]?.startTime)
                                                                                : null;

                                                                            // Disable before startTime if exists
                                                                            if (startTime && current.isBefore(startTime, "day")) {
                                                                                return true;
                                                                            }

                                                                            // Disable past dates
                                                                            if (current.isBefore(now, "day")) {
                                                                                return true;
                                                                            }

                                                                            return false;

                                                                        }}
                                                                        disabledTime={(current) => {
                                                                            if (!current) return {};

                                                                            const startTime = dayjs(lessonDetailFormDataList[name]?.schedule[scheduleName]?.startTime);

                                                                            // If the selected date is the same as startTime's date, disable past hours and minutes
                                                                            if (current.isSame(startTime, "day")) {
                                                                                return {
                                                                                    disabledHours: () =>
                                                                                        Array.from({ length: startTime.hour() }, (_, i) => i), // Disable hours before startTime
                                                                                    disabledMinutes: (selectedHour) =>
                                                                                        selectedHour === startTime.hour()
                                                                                            ? Array.from({ length: startTime.minute() }, (_, i) => i) // Disable minutes before startTime
                                                                                            : [],
                                                                                    disabledSeconds: (selectedHour, selectedMinute) =>
                                                                                        selectedHour === startTime.hour() && selectedMinute === startTime.minute()
                                                                                            ? Array.from({ length: startTime.second() }, (_, i) => i) // Disable seconds before startTime
                                                                                            : []
                                                                                };
                                                                            }
                                                                            return {};
                                                                        }}
                                                                    />
                                                                    <span className='text-danger'>{lessonErrorMessage[name]?.schedule[scheduleName].endTime}</span>
                                                                </Form.Item>

                                                                {/* Remove Schedule Button */}
                                                                <Button danger
                                                                    onClick={() => {
                                                                        removeSchedule(scheduleName); // Removes the form field from Ant Design Form.List

                                                                        setLessonDetailFormDataList((prev) =>
                                                                            prev.map((lesson, index) =>
                                                                                index === name
                                                                                    ? {
                                                                                        ...lesson,
                                                                                        schedule: lesson.schedule.filter(
                                                                                            (_, scheduleIndex) => scheduleIndex !== scheduleName
                                                                                        ),
                                                                                    }
                                                                                    : lesson
                                                                            )
                                                                        );

                                                                        //Error
                                                                        setLessonErrorMessage((prev) =>
                                                                            prev.map((lesson, index) =>
                                                                                index === name
                                                                                    ? {
                                                                                        ...lesson,
                                                                                        schedule: lesson.schedule.filter(
                                                                                            (_, scheduleIndex) => scheduleIndex !== scheduleName
                                                                                        ),
                                                                                    }
                                                                                    : lesson
                                                                            )
                                                                        );


                                                                    }}
                                                                >
                                                                    <MinusOutlined />
                                                                </Button>
                                                            </Space>
                                                            <Form.Item {...scheduleRestField} name={[scheduleName, "googleMeetUrl"]}>
                                                                <Input
                                                                    placeholder="Enter Google Meet URL"
                                                                    value={lessonDetailFormDataList[name]?.schedule[scheduleName]?.googleMeetUrl || ""}
                                                                    onChange={(e) => {
                                                                        const newValue = e.target.value;

                                                                        setLessonDetailFormDataList((prev) =>
                                                                            prev.map((lesson, lessonIndex) =>
                                                                                lessonIndex === name
                                                                                    ? {
                                                                                        ...lesson,
                                                                                        schedule: lesson.schedule.map((schedule, scheduleIndex) =>
                                                                                            scheduleIndex === scheduleName
                                                                                                ? { ...schedule, googleMeetUrl: newValue }
                                                                                                : schedule
                                                                                        ),
                                                                                    }
                                                                                    : lesson
                                                                            )
                                                                        );
                                                                    }}
                                                                />
                                                            </Form.Item>
                                                        </div>

                                                    ))
                                                )}

                                                {/* Add Schedule Button */}
                                                <Button className='w-75 m-auto mb-3' type="dashed"
                                                    onClick={() => {
                                                        addSchedule(); // Adds a new form field in Ant Design Form.List

                                                        const newSchedule = {
                                                            scheduleID: -1,
                                                            startTime: null,
                                                            endTime: null,
                                                            googleMeetUrl: null,
                                                        }

                                                        setLessonDetailFormDataList((prev) =>
                                                            prev.map((lesson, index) =>
                                                                index === name
                                                                    ? {
                                                                        ...lesson,
                                                                        schedule: [
                                                                            ...lesson.schedule,
                                                                            newSchedule
                                                                        ],
                                                                    }
                                                                    : lesson
                                                            )
                                                        );

                                                        //Error Validate
                                                        setLessonErrorMessage((prev) =>
                                                            prev.map((lesson, index) =>
                                                                index === name
                                                                    ? {
                                                                        ...lesson,
                                                                        schedule: [
                                                                            ...lesson.schedule,
                                                                            newSchedule
                                                                        ],
                                                                    }
                                                                    : lesson
                                                            )
                                                        );

                                                    }}
                                                    block>
                                                    <PlusOutlined /> Add Schedule
                                                </Button>
                                            </>
                                        )}
                                    </Form.List>

                                    {/* Remove Lesson Button */}
                                    < Button style={{ width: '90%' }} className='m-auto mt-2' type="dashed" danger onClick={() => {
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
                            Add Lesson
                        </Button>
                    </>
                )
                }
            </Form.List >

            {/* Enable Lesson Tab Button */}
            <div className="text-right" style={{ marginTop: 16 }}>
                <Button type="primary" onClick={() => navigateTab("1")} style={{ marginRight: 8 }} className='bg-warning'>
                    Previous: Update Course
                </Button>
                <Button type="primary" onClick={() => handleCreate()} className='bg-primary'>
                    Create course
                </Button>
            </div>
        </Form >
    )
}

export default LessonFormTab