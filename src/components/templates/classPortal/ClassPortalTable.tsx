import React, { useContext } from 'react'
import './index.scss'
import Search from 'antd/es/input/Search';
import { ClassPortalContext } from '../../../modules/mainPage/ClassPortal';
import { toast } from 'react-toastify';
import { toastLoadingSuccessAction } from '../../../utils/functions';
import Swal from 'sweetalert2';
import classService from '../../../services/classService';
import { Calendar } from 'antd';

export const ClassPortalTable = () => {
    const context = useContext(ClassPortalContext);

    if (!context)
        throw new Error("Component must be used within a Class Portal Provider");

    const {
        loading,
        classPaginationParam, setClassPaginationParam,
        classPagination, closeClassModel,
        showClassModal,
        handleDeleteClass,
        fetchClassPortal,
        showSessionModal,
        setClassSchedules
    } = context;

    return (
        <div id="course-portal">
            <div id="webcrumbs">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold">Class & Schedule Management</h1>
                    </div>
                    <div className="flex justify-between items-center mb-3 pe-4">
                        <Search
                            placeholder="input search text"
                            allowClear
                            enterButton="Search"
                            size="large"
                            onSearch={(e) => {
                                setClassPaginationParam({
                                    ...classPaginationParam,
                                    name: e
                                })
                            }}
                            className="w-50 border-black"
                        />
                        <button
                            onClick={() => {
                                // showCourseDetailModal(-1);                                
                                showClassModal(null)
                            }}
                            className="bg-[#5FCF80] hover:bg-[#4ab569] transform hover:scale-105 transition-all duration-300 text-white px-6 py-3 rounded-lg flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined">add</span>
                            Add New Class
                        </button>
                    </div>
                    <div className="bg-white rounded-lg border">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">
                                        Class Description
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">
                                        Course Name
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">
                                        Class Stats
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">
                                        Price
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">
                                        Schedule
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">
                                        Visible Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {
                                    !loading &&
                                    classPagination?.content?.map(item => (
                                        <React.Fragment key={item.classID}>
                                            <tr className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">{item.classDescription}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={item.courseDetail.thumbnail || "https://placehold.co/100x70"}
                                                            alt="thumbnail"
                                                            className="rounded-lg w-[100px] h-[70px] object-cover"
                                                        />
                                                        <div>
                                                            <p className="font-medium">{item.courseDetail.courseName}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="d-flex align-content-center">
                                                        <span className="material-symbols-outlined">
                                                            person
                                                        </span>{': '}
                                                        {item.totalStudent}
                                                    </div>
                                                    <div className='d-flex align-content-center'>
                                                        <span className="material-symbols-outlined">
                                                            timer
                                                        </span>{': '}
                                                        {item.totalSession}
                                                    </div>
                                                    <div className='d-flex align-content-center'>
                                                        <span className="material-symbols-outlined">
                                                            personal_places
                                                        </span>{': '}
                                                        {item.expectedStartDate}
                                                    </div>
                                                </td>
                                                {/* <td className="px-6 py-4 text-center">{item.totalSession}</td> */}
                                                <td className="px-6 py-4">{item.price}</td>
                                                <td className="px-6 py-4">
                                                    {/* Moving schedules to dropdown, keeping this cell for consistency */}
                                                    <button
                                                        className="btn btn-outline-primary btn-sm text-decoration-underline"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                        style={{ color: "#198754" }}
                                                    >
                                                        View Schedules
                                                    </button>
                                                    <div className="dropdown-menu p-2">
                                                        <div className="d-flex justify-content-between flex-wrap gap-2">
                                                            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
                                                                const dayOfWeek = index + 1; // 1-7 (Monday-Sunday)
                                                                const schedule = item.classSchedules.find(s => s.dayOfWeek === dayOfWeek);
                                                                return (
                                                                    <div
                                                                        key={day}
                                                                        className={`p-2 text-center rounded flex-grow-1 ${schedule ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-muted'
                                                                            }`}
                                                                        style={{ minWidth: '100px' }}
                                                                    >
                                                                        <div className="fw-medium">{day}</div>
                                                                        {schedule ? (
                                                                            <div className="d-flex align-items-center justify-content-center gap-1">
                                                                                <span>{schedule.startTime.slice(0, 5)}-{schedule.endTime.slice(0, 5)}</span>
                                                                                <span className="material-symbols-outlined fs-6">check</span>
                                                                            </div>
                                                                        ) : (
                                                                            <div>-</div>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`badge rounded-pill text-white px-3 py-2 
                            ${!item.visibleStatus ? 'bg-warning' : item.visibleStatus ? 'bg-success' : null}`}>
                                                        {item.visibleStatus ? 'Visible' : 'Hidden'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 flex-column">
                                                        <div className="d-flex">
                                                            <button
                                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                                onClick={async () => {
                                                                    const result = await Swal.fire({
                                                                        title: "Delete class of: " + `"${item.courseDetail.courseName}"` + "?",
                                                                        text: "You won't be able to revert this!",
                                                                        icon: "warning",
                                                                        showCancelButton: true,
                                                                        confirmButtonColor: "#3085d6",
                                                                        cancelButtonColor: "#d33",
                                                                        confirmButtonText: "Yes, delete it!",
                                                                    });

                                                                    if (result.isConfirmed) {
                                                                        handleDeleteClass(item.classID);
                                                                    }
                                                                }}
                                                            >
                                                                <span className="material-symbols-outlined">delete</span>
                                                            </button>
                                                            <button
                                                                onClick={() => showClassModal(item)}
                                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                            >
                                                                <span className="material-symbols-outlined">edit</span>
                                                            </button>
                                                        </div>
                                                        <div className="d-flex">
                                                            <button
                                                                onClick={async () => {
                                                                    const currentStatus = item?.visibleStatus || false;
                                                                    let title = "Publish this class?";
                                                                    let text = "After this class got approved, everyone will able to view this!";
                                                                    let message = "Publish successfully";
                                                                    let confirmText = "Yes, publish it!";
                                                                    let reqStatus = true;
                                                                    if (currentStatus) {
                                                                        title = "Suppress this class?";
                                                                        text = "everyone will not able to view this!";
                                                                        message = "Suppress successfully";
                                                                        confirmText = "Yes, suppress it!";
                                                                        reqStatus = false;
                                                                    }
                                                                    const result = await Swal.fire({
                                                                        title: title,
                                                                        text: text,
                                                                        icon: "info",
                                                                        showCancelButton: true,
                                                                        confirmButtonColor: "#3085d6",
                                                                        cancelButtonColor: "#d33",
                                                                        confirmButtonText: confirmText,
                                                                    });

                                                                    if (result.isConfirmed) {
                                                                        const loadingId = toast.loading("Update course...");
                                                                        await classService.setClassVisibility(item.classID, reqStatus);
                                                                        await fetchClassPortal();
                                                                        toastLoadingSuccessAction(loadingId, message);
                                                                    }
                                                                }}
                                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                            >
                                                                <span className="material-symbols-outlined">visibility</span>
                                                            </button>
                                                            <button
                                                                onClick={async () => {
                                                                    setClassSchedules(item.classSchedules);
                                                                    showSessionModal(item);
                                                                }}
                                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                            >
                                                                <span className="material-symbols-outlined">edit_calendar</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-sm text-gray-500">Showing {classPaginationParam?.page} of {classPagination?.totalPages} entries</p>
                        <div className="flex gap-2">
                            <button
                                className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                                disabled={classPaginationParam?.page <= 1}
                                onClick={() => {
                                    const newPage = classPaginationParam?.page - 1
                                    setClassPaginationParam((prev) => ({
                                        ...prev,
                                        page: newPage
                                    }))
                                }}
                            >
                                Previous
                            </button>
                            <button
                                className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                                disabled={classPaginationParam?.page == classPagination?.totalPages}
                                onClick={() => {
                                    const newPage = classPaginationParam?.page + 1
                                    setClassPaginationParam((prev) => ({
                                        ...prev,
                                        page: newPage
                                    }))
                                }}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClassPortalTable