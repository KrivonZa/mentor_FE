import React, { useEffect, useState } from 'react'
import Search from "antd/es/input/Search";
import { Select, SelectProps, Spin } from 'antd';
import courseApprovalService from '../../../services/courseApprovalService';

// {
//     "courseApprovalRequestID": 3,
//         "courseDetail": {
//         "courseID": 10002,
//             "courseName": "Intro SQL",
//                 "thumbnail": "https://mygkhanhs3.s3.ap-southeast-2.amazonaws.com/1741887705558-bob.smith%40example.com-Screenshot%20from%202025-03-11%2013-10-19.png",
//                     "level": "BEGINNER"
//     },
//     "assigneeID": 0,
//         "assigneeNote": null,
//             "status": "PENDING",
//                 "mentorDetail": {
//         "mentorID": 2,
//             "mentorName": "Intro SQL",
//                 "avatar": "avatar2.jpg"
//     }
// }

export const CourseRequestPortalTable = () => {
    const [statusFilter, setStatusFilter] = useState(null);
    const [pageStat, setPageStat] = useState({
        currentPage: 1,
        totalPage: 0
    });

    const [requestList, setRequestList] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const approvedStatusOption: SelectProps['options'] = [
        {
            label: 'None',
            value: null
        },
        {
            label: 'PENDING',
            value: 'PENDING'
        },
        {
            label: 'APPROVED',
            value: 'APPROVED'
        },
        {
            label: 'REJECTED',
            value: 'REJECTED'
        }
    ]

    const fetchRequest = async () => {
        setLoading(true)
        const data = await courseApprovalService.fetchRequestForMentor(statusFilter, pageStat.currentPage, null)
        setRequestList(data.data.content)

        setPageStat((prev) => ({
            ...prev,
            totalPage: data.data.totalPages
        }))

        setLoading(false)
    }

    useEffect(() => {
        fetchRequest()
    }, [statusFilter, pageStat.currentPage])

    return (
        <div id="course-portal">
            <div id="webcrumbs">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold">Course Management</h1>
                    </div>
                    <div className="flex justify-between items-center mb-3 pe-4">
                        <Select
                            className="w-25"
                            placeholder="Select level"
                            onChange={(selectedOption) => {
                                console.log("selectedOption: ", selectedOption);

                                setStatusFilter(selectedOption)
                            }}
                            options={approvedStatusOption}
                            value={statusFilter}
                        />
                    </div>
                    <div className="bg-white rounded-lg border">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">
                                        #
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">
                                        Course
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">
                                        AssigneeNote
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">
                                        Created At
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {!loading &&
                                    requestList?.map(request => (
                                        <tr key={request?.courseApprovalRequestID} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                {request?.courseApprovalRequestID}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={
                                                            request?.courseDetail.thumbnail || "https://placehold.co/100x70"
                                                        }
                                                        alt="thumbnail"
                                                        className="rounded-lg w-[100px] h-[70px] object-cover"
                                                    />
                                                    <div>
                                                        <p className="font-medium">{request?.courseDetail.courseName}</p>
                                                        <p className="text-sm text-gray-500">
                                                            {request?.courseDetail.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {request?.assigneeNote
                                                    ? <div className="flex items-center gap-3">
                                                        <div>
                                                            <p className="font-medium">{request?.assigneeNote}</p>
                                                            <p className="text-sm text-gray-500">
                                                                {request?.updatedAt}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    : <></>
                                                }
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className={`badge rounded-pill text-white px-3 py-2 
                                                        ${request?.status === 'PENDING' ? 'bg-warning' :
                                                        request?.status === 'APPROVED' ? 'bg-success' :
                                                            request?.status === 'REJECTED' ? 'bg-danger' : ''}`}>
                                                    {request?.status}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                {request?.createdAt}
                                            </td>
                                        </tr>
                                    ))
                                }
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
                        <p className="text-sm text-gray-500">Showing {pageStat.currentPage} of {pageStat.totalPage} entries</p>
                        <div className="flex gap-2">
                                <button
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                                    disabled={pageStat.currentPage <=1 }
                                    onClick={() => {
                                        const newPage = pageStat.currentPage - 1
                                        setPageStat((prev) => ({
                                            ...prev,
                                            currentPage: newPage
                                        }))
                                    }}
                                >
                                    Previous
                                </button>
                                <button
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                                    disabled={pageStat.currentPage == pageStat.totalPage}
                                    onClick={() => {
                                        const newPage = pageStat.currentPage + 1
                                        setPageStat((prev)=> ({
                                            ...prev,
                                            currentPage: newPage
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

export default CourseRequestPortalTable