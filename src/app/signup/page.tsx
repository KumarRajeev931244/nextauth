'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function SignupPage() {

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })
    const [buttonDisabled, setButtonDisable] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const onSignup = async() => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            toast.success("successfully signup")
            router.push('/login')
            
        } catch (error:any) {
            toast.error("signup failed",{
                position: 'top-center'})
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisable(false)  //show signup button
        }else{
            setButtonDisable(true)  //do not show signup button
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <div className="border border-gray-500 flex flex-col items-center justify-center p-10 m-15 rounded-4xl">
            <h1> {loading? "proccessing": "signup"}  </h1>
            <hr />
            <label htmlFor="username">username</label>
            <input 
            type="text"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            placeholder="username"
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-gray-200"
            />
            <label htmlFor="email">email</label>
            <input type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            className="rounded-lg p-2 mb-4 border border-gray-300 focus:border-gray-600 text-black focus:outline-none bg-gray-200"
            />
            <label htmlFor="password">password</label>
            <input type="text"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-gray-200"
            />
            <button
             onClick={onSignup}
             className="bg-cyan-500 p-2.5 m-1 rounded-xl cursor-pointer hover:bg-cyan-600 text-sm">
             {buttonDisabled? "no signup" : "signup"}
            </button>
            <Link href='/login' className="text-blue-400 hover:text-blue-600 mt-4">visit login page</Link>
            </div>
        </div>
    )
}

