import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";

class Order extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null,
    };
  }
  render() {
    const orders = this.state.orders.map((item) => {
      return (
        <tr
          key={item._id}
          className="update-fiel-item"
          onClick={() => this.trItemClick(item)}
        >
          <td className="list-user-id">{item._id}</td>
          <td className="list-user-date">
            {new Date(item.cdate).toLocaleString()}
          </td>
          <td className="list-user-name">{item.customer.name}</td>
          <td className="list-user-phone">{item.customer.phone}</td>
          <td className="list-user-total">{item.total}</td>
          <td className="list-user-status">{item.status}</td>
          {item.status === "PENDING" ? (
            <div className="list-user-action">
              <span
                className="list-user-as-btn"
                onClick={() => this.lnkApproveClick(item._id)}
              >
                APPROVE
              </span>
              <span
                className="list-user-as-btn"
                onClick={() => this.lnkCancelClick(item._id)}
              >
                CANCEL
              </span>
            </div>
          ) : (
            <div className="list-user-action">
              <span
                className="list-user-as-btn"
                onClick={() => this.lnkApproveClick(item._id)}
              >
                x
              </span>
              <span
                className="list-user-as-btn"
                onClick={() => this.lnkCancelClick(item._id)}
              >
                x
              </span>
            </div>
          )}
        </tr>
      );
    });
    if (this.state.order) {
      var items = this.state.order.items.map((item, index) => {
        return (
          <tr key={item.product._id} className="update-fiel-item">
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
          <h2 className="page-title">ORDER LIST</h2>
          <form className="product">
            <table className="login-form">
              <tbody className="login-cont">
                <tr className="update-fiel">
                  <th className="list-user-id">ID</th>
                  <th className="list-user-date">Creation date</th>
                  <th className="list-user-name">name</th>
                  <th className="list-user-phone">phone</th>
                  <th className="list-user-total">Total</th>
                  <th className="list-user-status">Status</th>
                  <th className="list-user-action">Action</th>
                </tr>
                {orders}
              </tbody>
            </table>
          </form>
        </div>
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
    this.apiGetOrders();
  }

  // event-handlers
  trItemClick(item) {
    this.setState({ order: item });
  }
  // apis
  apiGetOrders() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/orders", config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }

  // event-handlers
  lnkApproveClick(id) {
    this.apiPutOrderStatus(id, "APPROVED");
  }
  lnkCancelClick(id) {
    this.apiPutOrderStatus(id, "CANCELED");
  }
  // apis
  apiPutOrderStatus(id, status) {
    const body = { status: status };
    const config = { headers: { "x-access-token": this.context.token } };
    axios.put("/api/admin/orders/status/" + id, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.apiGetOrders();
      } else {
        alert("SORRY BABY!");
      }
    });
  }
}
export default Order;
