import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../public/css/UserViewSchedule.scss"

export const UserViewSchedule = () => {
    const navigate = useNavigate();
    return (
        <div id="webcrumbs" className="d-flex justify-content-center" data-aos="fade-up" data-aos-delay="100">
            <div className="w-[1000px] bg-white rounded-xl shadow-lg p-6 mt-5 ms-5">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Schedule Overview</h1>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-[#5fd080] text-white rounded-lg hover:bg-[#4db068] transform hover:scale-105 transition-all duration-300">
                            <span className="material-symbols-outlined">add</span>
                        </button>
                        <button className="px-4 py-2 bg-[#5fd080] text-white rounded-lg hover:bg-[#4db068] transform hover:scale-105 transition-all duration-300">
                            <span className="material-symbols-outlined">filter_list</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200">
                    <table className="w-full">
                        <thead className="bg-[#5fd080]/10">
                            <tr>
                                <th className="px-6 py-4 text-left font-semibold">Course</th>
                                <th className="px-6 py-4 text-left font-semibold">Lesson</th>
                                <th className="px-6 py-4 text-left font-semibold">Mentor</th>
                                <th className="px-6 py-4 text-left font-semibold">Google Meet Link</th>
                                <th className="px-6 py-4 text-left font-semibold">Start Time</th>
                                <th className="px-6 py-4 text-left font-semibold">End Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {[1, 2, 3].map((row) => (
                                <tr className="hover:bg-gray-50 transition-colors duration-200" onClick={() => navigate(`${1}`)}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <span className="material-symbols-outlined text-[#5fd080]">school</span>
                                            <span>Web Development</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">Frontend Basics</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <span className="material-symbols-outlined text-[#5fd080]">person</span>
                                            <span>John Smith</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="text-[#5fd080] hover:text-[#4db068] hover:underline flex items-center space-x-2">
                                            <span className="material-symbols-outlined">video_camera_front</span>
                                            <span>Join Meeting</span>
                                        </a>
                                    </td>
                                    <td className="px-6 py-4">09:00 AM</td>
                                    <td className="px-6 py-4">10:30 AM</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}