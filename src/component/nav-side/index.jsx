import React from 'react';
import {Link, NavLink} from 'react-router-dom';

class NavSide extends React.Component {
  render() {
    return (
      <div className="navbar-default navbar-side" role="navigation">
        <div className="sidebar-collapse">
          <ul className="nav" id="main-menu">

            {/*首页*/}
            <li>
              <NavLink exact to="/" activeClassName="active-menu">
                <i className="fa fa-dashboard"/>
                <span>首页</span>
              </NavLink>
            </li>

            {/*商品*/}
            <li className="active">
              <Link to="/product">
                <i className="fa fa-list"/>
                <span>商品</span>
                <i className="fa arrow"/>
              </Link>
              <ul className="nav nav-second-level collapse in">
                <li>
                  <NavLink to="/product" activeClassName="active-menu">商品管理</NavLink>
                </li>
                <li>
                  <NavLink to="/product-category" activeClassName="active-menu">品类管理</NavLink>
                </li>
              </ul>
            </li>

            {/*订单*/}
            <li className="active">
              <Link to="/order">
                <i className="fa fa-check-square-o"/>
                <span>订单</span>
                <i className="fa arrow"/>
              </Link>
              <ul className="nav nav-second-level collapse in">
                <li>
                  <NavLink to="/order" activeClassName="active-menu">订单管理</NavLink>
                </li>
              </ul>
            </li>

            {/*用户*/}
            <li className="active">
              <Link to="/user">
                <i className="fa fa-user-o"/>
                <span>用户</span>
                <i className="fa arrow"/>
              </Link>
              <ul className="nav nav-second-level collapse in">
                <li>
                  <NavLink to="/user" activeClassName="active-menu">用户管理</NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default NavSide;
