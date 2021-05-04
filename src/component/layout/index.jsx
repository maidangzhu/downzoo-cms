import React from 'react';
import NavTop from '../nav-top/index';
import NavSide from '../nav-side/index';

import './theme.css';

const Layout = ({children}) => {
  return (
    <div id="wrapper">
      <NavTop/>
      <NavSide/>
      {children}
    </div>
  )
}

export default Layout;
