import React from "react";

// 通用分页组件
class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstLoading: true,
    }
  }

  // 列表只有在第一次挂在当时候，firstLoading为true，其他情况都为false
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      firstLoading: false,
    })
  }

  render() {
    let listInfo = (
      <tr>
        <td colSpan={this.props.tableHeads.length} className="text-center">{this.state.firstLoading ? '正在加载数据' : '没有找到相应的结果'}</td>
      </tr>
    )
    let listHeader = this.props.tableHeads.map((tableHead, idx) => <th key={idx}>{tableHead}</th>)
    let listBody = this.props.children;
    let tableBody = listBody.length > 0 ? listBody : listInfo;

    return (
      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped table-bordered table-hover">
            <thead>
            <tr>
              {listHeader}
            </tr>
            </thead>
            <tbody>
            {tableBody}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default TableList;