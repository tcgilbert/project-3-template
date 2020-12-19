// Imports
import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { Redirect } from "react-router-dom";
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };

    axios
      .post(`${REACT_APP_SERVER_URL}/api/users/login`, userData)
      .then((response) => {
        const { token } = response.data;
        // Save token to localStorage
        localStorage.setItem("jwtToken", token);
        // Set token to auth header
        setAuthToken(token);
        // Decode token to get the user data
        const decoded = jwt_decode(token);
        // Set current user
        props.nowCurrentUser(decoded);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (props.user) return <Redirect to="/profile"/>;

  return (
    <div>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
