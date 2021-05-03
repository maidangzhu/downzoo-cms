import React from 'react';
import MUtil from "util/mm";
import Product from "service/product-service";

import './category-selector.scss';

const _product = new Product();
const _mm = new MUtil();

class CategorySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstCategoryList: [],
      firstCategoryId: 0,
      secondCategoryList: [],
      secondCategoryId: 0
    }

    this.onPropsCategoryChange = this.onPropsCategoryChange.bind(this);
    this.loadFirstCategory = this.loadFirstCategory.bind(this);
    this.handleFirstCategoryChange = this.handleFirstCategoryChange.bind(this);
    this.loadSecondCategory = this.loadSecondCategory.bind(this);
    this.handleSecondCategoryChange = this.handleSecondCategoryChange.bind(this);
  }

  componentDidMount() {
    this.loadFirstCategory();
  }

  // 加载一级目录
  loadFirstCategory() {
    _product.getCategoryList()
      .then(data => {
        this.setState({
          firstCategoryList: data
        })
      })
      .catch(errMsg => {
        _mm.errorTips(errMsg);
      })
  }

  // 改变一级目录
  handleFirstCategoryChange(e) {
    const newValue = e.target.value || 0;
    this.setState({
      firstCategoryId: newValue,
      secondCategoryId: 0,
      secondCategoryList: []
    }, () => {
      // 更新二级品类
      this.loadSecondCategory();
      this.onPropsCategoryChange();
    })
  }

  // 传给父组件选中的结果
  onPropsCategoryChange() {
    const isCategoryChangable = typeof this.props.onCategoryChange === 'function'; // 判断回调函数是否存在
    if (this.state.secondCategoryId) { // 如果有二级品类
      isCategoryChangable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
    } else { // 如果只选了一级品类
      isCategoryChangable && this.props.onCategoryChange(this.state.firstCategoryId, 0);
    }
  }

  // 加载二级目录
  loadSecondCategory() {
    _product.getCategoryList(this.state.firstCategoryId)
      .then(data => {
        this.setState({
          secondCategoryList: data,
        })
      })
      .catch(errMsg => {
        _mm.errorTips(errMsg);
      })
  }

  // 改变二级目录
  handleSecondCategoryChange(e) {
    const newValue = e.target.value;
    this.setState({
      secondCategoryId: newValue
    }, () => {
      this.onPropsCategoryChange();
    });
  }

  render() {
    return (
      <div className="col-md-5">
        <select
          className="form-control cate-select"
          onChange={e => this.handleFirstCategoryChange(e)}
        >
          <option>请选择一级分类</option>
          {
            this.state.firstCategoryList.map((each) => {
              return (
                <option
                  key={each.id}
                  value={each.id}
                >
                  {each.name}
                </option>
              )
            })
          }
        </select>

        {this.state.secondCategoryList.length > 0 &&
        (<select className="form-control cate-select" onChange={e => this.handleSecondCategoryChange(e)}>
          <option>请选择二级分类</option>
          {this.state.secondCategoryList.map((each) => {
            return (
              <option key={each.id} value={each.id}>{each.name}</option>
            )
          })}
        </select>)
        }
      </div>
    )
  }
}

export default CategorySelector;
