import { React, useState, useEffect } from "react";

import * as jwt_decode from "jwt-decode";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

import Banner from "../partials/Banner";
import Login from "./Login/Login";
import { useNavigate } from "react-router-dom";
import DashboardMain from "../layouts/DashboardMain";
import Product from "../layouts/Product";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState("dashboard");
  const [token, setToken] = useState(null); // Khởi tạo token rỗng
  const [isLoading, setIsLoading] = useState(true);



  const navigate = useNavigate();




  useEffect(() => {
    const storedToken = localStorage.getItem("token"); // Lấy token từ localStorage

    if (!storedToken) {
      setToken(null);
      setIsLoading(false);
    } else {
      try {
        //Giai ma token
        const decodedToken = jwt_decode(storedToken);
        console.log(decodedToken);
      } catch (error) {}
      setToken(storedToken);
      setIsLoading(false);
    }
  }, [navigate]);

  //render
  console.log(currentComponent)
  const renderComponent = () => {
    switch (currentComponent) {
      case "product":
        return <Product />;
      default:
        return <DashboardMain/>
    }
  };

  if (isLoading) {
    // Trong khi chờ kiểm tra token, hiển thị loading hoặc một nội dung khác
    return <div>Loading...</div>;
  }
  return (
    <div >
      {token != null ? (
        
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setCurrentComponent={setCurrentComponent}/>

          {/* Content area */}
          <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/*  Site header */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <main className="grow">
              {renderComponent()} {/* Render component dựa trên state */}
            </main>

            <Banner />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Dashboard;
