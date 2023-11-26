import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import withRouter from "../utils/withRouter";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }
  render() {
    const prods = this.state.products.map((item) => {
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
      <div>
        <div className="product-form">
          <h2 className="page-title">LIST PRODUCTS</h2>
          <div className="product">{prods}</div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    // first: /product/...
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }
  componentDidUpdate(prevProps) {
    // changed: /product/...
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }
  // apis
  apiGetProductsByCatID(cid) {
    axios.get("/api/customer/products/category/" + cid).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
  apiGetProductsByKeyword(keyword) {
    axios.get("/api/customer/products/search/" + keyword).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
}
export default withRouter(Product);
