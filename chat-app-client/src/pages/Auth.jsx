import "./Auth.scss";
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import AnimatedInput from "../components/AnimatedInput";
import appLogo from "../assets/images/chat-app-logo-1.jpg";
import RegularButton from "../components/RegularButton";
import { emailRegex, snowFlakeFlowers } from "../configs/constants";
import { useForm } from "react-hook-form";
import { loginUser, registerUser } from "../store/user/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Auth() {
  const intiValue = {
    userName: "",
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: intiValue,
  });
  const [islogin, setIslogin] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogin = (loginData) => {
    const { userName, ...rest } = loginData;
    console.log({loginData})
    dispatch(loginUser(rest));
    user?.accessToken && navigate("/chat");
  };
  const handleSignUp = (registerData) => {
    dispatch(registerUser(registerData));
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="login-container align-center">
        <div className="auth-cards align-center">
          <div
            className={`form-container ${
              islogin ? "slide-up-down" : "slide-down"
            }`}
          >
            <div className="hr-center">
              <img src={appLogo} alt="logo" />
            </div>
            <div>
              <span className="form-heading title">Login</span>
              <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
                <AnimatedInput>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                      pattern: emailRegex,
                      required: true,
                    })}
                  />
                </AnimatedInput>
                {errors.email?.type === "required" && (
                  <span className="error-message">Email is required.</span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="error-message">
                    Please enter a valid Email address.
                  </span>
                )}
                <AnimatedInput>
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                  />
                </AnimatedInput>
                {errors.password?.type === "required" && (
                  <span className="error-message">Password is required.</span>
                )}
                <div className="action-button">
                  <RegularButton type="submit" label="Login" />
                </div>
                <div className="login-footer">
                  <span className="regular-text">forgot Password</span>
                  <span
                    className="regular-text"
                    onClick={() => {
                      setIsMounted(true);
                      setIslogin(false);
                      reset();
                    }}
                  >
                    Sign Up
                  </span>
                </div>
              </form>
            </div>
          </div>
          {isMounted && (
            <div
              className={`form-container ${
                islogin ? "slide-down" : "slide-up-down"
              }`}
            >
              <div className="hr-center">
                <img src={appLogo} alt="logo" />
              </div>
              <div>
                <span className="form-heading title">Sign Up</span>
                <form
                  className="login-form"
                  onSubmit={handleSubmit(handleSignUp)}
                >
                  <AnimatedInput>
                    <input
                      type="text"
                      placeholder="Name"
                      name="userName"
                      {...register("userName", { required: true })}
                    />
                  </AnimatedInput>
                  {errors.userName?.type === "required" && (
                    <span className="error-message">
                      User name is required.
                    </span>
                  )}
                  <AnimatedInput>
                    <input
                      name="email"
                      type="email"
                      placeholder="Email"
                      {...register("email", {
                        pattern: emailRegex,
                        required: true,
                      })}
                    />
                  </AnimatedInput>
                  {errors.email?.type === "required" && (
                    <span className="error-message">Email is required.</span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="error-message">
                      Please enter a valid Email address.
                    </span>
                  )}
                  <AnimatedInput>
                    <input
                      name="password"
                      type="password"
                      placeholder="Password"
                      {...register("password", { required: true })}
                    />
                  </AnimatedInput>
                  {errors.password?.type === "required" && (
                    <span className="error-message">Password is required.</span>
                  )}
                  <div className="action-button">
                    <RegularButton type="submit" label="Sign Up" />
                  </div>
                  <div className="login-footer">
                    <span
                      className="regular-text"
                      onClick={() => {
                        setIslogin(true);
                        reset();
                      }}
                    >
                      Login
                    </span>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="snowflakes" aria-hidden="true">
        {snowFlakeFlowers.map((snowflakeFlower, index) => (
          <div key={index} className="snowflake-flower">
            {snowflakeFlower}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Auth;
