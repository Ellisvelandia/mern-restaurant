import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/useSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const userData = useSelector((state) => state);
  console.log(userData);

  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch("https://auth-show.onrender.com/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataRes = await fetchData.json();
      toast(dataRes.message);

      if (dataRes.alert) {
        dispatch(loginRedux(dataRes));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }

    } else {
      alert("Password enter required fields");
    }
  };

  return (
    <div className="p-3 md:p-4 flex flex-col w-full">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
        <div className="w-28 overflow-auto rounded-full drop-shadow-md shadow-md m-auto">
          <img
            src="https://cdn.pixabay.com/animation/2022/12/01/17/03/17-03-11-60_512.gif"
            alt="logo gifs login"
          />
        </div>
        <form action="" className="w-full py-3" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full mb-2 bg-slate-200 px-2 py-1 rounded mt-1 focus-within:outline-blue-300"
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 bg-slate-200 mt-1 mb-2 focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full bg-slate-200 border-none outline-none"
              value={data.password}
              onChange={handleOnChange}
            />
            <span className="flex text-xl" onClick={handleShowPassword}>
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
          </div>

          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="max-w-[150px] w-full bg-blue-800 hover:bg-blue-600 cursor-pointer text-white m-auto text-base text-center py-2 rounded-full mt-4"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-left text-sm mt-2">
          Don't have account ?
          <Link to="/signup" className="text-blue-800">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
