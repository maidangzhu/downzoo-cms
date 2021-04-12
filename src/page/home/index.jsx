import React from 'react';
import {Link} from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx';
import Statistic from 'service/statistic-service.jsx';

import './index.scss';

const _statistic = new Statistic();

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userCount: '-',
      productCount: '-',
      orderCount: '-'
    }
  }

  componentDidMount() {
    this.loadCount();
  }

  loadCount() {
    _statistic.getHomeCount()
      .then(data => {
        this.setState(data);
      })
      .catch(err => {
        console.log('err', err);
      })
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="首页"/>
        <div className="row">
          <div className="col-md-4">
            <Link to="/user" className="color-box brown">
              <p className="count">{this.state.userCount}</p>
              <p className="desc">
                <i className="fa fa-user-o"/>
                <span>用户总数</span>
              </p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="/product" className="color-box green">
              <p className="count">{this.state.productCount}</p>
              <p className="desc">
                <i className="fa fa-list"/>
                <span>商品总数</span>
              </p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="/order" className="color-box blue">
              <p className="count">{this.state.orderCount}</p>
              <p className="desc">
                <i className="fa fa-check-square-o"/>
                <span>订单总数</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  }

}

export default Home;
