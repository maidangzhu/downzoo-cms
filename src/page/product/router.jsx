import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';

import ProductList from 'page/product/index.jsx';

// 分路由
class ProductRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/product/index" component={ProductList} />
        <Redirect exact from="/product" to="/product/index" />
      </Switch>
    )
  }
}

export default ProductRouter;