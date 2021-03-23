import React, {useState, useCallback} from 'react';
import './index.scss';

const Login = () => {
  const [inputParams, setInputParams] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = useCallback((e) => {
    console.log('spread', ...inputParams);
    const inputName = e.target.name;
    const inputValue = e.target.value;


    // setInputParams(prev => {
    //   console.log(prev);
    //   return {
    //     ...prev,
    //     [inputName]: inputValue
    //   }
    // });

    // setInputParams({
    //   ...inputParams,
    //   [inputName]: inputValue
    // })
  }, []);

  return (
    <div className="col-md-4 col-md-offset-4">
      <div className="panel panel-default login-panel">
        <div className="panel-heading">欢迎登陆 DOWNZOO CMS</div>
        <div className="panel-body">
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">用户名</label>
              <input
                type="text"
                name="username"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="请输入用户名"
                value={inputParams.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">密码</label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="请输入密码"
                value={inputParams.password}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-lg btn-block btn-primary">登陆</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;
