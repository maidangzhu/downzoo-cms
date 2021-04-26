import React from 'react';
import PageTitle from 'component/page-title/index.jsx';

class ProductSave extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="商品管理 -- 添加商品"/>
        <form action="" className="form-horizontal">
          <div className="form-group">
            <label className="col-md-1 control-label">商品名称</label>
            <div className="col-md-5">
              <input type="text" className="form-control" placeholder="商品名称"/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-1 control-label">商品描述</label>
            <div className="col-md-5">
              <input type="text" className="form-control" placeholder="商品描述"/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-1 control-label">所属分类</label>
          </div>
          <div className="form-group">
            <label className="col-md-1 control-label">商品价格</label>
            <div className="col-md-5">
              <div className="input-group">
                <input type="number" className="form-control"/>
                <span className="input-group-addon">元</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-1 control-label">商品库存</label>
            <div className="col-md-5">

              <div className="input-group">
                <input type="number" className="form-control"/>
                <span className="input-group-addon">件</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-1 control-label">商品图片</label>
            <div className="col-md-10">
              xxx
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-1 control-label">商品详情</label>
            <div className="col-md-10">
              detail
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-1 col-md-5">
              <button className="btn btn-primary">
                提交
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default ProductSave;