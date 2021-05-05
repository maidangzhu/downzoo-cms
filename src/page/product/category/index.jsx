import React from "react";
import { Link } from "react-router-dom";

import PageTitle from "component/page-title/index";
import TableList from "util/table-list/index";

import MUtil from "util/mm";
import Product from "service/product-service";

const _mm = new MUtil();
const _product = new Product();

const tableHeads = [
  {
    name: "品类ID",
    width: "10%",
  },
  {
    name: "品类名称",
    width: "50%",
  },
  {
    name: "操作",
    width: "20%",
  },
];

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      parentCategoryId: this.props.match.params.categoryId || 0,
    };

    this.loadCategoryList = this.loadCategoryList.bind(this);
    this.onUpdateName = this.onUpdateName.bind(this);
  }

  componentDidMount() {
    this.loadCategoryList();
  }

  componentDidUpdate(prevProps, prevState) {
    let oldPath = prevProps.location.pathname;
    let newPath = this.props.location.pathname;
    let newId = this.props.match.params.categoryId || 0;

    // 两次路径不一样，说明查看了其他品类
    if (oldPath !== newPath) {
      this.setState(
        {
          parentCategoryId: newId,
        },
        () => {
          this.loadCategoryList(newId);
        }
      );
    }
  }

  // 拉list
  loadCategoryList() {
    _product
      .getCategoryList(this.state.parentCategoryId) // 默认为0，如果不为0则说明加载子品类
      .then((data) => {
        this.setState({
          list: data,
        });
      })
      .catch((err) => {
        this.setState({
          list: [],
        });
        _mm.errorTips(err);
      });
  }

  // 更新品类名称
  onUpdateName(categoryId, categoryName) {
    const newName = window.prompt("请输入新的品类名称", categoryName);

    if (newName) {
      _product
        .updateCategoryName({
          categoryId,
          categoryName: newName,
        })
        .then((res) => {
          _mm.successTips(res);
          this.loadCategoryList();
        })
        .catch((err) => {
          _mm.errorTips(err);
        });
    }
  }

  render() {
    const listBody = this.state.list.map((category) => {
      return (
        <tr key={category.id}>
          <td>{category.id}</td>
          <td style={{ textAlign: "center" }}>{category.name}</td>
          <td>
            <a
              className="opear"
              onClick={() => this.onUpdateName(category.id, category.name)}
            >
              编辑名称
            </a>
            <br />
            {category.parentId === 0 ? (
              <Link to={`/product-category/index/${category.id}`}>
                查看子品类
              </Link>
            ) : null}
          </td>
        </tr>
      );
    });

    return (
      <div id="page-wrapper">
        <PageTitle title="品类列表">
          <div className="page-header-right">
            <Link to="/product-category/add" className="btn btn-primary">
              <i className="fa fa-plus"></i>
              <span>添加品类</span>
            </Link>
          </div>
        </PageTitle>

        <div className="row">
          <div className="col-md-12">
            <p>父品类ID：{this.state.parentCategoryId}</p>
          </div>
        </div>

        <TableList tableHeads={tableHeads}>{listBody}</TableList>
      </div>
    );
  }
}

export default CategoryList;
