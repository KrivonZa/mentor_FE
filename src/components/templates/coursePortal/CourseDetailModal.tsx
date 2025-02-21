import { Button, Form, Input, InputNumber, Modal, Switch, Select, Upload, UploadFile, UploadProps, GetProp, Image } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { CoursePortalContext } from '../../../modules/mainPage/CoursePortal';
import { Option } from 'antd/es/mentions';
import './modal.scss';
import { PlusOutlined } from '@ant-design/icons';
import courseService from '../../../services/courseService';
import Swal from 'sweetalert2';
import { CourseDetailFormData, CreateCourseRequest, UpdateCourseRequest } from '../../../types/courseModel';
import type { SelectProps } from 'antd';
import { toast } from 'react-toastify';


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

    const { isCourseDetailModalOpen, setIsCourseDetailModalOpen, courseDetailFormData, setCourseDetailFormData, resetCourseDetailModal, listSkill,
        fileList, setFileList, fetchPortalDetail
    } = context;

    //upload
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    //skill
    const [skillOptionList, setSkillOptionList] = useState<SelectProps['options']>([]);
    //form
    const [courseDetailForm] = Form.useForm<CourseDetailFormData>();

    //* generate skill option
    useEffect(() => {
        const skillOptions: any = []
        listSkill?.map((item) => {
            skillOptions.push({
                label: item.skillName,
                value: item.skillID
            })
        })
        setSkillOptionList(skillOptions)
    }, [listSkill])

    useEffect(() => {
        courseDetailForm.setFieldsValue(courseDetailFormData)
    }, [courseDetailFormData])

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
    const handleSelectLevelChange = (value) => {
        setCourseDetailFormData((prev) => ({ ...prev, level: value }));
    };

    const handleSelectMultiSkillChange = (value) => {
        setCourseDetailFormData((prev) => ({ ...prev, skill: value }));
    };

    // Handle switch
    const handleSwitchChange = (checked) => {
        setCourseDetailFormData((prev) => ({ ...prev, freeTrial: checked }));
    };

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
        if (newFileList.length > 1) {
            newFileList.shift()
        }
        setFileList(newFileList);
    }

    const handleCreate = async () => {
        try {
            if (fileList.length == 0) {
                toast.error("Please upload thumbnail!");
            }

            const request: CreateCourseRequest = {
                thumbnail: fileList[0],
                course: {
                    skillIDs: courseDetailFormData.skill,
                    courseName: courseDetailFormData.courseName,
                    description: courseDetailFormData.description,
                    price: courseDetailFormData.price,
                    freeTrial: courseDetailFormData.freeTrial,
                    totalStudent: courseDetailFormData.totalStudent,
                    level: courseDetailFormData.level,
                }
            }

            const response = await courseService.createCourse(request);
            toast.success("Create course successfully!");
            fetchPortalDetail();
            console.log("response: ", response);

        } catch (error) {
            console.error("Error creating course:", error);
        }
    }

    const handleUpdate = async () => {
        try {
            if (fileList.length == 0) {
                toast.error("Please upload thumbnail!");
            }
            
            console.log("courseID: ", courseDetailFormData.courseID);
            console.log("fileList:", fileList[0]);
            
            let courseThumbnail:any = null
            
            //uuid = -1 => old, uuid != -1 => new
            if (fileList[0].uid != '-1'){
                courseThumbnail = fileList[0];
            }
            
            const request: UpdateCourseRequest = {
                thumbnail: courseThumbnail,
                course: {
                    courseID: courseDetailFormData.courseID,
                    skillIDs: courseDetailFormData.skill,
                    courseName: courseDetailFormData.courseName,
                    description: courseDetailFormData.description,
                    price: courseDetailFormData.price,
                    freeTrial: courseDetailFormData.freeTrial,
                    totalStudent: courseDetailFormData.totalStudent,
                    level: courseDetailFormData.level,
                }

            }

            console.log("req: ", request);
            

            const response = await courseService.updateCourse(request);
            toast.success("Update course: "+courseDetailFormData.courseName + " successfully!");
            fetchPortalDetail();

        } catch (error) {
            console.error("Error creating course:", error);
        }
        console.log("Submit ne");
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
                form={courseDetailForm}
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
                    rules={[{ required: false }]}
                >
                    <Upload
                        name='thumbnail'
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
                        className=""
                        placeholder="Select level"
                        onChange={(selectedOption) => handleSelectLevelChange(selectedOption)}
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


                {/* Skills */}
                <Form.Item
                    label="Course Skills"
                    name="skill"
                // rules={[{}]}
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        onChange={handleSelectMultiSkillChange}
                        options={skillOptionList}
                    />
                </Form.Item>

                {/* Footer Buttons */}
                <Form.Item className="text-right">
                    <Button onClick={handleClose} style={{ marginRight: 8 }}>
                        Cancel
                    </Button>
                    {courseDetailFormData.courseID == -1
                        ? (<Button type="primary" htmlType="submit" onClick={handleCreate}>
                            Create
                        </Button>)
                        : (<Button type="primary" style={{ background:'#5FCF80'}} htmlType="submit" onClick={handleUpdate}>
                            Save
                        </Button>)
                    }

                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CourseDetailModal