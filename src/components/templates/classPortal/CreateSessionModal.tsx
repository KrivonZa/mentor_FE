import { DatePicker, Form, Input, Modal, TimePicker } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { ClassPortalContext } from '../../../modules/mainPage/ClassPortal';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { toastLoadingFailAction, toastLoadingSuccessAction } from '../../../utils/functions';
import classService from '../../../services/classService';

const CreateSessionModal = () => {
    const context = useContext(ClassPortalContext);

    if (!context)
        throw new Error("Component must be used within a Class Portal Provider");

    const { isCreateSessionModal, handleCloseCreateSessionModal, createSessionModalData,
        fetchClassSessions
    } = context;
    const [form] = Form.useForm();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Set initial form values when createSessionModalData changes
        form.setFieldsValue({
            startTime: createSessionModalData?.selectedScheduleID?.startTime
                ? dayjs(createSessionModalData.selectedScheduleID.startTime, 'HH:mm:ss')
                : null,
            endTime: createSessionModalData?.selectedScheduleID?.endTime
                ? dayjs(createSessionModalData.selectedScheduleID.endTime, 'HH:mm:ss')
                : null,
            sessionDate: createSessionModalData?.sessionDate
                ? dayjs(createSessionModalData.sessionDate)
                : null,
            googleMeetUrl: createSessionModalData?.googleMeetUrl || ''
        });
    }, [createSessionModalData, form]);

    const onFinish = async (values: any) => {
        const updatedData = {
            selectedScheduleID: createSessionModalData.selectedScheduleID.classScheduleID,
            sessionDate: createSessionModalData.sessionDate,
            // googleMeetUrl: values.googleMeetUrl
            googleMeetUrl: ''
        };
        const loadingId = toast.loading("Creating Session...");
        setIsLoading(true);

        try {
            await classService.createSession(updatedData)
            await fetchClassSessions(createSessionModalData.classID)
            handleCloseCreateSessionModal();
            toastLoadingSuccessAction(loadingId, "Create Session Success!");
        } catch (error) {
            toastLoadingFailAction(loadingId, error.response.data.message);
        }
        setIsLoading(false);

    };

    return (
        <Modal
            maskClosable={false}
            title="Create Session Calendar"
            open={isCreateSessionModal}
            onCancel={handleCloseCreateSessionModal}
            onOk={() => form.submit()}
            okButtonProps={{ disabled: isLoading }} // Disable OK button when loading
            confirmLoading={isLoading}
            width={700}
            centered
        >
            <Form
                style={{ width: "100%" }}
                id='createSessionForm'
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '16px'
                }}>
                    <Form.Item
                        name="startTime"
                        label="Start Time"
                        style={{ width: '50%' }}
                    >
                        <TimePicker
                            format="HH:mm"
                            disabled
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="endTime"
                        label="End Time"
                        style={{ width: '50%' }}
                    >
                        <TimePicker
                            format="HH:mm"
                            disabled
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </div>

                <Form.Item
                    name="sessionDate"
                    label="Session Date"
                >
                    <DatePicker
                        format="YYYY-MM-DD"
                        disabled
                        style={{ width: '100%' }}
                    />
                </Form.Item>

                <Form.Item
                    name="googleMeetUrl"
                    label="Your zoom room will start by the time session starts !"
                    rules={[
                        { message: 'Your zoom room will be create !' }
                    ]}
                >
                    <img src='https://blog.logomyway.com/wp-content/uploads/2021/08/zoom-logo.png'
                        alt="Zoom Logo"
                        style={{ width: '100px' }} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateSessionModal;