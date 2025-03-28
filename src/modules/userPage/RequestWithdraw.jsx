import React, { useState } from "react";

export const RequestWithdraw = () => {
    const [withdrawData] = useState({
        content: [
            {
                id: 5,
                accountNumber: "0596857493",
                bankName: "TPBank",
                accountHolderName: "Nagoyako",
                status: "DONE",
                createdAt: "2025-03-27 16:39:38",
                amount: 50000,
                creatorEmail: "dungttse183087@fpt.edu.vn",
                creatorName: "Breemtum"
            },
            {
                id: 6,
                accountNumber: "0596857493",
                bankName: "TPBank",
                accountHolderName: "Nagoyako",
                status: "DONE",
                createdAt: "2025-03-27 16:41:16",
                amount: 50000,
                creatorEmail: "dungttse183087@fpt.edu.vn",
                creatorName: "Breemtum"
            },
            {
                id: 7,
                accountNumber: "0596857493",
                bankName: "TPBank",
                accountHolderName: "Nagoyako",
                status: "REJECTED",
                createdAt: "2025-03-27 16:50:11",
                amount: 100000,
                creatorEmail: "dungttse183087@fpt.edu.vn",
                creatorName: "Breemtum"
            }
        ],
        totalPages: 1,
        totalElements: 3,
        size: 10
    });

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5; // Adjust this value to show more/less items per page

    // Calculate pagination
    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = withdrawData.content.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(withdrawData.content.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container py-5">
            <div className="card shadow" data-aos="fade-up" data-aos-delay="100">
                <div className="card-header" style={{ backgroundColor: '#5fd080', color: 'white' }}>
                    <h4 className="text-center my-4 h1 fw-bold">Withdrawal History</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Amount (VND)</th>
                                    <th>Bank Name</th>
                                    <th>Account Number</th>
                                    <th>Holder Name</th>
                                    <th>Status</th>
                                    <th>Created At</th>
                                    <th>Creator</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.amount.toLocaleString()}</td>
                                        <td>{item.bankName}</td>
                                        <td>{item.accountNumber}</td>
                                        <td>{item.accountHolderName}</td>
                                        <td>
                                            <span className={`badge ${item.status === 'DONE' ? 'bg-success' : 'bg-danger'}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td>{item.createdAt}</td>
                                        <td>{item.creatorName} ({item.creatorEmail})</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <nav aria-label="Page navigation" className="mt-4">
                            <ul className="pagination justify-content-center">
                                <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 0}
                                    >
                                        Previous
                                    </button>
                                </li>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <li
                                        key={index}
                                        className={`page-item ${currentPage === index ? 'active' : ''}`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() => handlePageChange(index)}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages - 1}
                                    >
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    )}
                </div>
            </div>
        </div>
    );
};