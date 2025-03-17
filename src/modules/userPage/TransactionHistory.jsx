import React, { useEffect, useState } from "react";
import transactionService from "../../services/transactionService";

export const TransactionHistory = () => {
    const [history, setHistory] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        from: "",
        to: "",
        paymentMethod: "",
        type: "",
        status: ""
    });

    const fetchHistory = async () => {
        const filteredParams = Object.fromEntries(
            Object.entries(filters).filter(([_, v]) => v)
        );

        try {
            const response = await transactionService.transactionHistory(filteredParams, page);
            setHistory(response.data.content || []);
            setTotalPages(response.data.totalPages || 1);
        } catch (error) {
            console.error("Error fetching transaction history:", error);
            setHistory([]);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, [page, filters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;

        setFilters({
            ...filters,
            [name]: name === "from" ? (value ? `${value}T00:00:00` : "")
                : name === "to" ? (value ? `${value}T23:59:59` : "")
                    : value
        });
    };



    const handleResetFilters = () => {
        setFilters({
            from: "",
            to: "",
            paymentMethod: "",
            type: "",
            status: ""
        });
        setPage(1);
    };

    return (
        <div className="container py-5">
            <div className="card shadow" data-aos="fade-up" data-aos-delay="100">
                <div className="card-header" style={{ backgroundColor: '#5fd080', color: 'white' }}>
                    <h4 className="text-center my-4 h1 fw-bold">Transaction History</h4>
                </div>
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-md-2">
                            <input
                                type="date"
                                name="from"
                                className="form-control"
                                value={filters.from ? filters.from.split("T")[0] : ""}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div className="col-md-2">
                            <input
                                type="date"
                                name="to"
                                className="form-control"
                                value={filters.to ? filters.to.split("T")[0] : ""}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div className="col-md-2">
                            <select
                                name="paymentMethod"
                                className="form-control"
                                value={filters.paymentMethod}
                                onChange={handleFilterChange}
                            >
                                <option value="">All Methods</option>
                                <option value="MOMO">MOMO</option>
                                <option value="PAYPAL">PAYPAL</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <select
                                name="type"
                                className="form-control"
                                value={filters.type}
                                onChange={handleFilterChange}
                            >
                                <option value="">All Types</option>
                                <option value="DEPOSIT">Deposit</option>
                                <option value="WITHDRAWAL">Withdrawal</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <select
                                name="status"
                                className="form-control"
                                value={filters.status}
                                onChange={handleFilterChange}
                            >
                                <option value="">All Status</option>
                                <option value="PENDING">Pending</option>
                                <option value="SUCCESS">Success</option>
                                <option value="FAILED">Failed</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <div className="btn-group w-100">
                                {/* <button
                                    className="btn btn-success"
                                    onClick={fetchHistory}
                                >
                                    Filter
                                </button> */}
                                <button
                                    className="btn btn-secondary"
                                    onClick={handleResetFilters}
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr style={{ color: '#5fd080' }}>
                                    <th>Date</th>
                                    <th>Payment Method</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.length > 0 ? (
                                    history.map((tx) => (
                                        <tr key={tx.transactionID}>
                                            <td>{tx.transactionDate}</td>
                                            <td>{tx.paymentMethod}</td>
                                            <td>{tx.type}</td>
                                            <td>${tx.amount}</td>
                                            <td>
                                                <span
                                                    className="badge"
                                                    style={{
                                                        backgroundColor: tx.status === "SUCCESS" ? '#5fd080' :
                                                            tx.status === "PENDING" ? '#ffc107' : '#d33'
                                                    }}
                                                >
                                                    {tx.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">No transactions found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
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