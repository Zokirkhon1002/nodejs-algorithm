// @ts-nocheck
import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./router/home/Home";
import Admin from "./router/admin/Admin";
import SignUp from "./router/admin/SignUp";

function App() {
  const [senseForToken, setSenseForToken] = useState(true);

  return (
    <div className="App">
      <Router>
        <nav>
          <NavLink to="/">Home</NavLink>
          <br />
          <NavLink to="/admin/auth">Admin SignIn</NavLink>
          <br />
          <NavLink to="/admin">SignUp</NavLink>
        </nav>
        <Switch>
          <Route
            exact
            path="/"
            component={() => <Home senseForToken={senseForToken} />}
          />
          <Route exact path="/admin/auth" component={Admin} />
          <Route
            exact
            path="/admin"
            component={() => <SignUp setSenseForToken={setSenseForToken} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
