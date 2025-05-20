import React, { useContext, useEffect } from "react";
import { CoursePortalContext } from "../../../modules/mainPage/CoursePortal";
import {
  Form,
  Input,
  Modal,
  Button,
  Switch,
  Select,
  ConfigProvider,
  Empty,
  Space,
  DatePicker,
  DatePickerProps,
} from "antd";
import { LessonDetailFormData } from "../../../types/lessonModel";
import en from "antd/es/date-picker/locale/en_US";
import enUS from "antd/es/locale/en_US";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { Schedule, ScheduleCreateRequest } from "../../../types/scheduleModel";
import lessonService from "../../../services/lessonService";
import { toast } from "react-toastify";
// import moment from 'moment';
import Swal from "sweetalert2";
import scheduleService from "../../../services/scheduleService";
import {
  toastLoadingFailAction,
  toastLoadingSuccessAction,
} from "../../../utils/functions";
dayjs.extend(buddhistEra);

const buddhistLocale: typeof en = {
  ...en,
  lang: {
    ...en.lang,
    fieldDateFormat: "BBBB-MM-DD",
    fieldDateTimeFormat: "BBBB-MM-DD HH:mm:ss",
    yearFormat: "BBBB",
    cellYearFormat: "BBBB",
  },
};

const LessonDetailModal = () => {
  const context = useContext(CoursePortalContext);
  if (!context)
    throw new Error("SomeComponent must be used within a CoursePortalProvider");
  const {
    isLessonDetailModalOpen,
    setIsLessonDetailModalOpen,
    lessonDetailFormData,
    setLessonDetailFormData,
    fetchPortalDetail,
  } = context;

  //form
  const [lessonDetailForm] = Form.useForm<LessonDetailFormData>();

  useEffect(() => {
    lessonDetailForm.setFieldsValue(lessonDetailFormData);
  }, [lessonDetailFormData]);

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

  const lessonStatusOptions = [
    { value: "IN_COMMING", label: "In Comming" },
    { value: "IN_PROGRESS", label: "In Progress" },
    { value: "CANCELLED", label: "Cancelled" },
  ];

  //Submit
  //*Create-Lesson
  //create Lesson
  const handleSubmitForm = async () => {
    // lessonID = -1 ---> Create |  else ----> Update
    if (lessonDetailFormData.lessonID == -1) {
      const loadingId = toast.loading("Đang tạo nội dung khoá học...");
      try {
        const response = await lessonService.createLesson(lessonDetailFormData);

        if (response) {
          await fetchPortalDetail();
          toastLoadingSuccessAction(
            loadingId,
            "Nội dung: " +
              lessonDetailFormData.description +
              " đã được tạo thành công!"
          );
          setIsLessonDetailModalOpen(false);
        }
      } catch (error) {
        toastLoadingFailAction(
          loadingId,
          "Xảy ra lỗi khi tạo nội dung khoá học. Vui lòng thử lại."
        );
        setIsLessonDetailModalOpen(false);
      }
    } else {
      const loadingId = toast.loading("Đang cập nhật nội dung khoá học...");

      try {
        const response = await lessonService.updateLesson(lessonDetailFormData);

        if (response) {
          await fetchPortalDetail();
          toastLoadingSuccessAction(
            loadingId,
            "Nội dung: " +
              lessonDetailFormData.description +
              " đã được cập nhật thành công!"
          );
          setIsLessonDetailModalOpen(false);
        }
      } catch (error) {
        toastLoadingFailAction(
          loadingId,
          "Xảy ra lỗi khi cập nhật nội dung khoá học. Vui lòng thử lại."
        );
        setIsLessonDetailModalOpen(false);
      }
    }
    // setIsLessonDetailModalOpen(false);
  };

  //Schedule
  const handleDeleteSchedule = async (scheduleID: number) => {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn muốn xoá?",
      text: "Bạn sẽ không thể hoàn tác lại hành động này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#288a57",
      cancelButtonColor: "#81998a",
      confirmButtonText: "Tôi Đồng Ý!",
      cancelButtonText: "Huỷ",
    });
    const loadingId = toast.loading("Đang xoá lớp học...");
    if (result.isConfirmed) {
      await scheduleService.deleteSchedule(scheduleID); // Wait for deletion
      await fetchPortalDetail();
      toastLoadingSuccessAction(loadingId, "Xoá lớp học thành công!");
      setIsLessonDetailModalOpen(false);
    }
  };

  //validate
  const noOnlyWhitespace = (_, value) => {
    if (value && value.trim() === "") {
      return Promise.reject(
        new Error("Không được để trống nội dung khoá học!")
      );
    }
    return Promise.resolve();
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultHoverBorderColor: "#4ab569",
            defaultHoverColor: "#4ab569",
          },
        },
      }}
    >
      <Modal
        title="Chi Tiết Nội Dung Khoá Học"
        open={isLessonDetailModalOpen}
        // onOk={handleSubmitForm}
        onCancel={handleCancel}
        footer={null} // Remove default buttons, add custom buttons inside form
        maskClosable={false}
      >
        <Form
          id="lessonDetailForm"
          form={lessonDetailForm}
          layout="vertical"
          onFinish={handleSubmitForm}
          initialValues={lessonDetailFormData}
        >
          {/* Lesson Description */}
          <Form.Item
            label="Mô Tả Nội Dung"
            name="description"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mô tả nội dung khoá học.",
              },
              { validator: noOnlyWhitespace },
            ]}
          >
            <Input.TextArea
              placeholder="Vd: Cài đặt thư viện và IDE cần thiết cho ReactJS."
              name="description"
              value={lessonDetailFormData.description}
              onChange={handleInputChange}
            />
          </Form.Item>

          {/* Is Trial Lesson */}
          <Form.Item
            label="Nội Dung Học Thử?"
            name="trialLesson"
            valuePropName="checked"
          >
            <Switch
              checked={lessonDetailFormData.trialLesson}
              onChange={handleSwitchChange}
            />
          </Form.Item>

          {/* Footer Buttons */}
          <Form.Item className="text-right">
            <Button
              type="primary"
              onClick={handleCancel}
              style={{
                backgroundColor: "#6c8777",
                fontWeight: "600",
                border: "#32a852",
                marginRight: "8px",
              }}
            >
              Huỷ
            </Button>
            {lessonDetailFormData.lessonID === -1 ? (
              <Button
                className="btn btn-success"
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "#32a852",
                  fontWeight: "600",
                  border: "#32a852",
                  marginRight: "8px",
                }}
              >
                Tạo Mới
              </Button>
            ) : (
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "#32a852",
                  fontWeight: "600",
                  border: "#32a852",
                  marginRight: "8px",
                }}
              >
                Lưu
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default LessonDetailModal;
