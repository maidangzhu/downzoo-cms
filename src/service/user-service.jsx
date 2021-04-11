import MUtil from "util/mm.jsx";

const _mm = new MUtil();

class User {
  // 这里是业务逻辑的代码，而_mm那边是纯请求逻辑
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

  // checkLoginInfo(loginInfo) {
  //   const username = $.trim(loginInfo.username)
  //   const password = $.trim(loginInfo.password);
  //
  //   if (typeof username !== 'string' || username.length === 0) {
  //     return {
  //       status: false,
  //       msg: '用户名格式不正确',
  //     }
  //   }
  //   if (typeof password !== 'string' || password.length === 0) {
  //     return {
  //       status: false,
  //       msg: '密码格式不正确',
  //     }
  //   }
  //
  //   return {
  //     status: true
  //   }
  // }
}

export default User;
