import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import ProductList from "page/product";
import ProductSave from "page/product/save";
import CategoryList from "page/product/category";
import CategoryAdd from "page/product/category/add";

// 分路由
class ProductRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/product/index" component={ProductList} />
        <Route exact path="/product/save" component={ProductSave} />
        <Route path="/product/save/:id?" component={ProductSave} />
        <Route exact path="/product-category" component={CategoryList} />
        <Route
          path="/product-category/index/:categoryId?"
          component={CategoryList}
        />
        <Route path="/product-category/add" component={CategoryAdd} />
        <Redirect exact from="/product" to="/product/index" />
        <Redirect exact from="/product-category" to="/product/category/index" />
      </Switch>
    );
  }
}

export default ProductRouter;
