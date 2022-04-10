import React, {useState} from "react";
import httpClient from "../httpClient";

const Login: React.FC = () =>{

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const logInUser = async () =>{

        try{
            const res = await httpClient.post("//localhost:5000/login", {
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
        <div>
            <p>Welcome to My Weather, a simple app that helps you decide what to wear, based on the weather.</p>

            <form>
                <div className="email-div">
                    <label>Email:</label>
                    <input type="text" placeholder="example@gmail.com" value={email} onChange={e=>setEmail(e.target.value)}></input>
                </div>
                <div className="password-div">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={e=>setPassword(e.target.value)}></input>
                </div>
               <button type="button" onClick={() => logInUser()}>Login</button>
            </form>

            <p>Don't have an account? <a href="/register">Sign up!</a></p>  
            
        </div>
    )
};

export default Login;
