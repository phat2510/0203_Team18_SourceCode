import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyContext from "../contexts/MyContext";
import Menu from "./MenuComponent";

class Inform extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    return (
      <div className="navbar-home">
        <img
          className="navbar-logo"
          src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/301513741_394289079524362_2174064892977456676_n.png?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=l4j_6BUjKrgAX9hmd5H&_nc_ht=scontent.fsgn5-9.fna&oh=00_AfBZ40aCXx6lKBkagcJeC6I3wL5tuymJc_cHTNSoT2OK5w&oe=6568E6C0"
          alt=""
        ></img>
        <Menu></Menu>
        <div className="navbar-right">
          {this.context.token === "" ? (
            <>
              <Link className="navbar-right-item" to="/login">
                Login
              </Link>
              <Link className="navbar-right-item" to="/signup">
                Sign-up
              </Link>
              <Link className="navbar-right-item" to="/active">
                Active
              </Link>
            </>
          ) : (
            <div className="infor-user">
              <div className="user-items">
                <Link className="user-item" to="/myprofile">
                  My profile
                </Link>
                <Link className="user-item" to="/myorders">
                  My orders
                </Link>
              </div>
              <div className="user-items">
                <Link className="user-item" to="/mycart">
                  My cart
                </Link>
              </div>
              <div className="user-items">
                <p className="user-name">Hello {this.context.customer.name}</p>
                <Link
                  className="user-item"
                  to="/home"
                  onClick={() => this.lnkLogoutClick()}
                >
                  Logout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken("");
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}
export default Inform;
