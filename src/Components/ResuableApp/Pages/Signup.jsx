import React, { useState } from "react";
import "../main.css";
import FormInput from "../ReusableComponents/FormInput/FormInput";
import { NavLink, useNavigate } from "react-router-dom";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from "@date-io/moment";
import moment from "moment";
import PhoneInput from 'react-phone-number-input/input';

const Signup = (props) => {
  const history = useNavigate();
  const [gender, setGender] = useState('female');
  const [startDate, setStartDate] = useState(moment());
  const [inputValue, setInputValue] = useState(moment().format("YYYY-MM-DD"));
  const [phoneNumber, setPhoneNumber] = useState('');


  // setting gender selected by user to a variable
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  // setting phone number entered by user to a variable
  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value)
  }

  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const inputs = [
    {
      id: 1,
      name: "firstname",
      type: "text",
      placeholder: "First Name",
      errorMessage:
        "First Name should be 3-16 characters and shouldn't include any special character!",
      label: "First Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "lastname",
      type: "text",
      placeholder: "Last Name",
      errorMessage:
        "Last Name should be 3-16 characters and shouldn't include any special character!",
      label: "Last Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 3,
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
      id: 4,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 6,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    }
  ];

  // handler to create profile of a user or to add a user
  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.action === "edituser") {
      handleEdit();
    } else {
      console.log('add')
      const accountarray = localStorage.getItem('loginuser') && localStorage.getItem('loginuser').length > 0 ? JSON.parse(localStorage.getItem('loginuser')) : [];
      localStorage.setItem('loginuser', JSON.stringify([...accountarray, { values, gender, startDate }]));
      if (props.action === "adduser") {
        history('/dashboard')
        window.location.reload();
      } else {
        history('/login')
      }
    }
  };

  // setting user entered value to respective variables
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // handler to edit the information of a particular user
  const handleEdit = () => {
    console.log('edit user')
    let user = localStorage.getItem('loginuser') && localStorage.getItem('loginuser').length > 0 ? JSON.parse(localStorage.getItem('loginuser')) : [];
    const _users = user.map((item, userIndex) => {
      if (userIndex == localStorage.getItem('editIndex')) {
        return { values, gender, startDate };
      } else {
        return item;
      }
    })
    localStorage.setItem('loginuser', JSON.stringify(_users))
    window.location.reload();
  }

  // hanlder to set the selected date into a varibale
  const onDateChange = (date, value) => {
    setStartDate(value);
    setInputValue(value);
  };

  const dateFormatter = str => {
    return str;
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit} className="signup-form">
        <h1>{props.action === "adduser" ? 'Add User' : props.action === 'edituser' ? 'Edit User Data' : 'Sign Up'}</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <label style={{ float: 'left' }}>Phone Number</label>
        <PhoneInput
          placeholder="Enter phone number"
          country="SG"
          international
          pattern="[6|8|9]\d{7}|\+65[6|8|9]\d{7}|\+65\s[6|8|9]\d{7}"
          withCountryCallingCode
          style={{ width: "-webkit-fill-available" }}
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        <label style={{ float: 'left' }}>Joining Date</label>
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
          <KeyboardDatePicker
            autoOk={true}
            showTodayButton={true}
            value={startDate}
            format="YYYY-MM-DD"
            inputValue={inputValue}
            onChange={onDateChange}
            rifmFormatter={dateFormatter}
            disableFuture
            style={{ border: '1px solid #808080', padding: 8, borderRadius: 5, marginTop: 8, width: "-webkit-fill-available" }}
          />
        </MuiPickersUtilsProvider>
        <form style={{ padding: 0 }} value={gender} onChange={handleGenderChange}>
          <label style={{ marginTop: 10, float: 'left' }}>Gender</label><br /><br />
          <div style={{ textAlign: 'left' }}>
            <input type="radio" id="age1" name="gender" value="female" />
            <label style={{ marginLeft: 5 }} for="gender1">Female</label><br />
            <input type="radio" id="age2" name="gender" value="male" />
            <label style={{ marginLeft: 5 }} for="gender2">Male</label><br />
            <input type="radio" id="age3" name="gender" value="others" />
            <label style={{ marginLeft: 5 }} for="gender3">Others</label>
          </div>
        </form>
        <button>Submit</button>
        {
          props.action !== "adduser" && props.action !== "edituser" &&
          <p className="bottom-text">Already have an account?<NavLink to='/login'>Sign In</NavLink></p>
        }
      </form>
    </div>
  );
};

export default Signup;