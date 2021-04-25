/**
 * 商品列表管理
 */
import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import TableList from "util/table-list/index.jsx";
import SearchList from './search-list.jsx';

import {Link} from "react-router-dom";

import MUtil from "util/mm.jsx";
import Product from 'service/product-service.jsx';

import './index.scss';

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
      listType: 'list' // list or search
    }

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  // 初次加载的时候拉取list
  componentDidMount() {
    this.loadProductList();
  }

  // 加载商品列表
  loadProductList() {
    const listParam = {
      listType: this.state.listType,
      pageNum: this.state.pageNum
    }

    if (this.state.listType === 'search') {
      listParam.searchType = this.state.searchType;
      listParam.searchKeyword = this.state.searchKeyword;
    }

    _product
      .getProductList(listParam)
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

  // 点击搜索
  onSearch(searchType, searchKeyword) {
    console.log(searchType, searchKeyword);
    const listType = searchKeyword === '' ? 'list' : 'search';

    this.setState({
      listType,
      searchType,
      searchKeyword,
      pageNum: 1,
    }, () => {
      this.loadProductList();
    })
  }

  // 重拉list
  handlePageChange(pageNum) {
    this.setState({
      pageNum
    }, () => {
      this.loadProductList();
    });
  }

  // 切换商品上下架状态
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

  render() {
    // 表格主体
    const listBody = this.state.list.map((product, idx) => {
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
            <button
              onClick={() => {
                this.handleChangeProductStatus(id, status);
              }}
              className="btn btn-xs btn-warning">{status === 1 ? '下架' : '上架'}</button>
          </td>
          <td>
            <Link to={`product/save${id}`}>编辑</Link>
          </td>
        </tr>
      )
    })

    return (
      <div id="page-wrapper">
        <PageTitle title="商品列表"/>
        <SearchList onSearch={(searchType, searchKeyword) => {
          this.onSearch(searchType, searchKeyword);
        }}/>
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

export default ProductList;