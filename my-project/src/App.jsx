import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import Login from "~/pages/Login/Login.jsx";
import Register from "~/pages/Register/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import "./css/style.css";
import "./charts/ChartjsConfig";
import Home from "./pages/home/Home.jsx";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
