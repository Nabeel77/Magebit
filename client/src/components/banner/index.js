import React from 'react';
import classes from './banner.module.scss';

const Banner = ({text, type}) => {
  return(
    <>
        <p className={`${classes[type]} ${classes.message}`}>{text}</p>
    </>
  ) 
};

export default Banner;
