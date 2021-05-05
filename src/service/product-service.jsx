import MUtil from "util/mm";
const _mm = new MUtil();

class Product {
  // 获取商品列表
  getProductList(listParam) {
    let url = '';
    let data = {};

    if (listParam.listType === 'list') {
      url = '/manage/product/list.do';
      data.pageNum = listParam.pageNum;
    } else if (listParam.listType === 'search') {
      url = '/manage/product/search.do';
      data.pageNum = listParam.pageNum;
      data[listParam.searchType] = listParam.searchKeyword; // keyword对应着两种searchType的其中一种
    }

    return _mm.request({
      type: 'post',
      url,
      data,
    })
  }

  // 设置商品上下架状态
  setProductStatus(productId, status) {
    return _mm.request({
      type: 'get',
      url: '/manage/product/set_sale_status.do',
      data: {
        productId,
        status
      }
    })
  }

  // 品类相关
  getCategoryList(parentCategoryId) {
    return _mm.request({
      type: 'post',
      url: '/manage/category/get_category.do',
      data: {
        categoryId: parentCategoryId || null
      }
    })
  }

  // 检查商品表单数据
  checkProduct(product) {
    const res = {
      status: true,
      msg: '验证通过'
    }

    if (typeof product.name !== 'string' || product.name.length === 0) {
      return {
        status: false,
        msg: '请输入正确的商品名称!'
      }
    }
    if (typeof product.subtitle !== 'string' || product.subtitle.length === 0) {
      return {
        status: false,
        msg: '请输入正确的商品描述!'
      }
    }
    if (typeof product.price !== 'number' || !(product.price >= 0)) {
      return {
        status: false,
        msg: '请输入正确的商品价格!'
      }
    }
    if (typeof product.stock !== 'number' || !(product.stock >= 0)) {
      return {
        status: false,
        msg: '请输入正确的库存数量!'
      }
    }
    if (typeof product.categoryId !== 'number' || !(product.categoryId >= 0)) {
      return {
        status: false,
        msg: '请选择商品品类!'
      }
    }

    return res;
  }

  // 添加商品
  saveProduct(product) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/save.do',
      data: product
    })
  }
}

export default Product;
