import React, {useState, useEffect} from 'react'
import httpClient from '../../httpClient';
import {User, WeatherData} from "../../types"
import logo from "../../MyWeather-logo.jpg"
import "./Weather.css"

function Weather() {
    const [user, setUser] = useState<User | null>(null);

    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    
    

    useEffect(()=>{
        (async() =>{
            try{
                const res = await httpClient.get("//localhost:5000/@me");
                setUser(res.data)
                const city = res.data.city;
                console.log(city)
                const resWeather = await httpClient.post("//localhost:5000/weather",{
                    data: {
                        city
                    },
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                setWeatherData(resWeather.data)
            
            } catch (error){
                console.log(error)
            }
        })();
    }, []) 

  return (
    <div>
        {user != null && weatherData != null ?
        <div className='main-div'>
            <img src={logo} alt="logo" className="logo"></img>
          <p>Hello {user.name},</p>
          <p>The current temperature in {user.city}, {weatherData.country} with wind chill is {weatherData.wind_chill}°C.</p>
          <p>{weatherData.clothing}</p> 
        </div>
         : null }
        
    </div>
  )
}

export default Weather