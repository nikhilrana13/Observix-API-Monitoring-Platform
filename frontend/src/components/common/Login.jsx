import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { RotatingLines } from 'react-loader-spinner';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { SetUser } from '../../redux/AuthSlice';

const Login = () => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // handle form
  const onSubmit = async (data) => {
    const formdata = {
      email: data.email,
      password: data.password
    }
    try {
      setLoading(true)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, formdata)
      if (response.data) {
        toast.success(response?.data?.message)
        const user = response?.data?.data?.user 
        const token = response?.data?.data?.token
        localStorage.setItem("token",token)
        dispatch(SetUser(user))
        navigate("/observix/dashboard")
      }
    } catch (error) {
      console.error("Failed to login user", error)
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#161022] text-[#f6f6f8]">
      {/* Header*/}
      <header className="w-full py-8 px-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#5b13ec] rounded-lg flex items-center justify-center">
            ⚡
          </div>
          <span className="text-xl font-bold tracking-tight">
            Observix
          </span>
        </div>
        <Link to="/" className="text-sm font-medium text-[#cac3d9] hover:text-[#5b13ec] cursor-pointer">
          Back to Home
        </Link>
      </header>
      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-6 p-12 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#5b13ec]/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]"></div>
        {/* Login card */}
        <div className="w-full max-w-md  relative">
          <div className="bg-[#211e29]/80 backdrop-blur border border-[#5b13ec1a] rounded-xl p-8 md:p-10 flex flex-col gap-8 shadow-[0_0_40px_-10px_rgba(91,19,236,0.2)]">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">
                Welcome back
              </h1>
              <p className="text-[#cac3d9] text-sm">
                Enter your credentials to access your dashboard.
              </p>
            </div>
            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                {/* email */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#cac3d9]">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="name@company.com"
                      className="w-full bg-[#1d1a25] border border-[#5b13ec1a] rounded-lg py-3 pl-4 pr-4 text-[#f6f6f8] placeholder:text-[#cac3d9]/40 focus:ring-2 focus:ring-[#5b13ec]/20 focus:border-[#5b13ec] outline-none"
                      {...register("email", {
                        required: "Email is Required", pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address"
                        }
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className='text-sm text-red-500'>{errors?.email?.message}</p>
                  )}
                </div>
                {/* password */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#cac3d9]">
                      Password
                    </label>
                    <span className="text-xs text-[#5b13ec] hover:text-[#662bf7] cursor-pointer">
                      Forgot Password?
                    </span>
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-[#1d1a25] border border-[#5b13ec1a] rounded-lg py-3 px-4 text-[#f6f6f8] placeholder:text-[#cac3d9]/40 focus:ring-2 focus:ring-[#5b13ec]/20 focus:border-[#5b13ec] outline-none"
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
              </div>
              <button type='submit' disabled={loading} className="w-full bg-[#5b13ec] hover:bg-[#662bf7] text-white font-semibold py-3.5 rounded-lg transition flex items-center justify-center gap-2 shadow-lg shadow-[#5b13ec]/20">
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
                    " Log In →"
                  )
                }
              </button>
            </form>
            <div className="text-center">
              <p className="text-[#cac3d9] text-sm">
                Don't have an account?
                <Link to="/signup" className="text-[#5b13ec] font-bold ml-1 cursor-pointer hover:text-[#662bf7]">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
          {/* Glow accents */}
          <div className="absolute -z-10 -bottom-6 -right-6 w-32 h-32 bg-[#5b13ec]/20 blur-3xl"></div>
          <div className="absolute -z-10 -top-6 -left-6 w-32 h-32 bg-blue-500/10 blur-3xl"></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Login;
