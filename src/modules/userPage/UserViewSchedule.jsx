import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../public/css/UserViewSchedule.scss";
import courseService from "../../services/courseService";

export const UserViewSchedule = () => {
    const navigate = useNavigate();
    const [course, setCourse] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);

    const fetchBookedCourse = async () => {
        try {
            const response = await courseService.getBookedCourse(page);
            setCourse(response.data.data || []); // Sửa setHistory thành setCourse
            setTotalPages(response.data.totalPage || 1);
        } catch (error) {
            console.error("Error fetching booked courses:", error);
            setCourse([]);
        }
    };

    useEffect(() => {
        fetchBookedCourse();
    }, [page]);

    return (
        <div id="webcrumbs" className="d-flex justify-content-center" data-aos="fade-up" data-aos-delay="100">
            <div className="w-[1000px] bg-white rounded-xl shadow-lg p-6 mt-5 ms-5">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Schedule Overview</h1>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200">
                    <table className="w-full">
                        <thead className="bg-[#5fd080]/10">
                            <tr>
                                <th className="px-6 py-4 text-left font-semibold">Course</th>
                                <th className="px-6 py-4 text-left font-semibold">Description</th>
                                <th className="px-6 py-4 text-left font-semibold">Mentor</th>
                                <th className="px-6 py-4 text-left font-semibold">Level</th>
                                <th className="px-6 py-4 text-left font-semibold">Price</th>
                                <th className="px-6 py-4 text-left font-semibold">Booked At</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {course.length > 0 ? (
                                course.map((item) => (
                                    <tr
                                        key={item.courseID}
                                        className="hover:bg-gray-50 transition-colors duration-200"
                                        onClick={() => navigate(`${item.courseID}`)}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <span className="material-symbols-outlined text-[#5fd080]">school</span>
                                                <span>{item.courseName}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{item.description}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <span className="material-symbols-outlined text-[#5fd080]">person</span>
                                                <span>{item.mentorName}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{item.level}</td>
                                        <td className="px-6 py-4">${(item.price / 1000).toLocaleString()}</td>
                                        <td className="px-6 py-4">{new Date(item.createdAt).toLocaleString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center">No booked courses found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Phân trang */}
                <div className="mt-4 flex justify-between items-center">
                    <small className="text-muted">
                        Page {page} of {totalPages}
                    </small>
                    <div>
                        <button
                            className="btn me-2"
                            style={{ backgroundColor: '#5fd080', color: 'white', border: 'none' }}
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                        >
                            Previous
                        </button>
                        <button
                            className="btn"
                            style={{ backgroundColor: '#5fd080', color: 'white', border: 'none' }}
                            disabled={page >= totalPages}
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};