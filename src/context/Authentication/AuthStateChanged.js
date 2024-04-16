import React, { useEffect, useState } from 'react'
import { auth,db } from "@/firebase/firebase.config";
import useAuth from './AuthProvider';
import { onAuthStateChanged } from 'firebase/auth';

export default function AuthStateChanged({children}) {
    const {initialize} = useAuth();
    const [loading,setLoading] = useState(true);
    useEffect(()=>{

        onAuthStateChanged(auth, (user) => {
            initialize(user);
            


        });
        //esling-disable-next-line
    },[])

    /*
    if (loading){
        return <h1>Loading...</h1>
    }*/

    return children;
}
