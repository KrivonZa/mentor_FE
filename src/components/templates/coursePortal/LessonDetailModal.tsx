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
                    initialValues={lessonDetailFormData} // Set initial form values
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

                    {/* Lesson Status */}
                    <Form.Item
                        label="Lesson Status"
                        name="lessonStatus"
                        rules={[{ required: true, message: "Please select lesson status" }]}
                    >
                        <Select
                            placeholder="Select lesson status"
                            value={lessonDetailFormData.lessonStatus} // Directly use the stored value
                            onChange={handleSelectChange} // Directly pass value
                            options={lessonStatusOptions}
                        />
                    </Form.Item>

                    {/* Is Trial Lesson */}
                    <Form.Item label="Trial Lesson" name="trialLesson" valuePropName="checked">
                        <Switch
                            checked={lessonDetailFormData.trialLesson}
                            onChange={handleSwitchChange}
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
                                        <div key={name} style={{ width: "100%", display: "flex", flexDirection: "column", marginBottom: 8, padding: 10, border: "1px dashed #ccc" }}>
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
                                                        locale={buddhistLocale}
                                                        format="YYYY-MM-DD HH:mm:ss"
                                                        required={true}
                                                        disabled={lessonDetailFormData.lessonID != -1}
                                                        onChange={(date, dateString) => {
                                                            //name: idx
                                                            const currentSchedule = lessonDetailFormData?.schedule[name] || null;

                                                            if (currentSchedule != null) {
                                                                currentSchedule.startTime = dateString as string;
                                                                setLessonDetailFormData((prev) => ({ ...prev, schedule: [...prev.schedule] }));
                                                            } else {
                                                                //create new schedule object
                                                                const newSchedule: ScheduleCreateRequest = {
                                                                    startTime: dateString as string,
                                                                    endTime: null,
                                                                    googleMeetUrl: null
                                                                }
                                                                setLessonDetailFormData((prev) => ({ ...prev, schedule: [...prev.schedule, newSchedule] }));
                                                            }
                                                        }}
                                                        disabledDate={(current) => {
                                                            const now = dayjs();
                                                            const endTime = lessonDetailFormData?.schedule[name]?.endTime
                                                                ? dayjs(lessonDetailFormData.schedule[name].endTime)
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
                                                            const endTime = lessonDetailFormData?.schedule[name]?.endTime
                                                                ? dayjs(lessonDetailFormData.schedule[name].endTime)
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
                                                        locale={buddhistLocale}
                                                        format="YYYY-MM-DD HH:mm:ss"
                                                        required={true}
                                                        disabled={lessonDetailFormData.lessonID != -1}
                                                        onChange={(date, dateString) => {
                                                            //name: idx
                                                            const currentSchedule = lessonDetailFormData?.schedule[name] || null;

                                                            if (currentSchedule != null) {
                                                                currentSchedule.endTime = dateString as string;
                                                                setLessonDetailFormData((prev) => ({ ...prev, schedule: [...prev.schedule] }));
                                                            } else {
                                                                //create new schedule object
                                                                const newSchedule: ScheduleCreateRequest = {
                                                                    startTime: null,
                                                                    endTime: dateString as string,
                                                                    googleMeetUrl: null
                                                                }
                                                                setLessonDetailFormData((prev) => ({ ...prev, schedule: [...prev.schedule, newSchedule] }));
                                                            }
                                                        }}

                                                        //Disable date before start time
                                                        disabledDate={(current) => {
                                                            const now = dayjs();
                                                            const startTime = lessonDetailFormData?.schedule[name]?.startTime
                                                                ? dayjs(lessonDetailFormData.schedule[name].startTime)
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

                                                            const startTime = dayjs(lessonDetailFormData?.schedule[name]?.startTime);

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
                                                </Form.Item>
                                                {(lessonDetailFormData.lessonID == -1)
                                                    ? (<Button danger onClick={() => {
                                                        remove(name)
                                                        let newSchedule = lessonDetailFormData.schedule.filter((schedule, index) => index !== name);
                                                        setLessonDetailFormData((prev) => ({ ...prev, schedule: newSchedule }));
                                                    }}>Remove</Button>)
                                                    : (<Button danger onClick={() => {
                                                        handleDeleteSchedule(lessonDetailFormData.schedule[name].scheduleID || -1)
                                                    }}>Remove</Button>)}
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
                                                        const currentSchedule = lessonDetailFormData?.schedule[name] || null;
                                                        console.log("dsadsahdbasd: ", currentSchedule);

                                                        if (currentSchedule != null) {
                                                            currentSchedule.googleMeetUrl = e.target.value
                                                            // console.log("hehe: ", e.target.value);
                                                            setLessonDetailFormData((prev) => ({ ...prev, schedule: [...prev.schedule] }));
                                                        } else {
                                                            const newSchedule: ScheduleCreateRequest = {
                                                                startTime: null,
                                                                endTime: null,
                                                                googleMeetUrl: e.target.value
                                                            }
                                                            setLessonDetailFormData((prev) => ({ ...prev, schedule: [...prev.schedule, newSchedule] }));
                                                        }

                                                    }}
                                                />
                                            </Form.Item>

                                        </div>
                                    ))
                                )}
                                {
                                    (lessonDetailFormData.lessonID == -1)
                                        ? (<Button onClick={() => {
                                            add();
                                        }} className="mb-2 border-success" type="dashed" block>
                                            Add Schedule
                                        </Button>)
                                        : (null)
                                }
                            </React.Fragment>
                        )}
                    </Form.List>

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