import { useEffect } from "react";
import Header from "../../partials/Header";
import { getAllUsers } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";

function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        getAllUsers(localStorage.getItem("token"),dispatch)
    })
    
    return ( 
        <Header/>
     );
}

export default Home;