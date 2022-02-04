export const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const convertToNormalDate = (dateTime) => {
  const date = new Date(dateTime);
  return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

export const isIsoDate = (str) => {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  var d = new Date(str); 
  return d.toISOString()===str;
}

export const checkEmailExists = (arr, email) => {
  return arr.some((item) => {
    return item.email === email
  });
}

export const returnEmailFromArray = (searchedEmailArr, filteredEmails, emailsArr, index) => {
  return searchedEmailArr && searchedEmailArr.length
  ? searchedEmailArr[index].email 
  : filteredEmails && filteredEmails.length ? filteredEmails[index].email
  : emailsArr[index].email;
}

