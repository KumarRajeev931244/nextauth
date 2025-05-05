'use client'
import axios from "axios";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";


export default function ProfilePage(){

    const [data, setData] = useState("nothing")
    const router = useRouter()

    async function getUserDetails(){
        try {
            const response = await axios.post('/api/users/me')
            setData(response.data.data._id)
        } catch (error) {
            console.log("Error : while getting data from user ")
            
        }
    }

    async function logout(){
        try {
            await axios.get('/api/users/logout')
            toast.success("successfully logout")
            router.push("/login")
        } catch (error:any) {
            console.log("Error: while logout");

        }
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile page</h1>
            <hr />
            <h2>{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data} </Link>}</h2>
            <hr />
            <button 
            onClick={getUserDetails}
            className="bg-green-500 p-2.5 m-1 rounded-xl cursor-pointer hover:bg-green-600 text-sm"
            >Get user details</button>
            <button 
            onClick={logout}
            className="bg-cyan-500 p-2.5 m-1 rounded-xl cursor-pointer hover:bg-cyan-600 text-sm"
            >logout</button>
        </div>
    )
}