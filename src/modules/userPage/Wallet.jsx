import React, { useState } from "react";
import transactionService from "../../services/transactionService";

export function Wallet() {
    const [balance, setBalance] = useState(1000);
    const [amount, setAmount] = useState("");
    const [show, setShow] = useState(false);
    const [action, setAction] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("MOMO");

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
                setBalance(balance + value);

                if (response?.payUrl) {
                    window.open(response.payUrl, "_blank");
                }
            } catch (error) {
                console.error("Lỗi khi nạp tiền:", error);
            }
        } else if (action === "withdraw" && value <= balance) {
            setBalance(balance - value);
        }

        setAmount("");
        handleClose();
    };

    return (
        <div className="container mt-5 text-center">
            <h2 className="mb-4">Ví Tiền Cá Nhân</h2>
            <div className="card p-4 shadow-lg">
                <h4>Số dư hiện tại:</h4>
                <h2 className="text-primary">${balance.toLocaleString()}</h2>
                <div className="mt-4 d-flex justify-content-center gap-3">
                    <button className="btn btn-success px-4" onClick={() => handleShow("deposit")}>Nạp Tiền</button>
                    <button className="btn btn-danger px-4" onClick={() => handleShow("withdraw")}>Rút Tiền</button>
                </div>
            </div>
            <div className="mt-4">
                <h5>Lịch Sử Giao Dịch</h5>
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
                                    <label className="form-label fw-bold">Nhập số tiền</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="Nhập số tiền..."
                                    />
                                </div>
                                {action === "deposit" && (
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Chọn phương thức thanh toán</label>
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
                                <button className="btn btn-secondary" onClick={handleClose}>Hủy</button>
                                <button className="btn btn-primary" onClick={handleSubmit} disabled={action === "deposit" && !paymentMethod}>
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
