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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { useContext, useEffect, useState } from "react";
import { CoursePortalContext } from "../../../../modules/mainPage/CoursePortal";
import { CourseDetailFormData } from "../../../../types/courseModel";
import { CaretDownOutlined, PlusOutlined } from "@ant-design/icons";
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
      className="p-4 border rounded-3 shadow-sm bg-white"
    >
      {/* Course Name */}
      <Form.Item
        label={<span className="fw-semibold">Tên Khoá Học</span>}
        name="courseName"
        rules={[{ required: true, message: "Vui lòng nhập tên khoá học." }]}
        className="mb-3"
        validateStatus={courseDetailError?.courseName ? "error" : ""}
      >
        <Input
          placeholder="VD: Lập Trình Web Cơ Bản với React.js"
          name="courseName"
          value={courseDetailFormData.courseName}
          onChange={handleInputChange}
          className="rounded-2 py-2"
        />
        {courseDetailError?.courseName && (
          <div className="text-danger small mt-1">
            {courseDetailError.courseName}
          </div>
        )}
      </Form.Item>

      {/* Description */}
      <Form.Item
        label={<span className="fw-semibold">Mô Tả Khoá Học</span>}
        name="description"
        rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        className="mb-3"
        validateStatus={courseDetailError?.description ? "error" : ""}
      >
        <ReactQuill
          theme="snow"
          value={courseDetailFormData.description}
          onChange={(value) => {
            handleInputChange({
              target: {
                name: "description",
                value: value,
              },
            } as React.ChangeEvent<HTMLInputElement>);
          }}
          modules={{
            toolbar: [
              ["bold", "italic", "underline", "strike"],
              ["blockquote", "code-block"],
              [{ header: 1 }, { header: 2 }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ direction: "rtl" }],
              [{ size: ["small", false, "large", "huge"] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }],
              [{ font: [] }],
              [{ align: [] }],
              ["clean"],
              ["link", "image", "video"],
            ],
          }}
          formats={[
            "header",
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "bullet",
            "indent",
            "link",
            "image",
            "video",
          ]}
          style={{
            height: "200px",
            marginBottom: "40px", // Space for error message
          }}
        />
        {courseDetailError?.description && (
          <div className="text-danger small mt-1">
            {courseDetailError.description}
          </div>
        )}
      </Form.Item>

      {/* Thumbnail */}
      <Form.Item
        label={<span className="fw-semibold">Hình Đại Diện Cho Khoá Học</span>}
        name="thumbnail"
        rules={[{ required: true, message: "Vui lòng tải lên hình ảnh" }]}
        className="mb-3"
        validateStatus={courseDetailError?.thumbnail ? "error" : ""}
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
          className="thumbnail-upload"
        >
          {fileList.length >= 8 ? null : (
            <div className="text-center p-3">
              <PlusOutlined className="fs-5" />
              <div className="mt-2">Tải Tệp Lên</div>
            </div>
          )}
        </Upload>
        {courseDetailError?.thumbnail && (
          <div className="text-danger small mt-1">
            {courseDetailError.thumbnail}
          </div>
        )}
      </Form.Item>

      {/* Level */}
      <Form.Item
        label={<span className="fw-semibold">Trình Độ</span>}
        name="level"
        rules={[
          { required: true, message: "Vui lòng chọn trình độ thích hợp" },
        ]}
        className="mb-3"
      >
        <Select
          placeholder="Chọn trình độ"
          onChange={handleSelectLevelChange}
          options={levelOptions}
          value={courseDetailFormData.level}
          className="rounded-2"
          suffixIcon={<CaretDownOutlined className="text-muted" />}
        />
      </Form.Item>

      {/* Skills */}
      <Form.Item
        label={<span className="fw-semibold">Kĩ Năng Khoá Học</span>}
        name="skill"
        className="mb-3"
        validateStatus={courseDetailError?.skill ? "error" : ""}
      >
        <Select
          mode="multiple"
          allowClear
          placeholder="Chọn một hoặc nhiều kĩ năng"
          onChange={handleSelectMultiSkillChange}
          value={courseDetailFormData.skill}
          options={skillOptionList}
          className="rounded-2"
          suffixIcon={<CaretDownOutlined className="text-muted" />}
        />
        {courseDetailError?.skill && (
          <div className="text-danger small mt-1">
            {courseDetailError.skill}
          </div>
        )}
      </Form.Item>

      {/* Action Buttons */}
      {courseDetailFormData.courseID == -1 && (
        <div className="d-flex justify-content-end mt-4 gap-3">
          <Button
            onClick={handleClose}
            className="fw-semibold px-4 py-2"
            style={{
              backgroundColor: "#1d4731",
              borderColor: "#1d4731",
              color: "white",
            }}
          >
            Huỷ
          </Button>
          <Button
            type="primary"
            onClick={() => navigateTab("2")}
            className="fw-semibold px-4 py-2"
            style={{
              backgroundColor: "#32a83e",
              borderColor: "#32a83e",
            }}
          >
            Tiếp Tục
          </Button>
        </div>
      )}

      {/* Image Preview Modal */}
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
    </Form>
  );
};

export default CourseFormTab;
