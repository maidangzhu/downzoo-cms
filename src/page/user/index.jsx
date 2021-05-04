import React from 'react';
import PageTitle from 'component/page-title/index';
import Pagination from 'util/pagination/index';
import TableList from "util/table-list/index";

import MUtil from "util/mm";
import User from 'service/user-service';

const _mm = new MUtil();
const _user = new User();

const tableHeads = [
  {
    name: 'ID',
    width: '10%'
  },
  {
    name: '用户名',
    width: '50%'
  },
  {
    name: '邮箱',
    width: '10%'
  },
  {
    name: '电话',
    width: '15%'
  },
  {
    name: '注册时间',
    width: '15%'
  }
]

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageNum: 1,
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
    const listBody = this.state.list.map((user) => {
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

    return (
      <div id="page-wrapper">
        <PageTitle title="用户列表"/>
        <TableList tableHeads={tableHeads}>
          {listBody}
        </TableList>
        {
          this.state.list.length > 0
            ? <Pagination current={this.state.pageNum} total={this.state.total} onChange={this.handlePageChange}/>
            : null
        }
      </div>
    )
  }
}

export default UserList;