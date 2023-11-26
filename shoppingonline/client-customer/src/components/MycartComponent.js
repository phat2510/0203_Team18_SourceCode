import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import CartUtil from "../utils/CartUtil";
import axios from "axios";
import withRouter from "../utils/withRouter";

class Mycart extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    const mycart = this.context.mycart.map((item, index) => {
      return (
        <tr key={item.product._id} className="cart-fiel-item">
          <td className="cart-no">{index + 1}</td>
          <td className="cart-id">{item.product._id}</td>
          <td className="cart-name">{item.product.name}</td>
          <td className="cart-cate">{item.product.category.name}</td>
          <td className="cart-img">
            <img
              src={"data:image/jpg;base64," + item.product.image}
              width="70px"
              height="70px"
              alt=""
            />
          </td>
          <td className="cart-price">{item.product.price}</td>
          <td className="cart-quantity">{item.quantity}</td>
          <td className="cart-amount">{item.product.price * item.quantity}</td>
          <td className="cart-action">
            <span
              className="cart-remove"
              onClick={() => this.lnkRemoveClick(item.product._id)}
            >
              Remove
            </span>
          </td>
        </tr>
      );
    });
    return (
      <div className="product-form">
        <h2 className="page-title">ITEM LIST</h2>
        <form className="product">
          <table className="login-form">
            <tbody className="login-cont">
              <tr className="update-fiel">
                <th className="cart-no">No.</th>
                <th className="cart-id">ID</th>
                <th className="cart-name">Name</th>
                <th className="cart-cate">Category</th>
                <th className="cart-img">Image</th>
                <th className="cart-price">Price</th>
                <th className="cart-quantity">Quantity</th>
                <th className="cart-amount">Amount</th>
                <th className="cart-action">Action</th>
              </tr>
              {mycart}
              <tr className="cart-checkout">
                <td>Total {CartUtil.getTotal(this.context.mycart)}</td>
                <td
                  className="cart-checkout-btn"
                  onClick={() => this.lnkCheckoutClick()}
                >
                  CHECKOUT
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
  // event-handlers
  lnkRemoveClick(id) {
    const mycart = this.context.mycart;
    const index = mycart.findIndex((x) => x.product._id === id);
    if (index !== -1) {
      // found, remove item
      mycart.splice(index, 1);
      this.context.setMycart(mycart);
    }
  }
  // event-handlers
  lnkCheckoutClick() {
    if (window.confirm("ARE YOU SURE?")) {
      if (this.context.mycart.length > 0) {
        const total = CartUtil.getTotal(this.context.mycart);
        const items = this.context.mycart;
        const customer = this.context.customer;
        if (customer) {
          this.apiCheckout(total, items, customer);
        } else {
          this.props.navigate("/login");
        }
      } else {
        alert("Your cart is empty");
      }
    }
  }
  // apis
  apiCheckout(total, items, customer) {
    const body = { total: total, items: items, customer: customer };
    const config = { headers: { "x-access-token": this.context.token } };
    axios.post("/api/customer/checkout", body, config).then((res) => {
      const result = res.data;
      if (result) {
        alert("OK BABY!");
        this.context.setMycart([]);
        this.props.navigate("/home");
      } else {
        alert("SORRY BABY!");
      }
    });
  }
}
export default withRouter(Mycart);
