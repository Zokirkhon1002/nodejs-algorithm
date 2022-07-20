// @ts-nocheck
import React, { useState } from "react";
import axios from "../../api/axios";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({});

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    let newUser = { username, password };
    // console.log(newUser);

    axios
      .post(`/admin`, newUser)
      .then((res) => {
        // console.log(res.data);
        setMessage(res.data);
        setTimeout(() => {
          history.push("/admin/auth");
          setMessage({});
        }, 2000);
      })
      .catch(({ response: err }) => {
        // console.log("false");
        // console.log(err.data);
        setMessage(err.data);
      });
  };

  return (
    <div>
      <h1>Admin Sign Up</h1>
      <h2>{message.state ? message.msg : ""}</h2>
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

export default SignUp;
