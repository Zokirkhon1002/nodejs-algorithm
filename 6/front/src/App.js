// @ts-nocheck
import './App.css';
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom"
import Home from "./router/home/Home"
import Login from './router/login/Login';
import PrivateRoute from './router/private-route/PrivateRoute';
import Admin from './router/admin/Admin';
import Cart from './router/cart/Cart';
import {BsCart2} from "react-icons/bs"
import { useSelector } from "react-redux"
import Pagination from './router/pagination/Pagination';

function App() {
  const cart = useSelector(s => s.addToCart)
  
  return (
    <div className="App">
      <Router>
        <nav className='navbar'>
          <NavLink to="/">Home</NavLink>
          <br />
          <NavLink to="/login/sign-in">Login</NavLink>
          <br />
          <NavLink to="/pagination">Pagination</NavLink>
          <br />
          <NavLink to="/admin">Admin</NavLink>
          <br/>
          <NavLink className="cart_item" to="/cart"><BsCart2/><span>{cart.length}</span></NavLink>
        </nav>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route  path="/login" component={Login}/>
          <Route path='/pagination' component={Pagination} />
          <Route path="/cart" component={Cart}/>
          <PrivateRoute to="/admin">
            <Admin/>
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
