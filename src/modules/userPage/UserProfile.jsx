import React, { useEffect, useState } from "react";
import { getUserByToken } from "../../services/UserService";
import { updateUserProfile } from "../../services/UserService";
import '../../../public/css/ViewProfile.scss';

export const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("USER");
            if (!token) return;

            try {
                const userData = await getUserByToken(token);
                setUser(userData.data);
                setFormData(userData.data);
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };
        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            await updateUserProfile(formData);
            setMessage("Profile updated successfully!");
            alert(message);
        } catch (error) {
            setMessage("Error updating profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="webcrumbs">
            <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
                        <div className="w-full lg:w-1/3 bg-[#5fd080] p-4 sm:p-6 lg:p-8">
                            <div className="flex flex-col items-center lg:sticky lg:top-8">
                                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white overflow-hidden transform hover:scale-105 transition-all duration-300">
                                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" className="w-full h-full object-cover" />
                                </div>
                                <h1 className="text-xl sm:text-2xl font-bold text-white mt-4">{user?.fullName}</h1>
                                <h4 className="text-white/80 mt-1">{user?.role} </h4>
                                <h5 className="text-white/80 mt-1">Mentor status: {user?.mentorStatus}</h5>
                            </div>
                        </div>
                        <div className="w-full lg:w-2/3 p-4 sm:p-6 lg:p-8">
                            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Update Profile Information</h2>

                            {message && <p className={`text-${message.includes("success") ? "green" : "red"}-500`}>{message}</p>}

                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData?.fullName || ""}
                                        onChange={handleChange}
                                        className="w-full p-2.5 sm:p-3 rounded-lg border border-gray-200 focus:border-[#5fd080] focus:ring-2 focus:ring-[#5fd080] focus:ring-opacity-20 transition-all duration-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData?.email || ""}
                                        onChange={handleChange}
                                        className="w-full p-2.5 sm:p-3 rounded-lg border border-gray-200 focus:border-[#5fd080] focus:ring-2 focus:ring-[#5fd080] focus:ring-opacity-20 transition-all duration-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData?.phoneNumber || ""}
                                        onChange={handleChange}
                                        className="w-full p-2.5 sm:p-3 rounded-lg border border-gray-200 focus:border-[#5fd080] focus:ring-2 focus:ring-[#5fd080] focus:ring-opacity-20 transition-all duration-300"
                                    />
                                </div>

                                {formData?.role === "STUDENT" && (
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Level</label>
                                        <input
                                            type="text"
                                            name="level"
                                            value={formData?.level || ""}
                                            onChange={handleChange}
                                            className="w-full p-2.5 sm:p-3 rounded-lg border border-gray-200 focus:border-[#5fd080] focus:ring-2 focus:ring-[#5fd080] focus:ring-opacity-20 transition-all duration-300"
                                        />
                                    </div>
                                )}

                                {formData?.role === "MENTOR" && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Bio</label>
                                            <textarea
                                                name="bio"
                                                value={formData?.bio || ""}
                                                onChange={handleChange}
                                                className="w-full p-2.5 sm:p-3 rounded-lg border border-gray-200 focus:border-[#5fd080] focus:ring-2 focus:ring-[#5fd080] focus:ring-opacity-20 transition-all duration-300 h-24 sm:h-32"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">CV</label>
                                            <textarea
                                                name="cv"
                                                value={formData?.cv || ""}
                                                onChange={handleChange}
                                                className="w-full p-2.5 sm:p-3 rounded-lg border border-gray-200 focus:border-[#5fd080] focus:ring-2 focus:ring-[#5fd080] focus:ring-opacity-20 transition-all duration-300 h-24 sm:h-32"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Introduction Video</label>
                                            <textarea
                                                name="introductionVideo"
                                                value={formData?.introductionVideo || ""}
                                                onChange={handleChange}
                                                className="w-full p-2.5 sm:p-3 rounded-lg border border-gray-200 focus:border-[#5fd080] focus:ring-2 focus:ring-[#5fd080] focus:ring-opacity-20 transition-all duration-300 h-24 sm:h-32"
                                            />
                                        </div>
                                    </>
                                )}

                                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                                    <button
                                        type="submit"
                                        className="w-full sm:w-auto px-6 py-2.5 bg-[#5fd080] text-white rounded-lg hover:bg-[#4cb869] transition-all duration-300 transform hover:scale-105"
                                        disabled={loading}
                                    >
                                        {loading ? "Saving..." : "Save Changes"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UserProfile;