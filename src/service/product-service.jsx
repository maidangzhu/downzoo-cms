import MUtil from "util/mm.jsx";

const _mm = new MUtil();

class Product {
  getProductList(pageNum) {
    return _mm.request({
      url: '/manage/product/list.do',
      type: 'post',
      data: {
        pageNum
      }
    })
  }

  setProductStatus(productId, status) {
    return _mm.request({
      url: '/manage/product/set_sale_status.do',
      type: 'get',
      data: {
        productId,
        status
      }
    })
  }
}

export default Product;