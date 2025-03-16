import { Button, DatePicker, Form, Input, InputNumber, Modal, Select, TimePicker } from 'antd';
import React, { useContext, useEffect } from 'react';
import { ClassPortalContext } from '../../../modules/mainPage/ClassPortal';
import { useForm } from 'antd/es/form/Form';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs'; // Use dayjs

const dayOptions = [
    { value: 1, label: "Monday" },
    { value: 2, label: "Tuesday" },
    { value: 3, label: "Wednesday" },
    { value: 4, label: "Thursday" },
    { value: 5, label: "Friday" },
    { value: 6, label: "Saturday" },
    { value: 7, label: "Sunday" },
];

export const ClassDetailModal = () => {
    const context = useContext(ClassPortalContext);
    if (!context) throw new Error("Component must be used within a ClassPortalProvider");

    const {
        isClassModalOpen,
        closeClassModel,
        classModalFormData,
        setClassModalFormData,
        courseOptionList,
        handleCreateClass,
        classFormDataError,
        handleUpdateClass
    } = context;

    const [classDetailForm] = useForm();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClassModalFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleNumberChange = (name, value) => {
        setClassModalFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectCourseChange = (value) => {
        setClassModalFormData((prev) => ({ ...prev, courseID: value }));
    };

    useEffect(() => {
        classDetailForm?.setFieldsValue(classModalFormData);
        console.log("classModalFormData: ", classModalFormData);

    }, [classModalFormData, classDetailForm]);

    return (
        <Modal
            maskClosable={false}
            wrapClassName="classDetailModal"
            title="Class Details"
            open={isClassModalOpen}
            onOk={() => {
                classDetailForm.resetFields();
                closeClassModel();
            }}
            onCancel={() => {
                classDetailForm.resetFields();
                closeClassModel();
            }}
            style={{
                height: '85vh',
                width: '90vw',
                overflowY: 'auto',
                maxHeight: 'calc(100vh - 200px)',
                paddingRight: '10px',
            }}
            footer={null}
        >
            <Form
                style={{ width: "100%" }}
                id="classDetailForm"
                layout="vertical"
                form={classDetailForm}
                initialValues={classModalFormData}
            >
                <Form.Item
                    label="Class Description"
                    name="classDescription"
                    rules={[{ required: true, message: "Please enter course name" }]}
                >
                    <Input
                        placeholder="Enter class description"
                        name="classDescription"
                        value={classModalFormData.classDescription}
                        onChange={handleInputChange}
                    />
                    <span className="text-danger">{classFormDataError?.classDescription}</span>
                </Form.Item>

                <Form.Item
                    label="Total Students"
                    name="totalStudent"
                    rules={[{ required: true, message: "Please enter number of students" }]}
                >
                    <InputNumber
                        min={0}
                        style={{ width: "100%" }}
                        value={classModalFormData.totalStudent}
                        onChange={(value) => handleNumberChange("totalStudent", value)}
                    />
                    <span className="text-danger">{classFormDataError?.totalStudent}</span>
                </Form.Item>

                <Form.Item
                    label="Total Session"
                    name="totalSession"
                    rules={[{ required: true, message: "Please enter number of session" }]}
                >
                    <InputNumber
                        min={0}
                        style={{ width: "100%" }}
                        value={classModalFormData.totalSession}
                        onChange={(value) => handleNumberChange("totalSession", value)}
                    />
                    <span className="text-danger">{classFormDataError?.totalSession}</span>
                </Form.Item>

                <Form.Item
                    label="Price (VND)"
                    name="price"
                    rules={[{ required: true, message: "Please enter price" }]}
                >
                    <InputNumber
                        min={0}
                        style={{ width: "100%" }}
                        value={classModalFormData.price}
                        onChange={(value) => handleNumberChange("price", value)}
                    />
                    <span className="text-danger">{classFormDataError?.price}</span>
                </Form.Item>

                <Form.Item
                    label="Expected Start Day"
                    name="expectedStartDate"
                    rules={[{ required: true, message: "Please enter price" }]}
                >
                    <DatePicker
                        style={{ width: "100%" }}
                        value={classModalFormData.expectedStartDate ? dayjs(classModalFormData.expectedStartDate) : null}
                        onChange={(date, dateString) => handleNumberChange("expectedStartDate", dateString)}
                        format="YYYY-MM-DD"
                    />
                    <span className="text-danger">{classFormDataError?.expectedStartDate}</span>
                </Form.Item>

                <Form.Item label="Course" name="courseID">
                    <Select
                        style={{ width: '100%' }}
                        allowClear
                        placeholder="Select course"
                        onChange={handleSelectCourseChange}
                        value={classModalFormData.courseID || undefined}
                        options={courseOptionList}
                        disabled={classModalFormData.classID !== -1}
                    />
                    <span className="text-danger">{classFormDataError?.courseID}</span>
                </Form.Item>

                <Form.Item label="Class Schedule">
                    {classModalFormData.classSchedules.length == 0 && classModalFormData.classID != -1 && <div>No constraint</div>}
                    <Form.List name="classSchedules">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <div
                                        key={key}
                                        style={{ display: "flex", gap: "10px", marginBottom: 8 }}
                                    >
                                        <Form.Item
                                            {...restField}
                                            name={[name, "dayOfWeek"]}
                                            rules={[{ required: true, message: "Select a day" }]}
                                        >
                                            <Select
                                                disabled={classModalFormData.classID !== -1}
                                                onChange={(value) => {
                                                    setClassModalFormData((prev) => ({
                                                        ...prev,
                                                        classSchedules: prev.classSchedules.map((schedule, index) =>
                                                            index === name
                                                                ? { ...schedule, dayOfWeek: value }
                                                                : schedule // Keep other schedules unchanged
                                                        ),
                                                    }));
                                                }}
                                                placeholder="Select a day"
                                                options={dayOptions}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            name={[name, "startTime"]}
                                            rules={[{ required: true, message: "Enter start time" }]}
                                        >
                                            <TimePicker
                                                disabled={classModalFormData.classID !== -1}
                                                format="HH:mm:ss"
                                                allowClear={false}
                                                defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                                                onChange={(time, timeString) => {
                                                    setClassModalFormData((prev) => ({
                                                        ...prev,
                                                        classSchedules: prev.classSchedules.map((schedule, index) =>
                                                            index === name
                                                                ? {
                                                                    ...schedule,
                                                                    startTime: dayjs(timeString + '', 'HH:mm:ss')
                                                                }
                                                                : schedule
                                                        )
                                                    }));
                                                }}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            name={[name, "endTime"]}
                                            rules={[{ required: true, message: "Enter end time" }]}
                                        >
                                            <TimePicker
                                                disabled={classModalFormData.classID !== -1}
                                                format="HH:mm:ss"
                                                allowClear={false}
                                                defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                                                onChange={(time, timeString) => {
                                                    setClassModalFormData((prev) => ({
                                                        ...prev,
                                                        classSchedules: prev.classSchedules.map((schedule, index) =>
                                                            index === name
                                                                ? {
                                                                    ...schedule,
                                                                    endTime: dayjs(timeString + '', 'HH:mm:ss')
                                                                }
                                                                : schedule
                                                        )
                                                    }));
                                                }}
                                            />
                                        </Form.Item>

                                        <Button
                                            type="link"
                                            hidden={classModalFormData.classID !== -1}
                                            danger
                                            onClick={() => {
                                                const newClassSchedules = classModalFormData.classSchedules.filter((_, index) => index !== name);

                                                setClassModalFormData((prev) => ({
                                                    ...prev,
                                                    classSchedules: newClassSchedules
                                                }));
                                                remove(name)
                                            }}
                                            icon={<MinusCircleOutlined />}
                                        />
                                    </div>
                                ))}

                                <Button
                                    type="dashed"
                                    hidden={classModalFormData.classID !== -1}
                                    onClick={() => {
                                        let additionClassSchedules = {
                                            classScheduleID: -1,
                                            dayOfWeek: 1,
                                            startTime: dayjs('00:00:00', 'HH:mm:ss'),
                                            endTime: dayjs('00:00:00', 'HH:mm:ss'),
                                        };
                                        setClassModalFormData((prev) => ({
                                            ...prev,
                                            classSchedules: [
                                                ...prev.classSchedules,
                                                additionClassSchedules
                                            ]
                                        }));
                                        add()
                                    }}
                                    icon={<PlusOutlined />}
                                >
                                    Add Schedule
                                </Button>
                            </>
                        )}
                    </Form.List>
                </Form.Item>
            </Form>

            <div className="text-right" style={{ marginTop: 16 }}>
                <Button onClick={closeClassModel} style={{ marginRight: 8 }}>
                    Cancel
                </Button>
                {classModalFormData?.classID !== -1 ? (
                    <Button
                        type="primary"
                        style={{ background: '#5FCF80' }}
                        onClick={async () => {
                            try {
                                // const values = await classDetailForm.validateFields();
                                handleUpdateClass()
                            } catch (error) {
                                console.error("Validation failed:", error);
                            }
                        }}
                    >
                        Save
                    </Button>
                ) : (
                    <Button
                        type="primary"
                        style={{ background: '#5FCF80' }}
                        onClick={async () => {
                            try {
                                // const values = await classDetailForm.validateFields();
                                // console.log("Form values:", values);
                                handleCreateClass();
                            } catch (error) {
                                console.error("Validation failed:", error);
                            }
                        }}
                    >
                        Create
                    </Button>
                )}
            </div>
        </Modal>
    );
};

export default ClassDetailModal;