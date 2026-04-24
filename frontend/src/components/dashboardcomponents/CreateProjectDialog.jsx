import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'sonner';

const CreateProjectDialog = ({ onClose, setProjects }) => {
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    // handle add project 
    const handleCreateProject = async (data) => {
        if (loading) return;
        const formdata = {
            name:data.name.trim(),
            baseUrl:data.baseUrl.trim(),
            environment:data.environment
        }
        try {
            setLoading(true)
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/project/create-project`,formdata, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.data) {
                const newProject = response?.data?.data?.project
                setProjects((prev) => [newProject, ...prev])
                toast.success(response?.data?.message)
                reset()
                onClose()
            }
        } catch (error) {
            console.error("failed to create project", error)
            toast.error(error?.response?.data?.message || "Internal server error")
        } finally {
          setLoading(false)
        }
    }
    const handleClose = () => {
        onClose()
    }
    return (
        <div className="fixed inset-0 z-[9999]  flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* BACKDROP */}
            <div
                className="fixed inset-0 bg-[#161021]/60 backdrop-blur-sm"
                onClick={handleClose}
            />
            {/* DIALOG */}
            <div onClick={(e) => e.stopPropagation()} className="relative  w-full max-w-lg bg-[#1A102C] border border-[#6a4dff]/10 rounded-lg shadow-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-[#6a4dff]/10  flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">
                        Create New Project
                    </h3>
                    <button
                        onClick={() => handleClose()}
                        className="text-gray-400 cursor-pointer hover:text-gray-500 dark:hover:text-gray-300"
                    >
                        <IoMdClose size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit(handleCreateProject)} className="p-6">
                    <div className="space-y-5">
                        {/* project name */}
                        <div>
                            <label className="block text-sm font-semibold text-[#cac3d9] mb-1.5">
                                Project Name
                            </label>
                            <input
                                type="text"
                                autoFocus
                                placeholder="e.g Payments Gateway"
                                className="w-full bg-[#211539] border border-[#5b13ec1a] rounded-xl py-3 px-4 text-[#f6f6f8] placeholder:text-[#cac3d9]/40 focus:ring-2 focus:ring-[#5b13ec]/20 focus:border-[#5b13ec] outline-none"
                                {...register("name", { required: "Project Name is Required" })}
                            />
                            {errors?.name && (
                                <p className='text-sm mt-1 text-red-500'>{errors?.name?.message}</p>
                            )}
                        </div>
                        {/* base url */}
                        <div>
                            <label className="block text-sm font-semibold text-[#cac3d9] mb-1.5">
                                Base Url
                            </label>
                            <input
                                type="text"
                                placeholder="https://api.domain.com"
                                className="w-full bg-[#211539] border border-[#5b13ec1a] rounded-xl py-3 px-4 text-[#f6f6f8] placeholder:text-[#cac3d9]/40 focus:ring-2 focus:ring-[#5b13ec]/20 focus:border-[#5b13ec] outline-none"
                                {...register("baseUrl", {
                                    required: "Base Url is Required",
                                    pattern: {
                                        value: /^https?:\/\/.+/,
                                        message: "Enter valid URL",
                                    },
                                })}
                            />
                            <p className='text-[0.7rem] mt-1 text-[#cac3d9]'>The root Url for your Api endPoints</p>
                            {errors?.baseUrl && (
                                <p className='text-sm mt-1 text-red-500'>{errors?.baseUrl?.message}</p>
                            )}
                        </div>
                        {/* environment*/}
                        <div>
                            <label className="block text-sm font-semibold text-[#cac3d9]   mb-1.5">
                                Environment
                            </label>
                            <select name="environment" {...register("environment", { required: "Please select environment" })} className="block w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-[#1337ec]/20 focus:border-[#1337ec] transition-all dark:text-white outline-none">
                                <option value="">Select Environment</option>
                                <option value="development">Development</option>
                                <option value="production">Production</option>
                            </select>
                            {errors?.environment && (
                                <p className='text-sm mt-1 text-red-500'>{errors?.environment?.message}</p>
                            )}
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-8 flex flex-col gap-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full cursor-pointer bg-[#5B13EC] hover:bg-[#5B13EC]/90 text-white px-4 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-[#1337ec]/20 flex items-center justify-center gap-2"
                        >
                            {
                                loading ? (
                                    <RotatingLines
                                        visible={true}
                                        height="24"
                                        width="24"
                                        color="#ffffff"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        ariaLabel="rotating-lines-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                    />
                                ) : (
                                    "Create project"
                                )
                            }
                        </button>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateProjectDialog;
