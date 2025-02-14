import React from 'react'
import './index.scss'

export const CourseAdmin = () => {
    return (
        <div id="webcrumbs">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">Course Management</h1>
                    <button className="bg-[#5FCF80] hover:bg-[#4ab569] transform hover:scale-105 transition-all duration-300 text-white px-6 py-3 rounded-lg flex items-center gap-2">
                        <span className="material-symbols-outlined">add</span> Add New Course
                    </button>
                </div>
                <div className="bg-white rounded-lg border">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Course Name
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Mentor
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Level</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Students
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src="https://placehold.co/100x70" alt="thumbnail" className="rounded-lg w-[100px] h-[70px] object-cover" />
                                        <div>
                                            <p className="font-medium">Web Development Fundamentals</p>
                                            <p className="text-sm text-gray-500">
                                                Learn the basics of web development
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">John Doe</td>
                                <td className="px-6 py-4">$99.99</td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">BEGINNER</span>
                                </td>
                                <td className="px-6 py-4">150</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                            <span className="material-symbols-outlined">edit</span>
                                        </button>
                                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                        <details className="relative">
                                            <summary className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                                                <span className="material-symbols-outlined">more_vert</span>
                                            </summary>
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-10">
                                                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2">
                                                    <span className="material-symbols-outlined">visibility</span>
                                                    View Details
                                                </button>
                                                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2">
                                                    <span className="material-symbols-outlined">content_copy</span>
                                                    Duplicate
                                                </button>
                                            </div>
                                        </details>
                                    </div>
                                </td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td colSpan={6} className="px-6 py-4">
                                    <details>
                                        <summary className="cursor-pointer hover:text-[#5FCF80] transition-colors">
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-medium flex items-center gap-2">
                                                    Course Lessons
                                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                                </h3>
                                                <button className="bg-[#5FCF80] hover:bg-[#4ab569] text-white px-4 py-2 rounded-lg flex items-center gap-2 transform hover:scale-105 transition-all duration-300">
                                                    <span className="material-symbols-outlined">add</span> Add
                                                    Lesson
                                                </button>
                                            </div>
                                        </summary>
                                        <div className="mt-4 space-y-4">
                                            <table className="w-full">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th className="px-4 py-3 text-left text-sm font-semibold">
                                                            Lesson ID
                                                        </th>
                                                        <th className="px-4 py-3 text-left text-sm font-semibold">
                                                            Description
                                                        </th>
                                                        <th className="px-4 py-3 text-left text-sm font-semibold">
                                                            Status
                                                        </th>
                                                        <th className="px-4 py-3 text-left text-sm font-semibold">
                                                            Trial
                                                        </th>
                                                        <th className="px-4 py-3 text-left text-sm font-semibold">
                                                            Created At
                                                        </th>
                                                        <th className="px-4 py-3 text-left text-sm font-semibold">
                                                            Actions
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    <tr className="hover:bg-gray-100 transition-colors">
                                                        <td className="px-4 py-3 text-sm">#1001</td>
                                                        <td className="px-4 py-3 text-sm">
                                                            Introduction to HTML and CSS
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">IN_COMMING</span>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span className="material-symbols-outlined text-green-500">check_circle</span>
                                                        </td>
                                                        <td className="px-4 py-3 text-sm">2024-01-20</td>
                                                        <td className="px-4 py-3">
                                                            <div className="flex gap-2">
                                                                <button className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors">
                                                                    <span className="material-symbols-outlined">edit</span>
                                                                </button>
                                                                <button className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors">
                                                                    <span className="material-symbols-outlined">delete</span>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </details>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-500">Showing 1 to 1 of 1 entries</p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>
                            Previous
                        </button>
                        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CourseAdmin