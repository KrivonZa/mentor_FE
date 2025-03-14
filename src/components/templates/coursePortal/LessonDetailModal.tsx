import React, { useContext, useEffect } from 'react'
import { CoursePortalContext } from '../../../modules/mainPage/CoursePortal';
import { Form, Input, Modal, Button, Switch, Select, ConfigProvider, Empty, Space, DatePicker, DatePickerProps } from 'antd';
import { LessonDetailFormData } from '../../../types/lessonModel';
import en from 'antd/es/date-picker/locale/en_US';
import enUS from 'antd/es/locale/en_US';
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import { Schedule, ScheduleCreateRequest } from '../../../types/scheduleModel';
import lessonService from '../../../services/lessonService';
import { toast } from 'react-toastify';
// import moment from 'moment';
import Swal from 'sweetalert2';
import scheduleService from '../../../services/scheduleService';
import { toastLoadingFailAction, toastLoadingSuccessAction } from '../../../utils/functions';
dayjs.extend(buddhistEra);



const buddhistLocale: typeof en = {
    ...en,
    lang: {
        ...en.lang,
        fieldDateFormat: 'BBBB-MM-DD',
        fieldDateTimeFormat: 'BBBB-MM-DD HH:mm:ss',
        yearFormat: 'BBBB',
        cellYearFormat: 'BBBB',
    },
};



const LessonDetailModal = () => {
    const context = useContext(CoursePortalContext);
    if (!context) throw new Error("SomeComponent must be used within a CoursePortalProvider");
    const { isLessonDetailModalOpen, setIsLessonDetailModalOpen, lessonDetailFormData, setLessonDetailFormData, fetchPortalDetail } = context;

    //form
    const [lessonDetailForm] = Form.useForm<LessonDetailFormData>();

    useEffect(() => {
        lessonDetailForm.setFieldsValue(lessonDetailFormData)
    }, [lessonDetailFormData])


    const handleCancel = () => {
        setIsLessonDetailModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLessonDetailFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle switch
    const handleSwitchChange = (checked) => {
        setLessonDetailFormData((prev) => ({ ...prev, trialLesson: checked }));
    };

    // Handle select dropdown
    const handleSelectChange = (value) => {
        setLessonDetailFormData((prev) => ({ ...prev, lessonStatus: value }));
    };

    // IN_COMMING,
    //     IN_PROGRESS,
    //     CANCELLED,
    const lessonStatusOptions = [
        { value: "IN_COMMING", label: "In Comming" },
        { value: "IN_PROGRESS", label: "In Progress" },
        { value: "CANCELLED", label: "Cancelled" }
    ];


    // DATEPICKER 
    const onChange: DatePickerProps['onChange'] = (_, dateStr) => {
        console.log('onChange:', dateStr);
    };

    //Submit
    //*Create-Lesson
    //create Lesson
    const handleSubmitForm = async () => {
        // lessonID = -1 ---> Create |  else ----> Update
        if (lessonDetailFormData.lessonID == -1) {
            const loadingId = toast.loading("Creating course...");
            try {

                const response = await lessonService.createLesson(lessonDetailFormData)

                if (response) {
                    await fetchPortalDetail();
                    toastLoadingSuccessAction(loadingId, "Create lesson " + lessonDetailFormData.description + " success!");
                    setIsLessonDetailModalOpen(false);
                }

            } catch (error) {
                toastLoadingFailAction(loadingId, "Failed when create lesson");
                setIsLessonDetailModalOpen(false);
            }
        } else {
            const loadingId = toast.loading("Update lesson...");

            try {
                const response = await lessonService.updateLesson(lessonDetailFormData)

                if (response) {
                    await fetchPortalDetail();
                    toastLoadingSuccessAction(loadingId, "Update lesson " + lessonDetailFormData.description + " success!");
                    setIsLessonDetailModalOpen(false);

                }
            } catch (error) {
                toastLoadingFailAction(loadingId, "Failed when update lesson");
                setIsLessonDetailModalOpen(false);
            }
        }
        // setIsLessonDetailModalOpen(false);
    };


    //Schedule
    const handleDeleteSchedule = async (scheduleID: number) => {
        const result = await Swal.fire({
            title: "Are you sure to delete this?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });
        const loadingId = toast.loading("Delete schedule...");
        if (result.isConfirmed) {
            await scheduleService.deleteSchedule(scheduleID); // Wait for deletion
            await fetchPortalDetail()
            toastLoadingSuccessAction(loadingId, "Delete Schedule Success");
            setIsLessonDetailModalOpen(false)
        }
    }


    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        defaultHoverBorderColor: "#4ab569",
                        defaultHoverColor: "#4ab569",
                    },
                },
            }}
        >
            <Modal
                title="Lesson Details"
                open={isLessonDetailModalOpen}
                // onOk={handleSubmitForm}
                onCancel={handleCancel}
                footer={null} // Remove default buttons, add custom buttons inside form
                maskClosable={false}
            >
                <Form
                    id='lessonDetailForm'
                    form={lessonDetailForm}
                    layout="vertical"
                    onFinish={handleSubmitForm}
                    initialValues={lessonDetailFormData}
                >
                    {/* Lesson Description */}
                    <Form.Item
                        label="Lesson Description"
                        name="description"
                        rules={[{ required: true, message: "Please enter lesson description" }]}
                    >
                        <Input.TextArea
                            placeholder="Enter Lesson Description"
                            name="description"
                            value={lessonDetailFormData.description}
                            onChange={handleInputChange}
                        />
                    </Form.Item>


                    {/* Is Trial Lesson */}
                    <Form.Item label="Trial Lesson" name="trialLesson" valuePropName="checked">
                        <Switch
                            checked={lessonDetailFormData.trialLesson}
                            onChange={handleSwitchChange}
                        />
                    </Form.Item>


                    {/* Footer Buttons */}
                    <Form.Item className="text-right">
                        <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        {(lessonDetailFormData.lessonID == -1)
                            ? (<Button className='btn btn-success' type="primary" htmlType="submit"
                            // onClick={createLesson}
                            >
                                Create
                            </Button>)
                            : (<Button type="primary" htmlType="submit">
                                Save
                            </Button>)
                        }
                    </Form.Item>


                </Form>
            </Modal>
        </ConfigProvider>
    )
}

export default LessonDetailModal