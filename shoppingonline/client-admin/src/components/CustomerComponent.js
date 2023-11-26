import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";

class Customer extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      orders: [],
      order: null,
    };
  }
  render() {
    const customers = this.state.customers.map((item) => {
      return (
        <tr
          key={item._id}
          className=""
          onClick={() => this.trCustomerClick(item)}
        >
          <td className="list-user-id">{item._id}</td>
          <td className="list-user-username">{item.username}</td>
          <td className="list-user-password">{item.password}</td>
          <td className="list-user-name">{item.name}</td>
          <td className="list-user-phone">{item.phone}</td>
          <td className="list-user-email">{item.email}</td>
          <td className="list-user-active">{item.active}</td>
          <td className="list-user-action">
            {item.active === 0 ? (
              <span
                className="list-user-action"
                onClick={() => this.lnkEmailClick(item)}
              >
                EMAIL
              </span>
            ) : (
              <span
                className="list-user-action"
                onClick={() => this.lnkDeactiveClick(item)}
              >
                DEACTIVE
              </span>
            )}
          </td>
        </tr>
      );
    });
    const orders = this.state.orders.map((item) => {
      return (
        <tr
          key={item._id}
          className="update-fiel-item"
          onClick={() => this.trOrderClick(item)}
        >
          <td className="list-user-id">{item._id}</td>
          <td className="list-user-date">
            {new Date(item.cdate).toLocaleString()}
          </td>
          <td className="list-user-name">{item.customer.name}</td>
          <td className="list-user-phone">{item.customer.phone}</td>
          <td className="list-user-total">{item.total}</td>
          <td className="list-user-status">{item.status}</td>
        </tr>
      );
    });
    if (this.state.order) {
      var items = this.state.order.items.map((item, index) => {
        return (
          <tr key={item.product._id} className="update-fiel">
            <td>{index + 1}</td>
            <td>{item.product._id}</td>
            <td>{item.product.name}</td>
            <td>
              <img
                src={"data:image/jpg;base64," + item.product.image}
                width="70px"
                height="70px"
                alt=""
              />
            </td>
            <td>{item.product.price}</td>
            <td>{item.quantity}</td>
            <td>{item.product.price * item.quantity}</td>
          </tr>
        );
      });
    }
    return (
      <div>
        <div className="product-form">
          <h2 className="page-title">CUSTOMER LIST</h2>
          <form className="product">
            <table className="login-form">
              <tbody className="login-cont">
                <tr className="update-fiel">
                  <th className="list-user-id">ID</th>
                  <th className="list-user-username">Username</th>
                  <th className="list-user-password">Password</th>
                  <th className="list-user-name">Name</th>
                  <th className="list-user-phone">Phone</th>
                  <th className="list-user-email">Email</th>
                  <th className="list-user-active">Active</th>
                  <th className="list-user-action">Action</th>
                </tr>
                {customers}
              </tbody>
            </table>
          </form>
        </div>
        {this.state.orders.length > 0 ? (
          <div className="product-form">
            <h2 className="page-title">ORDER LIST</h2>
            <form className="product">
              <table className="login-form">
                <tbody className="login-cont">
                  <tr className="update-fiel">
                    <th className="list-user-id">ID</th>
                    <th className="list-user-date">Creation date</th>
                    <th className="list-user-name">Cust.name</th>
                    <th className="list-user-phone">Cust.phone</th>
                    <th className="list-user-total">Total</th>
                    <th className="list-user-status">Status</th>
                  </tr>
                  {orders}
                </tbody>
              </table>
            </form>
          </div>
        ) : (
          <div />
        )}
        {this.state.order ? (
          <div className="align-center">
            <h2 className="text-center">ORDER DETAIL</h2>
            <table className="datatable" border="1">
              <tbody>
                <tr className="datatable">
                  <th>No.</th>
                  <th>Prod.ID</th>
                  <th>Prod.name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
                {items}
              </tbody>
            </table>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
  componentDidMount() {
    this.apiGetCustomers();
  }
  // event-handlers
  trCustomerClick(item) {
    this.setState({ orders: [], order: null });
    this.apiGetOrdersByCustID(item._id);
  }
  trOrderClick(item) {
    this.setState({ order: item });
  }
  // apis
  apiGetCustomers() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/customers", config).then((res) => {
      const result = res.data;
      this.setState({ customers: result });
    });
  }
  apiGetOrdersByCustID(cid) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/orders/customer/" + cid, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
  // event-handlers
  lnkDeactiveClick(item) {
    this.apiPutCustomerDeactive(item._id, item.token);
  }
  // apis
  apiPutCustomerDeactive(id, token) {
    const body = { token: token };
    const config = { headers: { "x-access-token": this.context.token } };
    axios
      .put("/api/admin/customers/deactive/" + id, body, config)
      .then((res) => {
        const result = res.data;
        if (result) {
          this.apiGetCustomers();
        } else {
          alert("SORRY BABY!");
        }
      });
  }
  // event-handlers
  lnkEmailClick(item) {
    this.apiGetCustomerSendmail(item._id);
  }
  // apis
  apiGetCustomerSendmail(id) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/customers/sendmail/" + id, config).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
}
export default Customer;
