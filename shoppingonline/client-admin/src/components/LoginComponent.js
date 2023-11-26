import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: "",
      txtPassword: "",
    };
  }
  render() {
    if (this.context.token === "") {
      return (
        <div className="product-form">
          <h2 className="page-title">ADMIN LOGIN</h2>
          <form className="product">
            <table className="login-form">
              <tbody className="login-cont">
                <tr className="login-fiel">
                  <td className="login-title">Username</td>
                  <td>
                    <input
                      className="login-input"
                      type="text"
                      value={this.state.txtUsername}
                      onChange={(e) => {
                        this.setState({ txtUsername: e.target.value });
                      }}
                    />
                  </td>
                </tr>
                <tr className="login-fiel">
                  <td className="login-title">Password</td>
                  <td>
                    <input
                      className="login-input"
                      type="password"
                      value={this.state.txtPassword}
                      onChange={(e) => {
                        this.setState({ txtPassword: e.target.value });
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <button
                    className="login-submit-btn"
                    onClick={(e) => this.btnLoginClick(e)}
                  >
                    Login
                  </button>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      );
    }
    return <div />;
  }
  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      alert("Please input username and password");
    }
  }
  // apis
  apiLogin(account) {
    axios.post("/api/admin/login", account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
      } else {
        alert(result.message);
      }
    });
  }
}
export default Login;
