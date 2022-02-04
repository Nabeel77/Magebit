import React from 'react';
import classes from './nav.module.scss';
import Union from '../../svgs/Union.svg';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <header className={classes.header}>
        <div className={classes.headerContent}>
            <nav className={classes.nav}>
          
                    <img src={Union} alt='pineapple-logo'/>
                    <p className={classes.pineappleText}>pineapple.</p>
         
                <div className={classes.spacer}/>
                <ul>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/how-it-works">How it works</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/display-data">Display Data</Link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
  );
   
};

export default Nav;
