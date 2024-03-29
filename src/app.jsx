import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// 布局
import Layout from "component/layout/index.jsx";
// 页面
import Home from "page/home/index.jsx";
import Login from "page/login/index.jsx";
import UserList from "page/user/index.jsx";
import ErrorPage from "page/error/index.jsx";
import ProductRouter from "page/product/router.jsx";
import OrderList from "page/order/index.jsx";
import OrderDetail from "page/order/detail.jsx";

class App extends React.Component {
  render() {
    const layoutRouter = (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/product" component={ProductRouter} />
          <Route path="/product-category" component={ProductRouter} />
          <Route path="/user/index" component={UserList} />
          <Route path="/order/index" component={OrderList} />
          <Route path="/order/detail/:orderNumber" component={OrderDetail} />
          <Redirect exact from="/user" to="/user/index" />
          <Redirect exact from="/order" to="/order/index" />
          <Route component={ErrorPage} />
        </Switch>
      </Layout>
    );

    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" render={() => layoutRouter} />
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
