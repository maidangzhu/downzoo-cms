import React from 'react';

class searchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: 'productId', // productId or productName
      searchKeyword: ''
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleSearchChange(e) {
    const searchName = e.target.name;
    const searchValue = e.target.value;

    this.setState({
      [searchName]: searchValue
    })
  }

  handleSearch() {
    this.props.onSearch(this.state.searchType, this.state.searchKeyword);
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.handleSearch();
    }
  }

  render() {
    return (
      <div className="row search-wrap">
        <div className="col-md-12">
          <div className="form-inline">
            <div className="form-group">
              <select
                className="form-control"
                name="searchType"
                value={this.state.searchType}
                onChange={e => this.handleSearchChange(e)}
              >
                <option value="productId">按商品ID查询</option>
                <option value="productName">按商品名称查询</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="searchKeyword"
                placeholder="搜索"
                value={this.state.searchKeyword}
                onKeyUp={e => this.handleKeyUp(e)}
                onChange={e => this.handleSearchChange(e)}
              />
            </div>
            <button className="btn btn-primary" onClick={this.handleSearch}>搜索</button>
          </div>
        </div>
      </div>
    )
  }
}

export default searchList;
