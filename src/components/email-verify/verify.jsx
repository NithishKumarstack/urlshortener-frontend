import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import './verify.css';

const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(true);
    const { id, token } = useParams();

    const verifyEmailUrl = async () => {
        try {
            const url = `https://urlshortener-backend-7eex.onrender.com/api/users/${id}/verify/${token}`;
            const { data } = await axios.get(url);
            console.log(data);
            setValidUrl(true);
        } catch (error) {
            // console.log(error);
            setValidUrl(false);
        }
    };
    verifyEmailUrl();

    return (
        <div id='yes' className="d-flex justify-content-center align-items-center bg-white p-3 rounded mt-30%">
            <div id='this' className="p-3">
                <div className="d-flex justify-content-around">
                    <h1>{validUrl ? "Email verified successfully" : "Invalid link"}</h1>
                    <h1>Now Login</h1>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <Link to='/login'><button className="btn btn-success">Login</button></Link>
                </div>
            </div>
        </div>
    );
};

export default EmailVerify;
