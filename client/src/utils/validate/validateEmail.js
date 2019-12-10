const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default (recipients) => {
    var errors = {};
    var recipientsArrayErrors = [];
    console.log('i amm  validation emails ');
    console.log(recipients);
    //would take a commaseparated string and trim each for spaces 
    if (!recipients || !recipients.length) {
        errors.recipients = { _error: 'At least one recipient must be entered' }
        console.log('fist if');
    } else {
        console.log('first else');
        // const recipientsArray = recipients.map(recipient => recipient.trim());
        recipients.forEach((recipient, recipientIndex) => {
            var recipientError = {};
            console.log('in FOREACH');
            console.log(re.test(recipient));
            if (!re.test(recipient) && recipient !== undefined) {
                console.log('THIIIIIS IS AN INVALIS EMALI' + recipients[recipientIndex]);
                recipientError = 'Invalid Email';
                var recipientName = 'recipients[' + recipientIndex +']';
                console.log('name attribute ' + recipientName);

                recipientsArrayErrors.push({[recipientName]: recipientError});
                console.log('recipientsArrayErrors');
                console.log(JSON.stringify(recipientsArrayErrors));
            }
        });
    }
    if (recipientsArrayErrors.length) {
        errors.recipients = recipientsArrayErrors;
    }
    return errors;
}