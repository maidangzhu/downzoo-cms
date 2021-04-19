import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';

import MUtil from "util/mm.jsx";
import User from 'service/user-service.jsx';

const _mm = new MUtil();
const _user = new User();

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageNum: 1,
      firstLoading: true,
    }

    this.handlePageChange = this.handlePageChange.bind(this);
    this.loadUserList = this.loadUserList.bind(this);
  }

  componentDidMount() {
    this.loadUserList();
  }

  loadUserList() {
    _user
      .getUserList(this.state.pageNum)
      .then(data => {
        this.setState(data);
      }, () => {
        this.setState({
          firstLoading: false,
        })
      })
      .catch(err => {
        this.setState({
          list: []
        })
        _mm.errorTips(err);
      })
  }

  handlePageChange(pageNum) {
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadUserList();
    });
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="用户列表"/>
        <div className="row">
          <div className="col-md-12">
            <table className="table table-striped table-border">
              <thead>
              <tr>
                <th>ID</th>
                <th>用户名</th>
                <th>邮箱</th>
                <th>电话</th>
                <th>注册时间</th>
              </tr>
              </thead>
              <tbody>
              {
                this.state.list.length > 0
                  ? this.state.list.map((user) => {
                    return (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{new Date(user.createTime).toLocaleDateString()}</td>
                      </tr>
                    )
                  })
                  : (
                    <tr>
                      <td colSpan="5" className="text-center">{this.state.firstLoading ? '正在加载数据' : '没有找到相应的结果'}</td>
                    </tr>
                  )
              }

              </tbody>
            </table>
          </div>
          {
            this.state.list.length > 0
              ? <Pagination current={this.state.pageNum} total={this.state.total} onChange={this.handlePageChange}/>
              : null
          }
        </div>
      </div>
    )
  }
}

export default UserList;