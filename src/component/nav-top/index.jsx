import React from 'react';
import {Link} from 'react-router-dom';

const NavTop = () => {
  // 退出登录
  const handleLogout = () => {
    console.log('logout');
  }

  return (
    <div className="navbar navbar-default top-navbar">
      <div className="navbar-header">
        <Link className="navbar-brand" to="/"><b>DOWNZOO</b>CMS</Link>
      </div>

      <ul className="nav navbar-top-links navbar-right">
        <li className="dropdown">
          <a className="dropdown-toggle" href="#">
            <i className="fa fa-envelope fa-fw"/>
            <span>欢迎，admin</span>
            <i className="fa fa-caret-down"/>
          </a>
          <ul className="dropdown-menu dropdown-user">
            <li>
              <a onClick={handleLogout}>
                <i className="fa fa-sign-out fa-fw"/>
                <span>退出登录</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default NavTop;
