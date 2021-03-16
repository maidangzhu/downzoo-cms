import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

// 布局
import Layout from 'component/layout/index.jsx';
// 页面
import Home from 'page/home/index.jsx';

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Redirect from="*" to="/"/>
        </Switch>
      </Layout>
    </Router>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById("app")
);
