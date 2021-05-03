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
}

export default Product;