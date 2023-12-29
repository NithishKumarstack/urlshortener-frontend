import React, { useState } from 'react';
import './reset.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Reset() {
    const [token, setOTP] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setREPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (password !== repassword) {
        alert('Passwords do not match');
        return;
      }
      try {
        const response = await axios.post(`http://localhost:5000/${token}`, {password: password});
        console.log(response);
        if (response.status === 200) {alert('Password reset successfully!');navigate('/login');
        } else {
          alert(`Password reset failed: ${response.data.message}`);
        }
      } catch (error) {
        console.error('Error during password reset:', error);
        alert('An error occurred during password reset. Please try again.....');
      }
    };
  return (
    <div id='yeah' className='d-flex justify-content-center align-items-center bg-white p-3 rounded mt-30%'>
    <form onSubmit={handleSubmit}>
    <h1 className='d-flex'>Reset A PassWord</h1>
    <input
            type="text"
            className="input mb-3 me-2"
            placeholder="OTP"
            name="otp"
            onChange={(e) => setOTP(e.target.value)}
            required
        />
    <input
            type="password"
            className="input mb-3 me-2"
            placeholder="Enter A Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
        />
    <input
            type="password"
            className="input mb-3 me-2"
            placeholder="Enter A Password"
            name="password"
            onChange={(e) => setREPassword(e.target.value)}
            required
        />    
    <button className="ms-2 p-1 mt-3" type="submit">Reset Password</button>
    </form>
</div>
  )
}

export default Reset;