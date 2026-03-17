import React, { useState, useRef, useEffect } from "react";
import { LuUser, LuSettings, LuLayoutDashboard } from "react-icons/lu";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


const ProfileDropdown = ({ user }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    // close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (!dropdownRef.current?.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Avatar */}
            <div
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full overflow-hidden bg-[#5b13ec]/20 border border-[#5b13ec]/30 flex items-center justify-center cursor-pointer hover:scale-105 transition"
            >
                {
                    user?.profilePic && user?.profilePic?.length > 0 ? (
                        <img src={user?.profilePic} alt="user profile pic" className="w-full h-full object-cover rounded-full" />
                    ) : (
                        <span className="text-sm font-semibold text-white">
                            {user?.username?.charAt(0)?.toUpperCase()}
                        </span>
                    )
                }
            </div>
            {/* for desktop*/}
            {open && (
                <>
                    {/* Desktop */}
                    <div className="hidden md:block absolute right-0 mt-3 w-64 rounded-xl bg-[#1d1a25]/90 backdrop-blur-xl border border-[#5b13ec1a] shadow-[0_10px_40px_rgba(0,0,0,0.4)] p-3 z-50 animate-fadeIn">
                        {/* User Info */}
                        <div className="flex items-center gap-3 px-3 py-2 border-b border-[#5b13ec1a]">
                            <div className="w-10 h-10 rounded-full bg-[#5b13ec]/20 flex items-center justify-center">
                                <span className="text-white font-semibold">
                                    {user?.username?.charAt(0)?.toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">
                                    {user?.username || "User"}
                                </p>
                                <p className="text-xs text-[#cac3d9]">{user?.email || "NA"}</p>
                            </div>
                        </div>
                        {/* Menu */}
                        <div className="mt-2 flex flex-col">
                            <Link to="/observix/profile" className="flex items-center gap-3 px-3 py-2 rounded-md text-[#cac3d9] hover:bg-[#5b13ec]/10 hover:text-white transition">
                                <LuUser size={18} /> Profile
                            </Link>

                            <Link to="/observix/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md text-[#cac3d9] hover:bg-[#5b13ec]/10 hover:text-white transition">
                                <LuLayoutDashboard size={18} /> Dashboard
                            </Link>
                            <div className="h-px bg-[#5b13ec1a] my-2"></div>
                        </div>
                    </div>
                    {/* mobile drawer*/}
                    <div className="fixed inset-0 z-50 md:hidden">
                        {/* overlay */}
                        <div
                            onClick={() => setOpen(false)}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        />
                        {/* bottom sheet */}
                        <motion.div
                            drag="y"
                            dragConstraints={{ top: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(e, info) => {
                                if (info.offset.y > 120 || info.velocity.y > 500) {
                                    setOpen(false); // close on swipe down
                                }
                            }}
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", stiffness: 260, damping: 25 }}
                            className="absolute bottom-0 left-0 right-0 bg-[#1d1a25] rounded-t-2xl p-5 animate-slideUp border-t border-[#5b13ec1a]">
                            {/* drag handle */}
                            <div className="w-12 h-1.5 bg-[#5b13ec]/30 rounded-full mx-auto mb-4"></div>
                            {/* user */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-[#5b13ec]/20 flex items-center justify-center">
                                    <span className="text-white font-semibold">
                                        {user?.username?.charAt(0)?.toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-white font-semibold">{user?.username}</p>
                                    <p className="text-xs text-[#cac3d9]">{user?.email}</p>
                                </div>
                            </div>
                            {/* actions */}
                            <div className="flex flex-col gap-2">
                                <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#5b13ec]/10 text-white">
                                    <LuUser size={20} /> Profile
                                </button>
                                <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#5b13ec]/10 text-white">
                                    <LuLayoutDashboard size={20} /> Dashboard
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProfileDropdown;