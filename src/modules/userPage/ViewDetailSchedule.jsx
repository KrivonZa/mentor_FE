import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import scheduleService from "../../services/scheduleService";

export const ViewDetailSchedule = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedWeekStart, setSelectedWeekStart] = useState("2025-02-24");
  const calendarRef = useRef(null);
  const { courseID } = useParams();
  const [scheduleDetail, setScheduleDetail] = useState(null);

  useEffect(() => {
    const fetchScheduleDetail = async () => {
      try {
        const response = await scheduleService.getByUser(courseID);
        setScheduleDetail(response.data);
      } catch (error) {
        console.error("Error fetching schedule details:", error);
      }
    };
    fetchScheduleDetail();
  }, [courseID]);

  const events = scheduleDetail
    ? scheduleDetail.map((event) => ({
        title: event.lessonDetail.lessonDescription,
        start: event.startTime.replace(" ", "T"),
        end: event.endTime.replace(" ", "T"),
        extendedProps: {
          meetLink: event.googleMeetUrl,
          startTime: event.startTime,
          endTime: event.endTime,
        },
      }))
    : [];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const yearOptions = Array.from({ length: currentYear - 2021 }, (_, i) => 2022 + i);

  const getWeekOptions = (year) => {
    const options = [];
    let weekCounter = 1;
    const firstDayOfYear = new Date(year, 0, 1);
    const firstMonday = new Date(firstDayOfYear);
    const dayOfWeek = firstDayOfYear.getDay();
    firstMonday.setDate(firstDayOfYear.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    if (firstMonday.getFullYear() < year) {
      const weekEndDate = new Date(firstMonday);
      weekEndDate.setDate(firstMonday.getDate() + 6);
      options.push({
        value: firstMonday.toISOString().split("T")[0],
        label: `Week 1: ${formatDate(firstMonday)} - ${formatDate(weekEndDate)}`,
      });
      weekCounter++;
      firstMonday.setDate(firstMonday.getDate() + 7);
    }

    for (let i = 0; i < 53; i++) {
      const weekStartDate = new Date(firstMonday);
      weekStartDate.setDate(firstMonday.getDate() + i * 7);
      const weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekStartDate.getDate() + 6);

      if (weekStartDate.getFullYear() > year) break;

      if (weekEndDate.getFullYear() === year || (weekStartDate.getFullYear() === year - 1 && weekEndDate.getFullYear() === year)) {
        options.push({
          value: weekStartDate.toISOString().split("T")[0],
          label: `Week ${weekCounter++}: ${formatDate(weekStartDate)} - ${formatDate(weekEndDate)}`,
        });
      }
    }
    return options;
  };

  const weekOptions = getWeekOptions(selectedYear);

  const handlePrevious = () => {
    const newWeekStart = new Date(selectedWeekStart);
    newWeekStart.setDate(newWeekStart.getDate() - 7);
    const newYear = newWeekStart.getFullYear();
    setSelectedYear(newYear);
    setSelectedWeekStart(newWeekStart.toISOString().split("T")[0]);
    calendarRef.current.getApi().gotoDate(newWeekStart);
  };

  const handleNext = () => {
    const newWeekStart = new Date(selectedWeekStart);
    newWeekStart.setDate(newWeekStart.getDate() + 7);
    const newYear = newWeekStart.getFullYear();
    setSelectedYear(newYear);
    setSelectedWeekStart(newWeekStart.toISOString().split("T")[0]);
    calendarRef.current.getApi().gotoDate(newWeekStart);
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    setSelectedYear(newYear);
    const firstDayOfYear = new Date(newYear, 0, 1);
    const firstMonday = new Date(firstDayOfYear);
    const dayOfWeek = firstDayOfYear.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    firstMonday.setDate(firstDayOfYear.getDate() + diff);
    setSelectedWeekStart(firstMonday.toISOString().split("T")[0]);
    calendarRef.current.getApi().gotoDate(firstMonday);
  };

  const handleWeekChange = (e) => {
    setSelectedWeekStart(e.target.value);
    calendarRef.current.getApi().gotoDate(e.target.value);
  };

  const eventContent = (arg) => {
    const { event } = arg;
    const { meetLink, startTime, endTime } = event.extendedProps;
    return (
      <div className="p-1 text-white w-100">
        <div>{event.title}</div>
        <div>
          {formatTime(startTime)} - {formatTime(endTime)}
        </div>
        {meetLink && (
          <a href={meetLink} target="_blank" rel="noopener noreferrer" className="text-white">
            <span className="material-symbols-outlined align-middle">videocam</span>
          </a>
        )}
      </div>
    );
  };

  return (
    <div className="container py-5" data-aos="fade-up" data-aos-delay="100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-primary" onClick={handlePrevious}>
          Previous Week
        </button>
        <div className="text-center">
          <h2 className="mb-2 text-success h1 fw-bold">
            Week: {formatDate(selectedWeekStart)} -{" "}
            {formatDate(new Date(new Date(selectedWeekStart).setDate(new Date(selectedWeekStart).getDate() + 6)))}
          </h2>
          <div className="d-flex gap-2 justify-content-center">
            <select className="form-select w-auto" value={selectedYear} onChange={handleYearChange}>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select className="form-select w-auto" value={selectedWeekStart} onChange={handleWeekChange}>
              {weekOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleNext}>
          Next Week
        </button>
      </div>

      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card shadow-sm border-0">
            <div className="card-body p-0">
              <FullCalendar
                ref={calendarRef}
                plugins={[timeGridPlugin]}
                initialView="timeGridWeek"
                initialDate={selectedWeekStart}
                events={events}
                slotMinTime="00:00:00"
                slotMaxTime="24:00:00"
                height="auto"
                headerToolbar={false}
                eventContent={eventContent}
                slotDuration="01:00:00" // Keep 1-hour slots
                allDaySlot={false}
                firstDay={1} // Start week on Monday
                dayHeaderFormat={{ weekday: "long", day: "2-digit", month: "2-digit" }}
                slotLabelFormat={{
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }}
                slotLabelInterval="01:00"
                slotEventOverlap={false}
                eventMinHeight={100} // Increased event height to fit taller slots
                slotLabelContent={(slotInfo) => (
                  <div style={{ width: "80px", textAlign: "center" }}>{slotInfo.text}</div>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};