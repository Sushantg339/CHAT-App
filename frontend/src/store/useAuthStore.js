import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

export const useAuthStore = create((set , get)=>({
    authUser : null,
    isCheckingAuth : true,
    isSigningUp : false,

    checkAuth : async()=>{
        try {
            const res = await axiosInstance.get('/auth/check')

            set({authUser : res.data})
        } catch (error) {
            console.log('error in auth check')
            set({authUser : null})
        } finally{
            set({isCheckingAuth : false})
        }
    },

    signup : async(data)=>{
        set({isSigningUp : true})
        try {
            const res = await axiosInstance.post('/auth/signup' , data)

            set({authUser : res.data})

            toast.success("Account created successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally{
            set({isSigningUp : false})
        }
    }
}))