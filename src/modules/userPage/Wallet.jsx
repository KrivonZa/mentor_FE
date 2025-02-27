import React, { useState, useEffect } from "react";
import transactionService from "../../services/transactionService";
import "./styles.css"
import { useUser } from "../../global/userContext";

export function Wallet() {
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState(0);
    const [show, setShow] = useState(false);
    const [action, setAction] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("MOMO");
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountHolderName, setAccountHolderName] = useState("");
    const { user } = useUser();

    useEffect(() => {
        setBalance(user?.balance);
    }, [user]);

    const handleClose = () => setShow(false);
    const handleShow = (type) => {
        setAction(type);
        setShow(true);
        setPaymentMethod("MOMO");
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
                    console.log(response)
                    alert("Success")
                }
            } catch (error) {
                console.error("Error when Withdraw:", error);
            }
        }

        setAmount("");
        handleClose();
    };

    return (
        <div className="container d-flex justify-content-center pt-5">
            <div className="card rounded-5 shadow-lg p-4 text-center" style={{ width: "30%" }}>
                <h2 className="mb-4 text-primary fw-bold h2">Your Wallet</h2>
                <div className="bg-light p-3 rounded-4 mb-4">
                    <h5 className="h3">Balance</h5>
                    <h2 className="text-success fw-bold h1">{balance?.toLocaleString()}đ</h2>
                </div>
                <button className="btn btn-success w-100 mb-2" onClick={() => handleShow("deposit")}>Deposit</button>
                <button className="btn btn-danger w-100" onClick={() => handleShow("withdraw")}>Withdraw</button>
            </div>

            {show && (
                <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content rounded-4 shadow-lg">
                            <div className="modal-header">
                                <h5 className="modal-title fw-bold">{action === "deposit" ? "Deposit" : "Drawback"}</h5>
                                <button type="button" className="btn-close" onClick={handleClose}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Amount</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="Enter amount"
                                        style={{ appearance: "textfield", MozAppearance: "textfield" }}
                                    />
                                </div>
                                {action === "deposit" && (
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Payment Method</label>
                                        <div className="d-flex flex-column gap-2">
                                            {["MOMO"].map((method) => (
                                                <div key={method} className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="paymentMethod"
                                                        value={method}
                                                        checked={paymentMethod === method}
                                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                                    />
                                                    <label className="form-check-label">{method}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {action === "withdraw" && (
                                    <div>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Account Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={accountNumber}
                                                onChange={(e) => setAccountNumber(e.target.value)}
                                                placeholder="Enter account number"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Bank Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={bankName}
                                                onChange={(e) => setBankName(e.target.value)}
                                                placeholder="Enter bank name"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Account Holder Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={accountHolderName}
                                                onChange={(e) => setAccountHolderName(e.target.value)}
                                                placeholder="Enter account holder name"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                                <button className="btn btn-primary" onClick={handleSubmit} disabled={action === "deposit" && !paymentMethod}>
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
