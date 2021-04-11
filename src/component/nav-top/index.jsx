import React from 'react';
import {Link} from 'react-router-dom';

import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm = new MUtil();
const _user = new User();

class NavTop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: _mm.getStorage('userinfo').username || '',
    }

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() { // 发送logout请求不用传任何参数，因为后端会通过cookie判断登陆状态
    _user.logout()
      .then(() => { // 登出后让页面直接跳回登陆页，并且清除localStorage
        _mm.removeStorage('userinfo');
        window.location.href = '/login';
      }).catch(errMsg => {
      _mm.errorTips(errMsg);
    })
  }

  render() {
    return (
      <div className="navbar navbar-default top-navbar">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/"><b>DOWNZOO</b>CMS</Link>
        </div>

        <ul className="nav navbar-top-links navbar-right">
          <li className="dropdown">
            <a className="dropdown-toggle" href="#">
              <i className="fa fa-envelope fa-fw"/>
              {
                this.state.username
                  ? <span>欢迎，{this.state.username}</span>
                  : <span>您好，请登录</span>
              }
              <i className="fa fa-caret-down"/>
            </a>
            <ul className="dropdown-menu dropdown-user">
              <li>
                <a onClick={this.handleLogout}>
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
}

export default NavTop;
