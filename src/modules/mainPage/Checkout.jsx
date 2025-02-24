import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import courseService from "../../services/courseService";

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
                                <span className="fw-bold text-success">${courseDetail.price}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Discount:</span>
                                <span className="fw-bold text-danger">- $10</span>
                            </div>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between pt-2">
                            <span className="fw-bold">Amount Payable:</span>
                            <span className="fw-bold text-primary">${courseDetail.price - 10}</span>
                        </div>

                        {/* Select payment method */}
                        <h6 className="mt-4">Select Payment Method:</h6>
                        <div className="d-flex gap-2 mt-2">
                            <button className="btn btn-light border flex-fill d-flex align-items-center justify-content-center" onClick={() => setPaymentMethod("Momo")} style={{ backgroundColor: paymentMethod === "Momo" && "grey" }}>
                                <img src="../../../public/img/MOMO.png" alt="MoMo" width="64" className="me-2" />
                            </button>

                            <button className="btn btn-light border flex-fill d-flex align-items-center justify-content-center" onClick={() => setPaymentMethod("VNPay")} style={{ backgroundColor: paymentMethod === "VNPay" && "darkgrey" }}>
                                <img src="../../../public/img/VNPAY.png" alt="VNPay" width="64" className="me-2" />
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
                        >
                            <span className="material-symbols-outlined text-white me-2">shopping_cart</span>
                            Pay Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};