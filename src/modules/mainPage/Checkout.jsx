import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import courseService from "../../services/courseService";
import transactionService from "../../services/transactionService";
import Swal from "sweetalert2";
import classService from "../../services/classService";

export const Checkout = () => {
    const [courseDetail, setCourseDetail] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const { courseID } = useParams();

    useEffect(() => {
        const fetchClassDetail = async () => {
            try {
                const response = await classService.getClassDetail(courseID);
                setCourseDetail(response.data);
            } catch (error) {
                console.error("Error fetching course details:", error);
            }
        };

        fetchClassDetail();
    }, [courseID]);

    if (!courseDetail) {
        return <div className="text-center py-5">Loading...</div>;
    }
    const handlePayment = async () => {
        const course = {
            classId: courseID,
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
        try {
            const response = await transactionService.classPayment(course);
            if (response?.transaction?.paymentResponse?.payUrl) {
                window.open(response.transaction.paymentResponse.payUrl, "_blank");
            }
            await Swal.fire({
                title: "Payment Successful",
                text: "Your payment has been processed successfully!",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
        } catch (error) {
            console.log("error: ", error);
            await Swal.fire({
                title: "Course Purchased Failed",
                text: error.message,
                icon: "info",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <div className="container py-5">
            <h1 className="text-center fw-bold mb-4" style={{ color: "#5fd080", fontSize: "52px" }}>
                Confirm Payment
            </h1>

            <div className="g-4 row">
                {/* Left column: Course information */}
                <div className="col-md-6">
                    <div className="card border-0 shadow">
                        <div className="d-flex align-content-center justify-content-center">
                            <img
                                src={courseDetail?.courseInfo?.thumbnail}
                                alt={courseDetail?.courseInfo?.courseName}
                                className="card-img-top"
                                style={{ borderRadius: "10px 10px 0 0", width: "300px", height: "300px" }}
                            />
                        </div>
                        <div className="card-body mt-4">
                            <h4 className="fw-bold">{courseDetail?.courseInfo?.courseName}</h4>
                            <p className="text-muted">Instructor: {courseDetail?.mentorInfo?.mentorName}</p>
                        </div>
                    </div>
                </div>

                {/* Right column: Payment information */}
                <div className="col-md-6">
                    <div className="bg-white border p-4 rounded shadow">
                        <h5 className="fw-bold mb-4" style={{ fontSize: "24px" }}>Payment Information</h5>
                        <hr />
                        <div className="mb-2 mt-2">
                            <div className="d-flex justify-content-between">
                                <span>Total Price:</span>
                                <span className="text-success fw-bold">{courseDetail?.price?.toLocaleString()}đ</span>
                            </div>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between pt-2">
                            <span className="fw-bold">Amount Payable:</span>
                            <span className="text-primary fw-bold">{courseDetail?.price?.toLocaleString()}đ</span>
                        </div>

                        {/* Select payment method */}
                        <h6 className="mt-4">Select Payment Method:</h6>
                        <div className="d-flex gap-2 mt-2">
                            <button className="d-flex flex-fill btn btn-light align-items-center border justify-content-center" onClick={() => setPaymentMethod("MOMO")} style={{ backgroundColor: paymentMethod === "MOMO" && "#cfcfcf" }}>
                                <img src="../../../public/img/MOMO.png" alt="MoMo" width="64" className="me-2" />
                            </button>

                            <button
                                className="d-flex flex-fill btn btn-light align-items-center border justify-content-center"
                                onClick={() => setPaymentMethod("USER_BALANCE")}
                                style={{ backgroundColor: paymentMethod === "USER_BALANCE" && "#cfcfcf" }}
                            >
                                <span className="material-symbols-outlined me-2">wallet</span>
                                Wallet
                            </button>
                        </div>
                        {/* Payment button */}
                        <button
                            className="d-flex btn align-content-center justify-content-center text-white w-100 fw-semibold mt-4 py-2"
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