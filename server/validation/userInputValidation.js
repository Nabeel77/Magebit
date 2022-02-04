const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const userInputValidation = (req, res, next) => {
    const { email } = req.body;
    if (!validateEmail(email)) {
        res.status(400).send({errorMessage: 'Please provide a valid email address.'});
    } else if (validateEmail(email) && email.split('.').pop() === 'co') {
        res.status(400).send({errorMessage: 'We are not accepting subscriptions from Colombia emails.'});
    } else {
        next();
    }
}