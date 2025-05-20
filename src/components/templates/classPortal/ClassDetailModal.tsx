import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  TimePicker,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { ClassPortalContext } from "../../../modules/mainPage/ClassPortal";
import { useForm } from "antd/es/form/Form";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs"; // Use dayjs
import { toast } from "react-toastify";
import {
  toastLoadingFailAction,
  toastLoadingSuccessAction,
} from "../../../utils/functions";

const dayOptions = [
  { value: 1, label: "Thứ 2" },
  { value: 2, label: "Thứ 3" },
  { value: 3, label: "Thứ 4" },
  { value: 4, label: "Thứ 5" },
  { value: 5, label: "Thứ 6" },
  { value: 6, label: "Thứ 7" },
  { value: 7, label: "Chủ Nhật" },
];

export const ClassDetailModal = () => {
  const context = useContext(ClassPortalContext);
  if (!context)
    throw new Error("Component must be used within a ClassPortalProvider");

  const {
    isClassModalOpen,
    closeClassModel,
    classModalFormData,
    setClassModalFormData,
    courseOptionList,
    handleCreateClass,
    classFormDataError,
    handleUpdateClass,
    loading,
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
  }, [classModalFormData, classDetailForm]);

  return (
    <Modal
      maskClosable={false}
      wrapClassName="classDetailModal"
      title="Thông Tin Lớp Học"
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
        height: "85vh",
        width: "90vw",
        overflowY: "auto",
        maxHeight: "calc(100vh - 200px)",
        paddingRight: "10px",
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
          label="Mô Tả Lớp Học"
          name="classDescription"
          rules={[{ required: true, message: "Vui lòng nhập mô tả lớp học." }]}
        >
          <Input
            placeholder="Vd: Lớp ReactJS Cơ Bản - Xây dựng trang web đầu tiên."
            name="classDescription"
            value={classModalFormData.classDescription}
            onChange={handleInputChange}
          />
          <span className="text-danger">
            {classFormDataError?.classDescription}
          </span>
        </Form.Item>

        <Form.Item
          label="Tổng Số Học Viên"
          name="totalStudent"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tổng số học viên tối đa cho một lớp.",
            },
          ]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            value={classModalFormData.totalStudent}
            onChange={(value) => handleNumberChange("totalStudent", value)}
          />
          <span className="text-danger">
            {classFormDataError?.totalStudent}
          </span>
        </Form.Item>

        <Form.Item
          label="Tổng Số Buổi"
          name="totalSession"
          rules={[
            {
              required: true,
              message:
                "Vui lòng nhập tổng số buổi tối thiểu để hoàn thành lớp học này.",
            },
          ]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            value={classModalFormData.totalSession}
            onChange={(value) => handleNumberChange("totalSession", value)}
            disabled={classModalFormData?.classID !== -1}
          />
          <span className="text-danger">
            {classFormDataError?.totalSession}
          </span>
        </Form.Item>

        <Form.Item
          label="Học Phí (VND)"
          name="price"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập học phí cho lớp học này.",
            },
          ]}
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
          label="Ngày Bắt Đầu Dự Kiến"
          name="expectedStartDate"
          rules={[{ required: true, message: "Vui lòng nhập ngày bắt đầu." }]}
        >
          <DatePicker
            style={{ width: "100%" }}
            value={
              classModalFormData.expectedStartDate
                ? dayjs(classModalFormData.expectedStartDate)
                : null
            }
            onChange={(date, dateString) =>
              handleNumberChange("expectedStartDate", dateString)
            }
            format="YYYY-MM-DD"
            placeholder="Chọn ngày"
          />
          <span className="text-danger">
            {classFormDataError?.expectedStartDate}
          </span>
        </Form.Item>

        <Form.Item
          label="Khoá Học"
          name="courseID"
          rules={[{ required: true }]}
        >
          <Select
            style={{ width: "100%" }}
            allowClear
            onChange={handleSelectCourseChange}
            value={classModalFormData.courseID || undefined}
            options={courseOptionList}
            disabled={classModalFormData.classID !== -1}
            placeholder="Chọn khoá học của lớp học này"
          />
          <span className="text-danger">{classFormDataError?.courseID}</span>
        </Form.Item>

        <Form.Item label="Thiết Lập Lịch Học">
          {classModalFormData.classSchedules.length == 0 &&
            classModalFormData.classID != -1 && <div>No constraint</div>}
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
                            classSchedules: prev.classSchedules.map(
                              (schedule, index) =>
                                index === name
                                  ? { ...schedule, dayOfWeek: value }
                                  : schedule
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
                      rules={[
                        { required: true, message: "Enter start time" },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            const endTime = getFieldValue([
                              "classSchedules",
                              name,
                              "endTime",
                            ]);
                            if (
                              !value ||
                              !endTime ||
                              dayjs(value).isBefore(dayjs(endTime))
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc lớp học."
                              )
                            );
                          },
                        }),
                      ]}
                    >
                      <TimePicker
                        disabled={classModalFormData.classID !== -1}
                        format="HH:mm:ss"
                        allowClear={false}
                        defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
                        onChange={(time, timeString) => {
                          setClassModalFormData((prev) => ({
                            ...prev,
                            classSchedules: prev.classSchedules.map(
                              (schedule, index) =>
                                index === name
                                  ? {
                                      ...schedule,
                                      startTime: dayjs(
                                        timeString + "",
                                        "HH:mm:ss"
                                      ),
                                    }
                                  : schedule
                            ),
                          }));
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "endTime"]}
                      rules={[
                        { required: true, message: "Enter end time" },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            const startTime = getFieldValue([
                              "classSchedules",
                              name,
                              "startTime",
                            ]);
                            if (
                              !value ||
                              !startTime ||
                              dayjs(startTime).isBefore(dayjs(value))
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc lớp học."
                              )
                            );
                          },
                        }),
                      ]}
                    >
                      <TimePicker
                        disabled={classModalFormData.classID !== -1}
                        format="HH:mm:ss"
                        allowClear={false}
                        defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
                        onChange={(time, timeString) => {
                          setClassModalFormData((prev) => ({
                            ...prev,
                            classSchedules: prev.classSchedules.map(
                              (schedule, index) =>
                                index === name
                                  ? {
                                      ...schedule,
                                      endTime: dayjs(
                                        timeString + "",
                                        "HH:mm:ss"
                                      ),
                                    }
                                  : schedule
                            ),
                          }));
                        }}
                      />
                    </Form.Item>

                    <Button
                      type="link"
                      hidden={classModalFormData.classID !== -1}
                      danger
                      onClick={() => {
                        const newClassSchedules =
                          classModalFormData.classSchedules.filter(
                            (_, index) => index !== name
                          );
                        setClassModalFormData((prev) => ({
                          ...prev,
                          classSchedules: newClassSchedules,
                        }));
                        remove(name);
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
                      startTime: dayjs("00:00:00", "HH:mm:ss"),
                      endTime: dayjs("00:00:00", "HH:mm:ss"),
                    };
                    setClassModalFormData((prev) => ({
                      ...prev,
                      classSchedules: [
                        ...prev.classSchedules,
                        additionClassSchedules,
                      ],
                    }));
                    add();
                  }}
                  icon={<PlusOutlined />}
                >
                  Thêm Ngày Học
                </Button>
              </>
            )}
          </Form.List>
          <div className="text-danger">
            {classFormDataError?.classSchedules}
          </div>
        </Form.Item>
      </Form>

      <div className="text-right" style={{ marginTop: 16 }}>
        <Button
          onClick={closeClassModel}
          style={{
            backgroundColor: "#6c8777",
            fontWeight: "600",
            border: "#32a852",
            marginRight: "8px",
          }}
        >
          Huỷ
        </Button>
        {classModalFormData?.classID !== -1 ? (
          <Button
            type="primary"
            style={{
              backgroundColor: "#32a852",
              fontWeight: "600",
              border: "#32a852",
              marginRight: "8px",
            }}
            onClick={async () => {
              try {
                // const values = await classDetailForm.validateFields();
                handleUpdateClass();
              } catch (error) {
                console.error("Validation failed:", error);
              }
            }}
          >
            Lưu
          </Button>
        ) : (
          <Button
            type="primary"
            style={{
              backgroundColor: "#32a852",
              fontWeight: "600",
              border: "#32a852",
              marginRight: "8px",
            }}
            loading={loading}
            onClick={async () => {
              try {
                handleCreateClass();
              } catch (error) {
                console.error("Validation failed:", error);
              }
            }}
          >
            Tạo Mới
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default ClassDetailModal;
