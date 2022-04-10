import React,{useState} from 'react';
import httpClient from '../../httpClient';
import './Register.css'
import logo from "../../MyWeather-logo.jpg"


function Register() {

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [city, setCity] = useState<string>("")


    const registerUser = async () =>{

        try{
            const res = await httpClient.post("//localhost:5000/register", {
                name, email, password,  city
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

        <form>
            <div className="input-div">
                <label>First Name</label>
                <input value={name} type="text" placeholder="Your name"onChange={e=>setName(e.target.value)}></input>
            </div>
            <div className="input-div">
                <label>Email</label>
                <input value={email} type="email" placeholder="Your email"onChange={e=>setEmail(e.target.value)}></input>
            </div>
            <div className="input-div">
                <label>Password</label>
                <input value={password}  type="password" placeholder="Your password" onChange={e=>setPassword(e.target.value)}></input>
            </div>
            <div className="input-div">
                <label>City</label>
                <input value={city} placeholder= "Your city" onChange={e=>setCity(e.target.value)}></input>
            </div>
            <p className="terms">By joining, you agree to abide by the My Weather terms and conditions.</p>
            <button type="button" onClick={() => registerUser()}>Create Account</button>

        </form>
    </div>
  )
}

export default Register