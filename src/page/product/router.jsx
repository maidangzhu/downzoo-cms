import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import ProductList from "page/product";
import ProductSave from "page/product/save";

// 分路由
class ProductRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/product/index" component={ProductList} />
        <Route exact path="/product/save" component={ProductSave} />
        <Route
          path="/product/save/:id"
          render={(props) => <ProductSave {...props} />}
        />
        <Redirect exact from="/product" to="/product/index" />
      </Switch>
    );
  }
}

export default ProductRouter;
