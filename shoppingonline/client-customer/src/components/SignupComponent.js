import axios from "axios";
import React, { Component } from "react";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: "",
      txtPassword: "",
      txtName: "",
      txtPhone: "",
      txtEmail: "",
    };
  }
  render() {
    return (
      <div className="product-form">
        <h2 className="page-title">SIGN-UP</h2>
        <form className="product">
          <table className="login-form">
            <tbody className="login-cont">
              <tr className="login-fiel">
                <td className="login-title">Username:</td>
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
                <td className="login-title">Password:</td>
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
                <td className="login-title">Name:</td>
                <td>
                  <input
                    className="login-input"
                    type="text"
                    value={this.state.txtName}
                    onChange={(e) => {
                      this.setState({ txtName: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td className="login-title">Phone:</td>
                <td>
                  <input
                    className="login-input"
                    type="tel"
                    value={this.state.txtPhone}
                    onChange={(e) => {
                      this.setState({ txtPhone: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td className="login-title">Email:</td>
                <td>
                  <input
                    className="login-input"
                    type="email"
                    value={this.state.txtEmail}
                    onChange={(e) => {
                      this.setState({ txtEmail: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button
                    className="login-submit-btn"
                    onClick={(e) => this.btnSignupClick(e)}
                  >
                    SIGN-UP
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
  // event-handlers
  btnSignupClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const account = {
        username: username,
        password: password,
        name: name,
        phone: phone,
        email: email,
      };
      this.apiSignup(account);
    } else {
      alert("Please input username and password and name and phone and email");
    }
  }
  // apis
  apiSignup(account) {
    axios.post("/api/customer/signup", account).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
}
export default Signup;
