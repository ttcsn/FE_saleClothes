import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutStart,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import {
  deleteUserStart,
  getUserFailed,
  getUsersFailed,
  getUsersStart,
  getUsersSuccess,
  getUserStart,
  getUserSuccess,
} from "./userSlice";
import axiosInstance from "./axiosConfig";
import {
  getAllSubCategoryFailed,
  getAllSubCategoryStart,
  getAllSubCategorySuccess,
  getCategoryFailed,
  getCategoryStart,
  getCategorySuccess,
  getSubCategoryFailed,
  getSubCategoryStart,
  getSubCategorySuccess,
} from "./categorySlice";
import {
  addProductStart,
  addProductSuccess,
  addProductFailed,
  getAllProductStart,
  getAllProductSuccess,
  getAllProductFailed,
  getImageProductStart,
  getImageProductSuccess,
  getImageProductFailed,
  getAllImageProductStart,
  getAllImageProductSuccess,
  getAllImageProductFailed,
} from "./productSlice";

const REST_AUTH_BASE_URL = "http://51.79.167.161:8081/auth";
const REST_API_BASE_URL = "http://51.79.167.161:8081/api";

//Login
export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(REST_AUTH_BASE_URL + "/login", user);
    dispatch(loginSuccess(res.data));
    console.log(res.data);
    localStorage.setItem("token", res.data.result.token);
    navigate("/");
  } catch (error) {
    console.log(error);
    const errorPayload = { usernameError: "", passwordError: "" };
    if (error.response) {
      const { code, message } = error.response.data;
      if (code == 1001) {
        errorPayload.usernameError = message;
      } else if (code == 1002) {
        errorPayload.passwordError = message;
      }
    }
    dispatch(loginFailed(errorPayload));
  }
};
// Register
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

// get all khachhang
export const getAllUsers = async (token, dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get(REST_API_BASE_URL + "/khachhangs", {
      headers: { Authorization: `Bearer ${token}` }, // Sử dụng 'Authorization' thay vì 'token'
    });
    dispatch(getUsersSuccess(res.data));
  } catch (error) {
    console.error(error);
    dispatch(getUsersFailed());
  }
};

// get khachhang by id
export const getUserById = async (username, token, dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await axiosInstance.get(
      REST_API_BASE_URL + `/khachhang/${username}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(getUserSuccess(res.data));
  } catch (error) {
    console.error(error);
    dispatch(getUserFailed());
  }
};

// delete user
export const deleteUser = async (token, dispatch, username) => {
  dispatch(deleteUserStart());
  try {
  } catch (error) {}
};

//refresh token
export const refreshToken = async (token) => {
  try {
    const res = await axios.post("http://51.79.167.161:8081:8081/auth/refresh", {
      token,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//Logout
export const logout = async (dispatch, token) => {
  dispatch(logoutStart());
  try {
    const res = await axios.post(REST_AUTH_BASE_URL + "/logout", { token });
    dispatch(loginSuccess());
  } catch (error) {
    dispatch(loginFailed());
    console.log(error);
  }
};

//Get all danh muc
export const getAllDanhMuc = async (dispatch, token) => {
  dispatch(getCategoryStart());
  try {
    const res = await axiosInstance(REST_API_BASE_URL + "/danhmucs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getCategorySuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(getCategoryFailed());
  }
};
// Get  danh muc con by dmMa
export const getDanhMucConBydmMa = async (dispatch, dmMa, token) => {
  dispatch(getSubCategoryStart());
  try {
    const res = await axiosInstance(REST_API_BASE_URL + `/danhmuccon/${dmMa}`);
    dispatch(getSubCategorySuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(getSubCategoryFailed());
  }
};
// Get all danh muc con
export const getAllDanhMucCon = async (dispatch, token) => {
  dispatch(getAllSubCategoryStart());
  try {
    const res = await axiosInstance(REST_API_BASE_URL + "/danhmuccons", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getAllSubCategorySuccess(res.data));
  } catch (error) {
    dispatch(getAllSubCategoryFailed());
    console.log(error);
  }
};

// Upload image to server
export const uploadImageToFileSystem = async (selectedFile, spMa) => {
  const formData = new FormData();
  formData.append("image", selectedFile);
  formData.append("spMa", spMa);
  try {
    const res = await axiosInstance.post(
      "http://51.79.167.161:8081:8081/image/fileSystem",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error uploading file", error);
  }
};
// DownLoad image product from server
export const downloadAllImageFromServerBySpMa = async (
  spMa,
  token,
  dispatch
) => {
  dispatch(getImageProductStart());
  try {
    const res = await axiosInstance.get(
      `http://51.79.167.161:8081:8081/image/fileSystems/${spMa}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(getImageProductSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(getImageProductFailed());
  }
};
// Download all image products from server
export const downloadAllImage = async (token, dispatch) => {
  try {
    dispatch(getAllImageProductStart());
    const response = await axiosInstance.get("http://51.79.167.161:8081:8081/images", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getAllImageProductSuccess(response.data));
  } catch (error) {
    dispatch(getAllImageProductFailed());
    console.log(error);
  }
};
// add product
export const addProduct = async (product, dispatch, token) => {
  dispatch(addProductStart());
  try {
    const res = await axiosInstance.post(
      REST_API_BASE_URL + "/add-sanpham",
      product,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(addProductSuccess(res.data));
    return res.data;
  } catch (error) {
    console.log(error);
    dispatch(addProductFailed());
  }
};
// get all product
export const getAllProduct = async (dispatch, token) => {
  dispatch(getAllProductStart());
  try {
    const res = await axiosInstance.get(REST_API_BASE_URL + "/sanphams", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getAllProductSuccess(res.data));
  } catch (error) {
    dispatch(getAllProductFailed());
    console.log(error);
  }
};

// delete product
export const deleteProduct = async (spMa, token) => {
  try {
    await axiosInstance.delete(REST_API_BASE_URL + `/delete-sanpham/${spMa}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
// update product =================================================================
export const updateProduct = async (spMa,product,token) => {
try {
  const res =await axiosInstance.put(REST_API_BASE_URL + `/sanpham/${spMa}`,product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res;
} catch (error) {
  console.log(error)
}
}

// update image product ==============================================================

export const updateImageProduct = async (files,spMa,token) => {

try {
  const formData = new FormData();
  files.map(file => {
    formData.append("files",file)
  })
  formData.append("spMa",spMa)
  const res = await axiosInstance.post("http://51.79.167.161:8081:8081/images/fileSystem",formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
} catch (error) {
  console.log(error);
  
}
}
// delete image product =============================================================
export const deleteImages = async (names,spMa,token) => {
  try {
    await axiosInstance.delete(`http://51.79.167.161:8081:8081/image/fileSystems/${spMa}`, {
      data: names,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    console.log(error)
  }
}