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
}

export default Product;