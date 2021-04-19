import React from 'react';
import './index.scss';

import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm = new MUtil();
const _user = new User();

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: _mm.getUrlParam('redirect') || '', // 取出参数，方便登陆成功后redirect
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.verifyBeforeSubmit = this.verifyBeforeSubmit.bind(this);
  }

  componentDidMount() {
    document.title = '登陆 - DOWNZOO CMS';
  }

  handleInputChange(e) {
    if (e.keyCode === 13) {
      this.handleSubmit()
      return;
    }
    const inputName = e.target.name;
    const inputValue = e.target.value;

    this.setState({
      [inputName]: inputValue
    })
  }

  // 提交前验证表单信息，返回boolean
  verifyBeforeSubmit() {
    if (typeof this.state.username !== 'string' || this.state.username.length === 0) {
      alert('用户名格式不正确');
      return false;
    }
    if (typeof this.state.password !== 'string' || this.state.password.length === 0) {
      alert('密码格式不正确');
      return false;
    }
    return true;
  }

  handleSubmit() {
    // 根据boolean判断是否继续提交
    if (!this.verifyBeforeSubmit()) {
      return;
    }

    const loginInfo = {
      username: this.state.username,
      password: this.state.password
    }

    // 发送login信息的请求
    _user
      .login(loginInfo)
      .then((data) => { // then方法都是用来处理业务逻辑的
        // window.localStorage.setItem('userinfo', JSON.stringify(data)); // data是一个对象，我们对它进行JSON序列化
        _mm.setStorage('userinfo', data);
        this.props.history.push(this.state.redirect); // react-router提供的history对象
      })
      .catch(err => {
        _mm.errorTips(err);
      })
  }

  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default login-panel">
          <div className="panel-heading">欢迎登陆 DOWNZOO CMS</div>
          <div className="panel-body">
            <div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">用户名</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="请输入用户名"
                  value={this.state.username}
                  onKeyUp={this.handleInputChange}
                  onChange={e => this.handleInputChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">密码</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="请输入密码"
                  value={this.state.password}
                  onKeyUp={this.handleInputChange}
                  onChange={e => this.handleInputChange(e)}
                />
              </div>
              <button className="btn btn-lg btn-block btn-primary" onClick={this.handleSubmit}>登陆</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
