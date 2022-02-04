import React from 'react';
import Arrow from '../../svgs/arrow';
import classes from './form.module.scss';


const Form = ({ onChangeHandler, saveEmail, enableButton }) => {

  const arrowColor = enableButton ? '#000000' : '#B8BABC';

  return (
    <>
    <div className={classes.formContainer}>
        <input 
            className={classes.inputField} 
            type="text" 
            placeholder="Type your email address here..." 
            onChange={onChangeHandler}
        />
        <button type="submit" onClick={saveEmail} disabled={!enableButton}>
          <Arrow fill={arrowColor}/></button>
    </div>
    
    </>
  )
  
};

export default Form;
