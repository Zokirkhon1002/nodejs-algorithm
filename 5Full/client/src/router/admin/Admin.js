// @ts-nocheck
import React, { useState } from "react";
import axios from "../../api/axios";
import { useHistory } from "react-router-dom";

const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    let newUser = { username, password };
    // console.log(newUser);

    axios
      .post(`/admin/auth`, newUser)
      .then((res) => {
        // console.log("ok");
        // console.log(res.data);
        setMessage(res.data);
        setErrorMessage(false);
        let token = res.data["auth-token"];
        if (token) {
          localStorage.setItem("auth-token", token);
        }
        setTimeout(() => {
          history.push("/");
          setMessage({});
        }, 1000);
      })
      .catch(({ response: err }) => {
        // console.log("false");
        setMessage(err.data);
        setErrorMessage(true);
        // console.log(err.data);
      });
  };

  const handleSignInOrOut = () => {
    history.push("/admin");
  };

  return (
    <div>
      <button onClick={handleSignInOrOut}>Sign Up</button>
      <h1>Admin Sign In</h1>
      <h2 style={{ backgroundColor: errorMessage ? "red" : "green" }}>
        {message ? message.msg : ""}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          required
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Admin;
