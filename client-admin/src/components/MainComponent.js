import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
import { Routes, Route, Navigate } from "react-router-dom";
import Category from "./CategoryComponent";
import Product from "./ProductComponent";
import Order from "./OrderComponent";

// ĐÃ THÊM: Import component Customer vào
import Customer from "./CustomerComponent";

class Main extends Component {
  static contextType = MyContext;

  render() {
    if (this.context.token !== "") {
      return (
        <div className="body-admin">
          <Menu />

          <Routes>
            <Route
              path="/admin"
              element={<Navigate replace to="/admin/home" />}
            />
            <Route path="/admin/home" element={<Home />} />
            <Route path="/admin/category" element={<Category />} />
            <Route path="/admin/product" element={<Product />} />
            <Route path="/admin/order" element={<Order />} />

            {/* ĐÃ THÊM: Route xử lý đường dẫn của Customer */}
            <Route path="/admin/customer" element={<Customer />} />
          </Routes>
        </div>
      );
    }

    return <div />;
  }
}

export default Main;
