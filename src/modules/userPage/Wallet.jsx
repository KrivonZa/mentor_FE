import React, { useState, useEffect } from "react";
import transactionService from "../../services/transactionService";
import { useUser } from "../../global/userContext";
import "./styles.css"

export function Wallet() {
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState("");
    const [show, setShow] = useState(false);
    const [action, setAction] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("MOMO");
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountHolderName, setAccountHolderName] = useState("");
    const { user } = useUser();

    useEffect(() => {
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
            <div className="card shadow-lg border-0 rounded-4 p-5 mx-auto" style={{ maxWidth: "600px", width: "100%" }}>
                <h1 className="text-center mb-5 fw-bold h1" style={{ color: "#5fd080" }}>Your Wallet</h1>
                <div className="bg-light p-4 rounded-3 mb-5 text-center">
                    <span className="d-block text-muted text-uppercase fw-medium h5">Current Balance</span>
                    <h2 className="fw-bold mt-3 h2" style={{ color: "#5fd080" }}>
                        {balance.toLocaleString()}đ
                    </h2>
                </div>
                <div className="d-flex gap-4">
                    <button
                        className="btn w-100 text-white py-3 fs-5"
                        style={{ backgroundColor: "#5fd080", borderColor: "#5fd080" }}
                        onClick={() => handleShow("deposit")}
                    >
                        Deposit
                    </button>
                    <button
                        className="btn w-100 text-dark border py-3 fs-5"
                        style={{ borderColor: "#5fd080", color: "#5fd080" }}
                        onClick={() => handleShow("withdraw")}
                    >
                        Withdraw
                    </button>
                </div>
            </div>

            {show && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content rounded-4 shadow-lg border-0">
                            <div className="modal-header border-bottom px-4 py-3">
                                <h4 className="modal-title fw-bold h4">
                                    {action === "deposit" ? "Deposit Funds" : "Withdraw Funds"}
                                </h4>
                                <button type="button" className="btn-close" onClick={handleClose}></button>
                            </div>
                            <div className="modal-body p-4">
                                <div className="mb-4">
                                    <label htmlFor="amount" className="form-label fw-medium fs-5">
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
                                </div>
                                {action === "deposit" && (
                                    <div className="mb-4">
                                        <label className="form-label fw-medium fs-5">Payment Method</label>
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
                                            <label htmlFor="bankName" className="form-label fw-medium fs-5">
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
                                            <label htmlFor="accountNumber" className="form-label fw-medium fs-5">
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
                                            <label htmlFor="accountHolderName" className="form-label fw-medium fs-5">
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
                                    className="btn btn-outline-secondary rounded-3 px-4 py-2 fs-5"
                                    onClick={handleClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn text-white rounded-3 px-4 py-2 fs-5"
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