import React, { Modal, Calendar, Button, Input } from 'antd';
import { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { ClassPortalContext } from '../../../modules/mainPage/ClassPortal';

export const ClassSessionModal = () => {
    const context = useContext(ClassPortalContext);
    if (!context)
        throw new Error("Component must be used within a Class Portal Provider");

    const { isClassSessionModalOpen, setClassSessionModalOpen,
        handleCancelSessionModal, handleOkSessionModal, showSessionModal,
        cellInfoData
    } = context;

    useEffect(() => {
        console.log("cellInfoData: ", cellInfoData);
    }, [cellInfoData])


    const [isCreateSessionOpen, setCreateSessionOpen] = useState(false);
    const [createSessionReq, setCreateSessionReq] = useState({
        selectLessonID: 0,
        sessionDate: '',
        googleMeetUrl: ''
    })

    const cellRender = (current: dayjs.Dayjs) => {
        const dayOfWeek = current.day(); // 0 (Sunday) to 6 (Saturday)
        // Convert to match your system's 1-7 format (Monday=1, Sunday=7)
        const adjustedDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;

        // Check if this day matches any schedule
        const hasSchedule = cellInfoData?.classSchedules.find(schedule =>
            schedule.dayOfWeek === adjustedDayOfWeek
        );

        // Find the schedule for this day (if it exists)
        const schedule = cellInfoData?.classSchedules.find(schedule =>
            schedule.dayOfWeek === adjustedDayOfWeek
        );

        const isToday = current.isSame(dayjs(), 'day');
        const isBeforeOpenCereAndToday = current.isBefore(cellInfoData.expectedStartDate, 'day') || current.isBefore(dayjs(), 'day');
        const isSessionToday = cellInfoData.createdSessions.find(session =>
            session.sessionDate === current.format('YYYY-MM-DD')
        );

        const cellStyle = {
            height: '100%',
            width: '100%',
            margin: 0,
            padding: 0,
            backgroundColor: (() => {
                if (isSessionToday && !isToday) return '#ecd3ad'; // Orange for session today
                if (!isBeforeOpenCereAndToday && !isToday && hasSchedule) return 'rgb(228, 233, 226, 0.5)';
                return 'transparent';
            })(),
            color: hasSchedule ? '#2d633d' : 'inherit',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute' as 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,

        };

        return (
            <div style={cellStyle}>
                <div className='d-flex flex-column text-center'>
                    {isSessionToday ? (
                        <div style={{ fontSize: '12px', marginTop: '2px' }}>
                            <Button onClick={() => {
                                window.open(isSessionToday.googleMeetUrl, "_blank");
                            }}>
                                Join meet
                            </Button>
                        </div>
                    ) : hasSchedule && schedule && !isBeforeOpenCereAndToday && (
                        <div style={{ fontSize: '12px', marginTop: '2px' }}>
                            <button className="material-symbols-outlined"
                                onClick={() => {
                                    console.log("hello1: ", hasSchedule.classScheduleID);
                                    console.log("hello2: ", current.format('YYYY-MM-DD'));

                                }}
                            >
                                add_circle
                            </button>
                        </div>
                    )}
                    {hasSchedule && schedule && !isBeforeOpenCereAndToday && (
                        <div style={{ fontSize: '12px', marginTop: '2px' }}>
                            {`${schedule.startTime.slice(0, 5)} - ${schedule.endTime.slice(0, 5)}`}
                        </div>
                    )}
                </div>
            </div >
        );
    };

    return (

        <Modal
            maskClosable={false}
            title="Class Session Calendar"
            open={isClassSessionModalOpen}
            onOk={handleOkSessionModal}
            onCancel={handleCancelSessionModal}
            width={1000}
        >
            <div style={{ position: 'relative' }}>
                <Calendar
                    cellRender={cellRender}
                    style={{
                        padding: 0,
                    }}
                />
            </div>
        </Modal>


    );
};

export default ClassSessionModal;