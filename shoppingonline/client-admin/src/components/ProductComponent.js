import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import ProductDetail from "./ProductDetailComponent";

class Product extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null,
    };
  }
  render() {
    const prods = this.state.products.map((item) => {
      return (
        <tr
          key={item._id}
          className="update-fiel-item"
          onClick={() => this.trItemClick(item)}
        >
          <td className="list-user-id">{item._id}</td>
          <td className="list-user-name">{item.name}</td>
          <td className="list-user-price">{item.price}</td>
          <td className="list-user-date">
            {new Date(item.cdate).toLocaleString()}
          </td>
          <td className="list-user-cate">{item.category.name}</td>
          <td className="list-user-img">
            <img
              src={"data:image/jpg;base64," + item.image}
              width="100px"
              height="100px"
              alt=""
            />
          </td>
        </tr>
      );
    });
    const pagination = Array.from(
      { length: this.state.noPages },
      (_, index) => {
        if (index + 1 === this.state.curPage) {
          return (
            <span key={index}>
              | <b>{index + 1}</b> |
            </span>
          );
        } else {
          return (
            <span
              key={index}
              className="link"
              onClick={() => this.lnkPageClick(index + 1)}
            >
              | {index + 1} |
            </span>
          );
        }
      }
    );
    return (
      <div className="product-admin">
        <div className="product-form">
          <h2 className="page-title">PROPERTY LIST</h2>
          <form className="product">
            <table className="login-form">
              <tbody className="login-cont">
                <tr className="update-fiel">
                  <th className="list-user-id">ID</th>
                  <th className="list-user-name">Name</th>
                  <th className="list-user-price">Price</th>
                  <th className="list-user-date">Creation date</th>
                  <th className="list-user-cate">Category</th>
                  <th className="list-user-img">Image</th>
                </tr>
                {prods}
                <tr>
                  <td colSpan="6">{pagination}</td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
        <ProductDetail
          item={this.state.itemSelected}
          curPage={this.state.curPage}
          updateProducts={this.updateProducts}
        />
      </div>
    );
  }
  updateProducts = (products, noPages, curPage) => {
    // arrow-function
    this.setState({ products: products, noPages: noPages, curPage: curPage });
  };
  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }
  // event-handlers
  lnkPageClick(index) {
    this.apiGetProducts(index);
  }
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetProducts(page) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/products?page=" + page, config).then((res) => {
      const result = res.data;
      this.setState({
        products: result.products,
        noPages: result.noPages,
        curPage: result.curPage,
      });
    });
  }
}
export default Product;
