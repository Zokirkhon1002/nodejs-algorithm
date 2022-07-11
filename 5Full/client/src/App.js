// @ts-nocheck
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./router/home/Home";

function App() {
  return (
    <div className="App">
      <h1>for Navbar</h1>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
