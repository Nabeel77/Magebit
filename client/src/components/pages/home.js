import React, {useCallback, useState} from 'react';
import classes from './home.module.scss';
import Form from '../form';
import Checkbox from '../checkbox';
import Icons from '../icons';
import Banner from '../banner';
import FormSubmitSuccessfully from '../successfulFormSubmit';
import { validateEmail } from '../componentUtils';
import SummerImage from '../../images/image_summer.png';

const Home = () => {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [checked, setChecked] = useState(false);
  const [enableButton, setEnableBUtton] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const onChangeHandler = useCallback((e) => {
    e.preventDefault();
    if (!e.target.value) {

      setMessage('');
      setMessageType('');

    } else if (!validateEmail(e.target.value)) {

      setInput('');
      setMessage("Please provide a valid email address.");
      setMessageType('error');
      setEnableBUtton(false);

    } else if (validateEmail(e.target.value) && e.target.value.split('.').pop() === 'co') {

      setInput('');
      setMessage("We are not accepting subscriptions from Colombia emails.");
      setMessageType('error');      
      setEnableBUtton(false);

    } else {
      setInput(e.target.value);
      setMessage('');
      setMessageType('');
      setEnableBUtton(true);
    }

  }, []);

  const onCheckBoxChangeHandler = useCallback((e) => {
    setChecked(e.target.checked);
    if (input) {
      setEnableBUtton(true);
      setMessageType('');
      setMessage('');
    }
  }, [input]);

  const checkTermsAndConditonsCheck = useCallback(() => {
    if (!checked) {

      setMessage("You must accept the terms and conditions");
      setMessageType('error');
      return false;

    }
    return true;
  }, [checked]);

  const setFormSubmissionSuccessState = useCallback(() => {
    setSubmissionSuccess(true);
    setTimeout(() => {
      setSubmissionSuccess(false);
      setChecked(false);
    }, 3000);
  }, [])

  const saveEmail = useCallback(() => {
    if (checkTermsAndConditonsCheck()) {
      fetch('/api/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email: input})
      })
      .then(response => response.json())
      .then((res) => {
        if (res.status === 'success') {
          setFormSubmissionSuccessState();
        } else {
            throw new Error('email registration failed');
        }
      })
      .catch(err => {
        setMessage("An error occured while registering your email. please try again later.");
        setMessageType('error');
      })
    }
      
  },[input, checkTermsAndConditonsCheck, setFormSubmissionSuccessState])

  const bannerContent = message && messageType ? <Banner text={message} type={messageType}/> : null;

  const formContainerContent = !submissionSuccess ? 
  (
    <div className={classes.submitFormContainer}>
    <p className={classes.mainHeading}>Subscribe to newsletter</p>
    <div className={classes.subText}>
      <p>
        Subscribe to our newsletter and get 10% 
        discount on pineapple glasses.
      </p>
    </div>
    <Form 
      onChangeHandler={onChangeHandler} 
      saveEmail={saveEmail} 
      enableButton={enableButton}
    />
    {bannerContent}
    <div className={classes.termsAndCheckboxContainer}>
        <Checkbox onCheckBoxChangeHandler={onCheckBoxChangeHandler}/>
    </div>
  </div> 
  ) : 
  (
    <FormSubmitSuccessfully /> 
  )


  return(
    <div className={classes.homeContainer}>
      <div className={classes.formContainer}>
        {formContainerContent}
        <div className={classes.iconsContainer}>
            <div className={classes.separater}/>
            <Icons/>
        </div>
      </div>
      <div className={classes.pineappleImageContainer}>
        <img src={SummerImage} alt='pineapple-bg'/>
      </div>
  </div>
  ) 
};

export default Home;
