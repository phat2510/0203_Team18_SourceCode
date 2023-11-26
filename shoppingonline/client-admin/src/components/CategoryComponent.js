import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import CategoryDetail from "./CategoryDetailComponent";

class Category extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      itemSelected: null,
    };
  }
  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <tr
          key={item._id}
          className="update-fiel-item"
          onClick={() => this.trItemClick(item)}
        >
          <td>{item._id}</td>
          <td>{item.name}</td>
        </tr>
      );
    });
    return (
      <div className="admin-cate">
        <div className="product-form">
          <h2 className="page-title">CATEGORY LIST</h2>
          <form className="product">
            <table className="login-form">
              <tbody className="login-cont">
                <tr className="update-fiel">
                  <th className="update-title update-id">ID</th>
                  <th className="update-title update-name">Name</th>
                </tr>
                {cates}
              </tbody>
            </table>
          </form>
        </div>
        <div className="product-form" />
        <CategoryDetail
          item={this.state.itemSelected}
          updateCategories={this.updateCategories}
        />
      </div>
    );
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetCategories() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/categories", config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
  updateCategories = (categories) => {
    // arrow-function
    this.setState({ categories: categories });
  };
}
export default Category;
