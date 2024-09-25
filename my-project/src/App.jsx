import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./customers/components/Login/Login.jsx";
import Register from"./customers/components/Register/Register.jsx";

function App() {


  return (
    <div>
      
      <BrowserRouter>
      <Routes>
        {/* // http://localhost:5173 */}
        <Route path="/login" element = {<Login/>}></Route> 
        <Route path="/register" element = {<Register/>}></Route>
      </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
