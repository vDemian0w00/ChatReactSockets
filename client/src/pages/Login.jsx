import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { loginUser } from "../API/ApiRoutes.js";
import LogoReact from "../assets/react.svg";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #f5f5f5;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      width: 5rem;
      margin: 1em;
    }
    h1 {
      color: black;
    }
  }
  form {
    display: flex;
    gap: 2rem;
    border-radius: 2rem;
    padding: 3rem 5rem;
    flex-direction: column;
    background-color: rgb(255, 255, 255);
    input {
      padding: 1rem;
      border-radius: 1rem;
      transition: all 0.3s ease;
      background-color: transparent;
      border: 1px solid #ccc;
      color: #333;
      width: 100%;
      font-size: 0.8rem;
      &:focus {
        background-color: rgb(199, 222, 235);
        border: 1px solid #333;
        outline: none;
        font-size: 1rem;
      }
    }
    button {
      padding: 1rem;
      background-color: rgba(134, 169, 230, 0.817);
      border-radius: 1em;
      cursor: pointer;
      border: none;
      font-size: 18px;
      color: white;
      transition: all 0.3s ease;
      &:hover {
        font-size: 22px;
      }
    }
  }
  .foot {
    font-size: 2rem;
    a {
      color: #333;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

const Login = () => {

  
  const nav = useNavigate();
  
  useEffect(()=>{
    if(localStorage.getItem("user-info")){
      nav("/app")
    }
  }, [])

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const opt = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  const handleValidation = () => {
    const { username, email, password } = values;
    if (username === "" || email === "" || password === "") {
      toast.error("Please fill all the fields", opt);
      return false;
    } else if (password.length < 6) {
      toast.error("Password must be atleast 6 characters", opt);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = handleValidation();
    if (validate) {
      const {data} = await loginUser(values).catch((err) => {
        console.log(err);
        toast.error("User Registration Failed", opt);
      });
      if(data.success){
        localStorage.setItem("user-info", JSON.stringify(data.user));
        nav("/app");
      }else {
        toast.error(data.message, opt);
      }
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={LogoReact} alt="" srcSet="" />
            <h1>Chat Sockets</h1>
          </div>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="Password"
          />
          <button type="submit">Log in</button>
        </form>
        <span id="foot">
          You don't have an account? <Link to="/">Sign in</Link>
        </span>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

export default Login;
