import { Fragment, useEffect } from "react";
import Header from "../../partials/Header";
import Product from "../../layouts/Product";
import SuccessMessage from "../../components/SuccessMessage";

function Home() {
   

    
    return ( 
        <Fragment>
        <Header/>
        <Product/>
        </Fragment>
     );
}

export default Home;