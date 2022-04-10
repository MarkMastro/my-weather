import { BrowserRouter,  Route, Routes } from  "react-router-dom"
import Login from "./pages/Login"
import Weather from "./pages/Weather"
const Router = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}></Route>
                <Route path="/weather" element={<Weather/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router