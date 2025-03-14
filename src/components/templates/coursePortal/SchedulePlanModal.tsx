import { Button, DatePicker, Form, Input, Modal, Space } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { CoursePortalContext } from '../../../modules/mainPage/CoursePortal';
import dayjs from 'dayjs';
import { ScheduleCreateRequest } from '../../../types/scheduleModel';
import scheduleService from '../../../services/scheduleService';
import { toast } from 'react-toastify';
import { toastLoadingSuccessAction } from '../../../utils/functions';

export const SchedulePlanModal = () => {
    const context = useContext(CoursePortalContext);
    if (!context) throw new Error("SomeComponent must be used within a CoursePortalProvider");

    const { isScheduleModalOpen, handleOpenScheduleModal, setIsScheduleModalOpen, scheduleFormData, setScheduleFormData, fetchPortalDetail } = context

    const handleSubmitForm = async () => {
        if (scheduleFormData.lessonID == -1
            || scheduleFormData.startTime == null
            || scheduleFormData.endTime == null) {
            toast.error("Please fill the time!")
            return;
        }
        const loadingId = toast.loading("Creating schedule...");
        try {
            const response = await scheduleService.addSchedule(scheduleFormData)
            if (response) {
                await fetchPortalDetail();
                toastLoadingSuccessAction(loadingId, "Create schedule success!");
                setIsScheduleModalOpen(false);
            }
        } catch (error) {
            toastLoadingSuccessAction(loadingId, "Failed when create schedule");
            setIsScheduleModalOpen(false);
        }
    };

    const handleCancel = () => {
        setIsScheduleModalOpen(false);
    }

    return (
        <Modal
            title="Add Schedule"
            open={isScheduleModalOpen}
            onOk={handleSubmitForm}
            onCancel={handleCancel}
            footer={null}
            maskClosable={false}
        >
            <Form
                id='schedulePlanningForm'
                // form={}
                layout="vertical"
                onFinish={handleSubmitForm}
            >
                <Space align="baseline">
                    {/* Start Time */}
                    <Form.Item>
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            required={true}
                            onChange={(date, dateString) => {
                                //name: idx
                                setScheduleFormData((prev: any) => ({ ...prev, startTime: dateString }))
                            }}
                            disabledDate={(current) => {
                                const now = dayjs();
                                const endTime = scheduleFormData?.endTime
                                    ? dayjs(scheduleFormData.endTime)
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
                                const endTime = scheduleFormData?.endTime
                                    ? dayjs(scheduleFormData?.endTime)
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
                    <Form.Item>
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            required={true}
                            onChange={(date, dateString) => {
                                setScheduleFormData((prev: any) => ({ ...prev, endTime: dateString }))
                            }}
                            //Disable date before start time
                            disabledDate={(current) => {
                                const now = dayjs();
                                const startTime = scheduleFormData?.startTime
                                    ? dayjs(scheduleFormData.startTime)
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

                                const startTime = dayjs(scheduleFormData?.startTime);

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
                </Space>
                <Form.Item>
                    <Input
                        placeholder="Enter google meet url"
                        name="googleMeetUrl"
                        value={scheduleFormData.googleMeetUrl || ""}
                        onChange={(e) => {
                            setScheduleFormData((prev) => ({ ...prev, googleMeetUrl: e.target.value }));
                        }}
                    />
                </Form.Item>
                <Button className='w-100' type="primary" htmlType="submit">Create Schedule</Button>
            </Form>
        </Modal>
    )
}

export default SchedulePlanModal