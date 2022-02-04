import React from 'react';
import classes from './icons.module.scss';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Icons = () => {
  return(
    <div className={classes.container}>
        <div className={`${classes.iconContainer} ${classes.facebook}`}>
            <FaFacebookF />
        </div>
        <div className={`${classes.iconContainer} ${classes.instagram}`}>
            <FaInstagram />
        </div>
        <div className={`${classes.iconContainer} ${classes.twitter}`}>
            <FaTwitter />
        </div>
        <div className={`${classes.iconContainer} ${classes.youtube}`}>
            <FaYoutube />
        </div>
    </div>
  ) 
};

export default Icons;
