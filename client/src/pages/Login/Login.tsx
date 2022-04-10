import React, {useState} from "react";
import httpClient from "../../httpClient";
import logo from "../../MyWeather-logo.jpg"
import './Login.css'

const Login: React.FC = () =>{

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const logInUser = async () =>{

        try{
            const res = await httpClient.post("https://stagepage-my-weather.herokuapp.com/login", {
                email, password
            })
            if (res.status === 200) {
                window.location.href = "/weather"
            }

            
        } catch (error: any) {
            if (error.response.status === 401)  {
                alert("invalid credentials")
            }
        }

      
    }

    return (
        <div className="main-div">

            <img src={logo} alt="logo" className="logo"></img>

            <p className="welcome">Welcome to My Weather, a simple app that helps you decide what to wear, based on the weather.</p>

            <form>
                <div className="input-div">
                    <label>Email</label>
                    <br></br>
                    <input type="email" placeholder="Your Email" value={email} onChange={e=>setEmail(e.target.value)}></input>
                </div>
                <div className="input-div">
                    <label>Password</label>
                    <br></br>
                    <input type="password" placeholder="Your Password" value={password} onChange={e=>setPassword(e.target.value)}></input>
                </div>
               <button type="button" onClick={() => logInUser()}>Login</button>
            </form>

            <p className="register-link">Don't have an account? <a href="/register">Sign-up</a></p>  
            
        </div>
    )
};

export default Login;
