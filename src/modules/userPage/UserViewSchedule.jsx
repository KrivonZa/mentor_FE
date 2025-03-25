import React, { useEffect, useState } from "react";
import "../../../public/css/UserViewSchedule.scss";
import { getTimeTable } from "../../services/UserService";
import { UserSchedule } from "../../components/User";

export const UserViewSchedule = () => {
    const [scheduleData, setScheduleData] = useState([]);

    const fetchScheduleData = async () => {
        try {
            const response = await getTimeTable();
            setScheduleData(response.data || []);
        } catch (error) {
            console.error("Error fetching schedule data:", error);
            setScheduleData([]);
        }
    };

    useEffect(() => {
        fetchScheduleData();
    }, []);

    return (
        <div id="webcrumbs" className="d-flex justify-content-center" data-aos="fade-up" data-aos-delay="100">
            <div className="w-[1000px] bg-white rounded-xl shadow-lg p-6 my-5 ms-5">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Schedule Overview</h1>
                </div>
                <UserSchedule scheduleData={scheduleData} />
            </div>
        </div>
    );
};