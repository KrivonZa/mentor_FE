import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Switch,
  Select,
  Upload,
  UploadFile,
  UploadProps,
  GetProp,
  Image,
  Empty,
  Space,
  DatePicker,
  Tabs,
  SelectProps,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { CoursePortalContext } from "../../../../modules/mainPage/CoursePortal";
import { CourseDetailFormData } from "../../../../types/courseModel";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const CourseFormTab = () => {
  const context = useContext(CoursePortalContext);
  if (!context)
    throw new Error("SomeComponent must be used within a CoursePortalProvider");

  const {
    setIsCourseDetailModalOpen,
    courseDetailFormData,
    setCourseDetailFormData,
    resetCourseDetailModal,
    listSkill,
    fileList,
    setFileList,
    navigateTab,
    courseDetailError,

    // File
    previewOpen,
    setPreviewOpen,
    previewImage,
    setPreviewImage,
  } = context;

  //skill
  const [skillOptionList, setSkillOptionList] = useState<
    SelectProps["options"]
  >([]);
  //form
  const [courseDetailForm] = Form.useForm<CourseDetailFormData>();

  //* generate skill option
  useEffect(() => {
    const skillOptions: any = [];
    listSkill?.map((item) => {
      skillOptions.push({
        label: item.skillName,
        value: item.skillID,
      });
    });
    setSkillOptionList(skillOptions);
  }, [listSkill]);

  useEffect(() => {
    courseDetailForm.setFieldsValue(courseDetailFormData);
  }, [courseDetailFormData]);

  const handleClose = () => {
    setPreviewOpen(false);
    setIsCourseDetailModalOpen(false);
    resetCourseDetailModal();
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
    { value: "BEGINNER", label: "Cơ Bản" },
    { value: "INTERMEDIATE", label: "Trung Cấp" },
    { value: "ADVANCED", label: "Nâng Cao" },
  ];

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    if (newFileList.length > 1) {
      newFileList.shift();
    }
    setFileList(newFileList);
  };

  return (
    <Form
      style={{ width: "100%" }}
      id="courseDetailForm"
      form={courseDetailForm}
      layout="vertical"
      onFinish={handleClose}
      initialValues={courseDetailFormData}
    >
      {/* Course Name */}
      <Form.Item
        label="Tên Khoá Học"
        name="courseName"
        rules={[{ required: true, message: "Vui lòng nhập tên khoá học." }]}
      >
        <Input
          placeholder="Vd: Lập Trình Web Cơ Bản với React.js"
          name="courseName"
          value={courseDetailFormData.courseName}
          onChange={handleInputChange}
        />
        <span className="text-danger">{courseDetailError?.courseName}</span>
      </Form.Item>

      {/* Description */}
      <Form.Item
        label="Mô Tả Khoá Học"
        name="description"
        rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
      >
        <Input.TextArea
          placeholder="Vd: Khóa học này cung cấp nền tảng vững chắc về thư viện React.js, giúp học viên xây dựng giao diện người dùng web tương tác và hiệu quả."
          name="description"
          value={courseDetailFormData.description}
          onChange={handleInputChange}
          rows={3}
        />
        <span className="text-danger">{courseDetailError?.description}</span>
      </Form.Item>

      {/* Thumbnail URL */}
      <Form.Item
        label="Hình Đại Diện Cho Khoá Học"
        name="thumbnail"
        rules={[{ required: true }]}
      >
        <Upload
          name="thumbnail"
          beforeUpload={(file) => {
            const isImage = file.type.startsWith("image/");
            if (!isImage) {
              toast.error("Bạn chỉ được sử dụng các file hình ảnh!");
            }
            return isImage ? false : Upload.LIST_IGNORE;
          }}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 8 ? null : (
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Tải Tệp Lên</div>
            </button>
          )}
        </Upload>
        <span className="text-danger">{courseDetailError?.thumbnail}</span>
      </Form.Item>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}

      {/* Course Level */}
      <Form.Item
        label="Trình Độ"
        name="level"
        rules={[
          { required: true, message: "Vui lòng chọn trình độ thích hợp" },
        ]}
      >
        <Select
          className=""
          placeholder="Select level"
          onChange={(selectedOption) => handleSelectLevelChange(selectedOption)}
          options={levelOptions}
          value={courseDetailFormData.level}
        />
      </Form.Item>

      {/* Skills */}
      <Form.Item
        label="Kĩ Năng Khoá Học"
        name="skill"
        // rules={[{}]}
      >
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Chọn một hoặc nhiều kĩ năng"
          onChange={handleSelectMultiSkillChange}
          value={courseDetailFormData.skill}
          options={skillOptionList}
        />
        <span className="text-danger">{courseDetailError?.skill}</span>
      </Form.Item>

      {/* These button only appear for create course! */}
      {courseDetailFormData.courseID == -1 && (
        <div className="text-right" style={{ marginTop: 16 }}>
          <Button type="primary" onClick={handleClose} style={{backgroundColor: "#1d4731", fontWeight: "600", border: "#32a852", marginRight: 8 }}>
            Huỷ
          </Button>
          {/* Enable Lesson Tab Button */}
          <Button
            type="primary"
            onClick={() => navigateTab("2")}
            style={{backgroundColor: "#32a83e", fontWeight: "600", border: "#32a852"}}
          >
            Tiếp Tục
          </Button>
        </div>
      )}
    </Form>
  );
};

export default CourseFormTab;
