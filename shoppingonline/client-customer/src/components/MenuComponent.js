import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import withRouter from "../utils/withRouter";
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: "",
    };
  }
  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id} className="navbar-menu-item">
          <Link to={"/product/category/" + item._id}>{item.name}</Link>
        </li>
      );
    });
    return (
      <div className="navbar-home-items">
        <ul className="navbar-menu-items">
          <li className="navbar-menu-item">
            <Link to="/">Home</Link>
          </li>
          {cates}
        </ul>
        <div className="navbar-menu-search">
          <form className="navbar-search">
            <input
              type="search"
              placeholder="Enter keyword"
              className="search-input"
              value={this.state.txtKeyword}
              onChange={(e) => {
                this.setState({ txtKeyword: e.target.value });
              }}
            />
            <button className="search-submit">Search</button>
          </form>
        </div>
        <div className="float-clear" />
      </div>
    );
  }
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate("/product/search/" + this.state.txtKeyword);
  }
  componentDidMount() {
    this.apiGetCategories();
  }

  // event-handlers
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate("/product/search/" + this.state.txtKeyword);
  }
  // apis
  apiGetCategories() {
    axios.get("/api/customer/categories").then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}
export default withRouter(Menu);
