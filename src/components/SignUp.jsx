import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { registerApi } from "../utils/fetchFromAPI";
import { toast } from "react-toastify";

const SignUp = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);
  
  const { id } = useParams();

  useEffect(() => {

  }, []);
  const navigate = useNavigate()

  const handleRegister = () => {
    const fullName = document.getElementById("fullName").value
    const email = document.getElementById("email").value
    const pass = document.getElementById("pass").value
    const data = {fullName, email,pass}
    registerApi(data)
    .then((result) => {
      toast.success(result.message)      
      navigate("/login")
    })
    .catch((error) => toast.error(error.response.data.message))
  }

  return <div className="p-5 " style={{ minHeight: "100vh" }}>
    <div className=" d-flex justify-content-center">
      <form className="row g-3 text-white">

        {/* fullname  */}
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Full name</label>
          <input className="form-control" id="fullName" />
        </div>

        {/* email  */}
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" />
        </div>

        {/* pass  */}
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Password</label>
          <input className="form-control" id="pass" />
        </div>

        {/* button  */}
        <div className="col-12">
          <button type="button" className="btn btn-primary" onClick={handleRegister} >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>
};

export default SignUp;
