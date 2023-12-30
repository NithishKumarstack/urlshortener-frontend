import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./sign.css";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://urlshortener-backend-7eex.onrender.com/api/users";
      const { data: res } = await axios.post(url, data);
      setMsg(res.message);
      toast.success("Check your email for verification.");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div id="no" className=" d-flex justify-content-center align-items-center bg-white p-3 rounded mt-30%">
      <form onSubmit={handleSubmit}>
      <div className='d-flex flex-column justify-content-around align-items-center'>
      <h1>Create Account</h1>
        <input
          className="input mb-3 me-2"
          type="text"
          placeholder="First Name"
          name="firstName"
          onChange={handleChange}
          value={data.firstName}
          required
        />
        <input
          className="input mb-3 me-2"
          type="text"
          placeholder="Last Name"
          name="lastName"
          onChange={handleChange}
          value={data.lastName}
          required
        />
        <input
          type="email"
          className="input mb-3 me-2"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={data.email}
          required
        />
        <input
          className="input mb-3 me-2"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={data.password}
          required
        />
        {error && <div className="error_msg">{error}</div>}
        {msg && <div className="success_msg">{msg}</div>}
        <button className="me-2 ms-2 p-1" type="submit">Sign Up</button>
        <hr></hr>
        <div className='d-flex justify-content-center align-items-center'>
        <Link to="/login"><button className="btn btn-success ms-2 me-2">Login</button></Link>
        </div>
      </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
