import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from "./components/sign/sign";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import EmailVerify from "./components/email-verify/verify";
import Otp from "./components/forget-otp/otp";
import Login from "./components/log/login";
import Main from "./components/dashboard/main";
import Reset from "./components/pass-reset/reset";
function App() {
  const user = localStorage.getItem("token");
  return (
     <BrowserRouter>
     <Routes>
     {!user ? (
  <Route path="/*" element={<Navigate replace to="/login" />} />
) : (
  <Route path="/" exact element={<Main />} />
)}
     <Route path="/signin" element={<Signup/>}></Route>
     <Route path="api/users/:id/verify/:token" element={<EmailVerify />} />
     <Route path="/" element={<Navigate replace to="/login" />} />
     <Route path="/login" element={<Login/>}></Route>
     <Route path="/otp" element={<Otp/>}></Route>
     <Route path='/reset' element={<Reset/>}></Route>
     </Routes>
     </BrowserRouter>
  )
};

export default App;