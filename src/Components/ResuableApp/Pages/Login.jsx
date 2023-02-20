import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import FormInput from "../ReusableComponents/FormInput/FormInput";
import "../main.css";

const Login = () => {
  const history = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: ""
  });

  // input array to be sent to resuable input component
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    }
  ];

  // setting entered username and password to variable
  const handleSubmit = (e) => {
    e.preventDefault();
    let uname = e.target.username.value;
    let pass = e.target.password.value;

    // comparing entered username and password with the ones stored in localstorage
    const getUserArr = localStorage.getItem('loginuser');
    if(getUserArr && getUserArr.length){
      const userData = JSON.parse(getUserArr);
      console.log('userData', userData)
      const userLogin = userData.filter((ele,index)=>{
        return ele.values.username === uname && ele.values.password === pass
      });
      if(userLogin.length === 0){
        alert('Invalid Details');
      }else{
        localStorage.setItem('user_login',JSON.stringify(getUserArr))
        history('/dashboard')
      }
    }
  };

  // onchange handlers for username and password input fields
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  
  return (
    <div className="app">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Log In</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Log In</button>
        <p className="bottom-text">New User?<NavLink to="/">Create an account</NavLink></p>
      </form>
    </div>
  )
}
export default Login;