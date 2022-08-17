import React, { useState } from "react";
// import { Link } from 'react-router-dom';
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [loginErr, setLoginErr] = useState("");

  console.log(email, password);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("users/login", {
          email: email,
          password: password,
        });
      } catch (error) {
        setLoginErr(error.response.data.msg);
      }
    };

  return (
    <div>
      <h1>Login page</h1>
      <form>
        <label>Email</label>
        <input
          type={email}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        ></input>
        <label>Password</label>
        <input
          type={password}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
