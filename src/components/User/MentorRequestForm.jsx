import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { createMentorRequest } from "../../services/MentorService";

export const MentorRequestForm = () => {
    const [formData, setFormData] = useState({
        bio: "",
        cv: "",
        introductionVideo: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const createdRequest = await createMentorRequest(formData);
            if (createdRequest) {
                setFormData({
                    mentorApprovalRequestID: 0,
                    assigneeID: "",
                    bio: "",
                    cv: "",
                    introductionVideo: "",
                });
                alert("Mentor approval request added successfully!");
            }
        } catch (error) {
            alert("Error creating mentor approval request. Please try again.");
            console.error("Error:", error);
        }
    };

    return (
        <div id="mentorRequestForm">
            <div id="webcrumbs">
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col xs={12} md={10} lg={8} xl={7}>
                            <div className="bg-white rounded shadow p-4 p-md-5 mx-auto w-100">
                                <Form onSubmit={handleSubmit}>
                                    <h2 className="text-center mb-4 fw-bold">Create Mentor Approval Request</h2>
                                    
                                    <Form.Group className="mb-4">
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Bio" 
                                            name="bio" 
                                            value={formData.bio} 
                                            onChange={handleChange}
                                            className="py-3"
                                            style={{ 
                                                borderRadius: "0.5rem", 
                                                transition: "border-color 0.3s ease",
                                                borderWidth: "2px",
                                                fontSize: "1.05rem"
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = "#5fd080"}
                                            onBlur={(e) => e.target.style.borderColor = "#ced4da"}
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-4">
                                        <Form.Control 
                                            type="text" 
                                            placeholder="CV" 
                                            name="cv" 
                                            value={formData.cv} 
                                            onChange={handleChange}
                                            className="py-3"
                                            style={{ 
                                                borderRadius: "0.5rem", 
                                                transition: "border-color 0.3s ease",
                                                borderWidth: "2px",
                                                fontSize: "1.05rem"
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = "#5fd080"}
                                            onBlur={(e) => e.target.style.borderColor = "#ced4da"}
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-5">
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Introduction Video" 
                                            name="introductionVideo" 
                                            value={formData.introductionVideo} 
                                            onChange={handleChange}
                                            className="py-3"
                                            style={{ 
                                                borderRadius: "0.5rem", 
                                                transition: "border-color 0.3s ease",
                                                borderWidth: "2px",
                                                fontSize: "1.05rem"
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = "#5fd080"}
                                            onBlur={(e) => e.target.style.borderColor = "#ced4da"}
                                        />
                                    </Form.Group>
                                    
                                    <Button 
                                        type="submit" 
                                        className="w-100 py-3 fw-bold d-flex align-items-center justify-content-center"
                                        style={{ 
                                            backgroundColor: "#5fd080", 
                                            borderColor: "#5fd080",
                                            borderRadius: "0.5rem",
                                            transition: "all 0.3s ease",
                                            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                                            fontSize: "1.1rem"
                                        }}
                                        onMouseOver={(e) => {
                                            e.target.style.backgroundColor = "#4db56a";
                                            e.target.style.borderColor = "#4db56a";
                                            e.target.style.transform = "scale(1.02)";
                                            e.target.style.boxShadow = "0 6px 8px rgba(0,0,0,0.15)";
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.backgroundColor = "#5fd080";
                                            e.target.style.borderColor = "#5fd080";
                                            e.target.style.transform = "scale(1)";
                                            e.target.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
                                        }}
                                    >
                                        <span className="me-2">Submit</span>
                                        <span className="material-symbols-outlined">send</span>
                                    </Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default MentorRequestForm;