import React from 'react';
import classes from './successfulFormSubmit.module.scss';
import Trophy from '../../svgs/ic_trophy.svg';

const FormSubmitSuccessfully = () => {
  return(
    <div className={classes.container}>
        <img src={Trophy} alt='success-trophy' />
        <p className={classes.mainHeading}>Thanks for subscribing!</p>
        <p className={classes.subText}>
            You have succesfully subscribed to our email
            <br/> 
            listing. Check your email for the discount code.
          </p>
    </div>
  ) 
};

export default FormSubmitSuccessfully;
