import React, { Modal, Calendar, Button, Input } from 'antd';
import { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { ClassPortalContext } from '../../../modules/mainPage/ClassPortal';
import './index.scss'

export const ClassSessionModal = () => {
    const context = useContext(ClassPortalContext);
    if (!context)
        throw new Error("Component must be used within a Class Portal Provider");

    const { isClassSessionModalOpen, setClassSessionModalOpen,
        handleCancelSessionModal, handleOkSessionModal, showSessionModal,
        cellInfoData, handleOpenCreateSessionModal
    } = context;

    const [isCreateSessionOpen, setCreateSessionOpen] = useState(false);
    const [createSessionReq, setCreateSessionReq] = useState({
        selectLessonID: 0,
        sessionDate: '',
        googleMeetUrl: ''
    })

    const cellRender = (current: dayjs.Dayjs) => {
        const dayOfWeek = current.day(); // 0 (Sunday) to 6 (Saturday)
        const adjustedDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;

        const schedule = cellInfoData?.classSchedules.find(schedule =>
            schedule.dayOfWeek === adjustedDayOfWeek
        );

        const isToday = current.isSame(dayjs(), 'day');
        const isBeforeStartDate = current.isBefore(cellInfoData.expectedStartDate, 'day');
        const isBeforeToday = current.isBefore(dayjs(), 'day');
        const isSessionCreated = cellInfoData.createdSessions.find(session =>
            session.sessionDate === current.format('YYYY-MM-DD')
        );

        const cellStyle = {
            height: '100%',
            width: '100%',
            margin: 0,
            padding: 0,
            backgroundColor: (() => {
                if (isSessionCreated) return 'rgb(236, 211, 173, 0.3)'; // Orange
                if (schedule && !isBeforeStartDate && !isBeforeToday) return 'rgb(228, 233, 226, 0.3)'; // Green future
                return 'transparent';
            })(),
            color: schedule ? '#2d633d' : 'inherit',
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
                    {schedule && isSessionCreated ? (
                        <div style={{ fontSize: '12px', marginTop: '2px' }}>
                            <button
                                onClick={() => {
                                    window.open(isSessionCreated.googleMeetUrl, "_blank");
                                }}
                                style={{
                                    backgroundColor: "#5FCF80",
                                    color: "white",
                                    padding: "12px 24px",
                                    borderRadius: "8px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    transition: "transform 0.3s, background-color 0.3s",
                                    transform: "scale(1)",
                                    cursor: "pointer"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "#4ab569";
                                    e.currentTarget.style.transform = "scale(1.05)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "#5FCF80";
                                    e.currentTarget.style.transform = "scale(1)";
                                }}
                            >
                                <span className="material-symbols-outlined">add</span>
                                Join
                            </button>
                            <div style={{ fontSize: '12px', marginTop: '2px' }}>
                                {`${schedule.startTime.slice(0, 5)} - ${schedule.endTime.slice(0, 5)}`}
                            </div>
                        </div>
                    ) : schedule && !isBeforeStartDate && !isBeforeToday && (
                        <div style={{ fontSize: '12px', marginTop: '2px' }}>
                            <button
                                className="material-symbols-outlined"
                                onClick={() => {                                    
                                    const req = {
                                        selectedScheduleID: cellInfoData.classSchedules.find(item => item.classScheduleID === schedule.classScheduleID),
                                        googleMeetUrl: '',
                                        sessionDate: current.format('YYYY-MM-DD'),
                                        classID: cellInfoData.classID
                                    };
                                    handleOpenCreateSessionModal(req);
                                }}
                            >
                                add_circle
                            </button>
                            <div style={{ fontSize: '12px', marginTop: '2px' }}>
                                {`${schedule.startTime.slice(0, 5)} - ${schedule.endTime.slice(0, 5)}`}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <Modal
            maskClosable={false}
            title="Khởi tạo buổi học"
            open={isClassSessionModalOpen}
            onOk={handleOkSessionModal}
            onCancel={handleCancelSessionModal}
            width={1000}
            centered
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