import { resetAllApiCaches } from '@/utils/resetApiCache';
import { SetUser } from '../redux/AuthSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getSocket } from '@/config/socket';

const useLogout = () => {
     const  navigate = useNavigate()
     const dispatch = useDispatch()
     const socket = getSocket();
     
    const handleLogout = async()=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                },
            })
            if(response.data){
                toast.success(response?.data?.message)
                dispatch(resetAllApiCaches())
                socket.disconnect()
                localStorage.removeItem("token")
                dispatch(SetUser(null))
                navigate("/")
            }
        } catch (error) {
            console.error("failed to logout",error)
            toast.error(error?.response?.data?.message || "Internal server error")
        }
    }
  return {handleLogout}
}

export default useLogout;
