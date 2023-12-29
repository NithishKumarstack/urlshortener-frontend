import React from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function Otp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://urlshortener-backend-7eex.onrender.com/resetpassword', { email: email })
            .then(result => {console.log(result); navigate('/reset');})
            .catch(error => {console.log(error);navigate('/signin');});
    };
    return (
        <div id='yeah' className='d-flex justify-content-center align-items-center bg-white p-3 rounded mt-30%'>
            <form onSubmit={handleSubmit}>
                <h1 className='d-flex'>Generate A OTP</h1>
                <input
                    type="email"
                    className="input mb-3 me-2"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button className="ms-2 p-1 mt-3" type="submit">Get OTP</button>
            </form>
        </div>
    );
};
export default Otp;