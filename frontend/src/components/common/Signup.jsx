import React, { useState } from 'react';
import Footer from './Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'sonner';
import { RotatingLines } from 'react-loader-spinner';

const SignUp = () => {
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
   
    // handle form
    const onSubmit = async (data) => {
        const formdata = {
            username: data.username,
            email: data.email,
            password: data.password
        }
        try {
            setLoading(true)
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, formdata)
            if (response.data) {
                toast.success(response?.data?.message)
                navigate("/login")
            }
        } catch (error) {
            console.error("Failed to sign up user", error)
            toast.error(error?.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#161022] text-[#f6f6f8]">
            <main className="flex flex-1 flex-col md:flex-row">
                {/* left hero section */}
                <section className="hidden md:flex md:w-1/2 relative overflow-hidden items-center justify-center p-12 lg:p-24 bg-[#1d1a25]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(91,19,236,0.12),transparent_70%)]"></div>
                    <div className="relative z-10 max-w-lg">
                        <div className="flex items-center gap-3 mb-12">
                            <div className="w-10 h-10 bg-[#5b13ec] rounded-xl flex items-center justify-center shadow-[0_0_40px_-10px_rgba(91,19,236,0.3)]">
                                ⚡
                            </div>
                            <span className="text-2xl font-bold">Observix</span>
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                            Build the future of{" "}
                            <span className="text-[#5b13ec]">infrastructure.</span>
                        </h1>
                        <p className="text-[#cac3d9] text-lg mb-10">
                            Experience the next generation of API monitoring. Join 10k+
                            developers scaling high-performance systems with Observix.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-6 rounded-xl bg-[#211e29] border border-[#5b13ec1a]">
                                <div className="text-[#5b13ec] text-3xl font-bold mb-1">
                                    99.9%
                                </div>
                                <div className="text-xs uppercase tracking-widest text-[#cac3d9]">
                                    Uptime SLA
                                </div>
                            </div>
                            <div className="p-6 rounded-xl bg-[#211e29] border border-[#5b13ec1a]">
                                <div className="text-[#5b13ec] text-3xl font-bold mb-1">
                                    10k+
                                </div>
                                <div className="text-xs uppercase tracking-widest text-[#cac3d9]">
                                    Developers
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* right form section */}
                <section className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-24">
                    <div className="w-full max-w-md">
                        {/* logo mobile */}
                        <div className="md:hidden flex items-center gap-2 mb-8 justify-center">
                            <div className="w-8 h-8 bg-[#5b13ec] rounded-lg flex items-center justify-center">
                                ⚡
                            </div>
                            <span className="font-bold text-xl">Observix</span>
                        </div>
                        {/* Heading */}
                        <div className="mb-10 text-center md:text-left">
                            <h2 className="text-3xl font-bold mb-2">
                                Create Account
                            </h2>
                        </div>
                        {/* Social Buttons */}
                        {/* <div className="space-y-4 mb-8">
                            <button className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-[#211e29]/70 backdrop-blur border border-[#5b13ec1a] hover:bg-[#36333f] transition">
                                <img
                                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                                    className="w-5 h-5"
                                />

                                <span className="font-medium">
                                    Continue with Google
                                </span>

                            </button>
                            <button className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-[#211e29]/70 backdrop-blur border border-[#5b13ec1a] hover:bg-[#36333f] transition">

                                <span className="font-medium">
                                    Continue with GitHub
                                </span>
                            </button>
                        </div> */}
                        {/* Divider */}
                        {/* <div className="relative mb-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#5b13ec1a]"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase tracking-widest">
                                <span className="bg-[#161022] px-4 text-[#cac3d9] font-semibold">
                                    Or with email
                                </span>
                            </div>
                        </div> */}
                        {/* FORM */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div className='flex flex-col gap-1'>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-[#cac3d9] mb-2 ml-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Alex Rivera"
                                    className="w-full bg-[#1d1a25] border border-[#5b13ec1a] rounded-xl py-3 px-4 text-[#f6f6f8] placeholder:text-[#cac3d9]/40 focus:ring-2 focus:ring-[#5b13ec]/20 focus:border-[#5b13ec] outline-none"
                                    {...register("username", { required: "Username is Required", maxLength: { value: 30, message: "Max 30 characters allowed" } })}
                                />
                                {errors.username && (
                                    <p className='text-sm text-red-500'>{errors?.username?.message}</p>
                                )}
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-[#cac3d9] mb-2 ml-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="alex@company.com"
                                    className="w-full bg-[#1d1a25] border border-[#5b13ec1a] rounded-xl py-3 px-4 text-[#f6f6f8] placeholder:text-[#cac3d9]/40 focus:ring-2 focus:ring-[#5b13ec]/20 focus:border-[#5b13ec] outline-none"
                                    {...register("email", {
                                        required: "Email is Required", pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                />
                                {errors.email && (
                                    <p className='text-sm text-red-500'>{errors?.email?.message}</p>
                                )}
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-[#cac3d9] mb-2 ml-1">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-[#1d1a25] border border-[#5b13ec1a] rounded-xl py-3 px-4 text-[#f6f6f8] placeholder:text-[#cac3d9]/40 focus:ring-2 focus:ring-[#5b13ec]/20 focus:border-[#5b13ec] outline-none"
                                    {...register("password", {
                                        required: "Password is Required", minLength: {
                                            value: 6,
                                            message: "Minimum 6 characters required"
                                        }
                                    })}
                                />
                                {errors.password && (
                                    <p className='text-sm text-red-500'>{errors?.password?.message}</p>
                                )}
                            </div>
                            <button type='submit' disabled={loading} className="w-full bg-[#5b13ec] hover:bg-[#662bf7] text-white cursor-pointer font-bold py-4 rounded-xl transition active:scale-[0.98] shadow-[0_0_40px_-10px_rgba(91,19,236,0.3)] flex items-center justify-center">
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
                                    ):(
                                    "Create Account"
                                    )
                                }
                            </button>
                        </form>
                        <p className="mt-8 text-center text-sm text-[#cac3d9]">
                            Already have an account?
                            <Link to="/login" className="text-[#5b13ec] font-bold ml-1 cursor-pointer hover:underline">
                                Log in
                            </Link>
                        </p>
                        <div className="mt-12 text-center">
                            <p className="text-[10px] text-[#cac3d9]/50 uppercase tracking-[0.2em] leading-relaxed">
                                By signing up, you agree to our <br />
                                <span className="hover:text-white cursor-pointer">
                                    Terms of Service
                                </span>{" "}
                                &{" "}
                                <span className="hover:text-white cursor-pointer">
                                    Privacy Policy
                                </span>
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default SignUp;

