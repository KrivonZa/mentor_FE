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
import { toastLoadingFailAction, toastLoadingSuccessAction } from '../../../utils/functions';
dayjs.extend(buddhistEra);

export const CourseDetailModal = () => {
    const context = useContext(CoursePortalContext);
    if (!context) throw new Error("SomeComponent must be used within a CoursePortalProvider");

    const { isCourseDetailModalOpen, setIsCourseDetailModalOpen, courseDetailFormData, setCourseDetailFormData, resetCourseDetailModal, listSkill,
        fileList, setFileList, fetchPortalDetail, setPreviewOpen, resetCourseErrorMessage, resetLessonErrorMessage, handleCloseCourseModal,
        valdateCourseDetailTabs
    } = context;


    const handleUpdate = async () => {
        try {
            if (valdateCourseDetailTabs() != 0) return;

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
            if (!response) {
                toastLoadingFailAction(loadingId, "Got error when update course!");
                return
            } else {
                await fetchPortalDetail();
                toastLoadingSuccessAction(loadingId, "Update course: " + courseDetailFormData.courseName + " successfully!");
            }

            handleCloseCourseModal();

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
            style={{ height: '85vh', width: '90vw', overflowY: 'auto', maxHeight: 'calc(100vh - 200px)', paddingRight: '10px' }}
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
        </Modal >
    )
}

export default CourseDetailModal