import React, { useEffect, useState } from "react";
import { getUserByToken } from "../../services/UserService";
import '../../../public/css/ViewProfile.scss';
export const ViewProfile = () => {
    const [user, setUser] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState < string | null > (null);

    useEffect(() => {
        const fetchUser = async () => {
            // setLoading(true); // Set loading to true before fetching
            const token = localStorage.getItem("USER");
            if (!token) {
                // setError("No token found. Please login.");
                // setLoading(false);
                return;
            }
            try {
                const userData = await getUserByToken(token);
                console.log("Fetched User Data:", userData);
                setUser(userData.data);
                // setError(null);
            } catch (err) {
                console.error("Error fetching user:", err);
                // setError("Failed to fetch user data");
            } finally {
                // setLoading(false);
            }
        };
        fetchUser();
    }, []);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p className="text-red-500">{error}</p>;
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
                                <div className="w-full mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                                    <div className="flex items-center p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-102">
                                        <span className="material-symbols-outlined text-white">mail</span>
                                        <span className="ml-3 text-white text-sm sm:text-base">{user?.email}</span>
                                    </div>

                                    <div className="flex items-center p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-102">
                                        <span className="material-symbols-outlined text-white">phone</span>
                                        <span className="ml-3 text-white text-sm sm:text-base">{user?.phoneNumber}</span>
                                    </div>
                                </div>

                                <div className="mt-6 sm:mt-8 flex justify-center space-x-6">
                                    <a href="#" className="transform hover:scale-125 transition-all duration-300">
                                        <i className="fa-brands fa-facebook text-xl sm:text-2xl text-white"></i>
                                    </a>
                                    <a href="#" className="transform hover:scale-125 transition-all duration-300">
                                        <i className="fa-brands fa-twitter text-xl sm:text-2xl text-white"></i>
                                    </a>
                                    <a href="#" className="transform hover:scale-125 transition-all duration-300">
                                        <i className="fa-brands fa-linkedin text-xl sm:text-2xl text-white"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-2/3 p-4 sm:p-6 lg:p-8">
                            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Update Profile Information</h2>

                            <div className="space-y-4 sm:space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Full Name</label>
                                    <input type="text" className="w-full p-2.5 sm:p-3 rounded-lg border border-gray-200 focus:border-[#5fd080] focus:ring-2 focus:ring-[#5fd080] focus:ring-opacity-20 transition-all duration-300" defaultValue="John Smith" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Email Address</label>
                                    <input type="email" className="w-full p-2.5 sm:p-3 rounded-lg border border-gray-200 focus:border-[#5fd080] focus:ring-2 focus:ring-[#5fd080] focus:ring-opacity-20 transition-all duration-300" defaultValue="john.smith@example.com" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                                    <input type="tel" className="w-full p-2.5 sm:p-3 rounded-lg border border-gray-200 focus:border-[#5fd080] focus:ring-2 focus:ring-[#5fd080] focus:ring-opacity-20 transition-all duration-300" defaultValue="+1 234 567 890" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Location</label>
                                    <input type="text" className="w-full p-2.5 sm:p-3 rounded-lg border border-gray-200 focus:border-[#5fd080] focus:ring-2 focus:ring-[#5fd080] focus:ring-opacity-20 transition-all duration-300" defaultValue="New York, USA" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Bio</label>
                                    <textarea className="w-full p-2.5 sm:p-3 rounded-lg border border-gray-200 focus:border-[#5fd080] focus:ring-2 focus:ring-[#5fd080] focus:ring-opacity-20 transition-all duration-300 h-24 sm:h-32" defaultValue="Experienced software developer with a passion for creating innovative solutions."></textarea>
                                </div>

                                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                                    <button className="w-full sm:w-auto px-6 py-2.5 bg-[#5fd080] text-white rounded-lg hover:bg-[#4cb869] transition-all duration-300 transform hover:scale-105">
                                        Save Changes
                                    </button>
                                    <button className="w-full sm:w-auto px-6 py-2.5 border-2 border-[#5fd080] rounded-lg hover:bg-[#5fd080] hover:text-white transition-all duration-300 transform hover:scale-105">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ViewProfile;