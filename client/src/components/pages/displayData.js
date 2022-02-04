import React, { useState, useEffect, useCallback } from 'react';
import Table from '../table';
import classes from './displayData.module.scss';
import Select from '../selectMenu';
import { checkEmailExists, returnEmailFromArray } from '../componentUtils';
import { CSVLink } from 'react-csv';

const DisplyEmailsData = () => {
    const [emailsArr, setEmailsArr] = useState(null);
    const [providers, setProviders] = useState(null);
    const [searchedEmailArr, setSearchedEmailArr] = useState(null);
    const [filteredEmails, setFilteredEmails] = useState(null);
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');

    const columns = [
        { heading: 'Email' },
        { heading: 'Provider' },
        { heading: 'Added' },
        { heading: 'Export' },
        { heading: 'Delete' }
    ]
   
    const handleSelectedRow = useCallback((e) => {
        const selectedItems = [...selectedEmails];
        const selectedEmail = returnEmailFromArray(searchedEmailArr, filteredEmails, emailsArr, e.target.id)
        if (e.target.checked && !checkEmailExists(selectedItems, selectedEmail)) {
            selectedItems.push({email: selectedEmail});
        } else if (!e.target.checked && checkEmailExists(selectedItems, selectedEmail)) {
            selectedItems.splice(e.target.id, 1);
        }
        setSelectedEmails(selectedItems);
    }, [emailsArr, filteredEmails, searchedEmailArr, selectedEmails])

    const handleSelectChange = useCallback((e) => {
        setSelectedValue(e.target.value);
    }, [])

    const handleDelete = useCallback((e) => {
        const email = returnEmailFromArray(searchedEmailArr, filteredEmails, emailsArr, e.target.id);
        fetch(`/api/emails/${email}`, {
            method: 'DELETE',
        })
          .then(response => response.json())
          .then((res) =>  {
            setEmailsArr(res.emails)
          })
          .catch(err => {
            
          })
    }, [emailsArr, filteredEmails, searchedEmailArr])

    const extractProviders = useCallback((emails) => {
        const providers = new Set();
        for (const item of emails) {
            providers.add(item.provider);
        }
        setProviders(providers);
    }, []);

    const handleFilterButtonClick = useCallback((e) => {
        setFilteredEmails(() => emailsArr.filter(item => item.provider === e.target.id) )
    }, [emailsArr])

    const handleClearFilter = useCallback(() => {
        setFilteredEmails(null);
    }, [])

    const handleSearchInput = useCallback((e) => {
        if (e.target.value) {
            filteredEmails && filteredEmails.length ? 
            setSearchedEmailArr(filteredEmails.filter((item) => item.email.includes(e.target.value))) 
            : setSearchedEmailArr(emailsArr.filter((item) => item.email.includes(e.target.value)))
        } else {
            setSearchedEmailArr(null);
        }
    },[emailsArr, filteredEmails])


    useEffect(() => {
        fetch('/api/emails', {
            method: 'GET',
        })
          .then(response => response.json())
          .then((res) =>  {
            extractProviders(res.emails);
            setEmailsArr(res.emails)
          })
          .catch(err => {
            
          })
    }, [])

    useEffect(() => {
        if (emailsArr && emailsArr.length) {
            setEmailsArr(() => emailsArr.sort((a,b) => (a[selectedValue] > b[selectedValue]) ? 1 : ((b[selectedValue] > a[selectedValue]) ? -1 : 0)));
        }
    }, [selectedValue])

    const providersContent = providers ? [...providers].map((provider, index) => 
     <button key={index} className={classes.btn} id={provider} onClick={handleFilterButtonClick}>{provider}</button>
    ) : null;

    const csvData = () => {
        return {
            filename: 'emails.csv',
            headers: [ { label: 'Emails', key:'email' } ],
            data: selectedEmails
        }
    }

    const content = emailsArr ?  
    (
        <>
            <div className={classes.searchFieldAndExportButtonContainer}>
                <input type='text' className={classes.search} placeholder="Search" onChange={handleSearchInput} />
                <CSVLink 
                    {...csvData()}
                >Export</CSVLink>
            </div>
            <Table 
                emails={
                    searchedEmailArr && searchedEmailArr.length ? 
                    searchedEmailArr : filteredEmails && 
                    filteredEmails.length ?
                    filteredEmails : 
                    emailsArr
                } 
                columns={columns} 
                handleDelete={handleDelete}
                handleSelectedRow={handleSelectedRow}
            />
            <div className={classes.tabelManipulationItemsContainer}>
                <Select handleSelectChange={handleSelectChange} selected={selectedValue}/>
                <div className={classes.filterButtons}> 
                    <button className={classes.btn} onClick={handleClearFilter}>Clear Filter</button> 
                    <div className={classes.providersAndLabelContainer}>
                        <label>Fliter by:</label>
                        <div className={classes.providers}>
                            {providersContent}
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) 
    : <h1>There might be no emails added. Please add data or wait for data loading....</h1>

    return (
        <div className={classes.container}>
            {content}
        </div>
    ) 
};

export default DisplyEmailsData;
