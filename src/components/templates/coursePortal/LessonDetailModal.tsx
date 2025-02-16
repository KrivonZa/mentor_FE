import React, { useContext } from 'react'
import { CoursePortalContext } from '../../../modules/mainPage/CoursePortal';
import { Form, Input, Modal, Button, Switch } from 'antd';

const LessonDetailModal = () => {
    const context = useContext(CoursePortalContext);
    if (!context) throw new Error("SomeComponent must be used within a CoursePortalProvider");
    const { isLessonDetailModalOpen, setIsLessonDetailModalOpen, lessonDetailFormData, setLessonDetailFormData } = context;


    const handleOk = () => {
        setIsLessonDetailModalOpen(false);
    };

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

    return (
        <>
            <Modal
                title="Course Details"
                open={isLessonDetailModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null} // Remove default buttons, add custom buttons inside form
            >
                <Form
                    layout="vertical"
                    onFinish={handleOk}
                    initialValues={lessonDetailFormData} // Set initial form values
                >
                    {/* Course Name */}
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
                    {/* Course Level */}
                    <Form.Item
                        label="Level"
                        name="level"
                        rules={[{ required: true, message: "Please select level" }]}
                    >
                        {/* <Select
                            placeholder="Select level"
                            value={lessonStatusOptions.find(option => option.value == lessonDetailFormData.lessonStatus)}
                            onChange={(selectedOption) => handleSelectChange(selectedOption?.value)}
                            options={lessonStatusOptions}
                        // styles={customStyles}
                        /> */}
                    </Form.Item>



                    {/* Is Trial Lesson */}
                    <Form.Item label="Free Trial" name="freeTrial" valuePropName="checked">
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
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default LessonDetailModal