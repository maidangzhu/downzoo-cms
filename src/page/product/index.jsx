import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import TableList from "util/table-list/index.jsx";

import {Link} from "react-router-dom";

import MUtil from "util/mm.jsx";
import Product from 'service/product-service.jsx';

const _mm = new MUtil();
const _product = new Product();

const tableHeads = [
  {
    name: '商品ID',
    width: '10%'
  },
  {
    name: '商品信息',
    width: '50%'
  },
  {
    name: '价格',
    width: '10%'
  },
  {
    name: '状态',
    width: '15%'
  },
  {
    name: '操作',
    width: '15%'
  }
]

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageNum: 1,
    }
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

  handleChangeProductStatus(productId, status) {
    const newStatus = status === 1 ? 2 : 1;
    const tips = status === 1 ? '确定下架该商品?' : '确定上架该商品?';

    if (window.confirm(tips)) {
      _product.setProductStatus(productId, newStatus)
        .then(data => {
          _mm.successTips(data);
          this.loadProductList();
        }).catch(err => {
          _mm.errorTips(err);
      })
    }
  }

  handleUpdateProduct() {

  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="商品列表"/>
        <div className="row">
          <div className="col-md-12">
            <TableList tableHeads={tableHeads}>
              {this.state.list.map((product, idx) => {
                const {id, name, subtitle, price, status} = product;

                return (
                  <tr key={idx}>
                    <td>{id}</td>
                    <td>
                      <p>{name}</p>
                      <p>{subtitle}</p>
                    </td>
                    <td>¥{price}</td>
                    <td>
                      <p>{status === 1 ? '在售' : '已下架'}</p>
                      <button onClick={() => {
                        this.handleChangeProductStatus(id, status);
                      }}
                              className="btn btn-xs btn-warning">{status === 1 ? '下架' : '上架'}</button>
                    </td>
                    <td>
                      <Link to={`product/save${id}`} onClick={this.handleUpdateProduct}>编辑</Link>
                    </td>
                  </tr>
                )
              })}
            </TableList>
          </div>
          {
            this.state.list.length > 0
              ?
              <Pagination current={this.state.pageNum} total={this.state.total} onChange={this.handlePageChange}/>
              : null
          }
        </div>
      </div>
    )
  }
}

export default ProductList;