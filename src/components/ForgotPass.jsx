import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassApi } from "../utils/fetchFromAPI";
export default function ForgotPass() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  return (
    <div className="p-5" style={{ minHeight: "1000vh" }}>
      <div className=" d-flex justify-content-center">
        {step == 0 && (
          <form className="row g-3 text-white">
            <div className="col-md-12">
              <label htmlFor="inputEmail4" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={(e) => setEmail(e.target.value)} // Cập nhật giá trị state khi người dù
              />
            </div>

            <div className="col-12">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  //   let email = document.getElementById("email");
                  forgotPassApi({email})
                    .then((result) => {
                      toast.success(result.message);
                      setStep(1);
                    })
                    .catch((err) => {
                      toast.error("error");
                    });
                }}
              >
                Next
              </button>
            </div>
          </form>
        )}

        {step == 1 && (
          <form className="row 9-3 text-white">
            <div className="col-md-12">
              <label htmlFor="inputEmail4" className="form-label">
                {" "}
                Nhập CODE
              </label>
              <input className=" form-control" id="code" />
              <label htmlfor="inputEmail4" className="form-label">
                Đổi mật khẩu
              </label>
              <input className="form-control" id="pass" />
            </div>
            <div className="col-12">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  let code = document.querySelector("#code").value;
                  navigate("/login");
                }}
              >
                Next
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
