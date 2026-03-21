import React, { useState } from "react";
import { FiExternalLink, FiCopy } from "react-icons/fi";
import { BsGraphUpArrow } from "react-icons/bs";
import { formatRelativeTime } from "../../utils/Formaters";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppleToggle from "./AppleToggle";

const ProjectCard = ({ project, setProjects }) => {
    const [toggleId, setToggleId] = useState(null)
    const navigate = useNavigate()
    const copyApiKey = async () => {
        if (!project?.apiKey) {
            toast.error("API key not available");
            return;
        }
        try {
            await navigator.clipboard.writeText(project.apiKey);
            toast.success("API key copied");
        } catch (error) {
            toast.error("Copy failed ");
        }
    };
    const handleClick = (id) => {
        navigate(`/observix/project/details/${id}`)
    }
    const handleToggleProjectStatus = async (projectid, currentStatus) => {
        try {
            setToggleId(projectid)
            const newStatus = currentStatus === "active" ? "inactive" : "active";
            const id = String(projectid)
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/project/status/${id}`, {
                status: newStatus
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response?.data?.status === "success") {
                toast.success(response?.data?.message)
                setProjects((prev) => prev.map((project) => project._id === projectid ? { ...project, status: newStatus } : project))
            }
        } catch (error) {
            console.log("failed to toggle project status", error)
            toast.error(error?.response?.data?.message || "Internal server error")
        }
    }


    return (
        <div className="group relative bg-[#1A102C] border border-[#6a4dff]/20 rounded-2xl p-5 overflow-hidden hover:shadow-xl transition-all duration-500">
            {/* Glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-all duration-500 bg-gradient-to-br from-[#6a4dff] to-[#8b5cf6] pointer-events-none" />
            {/* Header */}
            <div className="relative flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-white text-lg font-semibold truncate max-w-[180px]">
                        {project?.name || "NA"}
                    </h2>
                    <p className="text-gray-500 text-xs">
                        {project?.environment || "NA"}
                    </p>
                </div>
                {/* Status badge */}
                <span className={`px-2 capitalize py-1 rounded-lg text-[10px] text-xs font-medium ${project?.status === "active" ? "text-green-400 bg-green-500/10 " : "text-red-400 bg-red-500/10"}`}>
                    {project?.status === "active" ? "Active" : "Inactive"}
                </span>
            </div>
            {/* Base URL */}
            <div className="mb-3">
                <p className="text-gray-400 text-xs">Base URL</p>
                <div className="flex items-center justify-between gap-2">
                    <p className="text-sm text-gray-300 truncate">
                        {project?.baseUrl || "NA"}
                    </p>
                    <a
                        href={project?.baseUrl || "NA"}
                        target="_blank"
                        className="text-gray-400 hover:text-white"
                    >
                        <FiExternalLink size={14} />
                    </a>
                </div>
            </div>
            {/* API KEY */}
            <div className="mb-4">
                <p className="text-gray-400 text-xs">API Key</p>
                <div className="flex items-center justify-between bg-[#23104A] px-3 py-2 rounded-md">
                    <p className="text-xs text-[#a78bfa] truncate">
                        {project?.apiKey?.slice(0, 10)}••••••
                    </p>
                    <button
                        onClick={copyApiKey}
                        type="button"
                        title="Copy API Key"
                        className="text-gray-400 cursor-pointer hover:text-white"
                    >
                        <FiCopy size={14} className="hover:scale-110 transition-transform duration-200" />
                    </button>
                </div>
            </div>
            {/* Stats */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-gray-500 text-xs">Requests</p>
                    <p className="text-white text-lg font-semibold">
                        {project?.requestCount || 0}
                    </p>
                </div>
                <div className="p-3 rounded-xl bg-[#23104A] text-[#6a4dff]">
                    <BsGraphUpArrow size={18} />
                </div>
            </div>
            {/* Last Updated */}
            <p className="text-gray-500 text-[11px] mb-4">
                Last updated •{" "}
                <span className="text-gray-300">
                    {formatRelativeTime(project?.updatedAt || "NA")}
                </span>
            </p>
            {/* Footer Actions */}
            <div className="flex items-center justify-between">
                <button type="button" onClick={() => handleClick(project?._id)} className="text-xs text-gray-400 hover:text-white">
                    View Details
                </button>
                {/* toggle button */}
                <div className="flex items-center gap-3">
                    <span
                        className={`text-xs font-medium ${project?.status === "active" ? "text-green-400" : "text-red-400"
                            }`}
                    >
                        {project?.status === "active" ? "Active":"Inactive"}
                    </span>

                    <AppleToggle
                        checked={project?.status === "active"}
                        disabled={toggleId === project._id}
                        onChange={() =>
                            handleToggleProjectStatus(project?._id, project?.status)
                        }
                    />
                </div>

            </div>
        </div>
    );
};

export default ProjectCard;