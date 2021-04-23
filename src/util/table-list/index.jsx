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
    const listHeader = this.props.tableHeads.map((tableHead, idx) => {
      if (typeof tableHead === 'object') {
        return <th key={idx} width={tableHead.width}>{tableHead.name}</th>
      } else if (typeof tableHead === 'string') {
        return <th key={idx}>{tableHead}</th>
      }
    })
    const listInfo = (
      <tr>
        <td colSpan={this.props.tableHeads.length}
            className="text-center">{this.state.firstLoading ? '正在加载数据' : '没有找到相应的结果'}</td>
      </tr>
    )
    const listBody = this.props.children;
    const tableBody = listBody.length > 0 ? listBody : listInfo;

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
