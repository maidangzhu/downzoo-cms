import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import TableList from "util/table-list/index.jsx";

import MUtil from "util/mm.jsx";
import Product from 'service/product-service.jsx';

const _mm = new MUtil();
const _product = new Product();

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageNum: 1,
    }

    this.handlePageChange = this.handlePageChange.bind(this);
    this.loadProductList = this.loadProductList.bind(this);
  }

  componentDidMount() {
    this.loadProductList();
  }

  loadProductList() {
    _product
      .getProductList(this.state.pageNum)
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

  // 当页数改变后重拉list
  handlePageChange(pageNum) {
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadProductList();
    });
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="商品列表"/>
        <div className="row">
          <div className="col-md-12">
            <TableList tableHeads={['id', '用户名', '邮箱', '电话', '注册时间']}>
              {this.state.list.map((product, idx) => {
                return (
                  <tr key={idx}>
                    <td>{product.id}</td>
                    <td>
                      {product.name}
                      <br/>
                      {product.subtitle}
                    </td>
                    <td>{product.price}</td>
                    {product.status === 1
                      ? (
                        <td>
                          <span>在售</span>
                          <br/>
                          <a href="#">下架</a>
                        </td>
                      )
                      : (
                        <td>
                          <span>已下架</span>
                          <br/>
                          <a href="#">上架</a>
                        </td>
                      )
                    }

                    <td>
                      <a href="#">查看</a>
                      <br/>
                      <a href="#">编辑</a>
                    </td>
                  </tr>
                )
              })}
            </TableList>
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

export default ProductList;