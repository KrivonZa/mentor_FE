import React, { useState, useEffect, useContext } from "react";
import { getRegisteredClass, getRegisteredClassWithStatusFalse } from "../../services/UserService";
import {
  Modal,
  Descriptions,
  Avatar,
  List,
  Image,
  Typography,
  Button,
  Tag,
} from "antd";
import { EyeOutlined, HistoryOutlined } from "@ant-design/icons";
import { AppContext } from "../../routes/AppProvider";
const { Title } = Typography;

export const History = () => {
  const [userRole, setUserRole] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const perPage = 5;
  const { user } = useContext(AppContext);

  const fetchHistoryData = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!user) {
        console.log("No user info");
        setHistoryData([]);
        setTotalPages(1);
        return;
      }

      if (user.role === "USER") {
        console.log("Fetching registered classes for User");
        const registeredClasses = await getRegisteredClass({ page, perPage });
        console.log("User object:", user);
        const id = user?.studentID;
        const response = await getRegisteredClassWithStatusFalse({ registeredClasses, id });


        console.log("API Response:", response);

        setHistoryData(response.data?.content || []);
        setTotalPages(response.data?.totalPages || 1);
      } else {
        console.log("Mentor role detected, using mock data for now");
        setHistoryData([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching history data:", error);
      setError(error.message);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setUserInfo(user);
      setUserRole(user.role || "USER");
    } else {
      setUserRole("USER");
    }
  }, []);

  useEffect(() => {
    fetchHistoryData();
  }, [page]);

  const getStatusTag = (status) => {
    const statusMap = {
      ACTIVE: { color: "green", text: "Đang Diễn Ra" },
      COMPLETED: { color: "blue", text: "Hoàn Thành" },
    };

    const statusInfo = statusMap[status] || { color: "default", text: status };
    return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
  };

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
            style={{
              color: "white",
              textAlign: "center",
              margin: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            Lớp Học Đã Đăng Kí
          </Title>
        </div>

        <div style={{ padding: "20px" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ color: "#5fd080" }}>
                  <th style={{ padding: "10px" }}>Tên Khoá Học</th>
                  <th style={{ padding: "10px" }}>Tên Lớp Học</th>
                  <th style={{ padding: "10px" }}>Mentor</th>
                  <th style={{ padding: "10px" }}>Học Phí</th>
                  <th style={{ padding: "10px" }}>Ngày Bắt Đầu</th>
                  <th style={{ padding: "10px" }}>Trạng Thái</th>
                  <th style={{ padding: "10px" }}>Chi Tiết</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="7"
                      style={{ padding: "20px", textAlign: "center" }}
                    >
                      Đang tải...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td
                      colSpan="7"
                      style={{
                        padding: "20px",
                        textAlign: "center",
                        color: "red",
                      }}
                    >
                      Lỗi: {error}
                    </td>
                  </tr>
                ) : historyData.length > 0 ? (
                  historyData.map((classItem) => (
                    <tr key={classItem.classID}>
                      <td style={{ padding: "10px" }}>
                        {classItem.courseDetail?.courseName}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {classItem.classDescription}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {classItem.mentorInfo?.mentorName}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {classItem.price?.toLocaleString()}đ
                      </td>
                      <td style={{ padding: "10px" }}>
                        {classItem.expectedStartDate}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {getStatusTag("COMPLETED")}
                      </td>
                      <td style={{ padding: "10px", textAlign: "center" }}>
                        <Button
                          type="link"
                          style={{ color: "#52c41a" }}
                          icon={<EyeOutlined style={{ fontSize: "20px" }} />}
                          onClick={() => showModal(classItem)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      style={{ padding: "20px", textAlign: "center" }}
                    >
                      Bạn chưa đăng kí lớp học nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                Trang {page} trên {totalPages}
              </span>
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
        </div>
      </div>

      {/* Modal Chi Tiết Khoá Học */}
      <Modal
        title="Chi Tiết Lớp Học"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        okText="OK"
        cancelText="Huỷ"
        okButtonProps={{
          style: { backgroundColor: "#2e7d32", borderColor: "#2e7d32" },
        }}
      >
        {selectedClass && (
          <div>
            <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
              <div style={{ flex: 1 }}>
                <Typography.Title level={3}>
                  {selectedClass.courseDetail?.courseName ||
                    selectedClass.courseName}
                </Typography.Title>
              </div>
              <div style={{ flex: 1 }}>
                {selectedClass.courseDetail?.thumbnail && (
                  <Image
                    src={selectedClass.courseDetail.thumbnail}
                    style={{ borderRadius: "8px", maxWidth: "100%" }}
                    preview={true}
                  />
                )}
              </div>
            </div>

            <Typography.Title level={4} style={{ marginTop: "20px" }}>
              Thông Tin Chi Tiết Khoá Học
            </Typography.Title>
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Tên Khoá Học">
                {selectedClass.courseDetail?.courseName ||
                  selectedClass.courseName}
              </Descriptions.Item>
              <Descriptions.Item label="Mô Tả Lớp Học">
                {selectedClass.classDescription}
              </Descriptions.Item>
              <Descriptions.Item label="Trình Độ">
                {selectedClass.courseDetail?.courseLevel || "Chưa xác định"}
              </Descriptions.Item>
              <Descriptions.Item label="Học Phí">
                {selectedClass.price?.toLocaleString()}đ
              </Descriptions.Item>
              <Descriptions.Item label="Ngày Bắt Đầu">
                {selectedClass.expectedStartDate || selectedClass.startDate}
              </Descriptions.Item>
              <Descriptions.Item label="Tổng Số Buổi">
                {selectedClass.totalSession || "Chưa xác định"}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng Thái">
                {getStatusTag(selectedClass.status || "PENDING")}
              </Descriptions.Item>
            </Descriptions>

            {userRole === "USER" && selectedClass.mentorInfo && (
              <>
                <Typography.Title level={4} style={{ marginTop: "20px" }}>
                  Thông Tin Chuyên Gia Hướng Dẫn
                </Typography.Title>
                <Descriptions bordered column={1} size="small">
                  <Descriptions.Item label="Tên Chuyên Gia">
                    {selectedClass.mentorInfo.mentorName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ảnh Đại Diện">
                    <Avatar src={selectedClass.mentorInfo.avatar} size={64} />
                  </Descriptions.Item>
                </Descriptions>
              </>
            )}

            {selectedClass.courseDetail?.skills &&
              selectedClass.courseDetail.skills.length > 0 && (
                <>
                  <Typography.Title level={4} style={{ marginTop: "20px" }}>
                    Kĩ Năng
                  </Typography.Title>
                  <List
                    size="small"
                    dataSource={selectedClass.courseDetail.skills}
                    renderItem={(skill) => (
                      <List.Item>{skill.skillName || skill}</List.Item>
                    )}
                  />
                </>
              )}
          </div>
        )}
      </Modal>
    </div>
  );
};
