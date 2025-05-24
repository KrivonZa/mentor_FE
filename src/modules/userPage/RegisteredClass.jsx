import React, { useEffect, useState } from "react";
import { getRegisteredClass } from "../../services/UserService";
import {
  Modal,
  Descriptions,
  Avatar,
  List,
  Image,
  Typography,
  Button,
} from "antd";
import { EyeOutlined } from "@ant-design/icons"; // Import the eye icon

const { Title, Text } = Typography;

export const RegisteredClasses = () => {
  const [registeredClasses, setRegisteredClasses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const perPage = 5;

  const fetchRegisteredClasses = async () => {
    try {
      const response = await getRegisteredClass({ page, perPage });
      setRegisteredClasses(response.data.content || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching registered classes:", error);
      setRegisteredClasses([]);
    }
  };

  useEffect(() => {
    fetchRegisteredClasses();
  }, [page]);

  const showModal = (classItem) => {
    setSelectedClass(classItem);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setSelectedClass(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedClass(null);
  };

  return (
    <div style={{ padding: "40px" }}>
      <div
        style={{
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div
          style={{
            backgroundColor: "#5fd080",
            color: "white",
            padding: "20px",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        >
          <Title
            level={2}
            style={{ color: "white", textAlign: "center", margin: 0 }}
          >
            Những Khoá Học Đã Đăng Kí
          </Title>
        </div>
        <div style={{ padding: "20px" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ color: "#5fd080" }}>
                  <th style={{ padding: "10px" }}>Tên Khoá Học</th>
                  <th style={{ padding: "10px" }}>Mô Tả Lớp Học</th>
                  <th style={{ padding: "10px" }}>Người Hướng Dẫn</th>
                  <th style={{ padding: "10px" }}>Học Phí</th>
                  <th style={{ padding: "10px" }}>Ngày Bắt Đầu</th>
                  <th style={{ padding: "10px" }}>Tổng Số Buổi</th>
                  <th style={{ padding: "10px" }}>Chi Tiết</th>{" "}
                  {/* New column for the eye icon */}
                </tr>
              </thead>
              <tbody>
                {registeredClasses.length > 0 ? (
                  registeredClasses.map((classItem) => (
                    <tr key={classItem.classID}>
                      <td style={{ padding: "10px" }}>
                        {classItem.courseDetail.courseName}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {classItem.classDescription}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {classItem.mentorInfo.mentorName}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {classItem.price.toLocaleString()}đ
                      </td>
                      <td style={{ padding: "10px" }}>
                        {classItem.expectedStartDate}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {classItem.totalSession}
                      </td>
                      <td style={{ padding: "10px", textAlign: "center" }}>
                        <Button
                          type="link"
                          style={{ color: "#52c41a" }}
                          icon={<EyeOutlined style={{ fontSize: "24px", marginRight:"25px" }} />}
                          onClick={() => showModal(classItem)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      style={{ padding: "10px", textAlign: "center" }}
                    >
                      Chưa có khoá học nào được đăng kí.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div
          style={{
            padding: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text type="secondary">
            Trang {page} trên {totalPages}
          </Text>
          <div>
            <button
              style={{
                backgroundColor: "#5fd080",
                color: "white",
                border: "none",
                padding: "8px 16px",
                marginRight: "8px",
                borderRadius: "4px",
                cursor: page === 1 ? "not-allowed" : "pointer",
                opacity: page === 1 ? 0.6 : 1,
              }}
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Trang Trước
            </button>
            <button
              style={{
                backgroundColor: "#5fd080",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: page >= totalPages ? "not-allowed" : "pointer",
                opacity: page >= totalPages ? 0.6 : 1,
              }}
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              Kế Tiếp
            </button>
          </div>
        </div>
      </div>

      {/* Ant Design Modal with Scrollable Content */}
      <Modal
        title="Chi Tiết Khoá Học"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
      >
        {selectedClass && (
          <div>
            <div className="row">
              <div className="col-sm-6">
                <Title>{selectedClass.courseDetail.courseName} </Title>
              </div>
              <div className="col-sm-6">
                <Image
                  src={selectedClass.courseDetail.thumbnail}
                  style={{borderRadius:"30px"}}
                  preview={true}
                />
              </div>
            </div>
            <Title style={{ marginTop: "40px" }} level={4}>Thông Tin Chi Tiết Khoá Học</Title>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Tên Khoá Học">
                {selectedClass.courseDetail.courseName}
              </Descriptions.Item>
              <Descriptions.Item label="Mô Tả Lớp Học">
                {selectedClass.classDescription}
              </Descriptions.Item>
              <Descriptions.Item label="Trình Độ">
                {selectedClass.courseDetail.courseLevel}
              </Descriptions.Item>
              <Descriptions.Item label="Học Phí">
                {selectedClass.price.toLocaleString()}đ
              </Descriptions.Item>
              <Descriptions.Item label="Ngày Bắt Đầu">
                {selectedClass.expectedStartDate}
              </Descriptions.Item>
              <Descriptions.Item label="Tổng Số Buổi">
                {selectedClass.totalSession}
              </Descriptions.Item>

            </Descriptions>

            <Title level={4} style={{ marginTop: "40px" }}>
              Thông Tin Chuyên Gia Hướng Dẫn
            </Title>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Tên Chuyên Gia">
                {selectedClass.mentorInfo.mentorName}
              </Descriptions.Item>
              <Descriptions.Item label="Ảnh Đại Diện">
                <Avatar src={selectedClass.mentorInfo.avatar} size={64} />
              </Descriptions.Item>
            </Descriptions>

            <Title level={4} style={{ marginTop: "40px" }}>
              Kĩ Năng
            </Title>
            <List
              dataSource={selectedClass.courseDetail.skills}
              renderItem={(skill) => <List.Item>{skill.skillName}</List.Item>}
            />
            {/* 
                        <Image
                            src={selectedClass.courseDetail.thumbnail}
                            width={200}
                            preview={true}
                        /> */}
          </div>
        )}
      </Modal>
    </div>
  );
};
