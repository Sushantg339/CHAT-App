import { create } from "zustand";

export const useAuthStore = create((set , get)=>({
    authUser : {name : "john" , age : 25 , _id : 123},
    isLoggedIn : false,

    login : ()=>{
        console.log('logged in broooo')
        set({isLoggedIn : true})
    }
}))