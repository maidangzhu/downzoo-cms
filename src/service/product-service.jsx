import MUtil from "util/mm.jsx";

const _mm = new MUtil();

class Product {
  getProductList(listParam) {
    let url = '';
    let data = {};

    if (listParam.listType === 'list') {
      url = '/manage/product/list.do';
      data.pageNum = listParam.pageNum;
    } else if (listParam.listType === 'search') {
      url = '/manage/product/search.do';
      data.pageNum = listParam.pageNum;
      data[listParam.searchType] = listParam.searchKeyword;
    }

    return _mm.request({
      type: 'post',
      url,
      data,
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