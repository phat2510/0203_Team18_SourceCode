import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: [],
    };
  }
  render() {
    const newprods = this.state.newprods.map((item) => {
      return (
        <div key={item._id} className="product-items">
          <Link to={"/product/" + item._id}>
            <img
              className="product-items-img"
              src={"data:image/jpg;base64," + item.image}
              alt=""
            />
          </Link>
          <div className="product-items-des">
            <p>{item.name}</p>
            <p>Price: {item.price}</p>
          </div>
        </div>
      );
    });
    const hotprods = this.state.hotprods.map((item) => {
      return (
        <div key={item._id} className="product-items">
          <Link to={"/product/" + item._id}>
            <img
              className="product-items-img"
              src={"data:image/jpg;base64," + item.image}
              alt=""
            />
          </Link>
          <div className="product-items-des">
            <p>{item.name}</p>
            <p>Price: {item.price}</p>
          </div>
        </div>
      );
    });
    return (
      <div className="homme-ctn">
        <div className="product-form">
          <h2 className="page-title">NEW PROPERTY</h2>
          <div className="product">{newprods}</div>
        </div>
        <div className="product-form">
          <h2 className="page-title">HOT PROPERTY</h2>
          <div className="product">{hotprods}</div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }
  // apis
  apiGetNewProducts() {
    axios.get("/api/customer/products/new").then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }
  apiGetHotProducts() {
    axios.get("/api/customer/products/hot").then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }
}
export default Home;
