import React, { useContext, useEffect, useState } from "react";
import { updateUserProfile } from "../../services/UserService";
import '../../../public/css/ViewProfile.scss';
import { toast } from "react-toastify";
import { toastLoadingFailAction, toastLoadingSuccessAction } from "../../utils/functions";
import { AppContext } from "../../routes/AppProvider";
import courseService from "../../services/courseService";
import { API_BASE_URL, apiPrivateInstance } from "../../constants";
import { Avatar, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { ChangePasswordModal } from "../../components/User";

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const UserProfile = () => {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const { user } = useContext(AppContext);
    const [cvPreviewUrl, setCvPreviewUrl] = useState(null);
    const [cvFile, setCvFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        setFormData(user || {});
        if (typeof user?.cv === 'string') {
            setCvPreviewUrl(user.cv);
        }
        if (typeof user?.avatar === 'string') {
            setAvatarPreview(user.avatar);
        }
    }, [user]);

    useEffect(() => {
        if (cvFile instanceof File) {
            const url = URL.createObjectURL(cvFile);
            setCvPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [cvFile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            setCvFile(file);
            setFormData({ ...formData, cv: file });
        }
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const base64 = await getBase64(file);
            setAvatarPreview(base64);
            setAvatarFile(file);
            setFormData({ ...formData, avatar: file });
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
        setMessage("");

        const loadingId = toast.loading("Uploading profile...");
        try {
            let cvUrl = formData.cv;
            let videoUrl = formData.introductionVideo;
            let avatarUrl = formData.avatar;

            if (formData.cv instanceof File) {
                cvUrl = await uploadToS3(formData.cv);
            }

            if (formData.introductionVideo instanceof File) {
                videoUrl = await uploadToS3(formData.introductionVideo);
            }

            if (avatarFile instanceof File) {
                avatarUrl = await uploadToS3(avatarFile);
            }

            const updatedFormData = { ...formData, cv: cvUrl, introductionVideo: videoUrl, avatar: avatarUrl };

            await updateUserProfile(updatedFormData);
            setFormData(updatedFormData);
            setCvFile(null);
            setCvPreviewUrl(cvUrl);
            setAvatarFile(null);
            setAvatarPreview(avatarUrl);
            setMessage("Profile updated successfully!");
            toast.update(loadingId, {
                render: "Profile updated successfully!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
        } catch (error) {
            toast.update(loadingId, {
                render: error?.response?.data?.message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            setMessage(error?.response?.data?.message || "Error updating profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    return (
        <div id="webcrumbs">
            <div className="bg-gray-50 p-4 w-full lg:p-8 min-h-screen sm:p-6" data-aos="fade-up" data-aos-delay="100">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-7xl mx-auto overflow-hidden">
                    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
                        <div className="bg-[#5fd080] p-4 w-full lg:p-8 lg:w-1/3 sm:p-6">
                            <div className="flex flex-col items-center lg:sticky lg:top-8">
                                <div className="border-4 border-white h-32 rounded-full w-32 duration-300 hover:scale-105 overflow-hidden sm:h-40 sm:w-40 transform transition-all relative">
                                    <Avatar
                                        src={avatarPreview || "https://mygkhanhs3.s3.ap-southeast-2.amazonaws.com/1743205810925-bob.smith%40example.com-defaultUser.png"}
                                        size={{ xs: 128, sm: 160 }}
                                        className="h-full w-full object-cover"
                                        onError={() => true}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full">
                                        <Upload
                                            accept="image/*"
                                            showUploadList={false}
                                            beforeUpload={(file) => {
                                                handleAvatarChange({ target: { files: [file] } });
                                                return false;
                                            }}
                                        >
                                            <button
                                                type="button"
                                                className="text-white flex items-center justify-center px-4 py-2 rounded-full bg-[#5fd080] hover:bg-[#4cb869] transition-all"
                                            >
                                                <UploadOutlined /> Upload
                                            </button>
                                        </Upload>
                                    </div>
                                </div>
                                <h1 className="text-white text-xl font-bold mt-4 sm:text-2xl">{user?.fullName}</h1>
                                <h4 className="text-white/80 mt-1">{user?.role === 'USER' ? 'STUDENT' : user?.role}</h4>
                                {user?.role === 'MENTOR' && (
                                    <h5 className="text-white/80 mt-1">Mentor status: {user?.mentorStatus}</h5>
                                )}
                            </div>
                        </div>
                        <div className="p-4 w-full lg:p-8 lg:w-2/3 sm:p-6">
                            <h2 className="text-xl font-bold mb-4 sm:mb-6 sm:text-2xl">Update Profile Information</h2>

                            {message && <p className={`text-${message.includes("success") ? "green" : "red"}-500`}>{message}</p>}

                            <form onSubmit={handleSubmit} className="sm:space-y-6 space-y-4">
                                <div>
                                    <label className="text-sm block font-medium mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData?.fullName || ""}
                                        onChange={handleChange}
                                        className="border border-gray-200 p-2.5 rounded-lg w-full duration-300 focus:border-[#5fd080] focus:ring-[#5fd080] focus:ring-2 focus:ring-opacity-20 sm:p-3 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm block font-medium mb-2">Email Address</label>
                                    <input
                                        disabled
                                        type="email"
                                        name="email"
                                        value={formData?.email || ""}
                                        onChange={handleChange}
                                        className="border border-gray-200 p-2.5 rounded-lg w-full duration-300 focus:border-[#5fd080] focus:ring-[#5fd080] focus:ring-2 focus:ring-opacity-20 sm:p-3 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm block font-medium mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData?.phoneNumber || ""}
                                        onChange={handleChange}
                                        className="border border-gray-200 p-2.5 rounded-lg w-full duration-300 focus:border-[#5fd080] focus:ring-[#5fd080] focus:ring-2 focus:ring-opacity-20 sm:p-3 transition-all"
                                    />
                                </div>

                                {formData?.role === "MENTOR" && (
                                    <>
                                        <div>
                                            <label className="text-sm block font-medium mb-2">Bio</label>
                                            <textarea
                                                name="bio"
                                                value={formData?.bio || ""}
                                                onChange={handleChange}
                                                className="border border-gray-200 h-24 p-2.5 rounded-lg w-full duration-300 focus:border-[#5fd080] focus:ring-[#5fd080] focus:ring-2 focus:ring-opacity-20 sm:h-32 sm:p-3 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm block font-medium mb-2">CV</label>
                                            <input
                                                type="file"
                                                name="cv"
                                                accept="application/pdf"
                                                onChange={handleFileChange}
                                                className="border border-gray-200 p-2.5 rounded-lg w-full duration-300 focus:border-[#5fd080] focus:ring-[#5fd080] focus:ring-2 focus:ring-opacity-20 mb-2 sm:p-3 transition-all"
                                            />
                                            {cvPreviewUrl ? (
                                                <div className="flex w-full gap-4 items-center">
                                                    <a
                                                        href={cvPreviewUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex text-[#5fd080] gap-2 hover:underline items-center"
                                                    >
                                                        View CV (PDF)
                                                    </a>
                                                </div>
                                            ) : (
                                                <p className="text-gray-500">No CV uploaded</p>
                                            )}
                                        </div>
                                    </>
                                )}

                                <div className="flex flex-col sm:flex-row sm:space-x-4 sm:space-y-0 space-y-3">
                                    <button
                                        type="submit"
                                        className="bg-[#5fd080] rounded-lg text-white w-full duration-300 hover:bg-[#4cb869] hover:scale-105 px-6 py-2.5 sm:w-auto transform transition-all"
                                        disabled={loading}
                                    >
                                        {loading ? "Saving..." : "Save Changes"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={showModal}
                                        className="bg-transparent border-2 border-[#5fd080] rounded-lg text-[#5fd080] w-full duration-300 hover:bg-[#5fd080] hover:scale-105 px-6 py-2.5 sm:w-auto transform transition-all"
                                    >
                                        Change Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <ChangePasswordModal visible={isModalVisible} onClose={handleModalClose} />
        </div>
    );
};
export default UserProfile;