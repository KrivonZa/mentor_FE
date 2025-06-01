import { Button, DatePicker, Form, Input, Modal, TimePicker } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { ClassPortalContext } from "../../../modules/mainPage/ClassPortal";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import {
  toastLoadingFailAction,
  toastLoadingSuccessAction,
} from "../../../utils/functions";
import classService from "../../../services/classService";

const CreateSessionModal = () => {
  const context = useContext(ClassPortalContext);

  if (!context)
    throw new Error("Component must be used within a Class Portal Provider");

  const {
    isCreateSessionModal,
    handleCloseCreateSessionModal,
    createSessionModalData,
    fetchClassSessions,
  } = context;
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Set initial form values when createSessionModalData changes
    form.setFieldsValue({
      startTime: createSessionModalData?.selectedScheduleID?.startTime
        ? dayjs(createSessionModalData.selectedScheduleID.startTime, "HH:mm:ss")
        : null,
      endTime: createSessionModalData?.selectedScheduleID?.endTime
        ? dayjs(createSessionModalData.selectedScheduleID.endTime, "HH:mm:ss")
        : null,
      sessionDate: createSessionModalData?.sessionDate
        ? dayjs(createSessionModalData.sessionDate)
        : null,
      googleMeetUrl: createSessionModalData?.googleMeetUrl || "",
    });
  }, [createSessionModalData, form]);

  const onFinish = async (values: any) => {
    const updatedData = {
      selectedScheduleID:
        createSessionModalData.selectedScheduleID.classScheduleID,
      sessionDate: createSessionModalData.sessionDate,
      // googleMeetUrl: values.googleMeetUrl
      googleMeetUrl: "",
    };
    const loadingId = toast.loading("Đang tạo phòng học trực tuyến...");
    setIsLoading(true);

    try {
      await classService.createSession(updatedData);
      await fetchClassSessions(createSessionModalData.classID);
      handleCloseCreateSessionModal();
      toastLoadingSuccessAction(loadingId, "Tạo phòng học trực tuyến thành công!");
    } catch (error) {
      toastLoadingFailAction(loadingId, error.response.data.message);
    }
    setIsLoading(false);
  };

  return (
    <Modal
      maskClosable={false}
      title="Mở Phòng Học Trực Tuyến"
      open={isCreateSessionModal}
      onCancel={handleCloseCreateSessionModal}
      onOk={() => form.submit()}
      okButtonProps={{ disabled: isLoading }} // Disable OK button when loading
      confirmLoading={isLoading}
      width={700}
      centered
      footer={[
        <Button
          type="primary"
          key="back"
          onClick={handleCloseCreateSessionModal}
          style={{
            backgroundColor: "#1d4731",
            fontWeight: "600",
            border: "#32a852",
            marginRight: 8,
          }}
        >
          Đóng
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => form.submit()}
          style={{
            backgroundColor: "#32a83e",
            fontWeight: "600",
            border: "#32a852",
          }}
        >
          Xác nhận
        </Button>,
      ]}
    >
      <Form
        style={{ width: "100%" }}
        id="createSessionForm"
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <Form.Item
            name="startTime"
            label="Thời Gian Bắt Đầu"
            style={{ width: "50%" }}
          >
            <TimePicker format="HH:mm" disabled style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="endTime"
            label="Thời Gian Kết Thúc"
            style={{ width: "50%" }}
          >
            <TimePicker format="HH:mm" disabled style={{ width: "100%" }} />
          </Form.Item>
        </div>

        <Form.Item name="sessionDate" label="Ngày Học">
          <DatePicker format="DD-MM-YYYY" disabled style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="googleMeetUrl"
          label="Phòng học trực tuyến của bạn sẽ được mở khi tới thời gian bắt đầu lớp học!"
          rules={[
            {
              message:
                "Phòng học trực tuyến của bạn sẽ được mở khi tới thời gian bắt đầu lớp học!",
            },
          ]}
        >
          <img
            src="https://blog.logomyway.com/wp-content/uploads/2021/08/zoom-logo.png"
            alt="Zoom Logo"
            style={{ width: "100px" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateSessionModal;
