import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { createMentorRequest } from "../../services/MentorService";

const InputField = ({ type, placeholder, name, value, onChange }) => (
    <div className="relative">
        <input
            type={type}
            placeholder={placeholder}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none transition-all duration-300 focus:border-[#5fd080] peer"
            name={name}
            value={value}
            onChange={onChange}
        />
    </div>
);

export const MentorRequestForm = () => {
    const [formData, setFormData] = useState({
        mentorApprovalRequestID: 0,
        assigneeID: "",
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
            const createdRequest = createMentorRequest(formData);

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
        <div id="webcrumbs">
            <div className="w-[480px] bg-white rounded-xl shadow-lg p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-semibold mb-8">Create Mentor Approval Request</h2>

                    <InputField type="text" placeholder="Assignee ID" name="assigneeID" value={formData.assigneeID} onChange={handleChange} />
                    <InputField type="text" placeholder="Bio" name="Bio" value={formData.bio} onChange={handleChange} />
                    <InputField type="text" placeholder="CV" name="CV" value={formData.cv} onChange={handleChange} />
                    <InputField type="text" placeholder="Introduction Video" name="introductionVideo" value={formData.introductionVideo} onChange={handleChange} />

                    <button className="w-full py-3 px-6 bg-[#5fd080] rounded-lg text-white font-semibold transition-all duration-300 hover:bg-[#4db56a] hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl">
                        <span className="flex items-center justify-center space-x-2">
                            <span>Submit</span>
                            <span className="material-symbols-outlined">send</span>
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MentorRequestForm;