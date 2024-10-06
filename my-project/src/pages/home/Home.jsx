import { Fragment, useEffect } from "react";
import Header from "../../partials/Header";
import { getAllUsers } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import Product from "../../layouts/Product";

function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        getAllUsers(localStorage.getItem("token"),dispatch)
    })
    
    return ( 
        <Fragment>
        <Header/>
        <Product/>
        </Fragment>
     );
}

export default Home;