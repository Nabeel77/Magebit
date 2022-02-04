import React from 'react';
import classes from './checkbox.module.scss';

const Checkbox = ({ onCheckBoxChangeHandler }) => {
  return(
    <div className={classes.container}>
        <p>
            <input type='checkbox' id='checkbox' name='checkbox' onChange={onCheckBoxChangeHandler} />
            <label htmlFor='checkbox'>I agree to <span>terms of service</span></label>
        </p>
    </div>
  ) 
};

export default Checkbox;
