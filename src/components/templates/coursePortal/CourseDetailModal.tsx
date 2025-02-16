import { Button, Form, Input, InputNumber, Modal, Switch } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { CoursePortalContext } from '../../../modules/mainPage/CoursePortal';
import { Option } from 'antd/es/mentions';
import Select from 'react-select';


export const CourseDetailModal = () => {
    const context = useContext(CoursePortalContext);
    if (!context) throw new Error("SomeComponent must be used within a CoursePortalProvider");
    const { isCourseDetailModalOpen, setIsCourseDetailModalOpen, courseDetailFormData, setCourseDetailFormData } = context;

    const handleOk = () => {
        setIsCourseDetailModalOpen(false);
    };

    const handleCancel = () => {
        setIsCourseDetailModalOpen(false);
    };

    // Handle input change for text fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseDetailFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle numeric inputs
    const handleNumberChange = (name, value) => {
        setCourseDetailFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle select dropdown
    const handleSelectChange = (value) => {
        setCourseDetailFormData((prev) => ({ ...prev, level: value }));
    };

    // Handle switch
    const handleSwitchChange = (checked) => {
        setCourseDetailFormData((prev) => ({ ...prev, freeTrial: checked }));
    };

    // useEffect(() => { 
    //     console.log("courseDetailFormData: ", courseDetailFormData);
        
    // }, [courseDetailFormData])


    //React Select
    const levelOptions = [
        { value: "BEGINNER", label: "Beginner" },
        { value: "INTERMEDIATE", label: "Intermediate" },
        { value: "ADVANCED", label: "Advanced" }
    ];
    useEffect(() => { 
        console.log("courseDetailFormData: ", courseDetailFormData);
        
    }, [courseDetailFormData])


    return (
        <>
            <Modal
                title="Course Details"
                open={isCourseDetailModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null} // Remove default buttons, add custom buttons inside form
            >
                <Form
                    layout="vertical"
                    onFinish={handleOk}
                    initialValues={courseDetailFormData} // Set initial form values
                >
                    {/* Course Name */}
                    <Form.Item
                        label="Course Name"
                        name="courseName"
                        rules={[{ required: true, message: "Please enter course name" }]}
                    >
                        <Input
                            placeholder="Enter course name"
                            name="courseName"
                            value={courseDetailFormData.courseName}
                            onChange={handleInputChange}
                        />
                    </Form.Item>

                    {/* Description */}
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: "Please enter description" }]}
                    >
                        <Input.TextArea
                            placeholder="Enter course description"
                            name="description"
                            value={courseDetailFormData.description}
                            onChange={handleInputChange}
                            rows={3}
                        />
                    </Form.Item>

                    {/* Price */}
                    <Form.Item
                        label="Price ($)"
                        name="price"
                        rules={[{ required: true, message: "Please enter price" }]}
                    >
                        <InputNumber
                            min={0}
                            style={{ width: "100%" }}
                            value={courseDetailFormData.price}
                            onChange={(value) => handleNumberChange("price", value)}
                        />
                    </Form.Item>

                    {/* Thumbnail URL */}
                    <Form.Item
                        label="Thumbnail URL"
                        name="thumbnail"
                        rules={[{ required: true, message: "Please enter thumbnail URL" }]}
                    >
                        <Input
                            placeholder="Enter thumbnail URL"
                            name="thumbnail"
                            value={courseDetailFormData.thumbnail}
                            onChange={handleInputChange}
                        />
                    </Form.Item>

                    {/* Course Level */}
                    <Form.Item
                        label="Level"
                        name="level"
                        rules={[{ required: true, message: "Please select level" }]}
                    >
                        <Select
                            placeholder="Select level"
                            value={{ value: "ADVANCED", label: "Intermediate"}}
                            onChange={(selectedOption) => handleSelectChange(selectedOption?.value)}
                            options={levelOptions}
                            // styles={customStyles}
                        />
                    </Form.Item>


                    {/* Free Trial */}
                    <Form.Item label="Free Trial" name="freeTrial" valuePropName="checked">
                        <Switch
                            checked={courseDetailFormData.freeTrial}
                            onChange={handleSwitchChange}
                        />
                    </Form.Item>
                    
                    {/* Total Students */}
                    <Form.Item
                        label="Total Students"
                        name="totalStudent"
                        rules={[{ required: true, message: "Please enter number of students" }]}
                    >
                        <InputNumber
                            min={0}
                            style={{ width: "100%" }}
                            value={courseDetailFormData.totalStudent}
                            onChange={(value) => handleNumberChange("totalStudent", value)}
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

export default CourseDetailModal