import React from "react";

export const TransactionHistory = () => {
    return (
        <div className="container py-5">
            <div className="card shadow" data-aos="fade-up" data-aos-delay="100">
                <div className="card-header" style={{ backgroundColor: '#5fd080', color: 'white' }}>
                    <h4 className="text-center my-4 h1 fw-bold">Transaction History</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr style={{ color: '#5fd080' }}>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2025-02-24</td>
                                    <td>Payment for services</td>
                                    <td>$150.00</td>
                                    <td>
                                        <span className="badge" style={{ backgroundColor: '#5fd080' }}>
                                            Completed
                                        </span>
                                    </td>
                                </tr>
                                {/* Thêm các hàng mẫu khác nếu cần */}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                    <small className="text-muted">Showing 1-5 of 25 transactions</small>
                    <div>
                        <button 
                            className="btn me-2" 
                            style={{ 
                                backgroundColor: '#5fd080', 
                                color: 'white',
                                border: 'none'
                            }}
                        >
                            Previous
                        </button>
                        <button 
                            className="btn" 
                            style={{ 
                                backgroundColor: '#5fd080', 
                                color: 'white',
                                border: 'none'
                            }}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};