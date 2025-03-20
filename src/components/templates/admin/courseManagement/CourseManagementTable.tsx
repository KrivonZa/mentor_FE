import React, { FormEvent, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { CourseManagementContext } from '../../../../modules/adminPage/CourseManagement/CourseManagement';
import { Spin } from 'antd';

export const CourseManagementTable = () => {
    const context = useContext(CourseManagementContext);
    if (!context)
        throw new Error("SomeComponent must be used within a CoursePortalProvider");

    const { currentPage, fetchCourseApproval, setCurrentPage, loading, courseApprovalRes,
        handleOpenCourseViewDetailModal

     } = context


    function handleSearchByID(event: FormEvent<HTMLFormElement>): void {
        throw new Error('Function not implemented.');
    }

    function handleShowConfirm(user: any): void {
        throw new Error('Function not implemented.');
    }

    useEffect(() => { 
        console.log("courseApprovalRes: ", courseApprovalRes);
        
    }, [courseApprovalRes])

    return (
        <main className="flex-1 p-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Pending Requests: </h2>
                    {/* <Link to="/add-new-user">
                        <button className="bg-[#5fd080] rounded-lg text-white hover:bg-[#4db36a] px-4 py-2 transition-colors">
                            View history
                        </button>
                    </Link> */}
                    {/* <div>
                        <form onSubmit={handleSearchByID}>
                            <label htmlFor="search">Search course name: </label>
                            <input
                                type="text"
                                id="search"
                                // value={searchTerm}
                                // onChange={(e) => setSearchTerm(e.target.value)}
                                className="border p-2 rounded"
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 rounded text-white ml-2 px-4 py-2"
                            >
                                Search
                            </button>
                        </form>
                    </div> */}
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left text-sm font-semibold px-6 py-4">
                                    #
                                </th>
                                <th className="text-left text-sm font-semibold px-6 py-4">
                                    Course
                                </th>
                                <th className="text-left text-sm font-semibold px-6 py-4">
                                    Status
                                </th>
                                <th className="text-left text-sm font-semibold px-6 py-4">
                                    Created At
                                </th>
                                {/* <th className="text-left text-sm font-semibold px-6 py-4">
                                    AssigneeNote
                                </th> */}
                                <th className="text-left text-sm font-semibold px-6 py-4">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-gray-200 divide-y">
                            {!loading && courseApprovalRes?.data?.content?.map(
                                request => (
                                    <tr key={request?.courseApprovalRequestID} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            {request?.courseApprovalRequestID}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-3 items-center">
                                                <img
                                                    src={request?.courseDetail?.thumbnail || "https://placehold.co/100x70"}
                                                    alt="thumbnail"
                                                    className="rounded" // Bootstrap class for rounded corners
                                                    style={{
                                                        width: "200px",
                                                        height: "100px",
                                                        objectFit: "cover",
                                                        borderRadius: "8px", // Matches Tailwind's rounded-lg
                                                    }}
                                                />
                                                <div>
                                                    <p className="font-medium">{request?.courseDetail?.courseName}</p>
                                                    <p className="text-gray-500 text-sm">
                                                        {request?.courseDetail?.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className="d-flex align-items-center rounded-full text-sm fw-bolder px-3 py-1"
                                                style={{ color: "#f3b25c" }}
                                            >
                                                {request?.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {request?.createdAt}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={async () => {
                                                    handleOpenCourseViewDetailModal(request)
                                                }}
                                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                            >
                                                <span className="material-symbols-outlined">
                                                    visibility
                                                </span>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                    {loading &&
                        <div className="w-100">
                            <Spin tip="Loading" size="small">
                                <div style={{
                                    padding: 50,
                                    background: 'rgba(0, 0, 0, 0.05)',
                                    borderRadius: 4,
                                }} ></div>
                            </Spin>
                        </div>
                    }
                </div>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-500 text-sm">Showing {currentPage} of {courseApprovalRes?.data?.totalPages} entries</p>
                    <div className="flex gap-2">
                        <button
                            className="border rounded-lg disabled:opacity-50 hover:bg-gray-50 px-4 py-2 transition-colors"
                            disabled={currentPage <= 1}
                            onClick={() => {
                                const newPage = currentPage - 1
                                setCurrentPage(newPage)
                            }}
                        >
                            Previous
                        </button>
                        <button
                            className="border rounded-lg disabled:opacity-50 hover:bg-gray-50 px-4 py-2 transition-colors"
                            disabled={currentPage == courseApprovalRes?.data?.totalPages}
                            onClick={() => {
                                const newPage = currentPage + 1
                                setCurrentPage(newPage)
                            }}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default CourseManagementTable