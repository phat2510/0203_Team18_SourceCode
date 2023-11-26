import axios from "axios";
import React, { Component } from "react";

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: "",
      txtToken: "",
    };
  }
  render() {
    return (
      // <table className="login-form">
      //       <tbody className="login-cont">
      //         <tr className="login-fiel">
      //           <td className="login-title">Username</td>
      //           <td>
      //             <input
      //               className="login-input"
      //               type="text"
      //               value={this.state.txtUsername}
      //               onChange={(e) => {
      //                 this.setState({ txtUsername: e.target.value });
      //               }}
      //             />
      //           </td>
      //         </tr>
      //         <tr className="login-fiel">
      //           <td className="login-title">Password</td>
      //           <td>
      //             <input
      //               className="login-input"
      //               type="password"
      //               value={this.state.txtPassword}
      //               onChange={(e) => {
      //                 this.setState({ txtPassword: e.target.value });
      //               }}
      //             />
      //           </td>
      //         </tr>
      //         <tr>
      //           <td></td>
      //           <td>
      //             <button
      //               className="login-submit-btn"
      //               type="submit"
      //               value="LOGIN"
      //               onClick={(e) => this.btnLoginClick(e)}
      //             >
      //               Login
      //             </button>
      //           </td>
      //         </tr>
      //       </tbody>
      //     </table>
      //   </form>
      <div className="product-form">
        <h2 className="page-title">ACTIVE ACCOUNT</h2>
        <form className="product">
          <table className="login-form">
            <tbody className="login-cont">
              <tr className="login-fiel">
                <td className="login-title">ID:</td>
                <td>
                  <input
                    className="login-input"
                    type="text"
                    value={this.state.txtID}
                    onChange={(e) => {
                      this.setState({ txtID: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr className="login-fiel">
                <td className="login-title">Token:</td>
                <td>
                  <input
                    className="login-input"
                    type="text"
                    value={this.state.txtToken}
                    onChange={(e) => {
                      this.setState({ txtToken: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button
                    className="login-submit-btn"
                    onClick={(e) => this.btnActiveClick(e)}
                  >
                    ACTIVE
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
  btnActiveClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const token = this.state.txtToken;
    if (id && token) {
      this.apiActive(id, token);
    } else {
      alert("Please input id and token");
    }
  }
  // apis
  apiActive(id, token) {
    const body = { id: id, token: token };
    axios.post("/api/customer/active", body).then((res) => {
      const result = res.data;
      if (result) {
        alert("OK BABY!");
      } else {
        alert("SORRY BABY!");
      }
    });
  }
}
export default Active;
