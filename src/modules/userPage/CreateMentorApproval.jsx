import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../../routes/AppProvider";
import { createMentorRequest } from "../../services/MentorService"
import { API_BASE_URL, apiPrivateInstance } from "../../constants";

export const CreateMentorApproval = () => {
    const [formData, setFormData] = useState({
        bio: "",
        cv: null,
        introductionVideo: null
    });
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AppContext);
    const [cvPreviewUrl, setCvPreviewUrl] = useState(null);
    const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
    const [cvFile, setCvFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const requestor = user?.studentId || user?.mentorId || localStorage.getItem("ID");

    // Kiểm tra xem tất cả các field đã được điền chưa
    const isFormValid = formData.bio.trim() !== "" && formData.cv !== null;
    // const isFormValid = formData.bio.trim() !== "" && formData.cv !== null && formData.introductionVideo !== null;

    useEffect(() => {
        if (cvFile instanceof File) {
            const url = URL.createObjectURL(cvFile);
            setCvPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [cvFile]);

    useEffect(() => {
        if (videoFile instanceof File) {
            const url = URL.createObjectURL(videoFile);
            setVideoPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [videoFile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCvChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            setCvFile(file);
            setFormData({ ...formData, cv: file });
        }
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('video/mp4')) {
            setVideoFile(file);
            setFormData({ ...formData, introductionVideo: file });
        }
    };

    const uploadToS3 = async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const item = await apiPrivateInstance({ baseURL: `${API_BASE_URL}/file` }).post("/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return item.data.url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const loadingId = toast.loading("Submitting mentor application...");
        try {
            let cvUrl = formData.cv;
            let videoUrl = formData.introductionVideo;

            if (formData.cv instanceof File) {
                cvUrl = await uploadToS3(formData.cv);
            }
            if (formData.introductionVideo instanceof File) {
                videoUrl = await uploadToS3(formData.introductionVideo);
            } else {
                videoUrl = "";
            }

            const mentorApplicationData = {
                mentorApprovalRequestID: null,
                bio: formData.bio,
                cv: cvUrl,
                introductionVideo: videoUrl,
                approvalStatus: "PENDING"
            };

            const response = await createMentorRequest(mentorApplicationData);

            toast.update(loadingId, {
                render: response?.data?.message || "Mentor application submitted successfully!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });

            setFormData({ bio: "", cv: null, introductionVideo: null });
            setCvFile(null);
            setVideoFile(null);
            setCvPreviewUrl(null);
            setVideoPreviewUrl(null);

        } catch (error) {
            toast.update(loadingId, {
                render: error?.response?.data?.message || "Error submitting application. Please try again.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="webcrumbs">
            <div className="bg-gray-50 p-4 w-full lg:p-8 min-h-screen sm:p-6" data-aos="fade-up" data-aos-delay="100">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-7xl mx-auto overflow-hidden">
                    <div className="p-4 w-full lg:p-8 sm:p-6">
                        <h2 className="text-2xl font-bold mb-4 sm:mb-6 text-center text-[#5fd080]">Hồ Sơ Ứng Cử Vị Trí Chuyên Gia</h2>

                        <form onSubmit={handleSubmit} className="sm:space-y-6 space-y-4">
                            <div>
                                <label className="text-sm block font-medium mb-2">Tiểu Sử</label>
                                <textarea
                                    name="bio"
                                    value={formData.bio || ""}
                                    onChange={handleChange}
                                    className="border border-gray-200 h-32 p-2.5 rounded-lg w-full duration-300 focus:border-[#5fd080] focus:ring-[#5fd080] focus:ring-2 focus:ring-opacity-20 sm:p-3 transition-all"
                                    placeholder="Gợi ý: Giới thiệu sơ lược về bản thân, kinh nghiệm, kĩ năng nổi trội của mình và lí do vì sao bạn muốn trở thành một chuyên gia hướng dẫn trên EmpowerU. Thông tin này sẽ được hiển thị cho người duyệt hồ sơ của bạn và những học viên tương lai."
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm block font-medium mb-2">CV (PDF)</label>
                                <input
                                    type="file"
                                    name="cv"
                                    accept="application/pdf"
                                    onChange={handleCvChange}
                                    className="border border-gray-200 p-2.5 rounded-lg w-full duration-300 focus:border-[#5fd080] focus:ring-[#5fd080] focus:ring-2 focus:ring-opacity-20 mb-2 sm:p-3 transition-all"
                                    required
                                />
                                {cvPreviewUrl && (
                                    <div className="flex w-full gap-4 items-center mt-2">
                                        <a
                                            href={cvPreviewUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex text-[#5fd080] gap-2 hover:underline items-center"
                                        >
                                            Xem CV (PDF)
                                        </a>
                                    </div>
                                )}
                            </div>
{/* 
                            <div>
                                <label className="text-sm block font-medium mb-2">Introduction Video (MP4)</label>
                                <input
                                    type="file"
                                    name="introductionVideo"
                                    accept="video/mp4"
                                    onChange={handleVideoChange}
                                    className="border border-gray-200 p-2.5 rounded-lg w-full duration-300 focus:border-[#5fd080] focus:ring-[#5fd080] focus:ring-2 focus:ring-opacity-20 mb-2 sm:p-3 transition-all"
                                // required
                                />
                                {videoPreviewUrl && (
                                    <div className="mt-2">
                                        <video
                                            src={videoPreviewUrl}
                                            controls
                                            className="w-full max-w-md rounded-lg"
                                        />
                                    </div>
                                )}
                            </div>
 */}
                            <div className="flex flex-col sm:flex-row sm:space-x-4 sm:space-y-0 space-y-3">
                                <button
                                    type="submit"
                                    className={`rounded-lg text-white w-full px-6 py-2.5 sm:w-auto transform transition-all ${isFormValid && !loading ? "hover:scale-105 duration-300" : "cursor-not-allowed"
                                        }`}
                                    style={{
                                        backgroundColor: isFormValid && !loading ? "#5fd080" : "#a0a0a0",
                                    }}
                                    disabled={!isFormValid || loading}
                                >
                                    {loading ? "Đang xử lý..." : "Nộp Đơn Ngay"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateMentorApproval;