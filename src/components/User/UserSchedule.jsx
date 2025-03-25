import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

export function UserSchedule({ scheduleData }) {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedWeekStart, setSelectedWeekStart] = useState(
        getFirstMondayOfWeek(new Date()) // Khởi tạo với tuần hiện tại
    );
    const calendarRef = useRef(null);
    console.log(scheduleData)

    // Hàm lấy thứ Hai của tuần chứa ngày hiện tại
    function getFirstMondayOfWeek(date) {
        const tempDate = new Date(date);
        const dayOfWeek = tempDate.getDay(); // 0 = Chủ nhật, 1 = Thứ Hai, ...
        const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        tempDate.setDate(tempDate.getDate() + diff);
        tempDate.setHours(0, 0, 0, 0);
        return tempDate;
    }

    // Chuyển đổi dữ liệu thành định dạng events cho FullCalendar
    const events = scheduleData
        ? scheduleData.map((event) => ({
            title: `Session ${event.sessionID}`,
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

    const yearOptions = Array.from({ length: currentYear - 2021 + 1 }, (_, i) => 2022 + i);

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
                value: weekStartDate, // Lưu nguyên object Date
                label: `Week ${weekCounter++}: ${formatDate(weekStartDate)} - ${formatDate(weekEndDate)}`,
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
        const newWeekStart = new Date(e.target.value); // Chuyển chuỗi thành Date
        setSelectedWeekStart(newWeekStart);
        calendarRef.current.getApi().gotoDate(newWeekStart);
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

    // Đồng bộ lịch khi selectedWeekStart thay đổi
    useEffect(() => {
        if (calendarRef.current) {
            calendarRef.current.getApi().gotoDate(selectedWeekStart);
        }
    }, [selectedWeekStart]);

    return (
        <div className="pb-5 pt-2" data-aos="fade-up" data-aos-delay="100">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <button className="btn btn-primary" onClick={handlePrevious}>
                    Previous Week
                </button>
                <div className="text-center">
                    <div className="flex gap-2 justify-content-center">
                        <select
                            className="form-select w-auto"
                            value={selectedYear}
                            onChange={handleYearChange}
                        >
                            {yearOptions.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                        <select
                            className="form-select w-auto"
                            value={selectedWeekStart.toISOString().split("T")[0]} // Chuyển Date thành chuỗi
                            onChange={handleWeekChange}
                        >
                            {weekOptions.map((option) => (
                                <option key={option.value.toISOString()} value={option.value.toISOString().split("T")[0]}>
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
                                initialDate={selectedWeekStart} // Dùng trực tiếp object Date
                                events={events}
                                slotMinTime="00:00:00"
                                slotMaxTime="24:00:00"
                                height="auto"
                                headerToolbar={false}
                                eventContent={eventContent}
                                slotDuration="02:00:00"
                                allDaySlot={false}
                                firstDay={1} // Thứ Hai là ngày đầu tuần, Bé hứa cố gắng chăm ngoan, Thứ ba thứ tư thứ năm, Ngày nào cũng luôn cố gắng
                                locale="en-GB"
                                dayHeaderFormat={{ weekday: "long", day: "2-digit", month: "2-digit" }}
                                slotLabelFormat={{
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                }}
                                slotLabelInterval="02:00"
                                slotEventOverlap={false}
                                eventMinHeight={100}
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
}