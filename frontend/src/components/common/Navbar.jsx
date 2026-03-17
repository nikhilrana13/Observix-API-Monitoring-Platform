import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { HiX } from 'react-icons/hi'
import { MdClose } from 'react-icons/md'
import { TiThMenu } from 'react-icons/ti'
import { useSelector } from 'react-redux';
import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const { pathname } = useLocation()
    const user = useSelector((state) => state.Auth.user)

    const navlinkClass = (path) => {
        return `font-normal  text-white relative pb-1 ${pathname === path
            ? "lg:after:content-[''] lg:after:absolute  lg:after:transition-all lg:after:ease-in lg:after:duration-300 lg:after:left-0 lg:after:-bottom-1 lg:after:w-full lg:after:h-[3px] lg:after:bg-blue-600"
            : ""
            }`
    }
    return (
        <>
            <header className='px-6  bg-[#07050d] text-white  w-full sticky top-0 z-[100]  md:px-16 lg:px-30 py-2'>
                <nav className='py-4 flex items-center justify-between'>
                    {/* logo */}
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
                    {/* links */}
                    <ul className='hidden lg:flex  items-center gap-10 p-2'>
                        <li>
                            <NavLink to="/" className={navlinkClass("/")}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/features" className={navlinkClass("/features")}>Features</NavLink>
                        </li>
                        <li>
                            <NavLink to="/docs" className={navlinkClass("/docs")}>Docs</NavLink>
                        </li>
                    </ul>
                    {/* button */}
                    <div className='flex  items-center gap-5'>
                        {
                            user ? (
                                <ProfileDropdown user={user} />
                            ) : (
                                <>
                                    <Link to="/signup" className='w-full hidden md:flex truncate  text-white cursor-pointer border-gray-100 rounded-md px-5 py-2 hover:text-indigo-700 font-medium text-[0.6rem]  sm:text-[0.9rem]'>
                                        Sign up
                                    </Link>
                                    <Link to="/login" className='w-full hidden md:flex  text-white cursor-pointer border-gray-100 rounded-md px-5 py-2 hover:bg-indigo-700 bg-indigo-600 font-medium text-[0.6rem]  sm:text-[0.9rem]'>
                                        Log in
                                    </Link>
                                </>
                            )
                        }
                        <button onClick={() => setOpen(!open)} className='md:hidden  text-white'>
                            {open ? <HiX size={28} /> : <TiThMenu size={28} />}
                        </button>
                    </div>
                </nav>
            </header>
            {/* for mobile screen */}
            <div className={`lg:hidden transition-transform ease-in-out ${open ? "translate-x-0" : "-translate-x-full"} duration-300  fixed inset-0  bg-black/60 backdrop-blur-md flex items-center flex-col justify-center text-lg gap-8 z-[999] `}>
                <ul className="flex active:scale-95 text-white flex-col items-center gap-8 text-xl">
                    <li onClick={() => setOpen(false)}>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li onClick={() => setOpen(false)}>
                        <NavLink to="/services">Features</NavLink>
                    </li>
                    <li onClick={() => setOpen(false)}>
                        <NavLink to="/aboutus">Docs</NavLink>
                    </li>
                    {
                        !user  && (
                            <>
                                <li>
                                    <Link to="/signup">Sign up</Link>
                                </li>
                                <li>
                                    <Link to="/login">Log in</Link>
                                </li>
                            </>
                        )
                    }
                </ul>
                <button onClick={() => setOpen(false)} className='bg-white p-2 rounded-md text-black'>
                    <MdClose size={24} />
                </button>
            </div>
        </>
    );
}

export default Navbar;


