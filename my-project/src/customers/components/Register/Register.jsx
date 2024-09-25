import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCustomer } from "~/customers/service/customerService.js";
import { getAllCustomer } from "../../service/customerService";
function Register() {
  const [kh_ten, setKh_ten] = useState("");
  const [kh_userName, setUserName] = useState("");
  const [kh_passWord, setPassword] = useState("");
  const [cfPassword, setCfPassword] = useState("");
  const [kh_email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    kh_userName: "",
    kh_passWord: "",
    cfPassword: "",
    kh_email: "",
    kh_ten: "",
  });

  const [listCustomer, setListCustomer] = useState([]);

  const navigator = useNavigate();
  // Handle Input
  const handleInputFullName = (e) => {
    const fullName = e.target.value;
    setKh_ten(fullName);
  };
  const handleInputUserName = (e) => {
    setUserName(e.target.value.trim());
  };
  const handleInputPassword = (e) => {
    setPassword(e.target.value.trim());
  };

  const handleInputCfPassword = (e) => {
    setCfPassword(e.target.value.trim());
  };

  const handleInputEmail = (e) => {
    setEmail(e.target.value.trim());
  };

  //=============================================
  // Get all customerr
  useEffect(() => {
    listCustomers();
  }, []);

  const listCustomers = async () => {
    try {
      const response = await getAllCustomer();
      setListCustomer(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  // ===============================================
  // Validation
  const validation = () => {
    let valid = true;
    const errorCopy = { ...errors };
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let email = false;
    if (kh_email) {
      errorCopy.kh_email = "";
      if (emailRegex.test(kh_email)) {
        errorCopy.kh_email = "";
      } else {
        errorCopy.kh_email = "Email không hợp lệ";
        valid = false;
      }
      listCustomer.map((customer) => {
        if (kh_email === customer.kh_email) {
          errorCopy.kh_email = "Email đã tồn tại";
          valid = false;
        }
      });
    } else {
      errorCopy.kh_email = "Vui lòng nhập email";
      valid = false;
    }
    if (kh_userName) {
      errorCopy.kh_userName = "";
      listCustomer.map((customer) => {
        if (customer.kh_userName === kh_userName) {
          errorCopy.kh_userName = "Username đã tồn tại";
          valid = false;
        }
      });
    } else {
      errorCopy.kh_userName = "Vui lòng nhập username";
      valid = false;
    }
    if (kh_passWord) {
      errorCopy.kh_passWord = "";
    } else {
      errorCopy.kh_passWord = "Vui lòng nhập mật khẩu";
      valid = false;
    }
    if (cfPassword) {
      errorCopy.cfPassword = "";
      if (kh_passWord === cfPassword) {
        errorCopy.cfPassword = "";
      } else {
        errorCopy.cfPassword = "Mật khẩu không khớp";
        valid = false;
      }
    } else {
      errorCopy.cfPassword = "Vui lòng xác thực lại mật khẩu";
      valid = false;
    }

    if (kh_ten) {
      errorCopy.kh_ten = "";
    } else {
      errorCopy.kh_ten = "Vui lòng nhập tên";
      valid = false;
    }
    setErrors(errorCopy);
    return valid;
  };
  // ===============================================
  // Create customer
  const createCustomerHandle = async (e) => {
    e.preventDefault();
    if (validation()) {
      const fullName = kh_ten
        .trim()
        .toLowerCase()
        .split(/\s+/) // Duyệt qua nhiều khoảng trắng
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setKh_ten(fullName);
      const customer = { kh_userName, kh_passWord, kh_ten, kh_email };
      navigator("/login");
      try {
        const response = await createCustomer(customer);
        console.log("Customer created successfully:", response.data);
      } catch (error) {
        console.error("There was an error creating the customer:", error);
      }
    }
    n;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 max-w">
          Or
          <a
            href="http://localhost:5173/login"
            className="ml-1 font-medium text-blue-600 hover:text-blue-500"
          >
            login to your account
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Full name
              </label>
              <div className="mt-1">
                <input
                  id="fullname"
                  name="fullname"
                  type="fullname"
                  autoComplete="fullname"
                  value={kh_ten}
                  required
                  className={`form-control border${
                    errors.kh_ten
                      ? "appearance-none rounded-md relative block w-full px-3 py-2 border border-red-500 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      : "appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  }`}
                  placeholder="Enter your full name"
                  onChange={handleInputFullName}
                />
                {errors.kh_ten && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.kh_ten}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  className={`form-control border${
                    errors.kh_userName
                      ? "appearance-none rounded-md relative block w-full px-3 py-2 border border-red-500 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      : "appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  }`}
                  placeholder="Enter your username"
                  onChange={handleInputUserName}
                />
                {errors.kh_userName && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.kh_userName}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`form-control border${
                    errors.kh_passWord
                      ? "appearance-none rounded-md relative block w-full px-3 py-2 border border-red-500 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      : "appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  }`}
                  placeholder="Enter your password"
                  onChange={handleInputPassword}
                />
                {errors.kh_passWord && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.kh_passWord}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="cfpassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="cfpassword"
                  name="cfpassword"
                  type="password"
                  autoComplete="cfpassword"
                  required
                  className={`form-control border${
                    errors.cfPassword
                      ? "appearance-none rounded-md relative block w-full px-3 py-2 border border-red-500 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      : "appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  }`}
                  placeholder="Enter your password"
                  onChange={handleInputCfPassword}
                />
                {errors.cfPassword && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.cfPassword}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`form-control border${
                    errors.email
                      ? "appearance-none rounded-md relative block w-full px-3 py-2 border border-red-500 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      : "appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  }`}
                  placeholder="Enter your Email"
                  onChange={handleInputEmail}
                />
                {errors.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </div>
                )}
              </div>
            </div>

            <div>
              <button
                onClick={createCustomerHandle}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-100 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div>
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <img
                    className="h-5 w-5"
                    src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                    alt=""
                  />
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <img
                    className="h-5 w-5"
                    src="https://www.svgrepo.com/show/513008/twitter-154.svg"
                    alt=""
                  />
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <img
                    className="h-6 w-6"
                    src="https://www.svgrepo.com/show/506498/google.svg"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
