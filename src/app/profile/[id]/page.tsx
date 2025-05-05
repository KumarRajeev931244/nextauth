import React from "react"

export default async  function page({params}: any){
    const id = await params
    console.log("param id:", id)
    return(
        
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1>Profile page</h1>
            <h2 className="p-3 bg-green-400 rounded text-black"> {id.id}</h2>

        </div>
    )
}

