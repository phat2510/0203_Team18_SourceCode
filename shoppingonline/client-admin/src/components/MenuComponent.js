import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import { Link } from "react-router-dom";
class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    return (
      <div className="navbar-home">
        <ul className="navbar-home-items">
          <li className="navbar-menu-item">
            <Link to="/admin/home">Home</Link>
          </li>
          <li className="navbar-menu-item">
            <Link to="/admin/category">Category</Link>
          </li>
          <li className="navbar-menu-item">
            <Link to="/admin/product">Property</Link>
          </li>
          <li className="navbar-menu-item">
            <Link to="/admin/order">Order</Link>
          </li>
          <li className="navbar-menu-item">
            <Link to="/admin/customer">Customer</Link>
          </li>
        </ul>
        <div className="navbar-right">
          <p>Hello {this.context.username}</p>
          <Link to="/admin/home" onClick={() => this.lnkLogoutClick()}>
            Logout
          </Link>
        </div>
      </div>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken("");
    this.context.setUsername("");
  }
}
export default Menu;
