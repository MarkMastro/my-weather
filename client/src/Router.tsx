import { BrowserRouter,  Route, Routes } from  "react-router-dom"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Weather from "./pages/Weather/Weather"
const Router = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}></Route>
                <Route path="/weather" element={<Weather/>}></Route>
                <Route path="/register" element={<Register/>}></Route>

            </Routes>
        </BrowserRouter>
    )
}

export default Router