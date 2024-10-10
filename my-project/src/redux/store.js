import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import  userReducer  from "./userSlice"
import categoryReducer from "./categorySlice"
import productReducer from "./productSlice"

export default  configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        category: categoryReducer,
        product: productReducer,
    }
})