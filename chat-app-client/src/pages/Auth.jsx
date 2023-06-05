import "../styles/Auth/index.scss";
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import AnimatedInput from "../components/AnimatedInput";
import appLogo from "../assets/images/chat-app-logo-1.jpg";
import RegularButton from "../components/RegularButton";
import { emailRegex, moNumRegex, snowFlakeFlowers } from "../configs/constants";
import { useForm } from "react-hook-form";
import { loginUser, registerUser } from "../store/user/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Auth() {
  const intiValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phnNo: "",
    profilePic: "",
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

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  console.log({ user });

  useEffect(() => {
    if (user.length) {
      // Asynchronous function to set a value in localStorage
      const setItemInLocalStorage = (key, value) => {
        return new Promise((resolve) => {
          localStorage.setItem(key, value);
          resolve();
        });
      };
      // Set the value in localStorage
      setItemInLocalStorage("accessToken", user?.accessToken).then(() => {
        navigate("/chat");
      });
    }

    return () => {};
  }, [user]);

  const handleLogin = (loginData) => {
    const { email, password, ...rest } = loginData;
    dispatch(loginUser({ email, password }));
    // navigate("/chat");
    // reset();
  };
  const handleSignUp = (registerData) => {
    const formData = new FormData();
    formData.append("firstName", registerData?.firstName);
    formData.append("lastName", registerData?.lastName);
    formData.append("password", registerData?.password);
    formData.append("email", registerData?.email);
    formData.append("phnNo", registerData?.phnNo);
    formData.append("file", registerData?.profilePic?.[0]); // Assuming you have a file object
    dispatch(registerUser(formData));
    reset();
    setIslogin(!islogin);
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
                      setIslogin(!islogin);
                      reset();
                    }}
                  >
                    Sign Up
                  </span>
                </div>
              </form>
            </div>
          </div>
          {!islogin && (
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
                      placeholder="First Name"
                      name="firstName"
                      {...register("firstName", {
                        required: true,
                        minLength: 3,
                      })}
                    />
                  </AnimatedInput>
                  {errors.firstName?.type === "required" && (
                    <span className="error-message">
                      First name is required.
                    </span>
                  )}
                  {errors.firstName?.type === "minLength" && (
                    <span className="error-message">
                      Please enter minimun 3 charecter.
                    </span>
                  )}
                  <AnimatedInput>
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      {...register("lastName", {
                        required: true,
                        minLength: 3,
                      })}
                    />
                  </AnimatedInput>
                  {errors.lastName?.type === "required" && (
                    <span className="error-message">
                      Last name is required.
                    </span>
                  )}
                  {errors.lastName?.type === "minLength" && (
                    <span className="error-message">
                      Please enter minimun 3 charecter.
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
                      name="phnNo"
                      type="text"
                      placeholder="Mobile number"
                      {...register("phnNo", {
                        pattern: moNumRegex,
                        required: true,
                      })}
                    />
                  </AnimatedInput>
                  {errors.phnNo?.type === "required" && (
                    <span className="error-message">
                      Mobile number is required.
                    </span>
                  )}
                  {errors.phnNo?.type === "pattern" && (
                    <span className="error-message">
                      Please enter a valid mobile number address.
                    </span>
                  )}
                  <AnimatedInput>
                    <input
                      name="password"
                      type="password"
                      placeholder="Password"
                      {...register("password", {
                        required: true,
                        minLength: 3,
                      })}
                    />
                  </AnimatedInput>
                  {errors.password?.type === "required" && (
                    <span className="error-message">Password is required.</span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="error-message">
                      Please enter minimun 3 charecter password.
                    </span>
                  )}
                  <AnimatedInput>
                    <input
                      name="profilePic"
                      type="file"
                      multiple={false}
                      placeholder="Profile picture"
                      {...register("profilePic", { required: true })}
                    />
                  </AnimatedInput>
                  {errors.profilePic?.type === "required" && (
                    <span className="error-message">
                      Profile picture is required.
                    </span>
                  )}
                  <div className="action-button">
                    <RegularButton type="submit" label="Sign Up" />
                  </div>
                  <div className="login-footer">
                    <span
                      className="regular-text"
                      onClick={() => {
                        setIslogin(!islogin);
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
