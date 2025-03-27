import React, { useState, useEffect, useContext } from "react";
import transactionService from "../../services/transactionService";
import "./styles.css"
import { AppContext } from "../../routes/AppProvider";

export function Wallet() {
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState("");
    const [show, setShow] = useState(false);
    const [action, setAction] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("MOMO");
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountHolderName, setAccountHolderName] = useState("");
    const { user } = useContext(AppContext);

    // Danh sách các mệnh giá
    const amountOptions = [50000, 100000, 200000, 500000, 1000000];

    useEffect(() => {
        console.log("user: ", user);
        setBalance(user?.balance || 0);
    }, [user]);

    const handleClose = () => setShow(false);
    const handleShow = (type) => {
        setAction(type);
        setShow(true);
        setPaymentMethod("MOMO");
        setAmount("");
        setBankName("");
        setAccountNumber("");
        setAccountHolderName("");
    };

    const handleAmountSelect = (value) => {
        setAmount(value.toString());
    };

    const handleSubmit = async () => {
        const value = parseFloat(amount);
        if (!value || value <= 0) return;

        if (action === "deposit") {
            try {
                const depositData = { amount: value, paymentMethod };
                const response = await transactionService.deposit(depositData);
                if (response?.payUrl) {
                    window.open(response.payUrl, "_blank");
                }
            } catch (error) {
                console.error("Error when Deposit:", error);
            }
        } else if (action === "withdraw") {
            try {
                const withdrawData = { amount: value, accountNumber, bankName, accountHolderName };
                const response = await transactionService.withdraw(withdrawData);
                if (response) {
                    console.log(response);
                    alert("Success");
                }
            } catch (error) {
                console.error("Error when Withdraw:", error);
            }
        }

        setAmount("");
        handleClose();
    };

    return (
        <div className="container py-5">
            <div className="card border-0 p-5 rounded-4 shadow-lg mx-auto" style={{ maxWidth: "600px", width: "100%" }}>
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
                                        className="form-control form-control-lg rounded-3"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="Enter amount"
                                        style={{ appearance: "textfield", MozAppearance: "textfield" }}
                                    />
                                    {/* Thêm các thẻ mệnh giá */}
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
                                                className="form-control form-control-lg rounded-3"
                                                value={bankName}
                                                onChange={(e) => setBankName(e.target.value)}
                                                placeholder="Enter bank name"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="accountNumber" className="form-label fs-5 fw-medium">
                                                Account Number
                                            </label>
                                            <input
                                                type="text"
                                                id="accountNumber"
                                                className="form-control form-control-lg rounded-3"
                                                value={accountNumber}
                                                onChange={(e) => setAccountNumber(e.target.value)}
                                                placeholder="Enter account number"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="accountHolderName" className="form-label fs-5 fw-medium">
                                                Account Holder Name
                                            </label>
                                            <input
                                                type="text"
                                                id="accountHolderName"
                                                className="form-control form-control-lg rounded-3"
                                                value={accountHolderName}
                                                onChange={(e) => setAccountHolderName(e.target.value)}
                                                placeholder="Enter account holder name"
                                            />
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
        </div>
    );
}