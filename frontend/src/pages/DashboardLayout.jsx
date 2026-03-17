import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboardcomponents/Sidebar';

const DashboardLayout = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="w-full  ">
            {/* Navbar */}
            <header className="fixed bg-[#161022] top-0 left-0 right-0 justify-between  border-b-2 border-[#6a4dff]/10 z-[9999] min-h-[75px] flex items-center px-4">
                <div className='flex flex-col leading-none select-none'>
                    <span className="text-white font-extrabold tracking-tight text-[1.4rem] md:text-[1.6rem]">
                        Observix
                    </span>
                    <div className="flex items-center gap-2 mt-[2px]">
                        <span className="text-[#3d40f5] text-[0.6rem] md:text-[0.65rem] font-semibold tracking-[0.3em] uppercase">
                            API OBSERVABILITY
                        </span>
                    </div>
                </div>
                <HiMenu onClick={() => setIsOpen(true)} className='block lg:hidden text-white cursor-pointer' />
            </header>
            {/* Layout */}
            <div className="flex min-h-screen flex-col lg:flex-row">
                {/* Sidebar */}
                <div className="hidden lg:block md:w-[20%]    pt-[75px]">
                    <Sidebar />
                </div>
                {/* Mobile Sidebar */}
                <div className={`fixed top-0 left-0 h-screen w-[280px]  z-[10000] transform transition-transform duration-300 
            ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}>
                    <header className="fixed top-0 left-0 right-0 justify-between bg-[#161022]  min-h-[75px] flex items-center px-4">
                        <div className="flex flex-col leading-none">
                            <span className="text-white font-extrabold tracking-tight text-[1.4rem] md:text-[1.6rem]">
                                Observix
                            </span>
                            <div className="flex items-center gap-2 mt-[2px]">
                                <span className="text-[#3d40f5] text-[0.6rem] md:text-[0.65rem] font-semibold tracking-[0.3em] uppercase">
                                    API OBSERVABILITY
                                </span>
                            </div>
                        </div>
                    </header>
                    <div className="pt-[75px] h-full">
                        <Sidebar />
                    </div>
                </div>
                {/* Overlay */}
                {isOpen && (
                    <div
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9999] lg:hidden"
                    />
                )}
                {/* Content */}
                <div className="w-full lg:w-[80%] bg-[#FAFAFA] pt-[75px] overflow-y-auto h-screen ">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;
