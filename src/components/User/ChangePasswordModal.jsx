import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { apiPrivateInstance } from "../../constants";
import { changePassword } from "../../services/UserService";

export const ChangePasswordModal = ({ visible, onClose }) => {
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [confirmError, setConfirmError] = useState(""); // State để lưu lỗi confirm password

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    // Kiểm tra confirm password mỗi khi passwordData thay đổi
    useEffect(() => {
        if (passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword) {
            setConfirmError("Mật khẩu cũ chưa khớp!");
        } else {
            setConfirmError("");
        }
    }, [passwordData.newPassword, passwordData.confirmPassword]);

    const handleSubmit = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("Mật khẩu mới phải trùng khớp với nhau!");
            return;
        }

        setLoading(true);
        const loadingId = toast.loading("Cập nhật mật khẩu...");

        try {
            const response = await changePassword({
                oldPassword: passwordData.oldPassword,
                newPassword: passwordData.newPassword,
            });

            toast.update(loadingId, {
                render: response?.data?.message || "Mật khẩu cập nhật thành công!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });

            setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
            onClose(); // Đóng modal khi thành công
        } catch (error) {
            toast.update(loadingId, {
                render: error?.response?.data?.message || "Không cập nhật được mật khẩu. Xin vui lòng thử lại.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        } finally {
            setLoading(false);
        }
    };


    const handleCancel = () => {
        setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
        setConfirmError("");
        onClose();
    };

    if (!visible) return null;

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" style={{ color: "#5fcf80", fontSize: "24px", fontWeight: "bold" }}>Thay Đổi Mật Khẩu</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={handleCancel}
                            disabled={loading}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="oldPassword" className="form-label">
                                Mật Khẩu Cũ
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="oldPassword"
                                name="oldPassword"
                                value={passwordData.oldPassword}
                                onChange={handlePasswordChange}
                                placeholder="Nhập mật khẩu hiện tại"
                                disabled={loading}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label">
                                Mật Khẩu Mới
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="newPassword"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                placeholder="Nhập Mật Khẩu Mới"
                                disabled={loading}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">
                                Xác Nhật Mật Khẩu Mới
                            </label>
                            <input
                                type="password"
                                className={`form-control ${confirmError ? "is-invalid" : ""}`} // Thêm class is-invalid khi có lỗi
                                id="confirmPassword"
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                                placeholder="Nhập mật khẩu mới"
                                disabled={loading}
                            />
                            {confirmError && (
                                <div className="invalid-feedback">{confirmError}</div>
                            )}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleCancel}
                            disabled={loading}
                        >
                            Hủy
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            disabled={loading || confirmError}
                        >
                            {loading ? "Đang cập nậht..." : "Cập Nhật"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};