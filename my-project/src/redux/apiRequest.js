import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";

const REST_AUTH_BASE_URL = "http://localhost:8081/auth";
const REST_API_BASE_URL = "http://localhost:8081/api";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(REST_AUTH_BASE_URL + "/login", user);
    dispatch(loginSuccess(res.data));
    localStorage.setItem("token",res.data.token)
    navigate("/");
  } catch (error) {
    console.log(error)
    const errorPayload = {usernameError:"", passwordError:""}
    if(error.response) {
      const {code,message} = error.response.data;
      if(code == 1001) {
        errorPayload.usernameError = message;
      } else if(code == 1002) {
        errorPayload.passwordError = message;
      }
    }
    dispatch(loginFailed(errorPayload));
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post(REST_API_BASE_URL + "/add-khachhang", user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (error) {
    
    const errorPayload = { usernameError: "", emailError: "" }; // Khởi tạo payload lỗi
    if (error.response) {
      const { code, message } = error.response.data; // Lấy code và message từ response

      // Kiểm tra mã lỗi và thông báo để gán cho trường tương ứng
      if (code === 1004) {
        errorPayload.usernameError = message; // Gán lỗi cho trường username
      }
      // Giả sử mã lỗi cho email là 1005
      else if (code === 1003) {
        errorPayload.emailError = message; // Gán lỗi cho trường email
      }
    }
    dispatch(registerFailed(errorPayload));
  }
};
