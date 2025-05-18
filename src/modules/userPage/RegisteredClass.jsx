import React, { useEffect, useState } from "react";
import { getRegisteredClass } from "../../services/UserService";
import { Modal, Descriptions, Avatar, List, Image, Typography, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons"; // Import the eye icon

const { Title, Text } = Typography;

export const RegisteredClasses = () => {
    const [registeredClasses, setRegisteredClasses] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const perPage = 5;

    const fetchRegisteredClasses = async () => {
        try {
            const response = await getRegisteredClass({ page, perPage });
            setRegisteredClasses(response.data.content || []);
            setTotalPages(response.data.totalPages || 1);
        } catch (error) {
            console.error("Error fetching registered classes:", error);
            setRegisteredClasses([]);
        }
    };

    useEffect(() => {
        fetchRegisteredClasses();
    }, [page]);

    const showModal = (classItem) => {
        setSelectedClass(classItem);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setSelectedClass(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedClass(null);
    };

    return (
        <div style={{ padding: '40px' }}>
            <div style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
                <div style={{ backgroundColor: '#5fd080', color: 'white', padding: '20px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
                    <Title level={2} style={{ color: 'white', textAlign: 'center', margin: 0 }}>
                        Registered Classes
                    </Title>
                </div>
                <div style={{ padding: '20px' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ color: '#5fd080' }}>
                                    <th style={{ padding: '10px' }}>Class Name</th>
                                    <th style={{ padding: '10px' }}>Description</th>
                                    <th style={{ padding: '10px' }}>Mentor</th>
                                    <th style={{ padding: '10px' }}>Price</th>
                                    <th style={{ padding: '10px' }}>Start Date</th>
                                    <th style={{ padding: '10px' }}>Sessions</th>
                                    <th style={{ padding: '10px' }}>Details</th> {/* New column for the eye icon */}
                                </tr>
                            </thead>
                            <tbody>
                                {registeredClasses.length > 0 ? (
                                    registeredClasses.map((classItem) => (
                                        <tr key={classItem.classID}>
                                            <td style={{ padding: '10px' }}>{classItem.courseDetail.courseName}</td>
                                            <td style={{ padding: '10px' }}>{classItem.classDescription}</td>
                                            <td style={{ padding: '10px' }}>{classItem.mentorInfo.mentorName}</td>
                                            <td style={{ padding: '10px' }}>{classItem.price.toLocaleString()}đ</td>
                                            <td style={{ padding: '10px' }}>{classItem.expectedStartDate}</td>
                                            <td style={{ padding: '10px' }}>{classItem.totalSession}</td>
                                            <td style={{ padding: '10px', textAlign: 'left' }}>
                                                <Button
                                                    type="link"
                                                    style={{ color: '#52c41a' }}
                                                    icon={<EyeOutlined style={{ fontSize: '24px' }} />}
                                                    onClick={() => showModal(classItem)}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" style={{ padding: '10px', textAlign: 'center' }}>
                                            No registered classes found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text type="secondary">
                        Page {page} of {totalPages}
                    </Text>
                    <div>
                        <button
                            style={{
                                backgroundColor: '#5fd080',
                                color: 'white',
                                border: 'none',
                                padding: '8px 16px',
                                marginRight: '8px',
                                borderRadius: '4px',
                                cursor: page === 1 ? 'not-allowed' : 'pointer',
                                opacity: page === 1 ? 0.6 : 1,
                            }}
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                        >
                            Previous
                        </button>
                        <button
                            style={{
                                backgroundColor: '#5fd080',
                                color: 'white',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                cursor: page >= totalPages ? 'not-allowed' : 'pointer',
                                opacity: page >= totalPages ? 0.6 : 1,
                            }}
                            disabled={page >= totalPages}
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Ant Design Modal with Scrollable Content */}
            <Modal
                title="Class Details"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
                bodyStyle={{ maxHeight: '60vh', overflowY: 'auto' }}
            >
                {selectedClass && (
                    <div>
                        <Title level={4}>Course Information</Title>
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Course Name">{selectedClass.courseDetail.courseName}</Descriptions.Item>
                            <Descriptions.Item label="Description">{selectedClass.classDescription}</Descriptions.Item>
                            <Descriptions.Item label="Level">{selectedClass.courseDetail.courseLevel}</Descriptions.Item>
                            <Descriptions.Item label="Price">{selectedClass.price.toLocaleString()}đ</Descriptions.Item>
                            <Descriptions.Item label="Start Date">{selectedClass.expectedStartDate}</Descriptions.Item>
                            <Descriptions.Item label="Total Sessions">{selectedClass.totalSession}</Descriptions.Item>
                            <Descriptions.Item label="Students">{selectedClass.registeredStudent}/{selectedClass.totalStudent}</Descriptions.Item>
                        </Descriptions>

                        <Title level={4} style={{ marginTop: '20px' }}>Mentor Information</Title>
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Mentor Name">{selectedClass.mentorInfo.mentorName}</Descriptions.Item>
                            <Descriptions.Item label="Avatar">
                                <Avatar src={selectedClass.mentorInfo.avatar} size={64} />
                            </Descriptions.Item>
                        </Descriptions>

                        <Title level={4} style={{ marginTop: '20px' }}>Skills</Title>
                        <List
                            dataSource={selectedClass.courseDetail.skills}
                            renderItem={(skill) => (
                                <List.Item>
                                    {skill.skillName}
                                </List.Item>
                            )}
                        />

                        <Title level={4} style={{ marginTop: '20px' }}>Course Thumbnail</Title>
                        <Image
                            src={selectedClass.courseDetail.thumbnail}
                            width={200}
                            preview={true}
                        />
                    </div>
                )}
            </Modal>
        </div>
    );
};