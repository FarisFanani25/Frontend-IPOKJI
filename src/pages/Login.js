import React from "react";
import CustomInput from "../components/CustomInput";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Login to your account to continue.</p>
        <form action="">
          <CustomInput
            type="text"
            label="Email Address"
            id="email"
            name="email"
            onChange={() => {}}
            onBlur={() => {}}
            value=""
          />
          <div className="error mt-2"></div>
          <CustomInput
            type="password"
            label="Password"
            id="password"
            name="password"
            onChange={() => {}}
            onBlur={() => {}}
            value=""
          />
          <div className="error mt-2"></div>
          <div className="mb-3 text-end">
            <Link to="forgot-password" className="">
              Forgot Password?
            </Link>
          </div>
          <Link to="/admin" className="text-decoration-none">
            <button
              className="border-0 px-3 py-2 text-white fw-bold w-100 text-center fs-5"
              style={{ background: "#ffd333" }}
              type="button"
            >
              Login
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
