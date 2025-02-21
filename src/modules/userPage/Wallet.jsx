import React, { useState, useEffect } from "react";
import transactionService from "../../services/transactionService";
import { getUserByToken } from "../../services/UserService";

export function Wallet() {
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState("");
    const [show, setShow] = useState(false);
    const [action, setAction] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("MOMO");

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("USER");
            if (!token) return;

            try {
                const userData = await getUserByToken(token);
                setBalance(userData.data.balance)
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };
        fetchUser();
    }, []);

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

                if (response?.payUrl) {
                    window.open(response.payUrl, "_blank");
                }
            } catch (error) {
                console.error("Lỗi khi nạp tiền:", error);
            }
        } else if (action === "withdraw" && value <= balance) {
        }

        setAmount("");
        handleClose();
    };

    return (
        <div className="container mt-5 text-center" data-aos="fade-up" data-aos-delay="100">
            <h2 className="mb-4">Your Wallet</h2>
            <div className="card p-4 shadow-lg">
                <h4>Balance:</h4>
                <h2 className="text-primary">{balance.toLocaleString()}đ</h2>
                <div className="mt-4 d-flex justify-content-center gap-3">
                    <button className="btn btn-success px-4" onClick={() => handleShow("deposit")}>Deposit</button>
                    <button className="btn btn-danger px-4" onClick={() => handleShow("withdraw")}>Withdraw</button>
                </div>
            </div>
            <div className="mt-4">
                <h5>Transaction History</h5>
                <ul className="list-group text-start">
                    <li className="list-group-item">Nạp: $500 - 01/02/2024</li>
                    <li className="list-group-item">Rút: $200 - 03/02/2024</li>
                    <li className="list-group-item">Nạp: $100 - 05/02/2024</li>
                </ul>
            </div>
            {show && (
                <div className="modal d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-uppercase">{action === "deposit" ? "Nạp Tiền" : "Rút Tiền"}</h5>
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
                                        placeholder="Input your amount"
                                    />
                                </div>
                                {action === "deposit" && (
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Choose your payment method</label>
                                        <div className="d-flex gap-3">
                                            {["MOMO", "VNPAY", "NAPAS"].map((method) => (
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
