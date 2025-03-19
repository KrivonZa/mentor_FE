import { Modal, Descriptions, Badge, Avatar, Typography, Input, Select, Button } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { CourseManagementContext } from '../../../../modules/adminPage/CourseManagement/CourseManagement';
import { toast } from 'react-toastify';
import courseApprovalService from '../../../../services/courseApprovalService';

const { Title, Text } = Typography;

const CourseViewDetailModal = () => {
    const context = useContext(CourseManagementContext);
    if (!context)
        throw new Error("SomeComponent must be used within a CoursePortalProvider");

    const {
        openCourseViewDetailModal,
        setOpenCourseViewDetailModal,
        handleCloseCourseViewDetailModal,
        courseDetailFormData,
        fetchCourseApproval
    } = context;

    // State for staff editable fields
    const [approveData, setApproveData] = useState({
        assigneeNote: courseDetailFormData?.assigneeNote || '',
        courseStatus: courseDetailFormData?.status || 'PENDING'
    });

    const [approveDataError, setApproveDataError] = useState({
        assigneeNote: '',
        courseStatus: ''
    });

    const [isEditing, setIsEditing] = useState(false);

    // Sync approveData with courseDetailFormData when it changes
    useEffect(() => {
        setApproveData({
            assigneeNote: courseDetailFormData?.assigneeNote || '',
            courseStatus: courseDetailFormData?.status || 'PENDING'
        });
    }, [courseDetailFormData]);

    const renderStatusBadge = (status) => {
        switch (status) {
            case 'PENDING': return <Badge status="warning" text="Pending" />;
            case 'APPROVE': return <Badge status="success" text="Approved" />;
            case 'REJECT': return <Badge status="error" text="Rejected" />;
            default: return <Badge status="default" text={status} />;
        }
    };

    // Handle input changes
    const handleApproveDataChange = (field) => (e) => {
        const value = field === 'courseStatus' ? e : e.target.value;
        setApproveData(prev => ({ ...prev, [field]: value }));
    };

    // Handle save (Update operation)
    const checkError = () => {
        let errorCount = 0;
        const error = {
            assigneeNote: '',
            courseStatus: ''
        }
        if (approveData.assigneeNote.trim() == '') {
            error.assigneeNote = 'Please add a note'
            errorCount++;
        } else {
            error.assigneeNote = ''
        }
        if (approveData.courseStatus == 'PENDING') {
            error.courseStatus = 'Please select other status'
            errorCount++;
        } else {
            error.courseStatus = ''
        }

        setApproveDataError({
            ...error
        })

        return errorCount
    }

    const handleResolveRequest = async (approvalStatus: any) => {
        // Here you would typically make an API call to update the data
        if (checkError() > 0) {
            toast.error("Please check these field again!")
            return
        }

        const approveReq = {
            courseID: courseDetailFormData?.courseDetail?.courseID,
            courseApprovalRequestID: courseDetailFormData?.courseApprovalRequestID,
            verifyStatus: approveData?.courseStatus,
            approvalStatus: approvalStatus,
            assigneeNote: approveData?.assigneeNote
        }

        try {
            await courseApprovalService.verifyCourse(approveReq);
            toast.success("Resolve request successfully!")
            await fetchCourseApproval();
            handleCloseCourseViewDetailModal();
        } catch (error) {
            toast.error("Resolve request failed!")
        }
        console.log('Saving staff data:', approveData);
        setIsEditing(false);
        // You might want to update the context here if needed
    };

    // Handle edit toggle
    const toggleEdit = () => setIsEditing(!isEditing);

    return (
        <Modal
            wrapClassName="courseDetailModal"
            title="Course Details"
            open={openCourseViewDetailModal}
            onCancel={() => {
                setIsEditing(false)
                handleCloseCourseViewDetailModal()
            }}
            style={{
                height: '85vh',
                width: '90vw',
                overflowY: 'auto',
                maxHeight: 'calc(100vh - 200px)',
                paddingRight: '10px'
            }}
            footer={[
                <div className='d-flex justify-content-between'>
                    <div className='d-flex' style={{ gap: '10px' }}>
                        <Button key="cancel" onClick={handleCloseCourseViewDetailModal}>
                            Close
                        </Button>
                        {
                            isEditing
                                ? (
                                    <span className='d-flex' style={{ gap: '10px' }}>
                                        <Button key="edit" type="primary" onClick={toggleEdit}>
                                            InEdit
                                        </Button>
                                    </span>
                                )
                                : (
                                    <span className='d-flex' style={{ gap: '10px' }}>
                                        <Button key="edit" type="primary" onClick={toggleEdit}>
                                            Edit
                                        </Button>
                                    </span>
                                )
                        }
                    </div>

                    <div className='d-flex' style={{ gap: '10px' }}>
                        <Button size='large' type="primary" className='bg-danger' onClick={()=>handleResolveRequest("REJECTED")}>
                            Reject
                        </Button>
                        <Button size='large' type="primary" className='bg-success' onClick={()=>handleResolveRequest("APPROVED")}>
                            Approve
                        </Button>
                    </div>
                </div>
            ]}
        >
            <div style={{ padding: '16px' }}>
                {/* Course Basic Info */}
                <Title level={4}>Course Information</Title>
                <Descriptions bordered column={1} style={{ marginBottom: '24px' }}>
                    <Descriptions.Item label="Course ID">{courseDetailFormData?.courseDetail?.courseID}</Descriptions.Item>
                    <Descriptions.Item label="Course Name">{courseDetailFormData?.courseDetail?.courseName}</Descriptions.Item>
                    <Descriptions.Item label="Level"><Text strong>{courseDetailFormData?.courseDetail?.level}</Text></Descriptions.Item>
                    <Descriptions.Item label="Description">{courseDetailFormData?.courseDetail?.description}</Descriptions.Item>
                    <Descriptions.Item label="Thumbnail">
                        <img
                            src={courseDetailFormData?.courseDetail?.thumbnail}
                            alt="Course thumbnail"
                            style={{ maxWidth: '200px', borderRadius: '4px' }}
                        />
                    </Descriptions.Item>
                </Descriptions>

                {/* Lesson Information */}
                <Title level={4}>Lessons</Title>
                <Descriptions bordered column={1} style={{ marginBottom: '24px' }}>
                    {courseDetailFormData?.courseDetail?.lesson.map((lesson) => (
                        <Descriptions.Item key={lesson.lessonID} label={`Lesson ID: ${lesson.lessonID}`}>
                            <div>
                                <Text>{lesson.description}</Text>
                                <br />
                                <Text type="secondary">Trial Lesson: {lesson.trialLesson ? 'Yes' : 'No'}</Text>
                            </div>
                        </Descriptions.Item>
                    ))}
                </Descriptions>

                {/* Mentor Information */}
                <Title level={4}>Mentor Details</Title>
                <Descriptions bordered column={1} style={{ marginBottom: '24px' }}>
                    <Descriptions.Item label="Mentor ID">{courseDetailFormData?.mentorDetail?.mentorID}</Descriptions.Item>
                    <Descriptions.Item label="Mentor Name">
                        <Avatar src={courseDetailFormData?.mentorDetail?.avatar} style={{ marginRight: '8px' }} />
                        {courseDetailFormData?.mentorDetail?.mentorName}
                    </Descriptions.Item>
                </Descriptions>

                {/* Approval Request Details */}
                <Title level={4}>Approval Request</Title>
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Request ID">{courseDetailFormData?.courseApprovalRequestID}</Descriptions.Item>
                    <Descriptions.Item label="Status">
                        {isEditing ? (
                            <>
                                <Select
                                    value={approveData.courseStatus}
                                    onChange={handleApproveDataChange('courseStatus')}
                                    style={{ width: 120 }}
                                >
                                    <Select.Option value="BAN">Ban</Select.Option>
                                    <Select.Option value="PENDING">Pending</Select.Option>
                                    <Select.Option value="APPROVE">Approved</Select.Option>
                                    <Select.Option value="REJECT">Rejected</Select.Option>
                                </Select>
                                <div className="text-danger">{approveDataError?.courseStatus || ''}</div>
                            </>

                        ) : (
                            renderStatusBadge(approveData.courseStatus)
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Assignee ID">{courseDetailFormData?.assigneeID || 'Not assigned'}</Descriptions.Item>
                    <Descriptions.Item label="Assignee Note">
                        {isEditing ? (
                            <>
                                <Input.TextArea
                                    value={approveData.assigneeNote}
                                    onChange={handleApproveDataChange('assigneeNote')}
                                    placeholder="Enter assignee note"
                                    rows={3}
                                />
                                <div className="text-danger">{approveDataError?.assigneeNote || ''}</div>
                            </>
                        ) : (
                            approveData.assigneeNote || 'No notes'
                        )}

                    </Descriptions.Item>
                    <Descriptions.Item label="Created At">{new Date(courseDetailFormData?.createdAt).toLocaleString()}</Descriptions.Item>
                    <Descriptions.Item label="Updated At">{new Date(courseDetailFormData?.updatedAt).toLocaleString()}</Descriptions.Item>
                </Descriptions>
            </div>
        </Modal>
    );
};

export default CourseViewDetailModal