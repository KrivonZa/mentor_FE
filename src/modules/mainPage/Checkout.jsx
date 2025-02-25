import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import courseService from "../../services/courseService";
import transactionService from "../../services/transactionService";
import Swal from "sweetalert2";

export const Checkout = () => {
    const [courseDetail, setCourseDetail] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const { courseID } = useParams();

    useEffect(() => {
        const fetchCourseDetail = async () => {
            try {
                const response = await courseService.getCourseDetail(courseID);
                setCourseDetail(response.data);
            } catch (error) {
                console.error("Error fetching course details:", error);
            }
        };

        fetchCourseDetail();
    }, [courseID]);

    if (!courseDetail) {
        return <div className="text-center py-5">Loading...</div>;
    }

    const handlePayment = async () => {
        const course = {
            courseId: courseID,
            paymentMethod: paymentMethod,
        };
        if (paymentMethod === "USER_BALANCE") {
            const result = await Swal.fire({
                title: "Confirm Payment",
                text: "Are you sure you want to pay with your wallet balance?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, pay now!",
            });

            if (!result.isConfirmed) {
                return;
            }
        }
        const response = await transactionService.coursePayment(course);
        if (response?.transaction?.paymentResponse?.payUrl) {
            window.open(response?.transaction?.paymentResponse?.payUrl, "_blank");
        }
    }

    return (
        <div className="container py-5">
            <h1 className="fw-bold text-center mb-4" style={{ color: "#5fd080", fontSize: "52px" }}>
                Confirm Payment
            </h1>

            <div className="row g-4">
                {/* Left column: Course information */}
                <div className="col-md-6">
                    <div className="card shadow border-0">
                        <div className="d-flex justify-content-center align-content-center">
                            <img
                                src={courseDetail.thumbnail}
                                alt={courseDetail.courseName}
                                className="card-img-top"
                                style={{ borderRadius: "10px 10px 0 0", width: "300px", height: "300px" }}
                            />
                        </div>
                        <div className="card-body mt-4">
                            <h4 className="fw-bold">{courseDetail.courseName}</h4>
                            <p className="text-muted">Instructor: {courseDetail.mentor?.mentorInfo?.fullname}</p>
                        </div>
                    </div>
                </div>

                {/* Right column: Payment information */}
                <div className="col-md-6">
                    <div className="p-4 border rounded shadow bg-white">
                        <h5 className="fw-bold mb-4" style={{ fontSize: "24px" }}>Payment Information</h5>
                        <hr />
                        <div className="mt-2 mb-2">
                            <div className="d-flex justify-content-between">
                                <span>Total Price:</span>
                                <span className="fw-bold text-success">{courseDetail.price.toLocaleString()}đ</span>
                            </div>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between pt-2">
                            <span className="fw-bold">Amount Payable:</span>
                            <span className="fw-bold text-primary">{courseDetail.price.toLocaleString()}đ</span>
                        </div>

                        {/* Select payment method */}
                        <h6 className="mt-4">Select Payment Method:</h6>
                        <div className="d-flex gap-2 mt-2">
                            <button className="btn btn-light border flex-fill d-flex align-items-center justify-content-center" onClick={() => setPaymentMethod("MOMO")} style={{ backgroundColor: paymentMethod === "MOMO" && "#cfcfcf" }}>
                                <img src="../../../public/img/MOMO.png" alt="MoMo" width="64" className="me-2" />
                            </button>

                            <button
                                className="btn btn-light border flex-fill d-flex align-items-center justify-content-center"
                                onClick={() => setPaymentMethod("USER_BALANCE")}
                                style={{ backgroundColor: paymentMethod === "USER_BALANCE" && "#cfcfcf" }}
                            >
                                <span className="material-symbols-outlined me-2">wallet</span>
                                Wallet
                            </button>
                        </div>
                        {/* Payment button */}
                        <button
                            className="btn w-100 mt-4 text-white fw-semibold py-2 d-flex justify-content-center align-content-center"
                            style={{
                                backgroundColor: "#5fd080",
                                border: "none",
                                transition: "0.3s",
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                            onClick={handlePayment}
                        >
                            Pay Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};