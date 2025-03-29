import React, { useEffect, useState, useContext } from "react";
import transactionService from "../../services/transactionService";
import "./styles.css";
import { AppContext } from "../../routes/AppProvider";
import { toast } from "react-toastify";

export function Wallet() {
    const { user } = useContext(AppContext);

    // Wallet state
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState("");
    const [show, setShow] = useState(false);
    const [action, setAction] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("MOMO");
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountHolderName, setAccountHolderName] = useState("");
    const [errors, setErrors] = useState({});
    const amountOptions = [50000, 100000, 200000, 500000, 1000000];

    // TransactionHistory state
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

    // Wallet logic
    useEffect(() => {
        setBalance(user?.balance || 0);
    }, [user]);

    const handleClose = () => {
        setShow(false);
        setErrors({});
    };

    const handleShow = (type) => {
        setAction(type);
        setShow(true);
        setPaymentMethod("MOMO");
        setAmount("");
        setBankName("");
        setAccountNumber("");
        setAccountHolderName("");
        setErrors({});
    };

    const handleAmountSelect = (value) => {
        setAmount(value.toString());
        setErrors(prev => ({ ...prev, amount: "" }));
    };

    const validateForm = () => {
        let newErrors = {};
        if (!amount || parseFloat(amount) <= 1000) {
            newErrors.amount = "Amount is required and must be greater than 1000";
        }
        if (action === "withdraw") {
            if (!bankName.trim()) newErrors.bankName = "Bank name is required";
            if (!accountNumber.trim()) newErrors.accountNumber = "Account number is required";
            if (!accountHolderName.trim()) newErrors.accountHolderName = "Account holder name is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        const value = parseFloat(amount);
        const loadingId = toast.loading("Submitting request...");

        if (action === "deposit") {
            try {
                const depositData = { amount: value, paymentMethod };
                const response = await transactionService.deposit(depositData);
                if (response?.payUrl) window.open(response.payUrl, "_blank");
                toast.update(loadingId, {
                    render: "Deposit request submitted!",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
            } catch (error) {
                toast.update(loadingId, {
                    render: error?.response?.data?.message || "Error when Deposit!",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
            }
        } else if (action === "withdraw") {
            try {
                const withdrawData = { amount: value, accountNumber, bankName, accountHolderName };
                const response = await transactionService.withdraw(withdrawData);
                toast.update(loadingId, {
                    render: response?.data?.message || "Request withdraw successfully!",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
            } catch (error) {
                console.log("erdasdasdaror: ", error);
                
                toast.update(loadingId, {
                    render: error?.message || "Error when Withdraw!",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
            }
        }
        setAmount("");
        handleClose();
    };

    // TransactionHistory logic
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
            {/* Wallet Section */}
            <div className="card border-0 p-5 rounded-4 shadow-lg mx-auto mb-5" style={{ maxWidth: "600px", width: "100%" }}>
                <h1 className="text-center fw-bold h1 mb-5" style={{ color: "#5fd080" }}>Your Wallet</h1>
                <div className="bg-light p-4 rounded-3 text-center mb-5">
                    <span className="d-block text-muted text-uppercase fw-medium h5">Current Balance</span>
                    <h2 className="fw-bold h2 mt-3" style={{ color: "#5fd080" }}>
                        {balance.toLocaleString()}đ
                    </h2>
                </div>
                <div className="d-flex gap-4">
                    <button
                        className="btn text-white w-100 fs-5 py-3"
                        style={{ backgroundColor: "#5fd080", borderColor: "#5fd080" }}
                        onClick={() => handleShow("deposit")}
                    >
                        Deposit
                    </button>
                    <button
                        className="btn border text-dark w-100 fs-5 py-3"
                        style={{ borderColor: "#5fd080", color: "#5fd080" }}
                        onClick={() => handleShow("withdraw")}
                    >
                        Withdraw
                    </button>
                </div>
            </div>

            {/* Modal for Deposit/Withdraw */}
            {show && (
                <div className="d-block modal fade show" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content border-0 rounded-4 shadow-lg">
                            <div className="modal-header border-bottom px-4 py-3">
                                <h4 className="modal-title fw-bold h4">
                                    {action === "deposit" ? "Deposit Funds" : "Withdraw Funds"}
                                </h4>
                                <button type="button" className="btn-close" onClick={handleClose}></button>
                            </div>
                            <div className="modal-body p-4">
                                <div className="mb-4">
                                    <label htmlFor="amount" className="form-label fs-5 fw-medium">
                                        Amount (VND)
                                    </label>
                                    <input
                                        type="number"
                                        id="amount"
                                        className={`form-control form-control-lg rounded-3 ${errors.amount ? "is-invalid" : ""}`}
                                        value={amount}
                                        onChange={(e) => {
                                            setAmount(e.target.value);
                                            setErrors(prev => ({ ...prev, amount: "" }));
                                        }}
                                        placeholder="Enter amount"
                                    />
                                    {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
                                    <div className="d-flex flex-wrap gap-2 mt-2">
                                        {amountOptions.map((option) => (
                                            <button
                                                key={option}
                                                type="button"
                                                className={`btn rounded-3 px-3 py-1 text-dark border ${amount === option.toString() ? "text-white" : ""}`}
                                                style={{
                                                    backgroundColor: amount === option.toString() ? "#5fd080" : "#f8f9fa",
                                                }}
                                                onClick={() => handleAmountSelect(option)}
                                            >
                                                {option.toLocaleString()}đ
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {action === "deposit" && (
                                    <div className="mb-4">
                                        <label className="form-label fs-5 fw-medium">Payment Method</label>
                                        <div className="d-flex flex-column gap-2">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="MOMO"
                                                    checked={paymentMethod === "MOMO"}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                />
                                                <label className="form-check-label fs-5">MoMo</label>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {action === "withdraw" && (
                                    <>
                                        <div className="mb-4">
                                            <label htmlFor="bankName" className="form-label fs-5 fw-medium">
                                                Bank Name
                                            </label>
                                            <input
                                                type="text"
                                                id="bankName"
                                                className={`form-control form-control-lg rounded-3 ${errors.bankName ? "is-invalid" : ""}`}
                                                value={bankName}
                                                onChange={(e) => {
                                                    setBankName(e.target.value);
                                                    setErrors(prev => ({ ...prev, bankName: "" }));
                                                }}
                                                placeholder="Enter bank name"
                                            />
                                            {errors.bankName && <div className="invalid-feedback">{errors.bankName}</div>}
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="accountNumber" className="form-label fs-5 fw-medium">
                                                Account Number
                                            </label>
                                            <input
                                                type="text"
                                                id="accountNumber"
                                                className={`form-control form-control-lg rounded-3 ${errors.accountNumber ? "is-invalid" : ""}`}
                                                value={accountNumber}
                                                onChange={(e) => {
                                                    setAccountNumber(e.target.value);
                                                    setErrors(prev => ({ ...prev, accountNumber: "" }));
                                                }}
                                                placeholder="Enter account number"
                                            />
                                            {errors.accountNumber && <div className="invalid-feedback">{errors.accountNumber}</div>}
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="accountHolderName" className="form-label fs-5 fw-medium">
                                                Account Holder Name
                                            </label>
                                            <input
                                                type="text"
                                                id="accountHolderName"
                                                className={`form-control form-control-lg rounded-3 ${errors.accountHolderName ? "is-invalid" : ""}`}
                                                value={accountHolderName}
                                                onChange={(e) => {
                                                    setAccountHolderName(e.target.value);
                                                    setErrors(prev => ({ ...prev, accountHolderName: "" }));
                                                }}
                                                placeholder="Enter account holder name"
                                            />
                                            {errors.accountHolderName && <div className="invalid-feedback">{errors.accountHolderName}</div>}
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="modal-footer border-top px-4 py-3">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary rounded-3 fs-5 px-4 py-2"
                                    onClick={handleClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn rounded-3 text-white fs-5 px-4 py-2"
                                    style={{ backgroundColor: "#5fd080", borderColor: "#5fd080" }}
                                    onClick={handleSubmit}
                                    disabled={action === "deposit" && !paymentMethod}
                                >
                                    {action === "deposit" ? "Deposit" : "Withdraw"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Transaction History Section */}
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
                                <option value="WITHDRAW">Withdraw</option>
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
                                            <td>{tx.amount.toLocaleString()}đ</td>
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
}