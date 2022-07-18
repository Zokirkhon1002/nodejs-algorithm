// @ts-nocheck
import "./App.css";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./router/home/Home";
import Admin from "./router/admin/Admin";

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <NavLink to="/">Home</NavLink>
          <br />
          <NavLink to="/admin">Admin</NavLink>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/admin" component={Admin} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
