class MUtil {
  // 这是一个通用的请求方法，与业务逻辑拆分开
  request(param) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: param.type || 'get',
        url: param.url || '',
        dataType: param.dataType || 'json',
        data: param.data || null,
        success(res) { // 只要请求成功，不管有数据没数据都会走到这里
          if (res.status === 0) { // 如果请求成功，调用resolve，可以后续通过then调用
            typeof resolve === 'function' && resolve(res.data, res.msg);
          } else if (res.status === 10) { // 如果未登陆，直接跳转到登陆页面，会保存下当前路经以供登陆成功后继续使用
            this.doLogin();
          } else { // 如果有错误信息就展示错误信息，不然就展示data
            typeof reject === 'function' && reject(res.msg || res.data);
          }
        },
        error(err) { // 这里如果请求失败，大概率是网络原因
          typeof reject === 'function' && reject(err.statusText);
        },
      })
    })
  }

  // 强行修改网址，跳转到登陆页面上
  // 字符串拼上路径，会形成redirect=xxx/xxx这样的参数，也就是说将路经作为val，保存在redirect这个key中
  // 等登陆成功后会拿出redirect对应的val，然后再往history里面push，从而跳转回之前的位置
  doLogin() {
    window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
  }

  // 获取URL参数，这也是一个工具类函数，与内部无业务逻辑
  getUrlParam(name) {
    // param1=123&param2=456
    const queryString = window.location.search.split('?')[1] || '';
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 匹配参数
    const result = queryString.match(reg); // 拿到与name对应的val

    return result ? encodeURIComponent(result[2]) : null;
  }

  setStorage(name, data) {
    const dataType = typeof data;

    if (dataType === 'object') { // 如果是引用类型，则用json序列化一下
      window.localStorage.setItem(name, JSON.stringify(data));
    } else if (['number', 'string', 'boolean'].indexOf(dataType)) { // 如果是基础类型，则直接设置值
      window.localStorage.setItem(name, data);
    } else {
      alert('该类型不支持本地存储');
    }
  }

  getStorage(name) {
    const data = window.localStorage.getItem(name);
    if (data) {
      return JSON.parse(data);
    } else {
      return '';
    }
  }

  removeStorage(name) {
    window.localStorage.removeItem(name);
  }

  // 错误提示的工具函数
  errorTips(err) {
    alert(err || 'something went wrong~');
  }
}

export default MUtil;
