import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usercontext } from "../context/Usercontext";
import image from "../assets/loginbg.jpg"; 
import { MdError } from "react-icons/md"; 
import { validateInputs } from "../utils/validation";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

export const Login = () => {
  const navigate = useNavigate();
  const { setUserinfo } = useContext(usercontext);
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const login = async () => {
    const validationError = validateInputs("nousername",email,password);
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        setError("Failed to login please check your details")
        throw new Error("Failed to sign in");
      }

      const data = await response.json();
      setUserinfo(data.user);
      setpassword("");
      setemail("");
      localStorage.setItem("token", data.token);
      navigate("/eventdashboard");
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div className="h-screen bg-cover bg-center " style={{ backgroundImage: `url(${image})` }}>
      <div className="flex justify-center items-center h-full bg-black bg-opacity-50">
        <div className="p-8 bg-white m-5 rounded-lg shadow-lg w-full sm:w-96">
          <h1 className="text-center text-3xl font-bold mb-4">Login</h1>
          
          {error && (
            <div className="flex items-center p-2 mb-4 text-red-600 bg-red-100 border border-red-300 rounded">
              <MdError className="mr-2" /> 
              <span>{error}</span>
            </div>
          )}

          <input
            className="block w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            className="block w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button
            className="w-full p-3 bg-blue-500 text-white rounded mb-3 hover:bg-blue-600 transition"
            onClick={login}
          >
            Login
          </button>

          <div className="text-center mt-4">
            <p>
              Don't have an account?{" "}
              <a
                className="text-blue-500 underline hover:text-blue-600"
                href="/"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
