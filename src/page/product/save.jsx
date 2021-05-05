import React from 'react';
import PageTitle from 'component/page-title';
import CategorySelector from './category-selector';
import FileUploader from "util/file-uploader";
import RichEditor from "util/rich-editor";
import MUtil from "util/mm";
import Product from 'service/product-service';

import './save.scss';

const _mm = new MUtil();
const _product = new Product();

class ProductSave extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      subtitle: '',
      price: '',
      stock: '',
      categoryId: 0,
      parentCategoryId: 0,
      images: [],
      detail: '',
      status: 1 // 商品状态1为在售
    }

    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onUploadSuccess = this.onUploadSuccess.bind(this);
    this.onUploadError = this.onUploadError.bind(this);
    this.onImgDelete = this.onImgDelete.bind(this);
    this.onDetailValueChange = this.onDetailValueChange.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // 传入Category-Selector的回调函数
  onCategoryChange(categoryId, parentCategoryId) {
    this.setState({
      categoryId,
      parentCategoryId
    })
  }

  // 图片上传成功
  onUploadSuccess(data) {
    const images = this.state.images;
    images.push(data.url);

    this.setState({
      images,
    });
  }

  // 图片上传失败
  onUploadError(errMsg) {
    _mm.errorTips(errMsg);
  }

  // 点击删除icon
  onImgDelete(e) {
    const index = parseInt(e.target.getAttribute('index'));
    const images = this.state.images;
    images.splice(index, 1);

    this.setState({
      images: images
    })
  }

  // 富文本编辑器的变化
  onDetailValueChange(val) {
    this.setState({
      detail: val
    })
  }

  // 简单字段的改变，比如商品名称，描述，价格，库存
  onValueChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    })
  }

  // 提交表单
  onSubmit(e) {
    e.preventDefault(0);
    const product = {
      name: this.state.name,
      subtitle: this.state.subtitle,
      price: parseFloat(this.state.price),
      stock: parseInt(this.state.stock),
      images: this.state.images,
      categoryId: parseInt(this.state.categoryId),
      parentCategoryId: this.state.pareKntCategoryId,
      detail: this.state.detail,
      status: this.state.status
    }

    const productCheckResult = _product.checkProduct(product);
    if (productCheckResult.status) { // 表单验证成功
      _product.saveProduct(product)
        .then(data => {
          _mm.successTips(data);
          this.props.history.push('/product/index');
        }).catch(errMsg => {
          _mm.errorTips(errMsg);
      })
    } else { // 表单验证失败
      _mm.errorTips(productCheckResult.msg);
    }
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="商品管理 -- 添加商品"/>
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">商品名称</label>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="商品名称"
                name="name"
                onChange={e => this.onValueChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品描述</label>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="商品描述"
                name="subtitle"
                onChange={e => this.onValueChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">所属分类</label>
            <CategorySelector onCategoryChange={this.onCategoryChange}/>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品价格</label>
            <div className="col-md-5">
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  onChange={e => this.onValueChange(e)}
                />
                <span className="input-group-addon">元</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品库存</label>
            <div className="col-md-5">
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  name="stock"
                  onChange={e => this.onValueChange(e)}
                />
                <span className="input-group-addon">件</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品图片</label>
            <div className="col-md-10">
              {this.state.images.length > 0 ? this.state.images.map((img, idx) => {
                return (
                  <div className="img-con" key={img}>
                    <img src={img} alt="img"/>
                    <i
                      className="fa fa-close"
                      index={idx}
                      onClick={e => this.onImgDelete(e)}
                    />
                  </div>
                )
              }) : null}
            </div>
            <div className="col-md-10 col-md-offset-2 file-upload-con">
              <FileUploader onSuccess={this.onUploadSuccess} onError={this.onUploadError}/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品详情</label>
            <div className="col-md-10">
              <RichEditor onValueChange={this.onDetailValueChange}/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-2 col-md-offset-1">
              <button type="submit" className="btn btn-primary" onClick={e => this.onSubmit(e)}>
                提交
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductSave;
