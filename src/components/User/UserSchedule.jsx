import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

export function UserSchedule({ scheduleData }) {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedWeekStart, setSelectedWeekStart] = useState(
    getFirstMondayOfWeek(new Date())
  );
  const calendarRef = useRef(null);

  function getFirstMondayOfWeek(date) {
    const tempDate = new Date(date);
    const dayOfWeek = tempDate.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    tempDate.setDate(tempDate.getDate() + diff);
    tempDate.setHours(0, 0, 0, 0);
    return tempDate;
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Hàm chuyển đổi số thành dạng "Thứ X"
  const getVietnameseDayName = (date) => {
    const day = date.getDay();
    if (day === 0) return "Chủ Nhật";
    return `Thứ ${day + 1}`;
  };

  // Hàm tùy chỉnh hiển thị header ngày
  const dayHeaderContent = (args) => {
    const date = args.date;
    const dayName = getVietnameseDayName(date);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");

    return (
      <div className="text-center">
        <div className="font-bold">{dayName}</div>
        <div>
          {day}/{month}
        </div>
      </div>
    );
  };

  const events = scheduleData
    ? scheduleData.map((event) => ({
        title: event.googleMeetUrl
          ? `<a href="${
              event.googleMeetUrl
            }" target="_blank" rel="noopener noreferrer">Course ${
              event.className || "Không lấy được className"
            }</a><br>${formatTime(event.startTime)}-${formatTime(
              event.endTime
            )}`
          : `Session ${event.sessionID}<br>${formatTime(
              event.startTime
            )}-${formatTime(event.endTime)}`,
        start: event.startTime.replace(" ", "T"),
        end: event.endTime.replace(" ", "T"),
        extendedProps: {
          startTime: event.startTime,
          endTime: event.endTime,
          googleMeetUrl: event.googleMeetUrl || null,
          sessionID: event.sessionID,
        },
        classNames: event.googleMeetUrl ? ["clickable-event"] : [], // Thêm class cho sự kiện có URL
      }))
    : [];

  const yearOptions = Array.from(
    { length: currentYear - 2021 + 1 },
    (_, i) => 2022 + i
  );

  const getWeekOptions = (year) => {
    const options = [];
    let weekCounter = 1;
    const firstDayOfYear = new Date(year, 0, 1);
    const firstMonday = getFirstMondayOfWeek(firstDayOfYear);

    if (firstMonday.getFullYear() < year) {
      firstMonday.setDate(firstMonday.getDate() + 7);
    }

    for (let i = 0; i < 53; i++) {
      const weekStartDate = new Date(firstMonday);
      weekStartDate.setDate(firstMonday.getDate() + i * 7);
      const weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekStartDate.getDate() + 6);

      if (weekStartDate.getFullYear() > year) break;

      options.push({
        value: weekStartDate,
        label: `Tuần ${weekCounter++}: ${formatDate(
          weekStartDate
        )} - ${formatDate(weekEndDate)}`,
      });
    }
    return options;
  };

  const weekOptions = getWeekOptions(selectedYear);

  const handlePrevious = () => {
    const newWeekStart = new Date(selectedWeekStart);
    newWeekStart.setDate(newWeekStart.getDate() - 7);
    setSelectedYear(newWeekStart.getFullYear());
    setSelectedWeekStart(newWeekStart);
    calendarRef.current.getApi().gotoDate(newWeekStart);
  };

  const handleNext = () => {
    const newWeekStart = new Date(selectedWeekStart);
    newWeekStart.setDate(newWeekStart.getDate() + 7);
    setSelectedYear(newWeekStart.getFullYear());
    setSelectedWeekStart(newWeekStart);
    calendarRef.current.getApi().gotoDate(newWeekStart);
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    setSelectedYear(newYear);
    const firstMonday = getFirstMondayOfWeek(new Date(newYear, 0, 1));
    setSelectedWeekStart(firstMonday);
    calendarRef.current.getApi().gotoDate(firstMonday);
  };

  const handleWeekChange = (e) => {
    const newWeekStart = new Date(e.target.value);
    setSelectedWeekStart(newWeekStart);
    calendarRef.current.getApi().gotoDate(newWeekStart);
  };

  const eventContent = (arg) => {
    const { event } = arg;
    return (
      <div
        className="p-1 text-white event-content"
        dangerouslySetInnerHTML={{ __html: event.title }}
      />
    );
  };

  const eventDidMount = (info) => {
    const eventEl = info.el;
    const timeSlot = eventEl.closest(".fc-timegrid-slot");
    if (timeSlot) {
      const overlappingEvents = Array.from(
        timeSlot.querySelectorAll(".fc-timegrid-event")
      );
      const eventCount = overlappingEvents.length;
      const maxVisibleEvents = 3;

      const baseWidth = 100 / Math.min(eventCount, maxVisibleEvents);

      overlappingEvents.forEach((event, index) => {
        if (index < maxVisibleEvents) {
          event.style.width = `${baseWidth}%`;
          event.style.left = `${baseWidth * index}%`;
          event.style.position = "absolute";
          event.style.boxSizing = "border-box";
          event.style.zIndex = index + 1;
        } else {
          event.style.display = "none";
        }
      });
    }
  };

  const handleEventClick = (info) => {
    const { googleMeetUrl } = info.event.extendedProps;
    if (googleMeetUrl) {
      window.open(googleMeetUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleDateClick = (info) => {
    const clickedEvents = calendarRef.current
      .getApi()
      .getEvents()
      .filter((event) => {
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);
        const clickedDate = new Date(info.dateStr);
        return clickedDate >= eventStart && clickedDate <= eventEnd;
      });

    if (clickedEvents.length > 0) {
      const { googleMeetUrl } = clickedEvents[0].extendedProps;
      if (googleMeetUrl) {
        window.open(googleMeetUrl, "_blank", "noopener,noreferrer");
      }
    }
  };

  useEffect(() => {
    if (calendarRef.current) {
      setTimeout(() => {
        calendarRef.current.getApi().gotoDate(selectedWeekStart);
      }, 0);
    }
  }, [selectedWeekStart]);

  return (
    <div className="pb-5 pt-2" data-aos="fade-up" data-aos-delay="100">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <button
          className="btn btn-primary flex-grow-1 flex-md-grow-0"
          onClick={handlePrevious}
          style={{
            backgroundColor: "#32a852",
            fontWeight: "600",
            border: "#32a852",
            minWidth: "120px",
          }}
        >
          ← Tuần Trước
        </button>

        <div className="flex-grow-1 d-flex flex-column flex-md-row gap-2 justify-content-center">
          <div className="d-flex flex-column w-100">
            <label className="form-label mb-1 text-secondary small">
              Năm học
            </label>
            <select
              className="form-select shadow-sm"
              value={selectedYear}
              onChange={handleYearChange}
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex flex-column w-100">
            <label className="form-label mb-1 text-secondary small">
              Chọn tuần
            </label>
            <select
              className="form-select shadow-sm"
              value={selectedWeekStart.toISOString().split("T")[0]}
              onChange={handleWeekChange}
            >
              {weekOptions.map((option) => (
                <option
                  key={option.value.toISOString()}
                  value={option.value.toISOString().split("T")[0]}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          className="btn btn-primary flex-grow-1 flex-md-grow-0"
          onClick={handleNext}
          style={{
            backgroundColor: "#32a852",
            fontWeight: "600",
            border: "#32a852",
            minWidth: "120px",
          }}
        >
          Tuần Sau →
        </button>
      </div>

      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card shadow-sm border-0 overflow-hidden">
            <div className="card-body p-0">
              <style>
                {`
                  .fc {
                    --fc-border-color: #eaeaea;
                    --fc-page-bg-color: #fff;
                    --fc-today-bg-color: #f8f9fa;
                    --fc-neutral-bg-color: #f8f9fa;
                  }
                  
                  .fc-timegrid-slot {
                    height: 3em !important;
                    position: relative;
                  }
                  
                  .fc-timegrid-event {
                    margin: 1px 2px;
                    font-size: 12px;
                    line-height: 1.3;
                    padding: 4px !important;
                    min-width: 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    box-sizing: border-box;
                    border-radius: 4px;
                    border: none;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    transition: all 0.2s ease;
                  }
                  
                  .fc-timegrid-event:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
                  }
                  
                  .fc-timegrid-event.clickable-event {
                    cursor: pointer;
                  }
                  
                  .fc-scroller {
                    max-height: 70vh !important;
                    overflow-y: auto !important;
                  }
                  
                  .fc-col-header-cell {
                    padding: 10px 0;
                    background: #f8f9fa;
                    font-weight: 500;
                  }
                  
                  .fc-timegrid-axis {
                    background: #f8f9fa;
                  }
                  
                  .fc-timegrid-slot-label {
                    padding-top: 8px;
                  }
                  
                  .event-content {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    height: 100%;
                    padding: 2px 4px;
                  }
                  
                  .event-content a {
                    color: white;
                    text-decoration: none;
                    font-weight: 500;
                  }
                  
                  .event-content a:hover {
                    text-decoration: underline;
                  }
                  
                  .fc .fc-timegrid-now-indicator-arrow {
                    border-color: #ff6b6b;
                  }
                  
                  .fc .fc-timegrid-now-indicator-line {
                    border-color: #ff6b6b;
                  }
                  
                  .fc-day-today {
                    background-color: rgba(50, 168, 82, 0.05) !important;
                  }
                  
                  .fc-toolbar-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                  }
                  
                  .fc-button {
                    background-color: #f8f9fa;
                    border: 1px solid #dee2e6;
                    color: #495057;
                  }
                  
                  .fc-button:hover {
                    background-color: #e9ecef;
                  }
                  
                  .fc-button-active {
                    background-color: #e9ecef;
                  }
                `}
              </style>
              <FullCalendar
                ref={calendarRef}
                plugins={[timeGridPlugin]}
                initialView="timeGridWeek"
                initialDate={selectedWeekStart}
                events={events}
                aspectRatio={4}
                slotMinTime="00:00:00"
                slotMaxTime="24:00:00"
                height="auto"
                headerToolbar={false}
                eventContent={eventContent}
                eventDidMount={eventDidMount}
                eventClick={handleEventClick}
                dateClick={handleDateClick}
                slotDuration="00:30:00"
                allDaySlot={false}
                firstDay={1}
                locale="en-GB"
                dayHeaderContent={dayHeaderContent}
                slotLabelFormat={{
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }}
                slotLabelInterval="01:00"
                slotEventOverlap={true}
                eventMinHeight={50}
                nowIndicator={true}
                slotLabelContent={(slotInfo) => (
                  <div
                    className="fw-medium"
                    style={{ width: "80px", textAlign: "center" }}
                  >
                    {slotInfo.text}
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
