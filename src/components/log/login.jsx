import './login.css';
import React from 'react';
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
        const [data, setData] = useState({ email: "", password: "" });
        const [error, setError] = useState("");
        const navigate = useNavigate();
    
        const handleChange = ({ currentTarget: input }) => {
            setData({ ...data, [input.name]: input.value });
        };
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const url = "https://urlshortener-backend-7eex.onrender.com/login/users";
                const { data: res } = await axios.post(url, data);
                localStorage.setItem("token", res.data);
                navigate('/');
            } catch (error) {
                console.log(error);
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    setError(error.response.data.message);
                }
            }
        };
    return(
       <div id='yeah' className='d-flex justify-content-center align-items-center bg-white p-3 rounded mt-30%'>
            <form onSubmit={handleSubmit}>
            <div className='d-flex flex-column justify-content-around align-items-center'>
            <h1 className='d-flex '>Login Your Account</h1>
            <input
                    type="email"
                    className="input mb-2"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={data.email}
                    required
                />
            <input
                    className="input mb-2"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    required
                />
             {error && <div className="error_msg">{error}</div>}
            <button className="p-1" type="submit">Login</button>
            </div>
            <hr></hr>
            <div className='d-flex justify-content-around align-items-center'>
            <Link to='/signin'><button className='btn btn-primary'>SignIN</button></Link>
            <Link to='/otp'><button className='btn btn-primary'>ForgetPassword</button></Link>
            </div>
            </form>
       </div>
    )
};

export default Login;