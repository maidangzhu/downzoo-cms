import React from 'react';
import NavTop from '../nav-top/index.jsx';
import NavSide from '../nav-side/index.jsx';

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
