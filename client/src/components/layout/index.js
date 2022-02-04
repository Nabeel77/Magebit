import React from 'react';
import Nav from '../nav';
import classes from './layout.module.scss';

const Layout = ({ children }) => {
  return (
    <div className={classes.container}>
        <Nav/>
        <div className={classes.childrenContainer}>{children}</div>
    </div>
  )
};

export default Layout;
