import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// 布局
import Layout from 'component/layout/index.jsx';
// 页面
import Home from 'page/home/index.jsx';
import Login from 'page/login/index.jsx';
import ErrorPage from 'page/error/index.jsx';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/" render={() => { // 代表login走上面那个组件，其他情况渲染render内部的
            return (
              <Layout>
                <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route path="/product" component={Home}/>
                  <Route path="/product-category" component={Home}/>
                  <Route path="/user" component={Home}/>
                  <Route path="/order" component={Home}/>
                  <Route component={ErrorPage}/>
                </Switch>
              </Layout>
            )
          }}/>
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById("app")
);
