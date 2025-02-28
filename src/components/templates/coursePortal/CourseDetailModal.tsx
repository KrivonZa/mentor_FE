import { Button, Form, Input, InputNumber, Modal, Switch, Select, Upload, UploadFile, UploadProps, GetProp, Image, Empty, Space, DatePicker, Tabs } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { CoursePortalContext } from '../../../modules/mainPage/CoursePortal';
import { Option } from 'antd/es/mentions';
import './modal.scss';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import courseService from '../../../services/courseService';
import Swal from 'sweetalert2';
import { CourseDetailFormData, CreateCourseRequest, UpdateCourseRequest } from '../../../types/courseModel';
import type { SelectProps } from 'antd';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import CourseFormTab from './modalTabs/CourseFormTab';
import LessonFormTab from './modalTabs/LessonFormTab';
import CourseModalTab from './modalTabs';
import { toastLoadingSuccessAction } from '../../../utils/functions';
dayjs.extend(buddhistEra);

export const CourseDetailModal = () => {
    const context = useContext(CoursePortalContext);
    if (!context) throw new Error("SomeComponent must be used within a CoursePortalProvider");

    const { isCourseDetailModalOpen, setIsCourseDetailModalOpen, courseDetailFormData, setCourseDetailFormData, resetCourseDetailModal, listSkill,
        fileList, setFileList, fetchPortalDetail, setPreviewOpen, resetCourseErrorMessage, resetLessonErrorMessage, handleCloseCourseModal
    } = context;


    const handleUpdate = async () => {
        try {
            if (fileList.length == 0) {
                toast.error("Please upload thumbnail!");
                return
            }

            console.log("courseID: ", courseDetailFormData.courseID);
            console.log("fileList:", fileList[0]);

            let courseThumbnail: any = null

            //uuid = -1 => old, uuid != -1 => new
            if (fileList[0].uid != '-1') {
                courseThumbnail = fileList[0];
            }

            const request: UpdateCourseRequest = {
                thumbnail: courseThumbnail,
                course: {
                    courseID: courseDetailFormData.courseID,
                    skillIDs: courseDetailFormData.skill,
                    courseName: courseDetailFormData.courseName,
                    description: courseDetailFormData.description,
                    price: courseDetailFormData.price,
                    freeTrial: courseDetailFormData.freeTrial,
                    totalStudent: courseDetailFormData.totalStudent,
                    level: courseDetailFormData.level,
                }

            }

            const loadingId = toast.loading("Update course...");

            const response = await courseService.updateCourse(request);
            await fetchPortalDetail();
            toastLoadingSuccessAction(loadingId, "Update course: " + courseDetailFormData.courseName + " successfully!");


        } catch (error) {
            console.error("Error creating course:", error);
        }
        console.log("Submit ne");
    }

    return (
        <Modal
            wrapClassName='courseDetailModal'
            title="Course Details"
            open={isCourseDetailModalOpen}
            onOk={handleCloseCourseModal}
            onCancel={handleCloseCourseModal}
            style={{ height: '85vh', width: '90vw' }}
            bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)', paddingRight: '10px' }}
            footer={null} // Remove default buttons, add custom buttons inside form
        >
            {courseDetailFormData.courseID == -1
                ? (<CourseModalTab />)
                : (<CourseFormTab />)
            }


            {/* These button only appear for update course! */}
            {courseDetailFormData.courseID != -1 &&
                <div className="text-right" style={{ marginTop: 16 }}>
                    <Button onClick={handleCloseCourseModal} style={{ marginRight: 8 }}>
                        Cancel
                    </Button>
                    <Button type="primary" style={{ background: '#5FCF80' }} htmlType="submit" onClick={handleUpdate}>
                        Save
                    </Button>
                </div>
            }


            {/* Lesson and Schedule  */}
            {
                courseDetailFormData.courseID == -2
                && (
                    <React.Fragment>
                        <Form.Item
                            label="Lesson Description"
                            name="description"
                            rules={[{ required: true, message: "Please enter lesson description" }]}
                        >
                            <Input.TextArea
                                placeholder="Enter Lesson Description"
                                name="description"
                            // value={lessonDetailFormData.description}
                            // onChange={handleInputChange}
                            />
                        </Form.Item>

                        {/* Lesson Status */}
                        <Form.Item
                            label="Lesson Status"
                            name="lessonStatus"
                            rules={[{ required: true, message: "Please select lesson status" }]}
                        >
                            <Select
                                placeholder="Select lesson status"
                            // value={lessonDetailFormData.lessonStatus} // Directly use the stored value
                            // onChange={handleSelectChange} // Directly pass value
                            // options={lessonStatusOptions}
                            />
                        </Form.Item>

                        {/* Is Trial Lesson */}
                        <Form.Item label="Trial Lesson" name="trialLesson" valuePropName="checked">
                            <Switch
                            // checked={lessonDetailFormData.trialLesson}
                            // onChange={handleSwitchChange}
                            />
                        </Form.Item>

                        {/* Schedule */}

                        <Form.List name="schedule">
                            {(fields, { add, remove }) => (
                                <React.Fragment>
                                    {fields.length === 0 ? (
                                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                    ) : (
                                        fields.map(({ key, name, ...restField }) => (
                                            <React.Fragment key={name}>
                                                <Space key={key} align="baseline">
                                                    {/* Start Time */}
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, "startTime"]}
                                                        getValueProps={(value) => ({
                                                            value: value ? dayjs(value) : null,
                                                        })}
                                                    >
                                                        <DatePicker
                                                            showTime
                                                            // locale={buddhistLocale}
                                                            format="YYYY-MM-DD HH:mm:ss"
                                                            required={true}
                                                            onChange={(date, dateString) => {
                                                                //name: idx
                                                                // const currentSchedule = lessonDetailFormData?.schedule[name] || null;

                                                                // if (currentSchedule != null) {
                                                                //     currentSchedule.startTime = dateString as string;
                                                                //     setLessonDetailFormData((prev) => ({ ...prev, schedule: [...prev.schedule] }));
                                                                // } else {
                                                                //     //create new schedule object
                                                                //     const newSchedule: ScheduleCreateRequest = {
                                                                //         startTime: dateString as string,
                                                                //         endTime: null,
                                                                //         googleMeetUrl: null
                                                                //     }
                                                                //     setLessonDetailFormData((prev) => ({ ...prev, schedule: [...prev.schedule, newSchedule] }));
                                                                // }
                                                            }}
                                                        // disabledDate={(current) => {
                                                        //     const now = dayjs();
                                                        //     const endTime = lessonDetailFormData?.schedule[name]?.endTime
                                                        //         ? dayjs(lessonDetailFormData.schedule[name].endTime)
                                                        //         : null;

                                                        //     // Disable past dates
                                                        //     if (current.isBefore(now, "day")) {
                                                        //         return true;
                                                        //     }

                                                        //     // Disable dates after endTime if endTime exists
                                                        //     if (endTime && current.isAfter(endTime, "day")) {
                                                        //         return true;
                                                        //     }

                                                        //     return false;
                                                        // }}
                                                        // disabledTime={(current) => {
                                                        //     if (!current) return {};

                                                        //     const now = dayjs();
                                                        //     const endTime = lessonDetailFormData?.schedule[name]?.endTime
                                                        //         ? dayjs(lessonDetailFormData.schedule[name].endTime)
                                                        //         : null;

                                                        //     return {
                                                        //         disabledHours: () => {
                                                        //             const hours: number[] = [];

                                                        //             // Disable past hours if the selected date is today
                                                        //             if (current.isSame(now, "day")) {
                                                        //                 for (let i = 0; i < now.hour(); i++) {
                                                        //                     hours.push(i);
                                                        //                 }
                                                        //             }

                                                        //             // Disable hours after endTime if endTime exists and is on the same day
                                                        //             if (endTime && current.isSame(endTime, "day")) {
                                                        //                 for (let i = endTime.hour() + 1; i < 24; i++) {
                                                        //                     hours.push(i);
                                                        //                 }
                                                        //             }

                                                        //             return hours;
                                                        //         },
                                                        //         disabledMinutes: (selectedHour) => {
                                                        //             const minutes: number[] = [];

                                                        //             // Disable past minutes if the selected date and hour is the current hour
                                                        //             if (current.isSame(now, "day") && selectedHour === now.hour()) {
                                                        //                 for (let i = 0; i < now.minute(); i++) {
                                                        //                     minutes.push(i);
                                                        //                 }
                                                        //             }

                                                        //             // Disable minutes after endTime if selected hour matches endTime's hour
                                                        //             if (
                                                        //                 endTime &&
                                                        //                 current.isSame(endTime, "day") &&
                                                        //                 selectedHour === endTime.hour()
                                                        //             ) {
                                                        //                 for (let i = endTime.minute(); i < 60; i++) {
                                                        //                     minutes.push(i);
                                                        //                 }
                                                        //             }

                                                        //             return minutes;
                                                        //         },
                                                        //     };
                                                        // }}
                                                        />
                                                    </Form.Item>

                                                    <span>-</span>

                                                    {/* End Time */}
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, "endTime"]}
                                                        getValueProps={(value) => ({
                                                            value: value ? dayjs(value) : null,
                                                        })}
                                                    >
                                                        <DatePicker
                                                            showTime
                                                            format="YYYY-MM-DD HH:mm:ss"
                                                            required={true}
                                                            // disabled={lessonDetailFormData.lessonID != -1}
                                                            onChange={(date, dateString) => {
                                                                //name: idx
                                                                // const currentSchedule = lessonDetailFormData?.schedule[name] || null;

                                                                // if (currentSchedule != null) {
                                                                //     currentSchedule.endTime = dateString as string;
                                                                //     setLessonDetailFormData((prev) => ({ ...prev, schedule: [...prev.schedule] }));
                                                                // } else {
                                                                //     //create new schedule object
                                                                //     const newSchedule: ScheduleCreateRequest = {
                                                                //         startTime: null,
                                                                //         endTime: dateString as string,
                                                                //         googleMeetUrl: null
                                                                //     }
                                                                //     setLessonDetailFormData((prev) => ({ ...prev, schedule: [...prev.schedule, newSchedule] }));
                                                                // }
                                                            }}

                                                        //Disable date before start time
                                                        // disabledDate={(current) => {
                                                        //     const now = dayjs();
                                                        //     const startTime = lessonDetailFormData?.schedule[name]?.startTime
                                                        //         ? dayjs(lessonDetailFormData.schedule[name].startTime)
                                                        //         : null;

                                                        //     // Disable before startTime if exists
                                                        //     if (startTime && current.isBefore(startTime, "day")) {
                                                        //         return true;
                                                        //     }

                                                        //     // Disable past dates
                                                        //     if (current.isBefore(now, "day")) {
                                                        //         return true;
                                                        //     }

                                                        //     return false;

                                                        // }}
                                                        // disabledTime={(current) => {
                                                        //     if (!current) return {};

                                                        //     const startTime = dayjs(lessonDetailFormData?.schedule[name]?.startTime);

                                                        //     // If the selected date is the same as startTime's date, disable past hours and minutes
                                                        //     if (current.isSame(startTime, "day")) {
                                                        //         return {
                                                        //             disabledHours: () =>
                                                        //                 Array.from({ length: startTime.hour() }, (_, i) => i), // Disable hours before startTime
                                                        //             disabledMinutes: (selectedHour) =>
                                                        //                 selectedHour === startTime.hour()
                                                        //                     ? Array.from({ length: startTime.minute() }, (_, i) => i) // Disable minutes before startTime
                                                        //                     : [],
                                                        //             disabledSeconds: (selectedHour, selectedMinute) =>
                                                        //                 selectedHour === startTime.hour() && selectedMinute === startTime.minute()
                                                        //                     ? Array.from({ length: startTime.second() }, (_, i) => i) // Disable seconds before startTime
                                                        //                     : []
                                                        //         };
                                                        //     }
                                                        //     return {};
                                                        // }}
                                                        />
                                                    </Form.Item>
                                                    <Button danger onClick={() => {
                                                        remove(name)
                                                        // let newSchedule = lessonDetailFormData.schedule.filter((schedule, index) => index !== name);
                                                        // setLessonDetailFormData((prev) => ({ ...prev, schedule: newSchedule }));
                                                    }}>Remove</Button>
                                                </Space>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "googleMeetUrl"]}
                                                    getValueProps={(value) => ({
                                                        value: value ? (value) : null,
                                                    })}
                                                >
                                                    <Input
                                                        placeholder="Enter google meet url"
                                                        name="googleMeetUrl"
                                                        onChange={(e) => {
                                                            // const currentSchedule = lessonDetailFormData?.schedule[name] || null;
                                                            // console.log("dsadsahdbasd: ", currentSchedule);

                                                            // if (currentSchedule != null) {
                                                            //     currentSchedule.googleMeetUrl = e.target.value
                                                            //     // console.log("hehe: ", e.target.value);
                                                            //     setLessonDetailFormData((prev) => ({ ...prev, schedule: [...prev.schedule] }));
                                                            // } else {
                                                            //     const newSchedule: ScheduleCreateRequest = {
                                                            //         startTime: null,
                                                            //         endTime: null,
                                                            //         googleMeetUrl: e.target.value
                                                            //     }
                                                            //     setLessonDetailFormData((prev) => ({ ...prev, schedule: [...prev.schedule, newSchedule] }));
                                                            // }
                                                        }}
                                                    />
                                                </Form.Item>

                                                <hr />
                                            </React.Fragment>
                                        ))
                                    )}
                                    <Button onClick={() => {
                                        add();
                                    }} className="mb-2 border-success" type="dashed" block>
                                        Add Schedule
                                    </Button>
                                </React.Fragment>
                            )}
                        </Form.List>
                    </React.Fragment>
                )
            }
        </Modal >
    )
}

export default CourseDetailModal