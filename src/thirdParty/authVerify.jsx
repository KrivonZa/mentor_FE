import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { AppContext } from "../routes/AppProvider";

export const AuthVerify = () => {
    const navigate = useNavigate();
    const { logout, user } = useContext(AppContext);

    useEffect(() => {
        const checkAuth = () => {
            try {
                const userData = user?.token || localStorage.getItem("USER");
                if (!userData) {
                    return;
                }
                const decodedJwt = jwtDecode(userData);
                if (decodedJwt.exp * 1000 < Date.now()) {
                    Swal.fire({
                        title: "Phiên đăng nhập đã hết hạn",
                        text: "Vui lòng đăng nhập lại.",
                        icon: "warning",
                        confirmButtonText: "Đăng Nhập",
                        confirmButtonColor: "#d33",
                        allowOutsideClick: false
                    }).then(() => {
                        logout();
                    });
                }
            } catch (error) {
                Swal.fire("Error", "Oops, there is an error about your session", "error");
            }
        };

        checkAuth();
    }, [navigate]);

    return null;
};
