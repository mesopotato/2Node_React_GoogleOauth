import React from 'react';
import renderField from './renderField';
const FIELDS = [
    { label: 'Survey Title', name: 'title', noValueError: 'You must provide a' },
    { label: 'Subject Line', name: 'subject', noValueError: 'You must provide a' },
    { label: 'Email Body ', name: 'body', noValueError: 'You must provide a' },
    // { label: 'Recipients List', name: 'recipients', noValueError: 'You must provide a' }
];

const surveyFields =  () => {
    return _.map(FIELDS, ({ label, name }) => {
        return <Field
            component={renderField}
            type="text"
            label={label}
            name={name}
            key={name} />
    })
}

export default surveyFields;