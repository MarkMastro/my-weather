import React, {useState, useEffect} from 'react'
import httpClient from '../httpClient';
import {User} from "../types"
function Weather() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(()=>{
        (async() =>{
            try{const res = await httpClient.get("//localhost:5000/@me");

            setUser(res.data)} catch (error){
                console.log("Not Authenticated")
            }
        })();
    }, []) 
  return (
    <div>
        <h1> Welcome to weather {user} </h1>
        
    </div>
  )
}

export default Weather