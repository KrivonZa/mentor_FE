import { Button, Form, Input, InputNumber, Modal, Switch, Select, Upload, UploadFile, UploadProps, GetProp, Image, Empty, Space, DatePicker, Tabs, SelectProps } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { CoursePortalContext } from '../../../../modules/mainPage/CoursePortal';
import { CourseDetailFormData } from '../../../../types/courseModel';
import { PlusOutlined } from '@ant-design/icons';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const CourseFormTab = () => {
    const context = useContext(CoursePortalContext);
    if (!context) throw new Error("SomeComponent must be used within a CoursePortalProvider");

    const { setIsCourseDetailModalOpen, courseDetailFormData, setCourseDetailFormData, resetCourseDetailModal, listSkill,
        fileList, setFileList, navigateTab, courseDetailError,

        // File
        previewOpen, setPreviewOpen,
        previewImage, setPreviewImage
    } = context;

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
        console.log("courseData: ", courseDetailFormData);

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

    return (
        <Form
            style={{ width: "100%" }}
            id='courseDetailForm'
            form={courseDetailForm}
            layout="vertical"
            onFinish={handleClose}
            initialValues={courseDetailFormData}
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
                <span className='text-danger'>{courseDetailError?.courseName}</span>
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
                <span className='text-danger'>{courseDetailError?.description}</span>
            </Form.Item>

            {/* Price */}
            <Form.Item
                label="Price (VND)"
                name="price"
                rules={[{ required: true, message: "Please enter price" }]}
            >
                <InputNumber
                    min={0}
                    style={{ width: "100%" }}
                    value={courseDetailFormData.price}
                    onChange={(value) => handleNumberChange("price", value)}
                />
                <span className='text-danger'>{courseDetailError?.price}</span>
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
                <span className='text-danger'>{courseDetailError?.thumbnail}</span>
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
                    value={courseDetailFormData.level}
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
                <span className='text-danger'>{courseDetailError?.totalStudent}</span>
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
                <span className='text-danger'>{courseDetailError?.skill}</span>
            </Form.Item>

            {/* These button only appear for create course! */}
            {courseDetailFormData.courseID == -1 &&
                <div className="text-right" style={{ marginTop: 16 }}>
                    <Button onClick={handleClose} style={{ marginRight: 8 }}>
                        Cancel
                    </Button>
                    {/* Enable Lesson Tab Button */}
                    <Button type="primary" onClick={() => navigateTab("2")} className='bg-warning'>
                        Next: Add Lessons
                    </Button>
                </div>}
        </Form>
    )
}

export default CourseFormTab