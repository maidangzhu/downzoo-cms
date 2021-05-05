import MUtil from "util/mm.jsx";

const _mm = new MUtil();

class User {
  login(loginInfo) {
    return _mm.request({
      url: '/manage/user/login.do',
      type: 'post',
      data: loginInfo
    })
  }

  logout() {
    return _mm.request({
      url: '/user/logout.do',
      type: 'post',
    })
  }

  getUserList(pageNum) {
    return _mm.request({
      url: '/manage/user/list.do',
      type: 'post',
      data: {
        pageNum
      }
    })
  }
}

export default User;
