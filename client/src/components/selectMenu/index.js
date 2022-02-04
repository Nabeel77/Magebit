import React from 'react';
import classes from './selectMenu.module.scss';

const Select = ({ handleSelectChange }) => {
  return (

    <div className={classes.container}>
        <label htmlFor='sortingOptions'>Sort by: </label>
        <select id="sortingOptions" onChange={handleSelectChange}>
            <option label="Date">added</option>
            <option label="Name">email</option>
        </select>
    </div>

  ); 
};

export default Select;
