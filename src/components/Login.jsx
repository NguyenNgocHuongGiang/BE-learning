import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { loginApi, loginFacebookApi } from "../utils/fetchFromAPI";
import { toast } from "react-toastify";
import ReactFacebookLogin from "react-facebook-login";


const Login = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);
  const navigate = useNavigate()

  const { id } = useParams();

  useEffect(() => {

  }, []);

  const handleLogin = () => {
    const email = document.getElementById("email").value
    const pass = document.getElementById("pass").value
    const data = {email,pass}
    loginApi(data)
    .then((result) => {
      toast.success(result.message)   
      localStorage.setItem("LOGIN_USER",result.data)   
      navigate("/")
    })
    .catch((error) => toast.error(error.response.data.message))
  }
  return <div className="p-5 " style={{ minHeight: "100vh" }}>
    <div className=" d-flex justify-content-center">
      <form className="row g-3 text-white">
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" />
        </div>

        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Password</label>
          <input className="form-control" id="pass" />
        </div>
        <div className="col-12">
          <button type="button" className="btn btn-primary" onClick={handleLogin} >Login</button>
          <Link className="text-primary" to="/forgot-password">Forgot password</Link>
        </div>
        <ReactFacebookLogin appId="944784207482425" fields="name, email, picture" callback={(response) => {
          let {id, email, name} = response
          loginFacebookApi({id, email, name})
          .then((result) => {
            toast.success(result.message)   
            localStorage.setItem("LOGIN_USER",result.data)   
            navigate("/")
          })
          .catch(error => toast.error(error.response.data.message))
        }} />
      </form>
    </div>
  </div>
};

export default Login;
