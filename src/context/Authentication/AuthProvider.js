
import { createContext, useContext, useState, useEffect } from "react";

import { auth,db } from "@/firebase/firebase.config";

import AuthService from "./AuthService";

const authContext = createContext();

export default function useAuth(){
    return useContext(authContext);
}

export function AuthProvider(props){
    const [user,setUser] =  useState(null);
    const [error,setError] = useState(null);
    const [data,setData] = useState({});
    const [initialLoading, setInitialLoading] = useState(true);

    const logiIn = async ()=>{
        console.log("login")
        const {error,user} = await AuthService.logInWithEmail();
        setUser(user ?? null);
        setError(error ?? "");
    }
    const logout = async() =>{
        console.log("here logout")
        await AuthService.logout();
        setUser(null);
        setData({})

    }
    const getData = async (uid)=>{
        const {userData} = await AuthService.getUsersCollectionData(uid);
        await setData({...userData});

    }
    useEffect(() => {
        let unsubscribe = () => {};
    
        if (user) {
          unsubscribe = AuthService.subscribeToUserData(user.uid, setData, setError);
        }
    
        return () => unsubscribe(); // Cleanup subscription on unmount or user change
      }, [user]);


    const initialize = async(user)=>{
        setInitialLoading(false);
        if (!user){
            setUser(null);
            setError("No user signed in!");
            return
        }
        const uid = user.uid;
        await setUser(user);
        //why does this not print anything?
    }   
    const value ={user,error,data,logiIn,logout,setUser,getData,initialize, initialLoading};

    return <authContext.Provider value={value} {...props} />;
}