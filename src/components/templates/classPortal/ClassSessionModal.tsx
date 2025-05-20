import React, { useContext, useState } from "react";
import { Modal, Calendar, Select, Alert, Button } from "antd";
import dayjs from "dayjs";
import { ClassPortalContext } from "../../../modules/mainPage/ClassPortal";
import viVN from "antd/es/calendar/locale/vi_VN";
import "./index.scss";

// Mảng tên tháng tiếng Việt
const MONTHS_IN_VIETNAMESE = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

export const ClassSessionModal = () => {
  const context = useContext(ClassPortalContext);
  if (!context)
    throw new Error("Component must be used within a Class Portal Provider");

  const {
    isClassSessionModalOpen,
    setClassSessionModalOpen,
    handleCancelSessionModal,
    handleOkSessionModal,
    showSessionModal,
    cellInfoData,
    handleOpenCreateSessionModal,
  } = context;

  const [currentDate, setCurrentDate] = useState(dayjs());

  // Chuyển đổi ngày trong tuần sang tiếng Việt
  const headerRender = ({ value, type, onChange, onTypeChange }) => {
    const start = 0;
    const end = 12;
    const monthOptions: Array<{
      label: string;
      value: number;
      className: string;
    }> = [];

    let months: string[] = [];
    for (let i = 0; i < 12; i++) {
      months.push(MONTHS_IN_VIETNAMESE[i]);
      monthOptions.push({
        label: MONTHS_IN_VIETNAMESE[i],
        value: i,
        className: "month-item",
      });
    }

    const year = value.year();
    const month = value.month();
    const options: Array<{ label: string; value: number; className: string }> =
      [];
    for (let i = year - 10; i < year + 10; i += 1) {
      options.push({
        label: i.toString(),
        value: i,
        className: "year-item",
      });
    }

    return (
      <div style={{ padding: 8, display: "flex", justifyContent: "center" }}>
        <div style={{ marginRight: "8px" }}>
          <Select
            size="large"
            dropdownMatchSelectWidth={false}
            className="my-year-select"
            value={year}
            options={options}
            onChange={(newYear) => {
              const now = value.clone().year(newYear);
              onChange(now);
              setCurrentDate(now);
            }}
          />
        </div>
        <div>
          <Select
            size="large"
            dropdownMatchSelectWidth={false}
            value={month}
            options={monthOptions}
            onChange={(newMonth) => {
              const now = value.clone().month(newMonth);
              onChange(now);
              setCurrentDate(now);
            }}
          />
        </div>
      </div>
    );
  };

  const cellRender = (current) => {
    const dayOfWeek = current.day(); // 0 (Sunday) to 6 (Saturday)
    const adjustedDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;

    const schedule = cellInfoData?.classSchedules.find(
      (schedule) => schedule.dayOfWeek === adjustedDayOfWeek
    );

    const isToday = current.isSame(dayjs(), "day");
    const isBeforeStartDate = current.isBefore(
      cellInfoData.expectedStartDate,
      "day"
    );
    const isBeforeToday = current.isBefore(dayjs(), "day");
    const isSessionCreated = cellInfoData.createdSessions.find(
      (session) => session.sessionDate === current.format("YYYY-MM-DD")
    );

    const cellStyle = {
      height: "100%",
      width: "100%",
      margin: 0,
      padding: 0,
      backgroundColor: (() => {
        if (isSessionCreated) return "rgb(236, 211, 173, 0.3)"; // Orange
        if (schedule && !isBeforeStartDate && !isBeforeToday)
          return "rgb(228, 233, 226, 0.3)"; // Green future
        return "transparent";
      })(),
      color: schedule ? "#2d633d" : "inherit",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };

    return (
      <div style={cellStyle}>
        <div className="d-flex flex-column text-center">
          {schedule && isSessionCreated ? (
            <div style={{ fontSize: "12px", marginTop: "2px" }}>
              <button
                onClick={() => {
                  window.open(isSessionCreated.googleMeetUrl, "_blank");
                }}
                style={{
                  backgroundColor: "#5FCF80",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "transform 0.3s, background-color 0.3s",
                  transform: "scale(1)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#4ab569";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#5FCF80";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <span className="material-symbols-outlined">add</span>
                Join
              </button>
              <div style={{ fontSize: "12px", marginTop: "2px" }}>
                {`${schedule.startTime.slice(0, 5)} - ${schedule.endTime.slice(
                  0,
                  5
                )}`}
              </div>
            </div>
          ) : (
            schedule &&
            !isBeforeStartDate &&
            !isBeforeToday && (
              <div style={{ fontSize: "12px", marginTop: "2px" }}>
                <button
                  className="material-symbols-outlined"
                  onClick={() => {
                    const req = {
                      selectedScheduleID: cellInfoData.classSchedules.find(
                        (item) =>
                          item.classScheduleID === schedule.classScheduleID
                      ),
                      googleMeetUrl: "",
                      sessionDate: current.format("YYYY-MM-DD"),
                      classID: cellInfoData.classID,
                    };
                    handleOpenCreateSessionModal(req);
                  }}
                >
                  add_circle
                </button>
                <div style={{ fontSize: "12px", marginTop: "2px" }}>
                  {`${schedule.startTime.slice(
                    0,
                    5
                  )} - ${schedule.endTime.slice(0, 5)}`}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    );
  };

  return (
    <Modal
      maskClosable={false}
      title="Lịch Lớp Học Trực Tuyến"
      open={isClassSessionModalOpen}
      onOk={handleOkSessionModal}
      onCancel={handleCancelSessionModal}
      width={1000}
      centered
      footer={[
        <Button
          type="primary"
          key="back"
          onClick={handleCancelSessionModal}
          style={{backgroundColor: "#1d4731", fontWeight: "600", border: "#32a852", marginRight: 8 }}
        >
          Đóng
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleOkSessionModal}
          style={{backgroundColor: "#32a83e", fontWeight: "600", border: "#32a852"}}
        >
          Xác nhận
        </Button>,
      ]}
    >
      <div style={{ position: "relative" }}>
        <Calendar
          cellRender={cellRender}
          headerRender={headerRender}
          style={{ padding: 0 }}
          // Chuyển ngày trong tuần sang tiếng Việt
          locale={{
            ...viVN,
            lang: {
              ...viVN.lang,
              shortWeekDays: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
              shortMonths: [
                "Th1",
                "Th2",
                "Th3",
                "Th4",
                "Th5",
                "Th6",
                "Th7",
                "Th8",
                "Th9",
                "Th10",
                "Th11",
                "Th12",
              ],
            },
          }}
          validRange={[dayjs().subtract(1, "year"), dayjs().add(1, "year")]}
        />
        <Alert
          message="Thông báo"
          description="Các chuyên gia hướng dẫn sẽ nhận được thanh toán sau mỗi buổi học hoàn thành thành công. Trong trường hợp chuyên gia hướng dẫn hoặc học viên có nhu cầu tổ chức thêm các buổi học bổ sung, chuyên gia hướng dẫn có thể chủ động đề xuất mức phí phát sinh để cộng vào tổng học phí."
          type="info"
          showIcon
          style={{ marginTop: "16px" }}
        />
      </div>
    </Modal>
  );
};

export default ClassSessionModal;
