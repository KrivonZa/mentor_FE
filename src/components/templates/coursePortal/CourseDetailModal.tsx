import { Button, Form, Input, InputNumber, Modal, Switch, Select, Upload, UploadFile, UploadProps, GetProp, Image } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { CoursePortalContext } from '../../../modules/mainPage/CoursePortal';
import { Option } from 'antd/es/mentions';
import './modal.scss';
import { PlusOutlined } from '@ant-design/icons';
import courseService from '../../../services/courseService';
import Swal from 'sweetalert2';
import { CreateCourseRequest } from '../../../types/courseModel';

// import Select from 'react-select';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const CourseDetailModal = () => {
    const context = useContext(CoursePortalContext);
    if (!context) throw new Error("SomeComponent must be used within a CoursePortalProvider");

    const { isCourseDetailModalOpen, setIsCourseDetailModalOpen, courseDetailFormData, setCourseDetailFormData, resetCourseDetailModal } = context;
    //upload
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    //* handleFile Render 
    useEffect(() => {
        if (courseDetailFormData.courseID != -1) {
            setFileList([
                {
                    uid: '-1',
                    name: courseDetailFormData.courseName,
                    status: 'done',
                    url: courseDetailFormData.thumbnail
                }
            ])
        }
        console.log("formData: ", courseDetailFormData);
        
    }, [courseDetailFormData])


    const handleUpdate = () => {
        console.log("Submit ne");
        // courseService.uploadThumbnail(fileList[0]);
    }


    const handleClose = () => {
        setPreviewOpen(false);
        setIsCourseDetailModalOpen(false);
        resetCourseDetailModal();
    }

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
        console.log("value Select: ", value);
        
        setCourseDetailFormData((prev) => ({ ...prev, level: value }));
    };

    // Handle switch
    const handleSwitchChange = (checked) => {
        setCourseDetailFormData((prev) => ({ ...prev, freeTrial: checked }));
    };

    //React Select
    const levelOptions = [
        { value: "BEGINNER", label: "Beginner" },
        { value: "INTERMEDIATE", label: "Intermediate" },
        { value: "ADVANCED", label: "Advanced" }
    ];

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        if(newFileList.length > 1){
            newFileList.shift()
        }
        console.log("newFileList: ", newFileList);

        setFileList(newFileList);
    }

    const handleCreate = async () => {
        try {
            if(fileList.length == 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please upload thumbnail!',
                })
            }

            const request: CreateCourseRequest = {
                thumbnail: fileList[0],
                course: {
                    skillIDs: [],
                    courseName: courseDetailFormData.courseName,
                    description: courseDetailFormData.description,
                    price: courseDetailFormData.price,
                    freeTrial: courseDetailFormData.freeTrial,
                    totalStudent: courseDetailFormData.totalStudent,
                    level: courseDetailFormData.level,
                }
                
            }

            const response = await courseService.createCourse(request);
            console.log("Create course response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error creating course:", error);
        }
    }



    return (
        <Modal
            title="Course Details"
            open={isCourseDetailModalOpen}
            onOk={handleClose}
            onCancel={handleClose}
            footer={null} // Remove default buttons, add custom buttons inside form
        >
            <Form
                id='courseDetailForm'
                layout="vertical"
                onFinish={handleClose}
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
                    <Upload
                        name='thumbnail'
                        // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        beforeUpload={() => false}
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        {fileList.length >= 8 ? null :
                            (
                                <button style={{ border: 0, background: 'none' }} type="button">
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </button>
                            )}
                    </Upload>
                </Form.Item>
                {previewImage && (
                    <Image
                        wrapperStyle={{ display: 'none' }}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                    />
                )}

                {/* Course Level */}
                <Form.Item
                    label="Level"
                    name="level"
                    rules={[{ required: true, message: "Please select level" }]}
                >
                    <Select
                        // value={levelOptions[1]}
                        className=""
                        placeholder="Select level"
                        // defaultValue={levelOptions[1]}
                        onChange={(selectedOption) => handleSelectChange(selectedOption)}
                        options={levelOptions}
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
                    <Button onClick={handleClose} style={{ marginRight: 8 }}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit" onClick={handleUpdate}>
                        Save
                    </Button>
                    <Button type="primary" htmlType="submit" onClick={handleCreate}>
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CourseDetailModal